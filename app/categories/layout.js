"use client";
import Topbar from "../../components/Topbar";
import { CategoryProvider } from "../../components/CategoryContext";

export default function CategoriesLayout({ children }) {
  return (
    <CategoryProvider>
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
          minWidth: 0,
        }}>
          {children}
        </div>
      </div>
    </CategoryProvider>
  );
}