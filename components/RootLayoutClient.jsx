"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Topbar from "./Topbar";
import SidebarWrapper from "./SidebarWrapper";

const FULLSCREEN_ROUTES = ["/watch"];

const SIDEBAR_FULL = 220;
const SIDEBAR_ICON = 58;   // icon-only collapsed width

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [ready, setReady]               = useState(false);
  const [isMobile, setIsMobile]         = useState(false);

  // Desktop: collapsed = true → icon-only (58px); false → full (220px)
  const [collapsed, setCollapsed] = useState(false);

  // Mobile: overlay open/closed
  const [mobileOpen, setMobileOpen] = useState(false);

  const isFullscreen = FULLSCREEN_ROUTES.some(r => pathname?.startsWith(r));

  const NO_SIDEBAR_ROUTES = ["/top-models","/categories","/about","/shop","/dashboard/vip","/checkout"];
  const isNoSidebar = NO_SIDEBAR_ROUTES.some(r => pathname?.startsWith(r));

  const isHome = pathname === "/";

  /* responsive check */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* auto-expand sidebar on homepage (desktop) */
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    if (isHome && !mobile) {
      setCollapsed(false);
    }
    setMobileOpen(false);
  }, [pathname]);

  /* age gate */
  useEffect(() => {
    const confirmed = localStorage.getItem("ageConfirmed") === "true";
    setAgeConfirmed(confirmed);
    setReady(true);
    const interval = setInterval(() => {
      setAgeConfirmed(localStorage.getItem("ageConfirmed") === "true");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (!ready || !ageConfirmed) return <>{children}</>;

  /* hamburger toggle:
     mobile → toggle overlay
     desktop → toggle between full and icon-only */
  const handleMenuToggle = () => {
    if (isMobile) {
      setMobileOpen(o => !o);
    } else {
      setCollapsed(c => !c);
    }
  };

  /* ── Mobile overlay sidebar ── */
  const MobileOverlay = () => (
    <>
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{
          position: "fixed", inset: 0, zIndex: 9998,
          background: "rgba(0,0,0,0.55)", cursor: "pointer",
        }} />
      )}
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999,
        width: 260, height: "100vh",
        background: "#EEEEF0",
        overflowY: "auto", overflowX: "hidden",
        boxShadow: mobileOpen ? "4px 0 24px rgba(0,0,0,0.22)" : "none",
        transform: mobileOpen ? "translateX(0)" : "translateX(-260px)",
        transition: "transform 0.28s cubic-bezier(.4,0,.2,1), box-shadow 0.28s ease",
      }}>
        <button onClick={() => setMobileOpen(false)} style={{
          position: "absolute", top: 10, right: 10, zIndex: 1,
          background: "none", border: "none", cursor: "pointer",
          fontSize: 20, color: "#888", lineHeight: 1, padding: 4,
        }} aria-label="Close sidebar">✕</button>
        <SidebarWrapper collapsed={false} />
      </div>
    </>
  );

  /* ── Watch page (fullscreen) ── */
  if (isFullscreen) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Topbar onMenuToggle={handleMenuToggle} sidebarCollapsed={collapsed} />
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
      {isMobile && <MobileOverlay />}
    </div>
  );

  /* ── No-sidebar pages ── */
  if (isNoSidebar) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Topbar onMenuToggle={handleMenuToggle} sidebarCollapsed={collapsed} />
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>{children}</div>
      {isMobile && <MobileOverlay />}
    </div>
  );

  /* ── Normal pages ── */
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Topbar onMenuToggle={handleMenuToggle} sidebarCollapsed={collapsed} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>

        {isMobile ? (
          <MobileOverlay />
        ) : (
          /* Desktop inline sidebar:
             - Full mode  → 220px (icons + labels)
             - Icon mode  → 58px  (icons only)
             Never fully hidden on desktop — always shows at least the icons.
          */
          <div style={{
            width: collapsed ? SIDEBAR_ICON : SIDEBAR_FULL,
            minWidth: collapsed ? SIDEBAR_ICON : SIDEBAR_FULL,
            flexShrink: 0,
            overflowY: "auto", overflowX: "hidden",
            borderRight: "1px solid #d8dadb",
            background: "#EEEEF0",
            height: "100%",
            transition: "width 0.28s cubic-bezier(.4,0,.2,1), min-width 0.28s cubic-bezier(.4,0,.2,1)",
          }}>
            <div style={{ width: collapsed ? SIDEBAR_ICON : SIDEBAR_FULL, height: "100%" }}>
              <SidebarWrapper collapsed={collapsed} />
            </div>
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0, overflowY: "auto", overflowX: "hidden", height: "100%", background: "#F5F5F5" }}>
          {children}
        </div>
      </div>
    </div>
  );
}