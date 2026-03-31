"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const PHOTOS = [
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1502767882942-89f5af0ba7e9?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1528892952291-009c663ce843?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1490150028299-bf57d78394e0?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1475823678248-624fc6f85785?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=267&fit=crop",
];

const AFRICAN_PHOTOS = [
    "https://thumb-cdn77.xvideos-cdn.com/7cf709be-1545-4f75-b7b2-91a2bf3c5eff/0/xv_9_p.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/bcc3ad5f-e56d-4031-89dd-9e57b0fb8a66/0/xv_18_p.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/109c8f67-92b4-4462-a1ff-557a9c24fec9/0/xv_8_p.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/1270c747-9119-4cec-a851-5939b0fffb38/0/xv_30_p.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/31873630-628a-4817-990f-68f2b7f9c2a9/0/xv_27_p.jpg",
    "https://thumb-cdn77.xnxx-cdn.com/ae3716e7-d734-4131-86aa-23c4a7e239db/0/xn_24_t.jpg",
    "https://ic-nss.flixcdn.com/a/Yzg5MmRiZmM3Y2Q5MzgzODhjNWE3ZDYzMjk5ZTAwOWM/webp%2Cs%28w%3A704%2Ch%3A440%29/xc/nw/nwpmaQ/frame/original/18.jpg",
    "https://ic-vt-nss.xhcdn.com/a/MjZiODkxNmQ2NzJkMWJhajhiZmYxNmE0YTBjNzI0NGQ/s(w:2560,h:1440),webp/024/801/642/v2/2560x1440.245.webp",
    "https://www.tongabonga.com/media/thumbs_200/1/320/20060.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/1e1fdc91-f540-4f72-acd2-58ce81d27730/0/xv_4_t.jpg",
    "https://ic-vt-nss.xhcdn.com/a/YTdiZmYwMDk0NTM4Y2IwMTk0NjY3ZTBkY2IzZDJiYmI/s(w:2560,h:1440),webp/024/319/667/v2/2560x1440.218.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl3kh_xcjfbqmRbuqy4fdyzWGL2VYjOg4zYQ&s",
    "https://cdn1.44sex.com/upload/photos/2025/04/INCREDIBLE%20SEX%20South%20African%20Porn%20Star%20German%20Machine%20Drilled%20Pussy%20Melani%20xgmtl%20%5B44sex.com%5D.jpg",
];

const FLAGS = ["🇿🇦","🇺🇸","🇧🇷","🇨🇴","🇷🇺","🇺🇦","🇯🇵","🇫🇷","🇩🇪","🇬🇧","🇲🇽","🇳🇬","🇹🇭","🇷🇴","🇵🇱"];

// SVG Icons as components
function MobileIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)" strokeWidth="0">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>
  );
}

export default function StreamCard({ streamer, index = 0, gridMode = false }) {
  const router = useRouter();
  const [viewers, setViewers] = useState(streamer?.viewers || Math.floor(Math.random() * 30000) + 500);

  const isAfrican = !!streamer?.photo && streamer.photo.includes("african");
  const photoPool = isAfrican ? AFRICAN_PHOTOS : PHOTOS;
  const photo  = streamer?.photo || photoPool[index % photoPool.length];
  const flag   = streamer?.region || FLAGS[index % FLAGS.length];
  const name   = streamer?.username || `Model_${index + 1}`;
  const isNew  = streamer?.isNew || false;
  const isVR   = streamer?.vr || false;
  const isMob  = streamer?.mobile || Math.random() < 0.35;   // ~35% show mobile icon
  const isHD   = streamer?.hd !== undefined ? streamer.hd : Math.random() > 0.4;
  const hasPrivate = streamer?.hasPrivate !== undefined ? streamer.hasPrivate : Math.random() < 0.5; // ~50% show plane icon

  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => Math.max(100, v + Math.floor(Math.random() * 20) - 9));
    }, 3000 + index * 100);
    return () => clearInterval(id);
  }, [index]);

  const fmtViewers = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  return (
    <div
      onClick={() => router.push(`/watch/${name}`)}
      style={{
        width: gridMode ? "100%" : 160,
        flexShrink: gridMode ? undefined : 0,
        borderRadius: 6,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        background: "#1a1a1a",
        animation: `fadeUp .3s ${index * 0.03}s both`,
      }}
    >
      <div style={{ width: "100%", aspectRatio: "3/2", overflow: "hidden", position: "relative", background: "#1a1a1a" }}>
        <img
          src={photo}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={e => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.style.background = "#1a1a1a";
          }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.1) 50%,transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* ── TOP LEFT: mobile + plane icons ── */}
        <div style={{ position: "absolute", top: 5, left: 5, display: "flex", gap: 3, alignItems: "center" }}>
          {isMob && (
            <span style={{
              background: "rgba(0,0,0,0.6)",
              borderRadius: 4,
              width: 18, height: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MobileIcon />
            </span>
          )}
          {hasPrivate && (
            <span style={{
              background: "rgba(0,0,0,0.6)",
              borderRadius: 4,
              width: 18, height: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <PlaneIcon />
            </span>
          )}
          {isHD && !isVR && (
            <span style={{
              background: "rgba(0,0,0,0.6)",
              color: "rgba(255,255,255,0.9)",
              fontSize: 8, fontWeight: 700,
              padding: "2px 4px", borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.25)",
              lineHeight: 1.2,
            }}>HD</span>
          )}
          {isVR && (
            <span style={{
              background: "#1565c0", color: "#fff",
              fontSize: 8, fontWeight: 700,
              padding: "2px 5px", borderRadius: 3,
            }}>VR</span>
          )}
        </div>

        {/* ── TOP RIGHT: NEW badge ── */}
        {isNew && (
          <div style={{
            position: "absolute", top: 5, right: 5,
            background: "#f0a500", color: "#000",
            fontSize: 8, fontWeight: 800,
            padding: "2px 6px", borderRadius: 3,
            letterSpacing: ".05em",
            lineHeight: 1.4,
          }}>
            NEW
          </div>
        )}

      

        <div style={{
          position: "absolute", bottom: 5, left: 6, right: 22,
          fontSize: 10, fontWeight: 600, color: "#fff",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          textShadow: "0 1px 4px rgba(0,0,0,0.9)",
        }}>
          {name}
        </div>

        <div style={{ position: "absolute", bottom: 5, right: 5, fontSize: 11 }}>{flag}</div>
      </div>
    </div>
  );
}