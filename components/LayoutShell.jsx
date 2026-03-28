"use client";
import { useState, useEffect } from "react";
import Topbar from "./Topbar";
import { CategoryProvider, useCategory } from "./CategoryContext";

const CATEGORIES = ["girls", "couples", "guys", "trans"];

function CategoryTabs() {
  const { category, setCategory } = useCategory();
  return (
    <div style={{
      background: "#1a1a1a",
      borderBottom: "1px solid #2a2a2a",
      display: "flex",
      alignItems: "center",
      paddingLeft: 4,
      height: 44,
      flexShrink: 0,
      zIndex: 90,
    }}>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: category === cat ? "#fff" : "#888",
            fontSize: 14,
            fontWeight: category === cat ? 700 : 400,
            padding: "0 20px",
            height: "100%",
            textTransform: "capitalize",
            borderBottom: category === cat ? "2px solid #e53935" : "2px solid transparent",
            fontFamily: "inherit",
            marginBottom: -1,
            transition: "color 0.15s",
            whiteSpace: "nowrap",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default function LayoutShell({ children, sidebar }) {
  const [liveCount,    setLiveCount]    = useState(11284);
  const [sidebarOpen,  setSidebarOpen]  = useState(true);
  const [isMobile,     setIsMobile]     = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/streams/meta/count")
      .then(r => r.json())
      .then(d => setLiveCount(d.liveCount))
      .catch(() => {});
  }, []);

  return (
    <CategoryProvider>
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        background: "#111",
        fontFamily: "Inter, system-ui, sans-serif",
      }}>

        {/* ── TOPBAR — full width ── */}
        <Topbar liveCount={liveCount} onMenuToggle={() => setSidebarOpen(o => !o)} />

        {/* ── CATEGORY TABS — full width, below topbar ── */}
        <CategoryTabs />

        {/* ── SIDEBAR + CONTENT — side by side ── */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>

          {/* Mobile overlay backdrop */}
          {isMobile && sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,0.6)",
                zIndex: 150,
              }}
            />
          )}

          {/* Sidebar */}
          {sidebarOpen && (
            <div style={{
              width: 220,
              flexShrink: 0,
              overflowY: "auto",
              overflowX: "hidden",
              borderRight: "1px solid #2a2a2a",
              height: "100%",
              background: "#1a1a1a",
              position: isMobile ? "absolute" : "relative",
              top: 0,
              left: 0,
              bottom: 0,
              zIndex: isMobile ? 200 : "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#333 transparent",
            }}>
              {sidebar}
            </div>
          )}

          {/* Main content */}
          <div style={{
            flex: 1,
            minWidth: 0,
            overflowY: "auto",
            overflowX: "hidden",
            height: "100%",
            background: "#111",
          }}>
            {children}
          </div>

        </div>
      </div>
    </CategoryProvider>
  );
}