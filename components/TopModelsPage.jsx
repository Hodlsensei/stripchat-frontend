"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const PHOTOS = [
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1502767882942-89f5af0ba7e9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1528892952291-009c663ce843?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
];

const AFRICAN_PHOTOS = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507081323647-4d250478b919?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=400&h=400&fit=crop",
];

const NAMES = [
  "AuroraBliss","KiraStorm","LunaRaven","NatashaFire","CherryBlossom",
  "VioletDream","MeiLing","ScarletVR","IvyRose","ZoeHot","SofiaFire",
  "AlexDream","DanteHot","MikeThunder","AlexGreek","RosePetal","DaisyChain",
  "SunnyDay","MoonLight","StarGazer","CocoLove","JasmineFire","TigerLily",
  "SilverFox","GoldenGirl","MiraHabibtek","rima__sexy","Queen_sousou",
  "xXXSexyamazon","Dirty_Secrettt","Ahlam7578","Hot_farass","Sophie_BbC_Squirt",
  "SaraOne_arab","ORLA86","katt008","Kinkyphatass","The_OnlyMustangfeels",
  "LOLA_ARAB1","missytrig","Rose_berry","sophia___","Daloaa_Mery",
  "ROYALASS25","NubianScarlett","AfroTideEmpress","DesiredQueen27","Sexmalendar",
  "lady-zeei","pay_tience","ButterButt101","Saggy_boobs","Lamya-dalo3a",
];

const FLAGS = ["🇿🇦","🇺🇸","🇧🇷","🇨🇴","🇷🇺","🇺🇦","🇯🇵","🇫🇷","🇩🇪","🇬🇧","🇲🇽","🇳🇬","🇹🇭","🇷🇴","🇵🇱"];

const REGIONS = ["Africa", "North America", "South America", "Europe", "Asia & Pacific"];
const TABS = ["Current Month Top", "Last 24h Winners", "Last Month Winners", "Hall of Fame", "Contest Rules"];
const CATEGORIES = ["Girls", "Couples", "Guys", "Trans"];

const CONTINENT_REGION = {
  AF: "Africa", NA: "North America", SA: "South America",
  EU: "Europe", AS: "Asia & Pacific", OC: "Asia & Pacific",
};

// Generate points: 1st place ~6000, decreasing to ~67 at 1000th
function getPoints(rank) {
  if (rank === 1) return 5864;
  if (rank === 2) return 4568;
  if (rank === 3) return 4364;
  // Smooth logarithmic decay from rank 4 to 1000
  const max = 3540;
  const min = 67;
  const ratio = (rank - 4) / (1000 - 4);
  return Math.max(min, Math.round(max * Math.pow(min / max, ratio)));
}

