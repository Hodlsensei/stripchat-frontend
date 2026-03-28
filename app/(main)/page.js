"use client";
import { useState, useEffect } from "react";
import AgeGate from "@/components/AgeGate";
import HomePage from "@/components/HomePage";

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [preference, setPreference] = useState("girls");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ageConfirmed");
    const savedPref = localStorage.getItem("preference");
    if (saved === "true") {
      setEntered(true);
      setPreference(savedPref || "girls");
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!entered) {
    return (
      <AgeGate
        onEnter={(pref) => {
          localStorage.setItem("ageConfirmed", "true");
          localStorage.setItem("preference", pref);
          setPreference(pref);
          setEntered(true);
        }}
      />
    );
  }

  return <HomePage defaultCategory={preference} />;
}