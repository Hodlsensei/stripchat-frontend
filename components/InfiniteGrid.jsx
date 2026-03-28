"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import StreamCard from "./StreamCard";

const LIMIT = 24;

export default function InfiniteGrid({ category = "all" }) {
  const [streams, setStreams] = useState([]);
  const [nextOffset, setNextOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sentinel element at the bottom — when visible, load more
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        limit: LIMIT,
        offset: nextOffset,
        ...(category && category !== "all" ? { category } : {}),
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/streams?${params}`
      );
      if (!res.ok) throw new Error("Failed to fetch streams");

      const data = await res.json();
      setStreams((prev) => [...prev, ...data.streams]);
      setNextOffset(data.nextOffset);
      setHasMore(data.hasMore);
    } catch (err) {
      setError("Failed to load more streams. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, nextOffset, category]);

  // Reset when category changes
  useEffect(() => {
    setStreams([]);
    setNextOffset(0);
    setHasMore(true);
    setLoading(false);
    setError(null);
  }, [category]);

  // Trigger first load after reset
  useEffect(() => {
    if (streams.length === 0 && hasMore && !loading) {
      fetchMore();
    }
  }, [streams.length, hasMore, loading, fetchMore]);

  // Intersection Observer — watches the sentinel div
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMore();
        }
      },
      { rootMargin: "400px" } // Start loading 400px before reaching the bottom
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasMore, loading, fetchMore]);

  return (
    <div style={{ width: "100%" }}>
      {/* Stream Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "4px",
          width: "100%",
        }}
      >
        {streams.map((stream) => (
          <StreamCard key={stream.id} stream={stream} />
        ))}

        {/* Skeleton placeholders while loading */}
        {loading &&
          Array.from({ length: LIMIT }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}
      </div>

      {/* Error state */}
      {error && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#aaa",
            fontSize: 14,
          }}
        >
          {error}
          <button
            onClick={fetchMore}
            style={{
              marginLeft: 12,
              background: "#e53935",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "6px 14px",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Sentinel — Intersection Observer watches this */}
      <div ref={sentinelRef} style={{ height: 1 }} />

      {/* End of results */}
      {!hasMore && streams.length > 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "30px 0",
            color: "#555",
            fontSize: 13,
          }}
        >
          You've seen all {streams.length} live streams
        </div>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      style={{
        background: "#1a1a1a",
        borderRadius: 4,
        overflow: "hidden",
        aspectRatio: "16/9",
        animation: "pulse 1.4s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(110deg, #1a1a1a 30%, #252525 50%, #1a1a1a 70%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}