"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import AuthModal from "./AuthModal";

export default function SidebarWrapper({ collapsed = false }) {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <Sidebar collapsed={collapsed} onOpenAuth={() => setShowAuth(true)} />
      {showAuth && (
        <AuthModal defaultTab="register" onClose={() => setShowAuth(false)} />
      )}
    </>
  );
}