function ordinal(n) {
  const s = ["th","st","nd","rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Generate 1000 models
function generateModels(region) {
  const isAfrican = region === "Africa";
  return Array.from({ length: 1000 }, (_, i) => {
    const rank = i + 1;
    const photoPool = isAfrican ? AFRICAN_PHOTOS : PHOTOS;
    return {
      rank,
      username: NAMES[i % NAMES.length] + (i >= NAMES.length ? `_${Math.floor(i / NAMES.length)}` : ""),
      photo: photoPool[i % photoPool.length],
      points: getPoints(rank),
      isLive: Math.random() < 0.3,
      isMobile: Math.random() < 0.3,
      flag: FLAGS[i % FLAGS.length],
    };
  });
}

function RankBadge({ rank }) {
  if (rank === 1) return (
    <div style={{ background: "linear-gradient(135deg,#f5a623,#f0c040)", padding: "5px 10px", fontSize: 12, fontWeight: 700, color: "#000", display: "flex", alignItems: "center", gap: 5, borderRadius: "4px 4px 0 0" }}>
      <span>🏆</span> 1st Place - <span style={{ display: "flex", alignItems: "center", gap: 3 }}>⚡ {getPoints(1).toLocaleString()}</span>
    </div>
  );
  if (rank === 2) return (
    <div style={{ background: "linear-gradient(135deg,#b0bec5,#cfd8dc)", padding: "5px 10px", fontSize: 12, fontWeight: 700, color: "#000", display: "flex", alignItems: "center", gap: 5, borderRadius: "4px 4px 0 0" }}>
      2nd Place - <span>⚡ {getPoints(2).toLocaleString()}</span>
    </div>
  );
  if (rank === 3) return (
    <div style={{ background: "linear-gradient(135deg,#bf7f50,#d4956a)", padding: "5px 10px", fontSize: 12, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 5, borderRadius: "4px 4px 0 0" }}>
      3rd Place - <span>⚡ {getPoints(3).toLocaleString()}</span>
    </div>
  );
  return (
    <div style={{ background: "#2a2a2a", padding: "5px 10px", fontSize: 11, fontWeight: 600, color: "#ccc", display: "flex", alignItems: "center", gap: 4, borderRadius: "4px 4px 0 0" }}>
      {ordinal(rank)} Place - <span style={{ display: "flex", alignItems: "center", gap: 3 }}>⚡ {getPoints(rank).toLocaleString()}</span>
    </div>
  );
}

function ModelCard({ model, onClick }) {
  return (
    <div onClick={() => onClick(model.username)} style={{ cursor: "pointer", borderRadius: 4, overflow: "hidden", background: "#111" }}>
      <RankBadge rank={model.rank} />
      <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
        <img src={model.photo} alt={model.username} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)", pointerEvents: "none" }} />

        {/* Top badges */}
        <div style={{ position: "absolute", top: 6, left: 6, display: "flex", gap: 4 }}>
          {model.isLive && (
            <span style={{ background: "#e53935", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 5px", borderRadius: 3 }}>LIVE</span>
          )}
          {model.isMobile && (
            <span style={{ background: "rgba(0,0,0,0.6)", borderRadius: 4, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            </span>
          )}
        </div>

        {/* Flag */}
        <div style={{ position: "absolute", bottom: 24, right: 6, fontSize: 14 }}>{model.flag}</div>

        {/* Name */}
        <div style={{ position: "absolute", bottom: 6, left: 6, right: 6, fontSize: 11, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {model.username}
        </div>
      </div>
    </div>
  );
}

export default function TopModelsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Current Month Top");
  const [activeCategory, setActiveCategory] = useState("Girls");
  const [activeRegion, setActiveRegion] = useState("Africa");
  const [userRegion, setUserRegion] = useState("Africa");
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(120); // show 120 at a time (20 rows × 6)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Detect user region
  useEffect(() => {
    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) })
      .then(r => r.json())
      .then(d => {
        const region = CONTINENT_REGION[d.continent_code] || "Africa";
        setUserRegion(region);
        setActiveRegion(region);
      })
      .catch(() => {});
  }, []);

  const models = generateModels(activeRegion);
  const visible = models.slice(0, visibleCount);
  const cols = isMobile ? 2 : 6;

  const regionTitle = {
    "Africa": "Africa",
    "North America": "North America",
    "South America": "South America",
    "Europe": "Europe",
    "Asia & Pacific": "Asia & Pacific",
  }[activeRegion];

  const categoryTitle = {
    "Girls": "Girls", "Couples": "Couples", "Guys": "Guys", "Trans": "Trans",
  }[activeCategory];

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", color: "#fff" }}>

      {/* Top navigation tabs */}
      <div style={{ background: "#1a1a1a", borderBottom: "1px solid #333", position: "sticky", top: 0, zIndex: 100 }}>
        {/* Back to home */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px 0" }}>
          <button onClick={() => router.push("/")} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
            ← Back to Home
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", alignItems: "center", overflowX: "auto", scrollbarWidth: "none", padding: "0 16px" }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: activeTab === tab ? "#fff" : "#888",
              fontSize: 13, fontWeight: activeTab === tab ? 700 : 400,
              padding: "12px 16px", whiteSpace: "nowrap",
              borderBottom: activeTab === tab ? "2px solid #e53935" : "2px solid transparent",
              fontFamily: "inherit",
            }}>{tab}</button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "0 8px", color: "#888", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>
            ⊞ Categories
          </div>
        </div>
      </div>

      {/* Hero section with continent map silhouette */}
      <div style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #1a0a00 0%, #2d1500 50%, #1a0a00 100%)",
        padding: isMobile ? "24px 16px 16px" : "32px 24px 20px",
        minHeight: 120,
      }}>
        {/* Map silhouette background */}
        <div style={{
          position: "absolute", right: isMobile ? -20 : 40, top: 0, bottom: 0,
          width: isMobile ? 180 : 320, opacity: 0.15,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: isMobile ? 120 : 220, pointerEvents: "none", userSelect: "none",
        }}>
          {activeRegion === "Africa" ? "🌍" :
           activeRegion === "North America" ? "🌎" :
           activeRegion === "South America" ? "🌎" :
           activeRegion === "Europe" ? "🌍" : "🌏"}
        </div>

        <h1 style={{ fontSize: isMobile ? 18 : 26, fontWeight: 700, margin: "0 0 6px", position: "relative" }}>
          Top {categoryTitle} of the Month in {regionTitle}
        </h1>
        <p style={{ fontSize: isMobile ? 11 : 13, color: "#aaa", margin: 0, position: "relative" }}>
          Ranked by total StripPoints earned. Top spots are awarded regionally to highlight the hottest talent.
        </p>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: 4, marginTop: 16, position: "relative" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: activeCategory === cat ? "#fff" : "#888",
              fontSize: 14, fontWeight: activeCategory === cat ? 700 : 400,
              padding: "4px 0", marginRight: 16,
              borderBottom: activeCategory === cat ? "2px solid #e53935" : "2px solid transparent",
              fontFamily: "inherit",
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Region filters */}
      <div style={{ display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto", scrollbarWidth: "none", background: "#111", borderBottom: "1px solid #222" }}>
        {REGIONS.map(region => (
          <button key={region} onClick={() => { setActiveRegion(region); setVisibleCount(120); }} style={{
            background: activeRegion === region ? "#333" : "#1e1e1e",
            border: activeRegion === region ? "1px solid #555" : "1px solid #333",
            color: activeRegion === region ? "#fff" : "#aaa",
            fontSize: 12, fontWeight: activeRegion === region ? 600 : 400,
            padding: "7px 14px", borderRadius: 6, cursor: "pointer",
            whiteSpace: "nowrap", fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            {region === "Africa" ? "🌍" :
             region === "North America" ? "🌎" :
             region === "South America" ? "🌎" :
             region === "Europe" ? "🌍" : "🌏"} {region}
          </button>
        ))}
      </div>

      {/* Models grid */}
      <div style={{ padding: isMobile ? "12px 8px" : "16px", background: "#0d0d0d" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: isMobile ? 6 : 8,
        }}>
          {visible.map(model => (
            <ModelCard key={model.rank} model={model} onClick={(name) => router.push(`/watch/${name}`)} />
          ))}
        </div>

        {/* Load more */}
        {visibleCount < 1000 && (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button
              onClick={() => setVisibleCount(v => Math.min(v + 120, 1000))}
              style={{
                background: "#222", border: "1px solid #444", color: "#fff",
                fontSize: 13, fontWeight: 600, padding: "10px 32px",
                borderRadius: 6, cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Load More ({1000 - visibleCount} remaining)
            </button>
          </div>
        )}

        {visibleCount >= 1000 && (
          <div style={{ textAlign: "center", marginTop: 24, color: "#555", fontSize: 13 }}>
            You've reached the end of the leaderboard (1000th place)
          </div>
        )}
      </div>
    </div>
  );
}