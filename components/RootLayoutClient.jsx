"use client";
import { usePathname } from "next/navigation";
import Topbar from "./Topbar";
import SidebarWrapper from "./SidebarWrapper";

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const isCategories = pathname?.startsWith("/categories");

  if (isCategories) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}>
        <Topbar />
        <div style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "hidden",
    }}>
      <Topbar />
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