"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Topbar from "./Topbar";
import SidebarWrapper from "./SidebarWrapper";

// Routes that show topbar but NO sidebar
const NO_SIDEBAR_ROUTES = ["/top-models", "/categories", "/about"];

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [ready,        setReady]        = useState(false);

  const isNoSidebar = NO_SIDEBAR_ROUTES.some(route => pathname?.startsWith(route));

  useEffect(() => {
    const confirmed = localStorage.getItem("ageConfirmed") === "true";
    setAgeConfirmed(confirmed);
    setReady(true);

    const interval = setInterval(() => {
      const c = localStorage.getItem("ageConfirmed") === "true";
      setAgeConfirmed(c);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Full screen — no topbar, no sidebar (Age Gate)
  if (!ready || !ageConfirmed) {
    return <>{children}</>;
  }

  // No-sidebar routes — topbar only, full-width
  if (isNoSidebar) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}>
        <Topbar />
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {children}
        </div>
      </div>
    );
  }

  // Normal pages — topbar + sidebar (tabs are already inside Topbar)
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "hidden",
    }}>
      <Topbar />
      {/* ← REMOVED <CategoryTabs /> — tabs already live inside Topbar.jsx */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{
          width: 220,
          flexShrink: 0,
          overflowY: "auto",
          overflowX: "hidden",
          borderRight: "1px solid #e5e7eb",
          height: "100%",
        }}>
          <SidebarWrapper />
        </div>
        <div style={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}