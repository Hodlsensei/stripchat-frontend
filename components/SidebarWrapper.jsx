"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import FreeTokensModal from "./FreeTokensModal";

export default function SidebarWrapper() {
  const [showFreeTokens, setShowFreeTokens] = useState(false);

  return (
    <>
      <Sidebar onOpenAuth={() => setShowFreeTokens(true)} />
      {showFreeTokens && (
        <FreeTokensModal onClose={() => setShowFreeTokens(false)} />
      )}
    </>
  );
}