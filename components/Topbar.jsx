"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "./AuthModal";
import { useCategory } from "./CategoryContext";

const GENDER_TABS = ["Girls", "Couples", "Guys", "Trans"];

export default function Topbar({ liveCount, onMenuToggle }) {
  const router = useRouter();
  const [query, setQuery]           = useState("");
  const [showAuth, setShowAuth]     = useState(false);
  const [authTab, setAuthTab]       = useState("login");
  const [user, setUser]             = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile]     = useState(false);

  const { category, setCategory } = useCategory();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  const openLogin       = () => { setAuthTab("login");    setShowAuth(true); };
  const openRegister    = () => { setAuthTab("register"); setShowAuth(true); };
  const handleAuthClose = (loggedInUser) => {
    setShowAuth(false);
    if (loggedInUser) setUser(loggedInUser);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        flexShrink: 0,
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      }}>

        {/* ══ MAIN BAR ══ */}
        <header style={{
          height: 52,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 0,               /* we control spacing manually per group */
        }}>

          {/* ── LEFT GROUP: Hamburger + Logo + Live + Top Models ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>

            {/* Hamburger */}
            <div
              onClick={onMenuToggle}
              style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 4, padding: "6px 4px", flexShrink: 0 }}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{ width: 18, height: 2, background: "#222", display: "block", borderRadius: 2 }}/>
              ))}
            </div>

            {/* Logo */}
            <div
              onClick={() => router.push("/")}
              style={{ display: "flex", alignItems: "center", flexShrink: 0, cursor: "pointer" }}
            >
              <img src="/stripchatbate-rd.png" alt="Stripchatbate" style={{ height: 30, objectFit: "contain" }}/>
            </div>

            {/* Divider */}
            {!isMobile && (
              <div style={{ width: 1, height: 20, background: "#e5e7eb", flexShrink: 0 }}/>
            )}

            {/* Live count */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: isMobile ? 11 : 12, fontWeight: 700, color: "#222", flexShrink: 0 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4caf50", display: "inline-block", boxShadow: "0 0 0 2px rgba(76,175,80,0.2)" }}/>
              {(liveCount ?? 11304).toLocaleString()} LIVE
            </div>

            {/* Divider */}
            {!isMobile && (
              <div style={{ width: 1, height: 20, background: "#e5e7eb", flexShrink: 0 }}/>
            )}

            {/* Top Models */}
            {!isMobile && (
              <div
                onClick={() => router.push("/top-models")}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: 14, color: "#222", cursor: "pointer",
                  flexShrink: 0, fontWeight: 600,
                  padding: "0 4px",
                  transition: "opacity .15s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.65"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="1"  y="11" width="6" height="10" rx="1"/>
                  <rect x="9"  y="3"  width="6" height="18" rx="1"/>
                  <rect x="17" y="8"  width="6" height="13" rx="1"/>
                </svg>
                Top Models
              </div>
            )}
          </div>

          {/* ── MOBILE SEARCH ── */}
          {isMobile ? (
            <>
              {showSearch ? (
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "#f5f5f5", borderRadius: 8, padding: "0 12px", height: 32, marginLeft: 8 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." autoFocus
                    style={{ background: "none", border: "none", outline: "none", fontSize: 13, fontFamily: "inherit", width: "100%", color: "#222" }}/>
                  <button onClick={() => setShowSearch(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: 18, padding: 0 }}>✕</button>
                </div>
              ) : (
                <button onClick={() => setShowSearch(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", marginLeft: "auto" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </button>
              )}
            </>
          ) : (

            /* ── DESKTOP: Search — truly centered ── */
            <>
              <div style={{ flex: 1 }} />

              {/* Search pill */}
              <div style={{
                display: "flex", alignItems: "center",
                background: "#f5f5f5",
                border: "1px solid #e5e7eb",
                borderRadius: 20,
                height: 34,
                width: 420,
                flexShrink: 0,
                overflow: "hidden",
              }}>
                {/* Magnifying glass */}
                <div style={{ padding: "0 7px 0 12px", display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>

                {/* Input */}
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Find anything you want"
                  style={{
                    background: "none", border: "none", outline: "none",
                    fontSize: 12, fontFamily: "inherit", flex: 1, color: "#222",
                    minWidth: 0,
                  }}
                />

                {/* Filter icon */}
                <div style={{ padding: "0 8px", display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="21" y1="4"  x2="14" y2="4"/>
                    <line x1="10" y1="4"  x2="3"  y2="4"/>
                    <line x1="21" y1="12" x2="12" y2="12"/>
                    <line x1="8"  y1="12" x2="3"  y2="12"/>
                    <line x1="21" y1="20" x2="16" y2="20"/>
                    <line x1="12" y1="20" x2="3"  y2="20"/>
                    <circle cx="12" cy="4"  r="2" fill="#888" stroke="none"/>
                    <circle cx="10" cy="12" r="2" fill="#888" stroke="none"/>
                    <circle cx="14" cy="20" r="2" fill="#888" stroke="none"/>
                  </svg>
                </div>

                {/* Divider */}
                <div style={{ width: 1, height: 18, background: "#ddd", flexShrink: 0 }}/>

                {/* Magic Search */}
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    background: "#fff",
                    padding: "0 12px",
                    height: "100%",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "background .15s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
                  onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f5a623">
                    <path d="M12 2 C12 2 13 9 14 10 C15 11 22 12 22 12 C22 12 15 13 14 14 C13 15 12 22 12 22 C12 22 11 15 10 14 C9 13 2 12 2 12 C2 12 9 11 10 10 C11 9 12 2 12 2 Z"/>
                  </svg>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#222" }}>Magic Search</span>
                  <span style={{
                    background: "#e53935", color: "#fff",
                    fontSize: 9, fontWeight: 700,
                    padding: "1px 5px", borderRadius: 10,
                  }}>3</span>
                </div>
              </div>

              <div style={{ flex: 1 }} />
            </>
          )}

          {/* ── RIGHT GROUP ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>

            {!isMobile && (
              <span style={{ fontSize: 12, color: "#888", cursor: "pointer", whiteSpace: "nowrap", marginRight: 2 }}>
                About Stripchatbate
              </span>
            )}

            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#e53935,#8e24aa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {user.username?.[0]?.toUpperCase()}
                </div>
                {!isMobile && (
                  <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid #ddd", color: "#666", fontSize: 11, padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>
                    Log Out
                  </button>
                )}
              </div>
            ) : (
              <>
                {!isMobile && (
                  <button
                    onClick={openRegister}
                    style={{
                      background: "#e53935",
                      border: "none",
                      color: "#fff",
                      fontSize: 12,
                      padding: "6px 16px",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      whiteSpace: "nowrap",
                      fontWeight: 700,
                      boxShadow: "0 2px 6px rgba(229,57,53,0.35)",
                      transition: "background .15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#c62828"}
                    onMouseLeave={e => e.currentTarget.style.background = "#e53935"}
                  >
                    Create Free Account
                  </button>
                )}
                <button
                  onClick={openLogin}
                  style={{
                    background: "transparent",
                    border: "1px solid #e5e7eb",
                    color: "#222",
                    fontSize: 12,
                    padding: "5px 14px",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                    transition: "border-color .15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#aaa"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e7eb"}
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </header>

        {/* ══ GENDER TAB BAR ══ */}
        <div style={{
          background: "#fff",
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 4,
          height: 38,
        }}>
          {GENDER_TABS.map(tab => {
            const key    = tab.toLowerCase();
            const active = category === key;
            return (
              <button
                key={tab}
                onClick={() => setCategory(key)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: active ? "3px solid #e53935" : "3px solid transparent",
                  color: active ? "#e53935" : "#555",
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                  padding: "0 14px",
                  height: "100%",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  letterSpacing: "0.01em",
                  transition: "color .15s, border-color .15s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#222"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#555"; }}
              >
                {tab}
              </button>
            );
          })}
        </div>

      </div>

      {showAuth && <AuthModal defaultTab={authTab} onClose={handleAuthClose}/>}
    </>
  );
}