"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

// ── Mock photo pools ──────────────────────────────────────────────────────────
const PHOTOS = [
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1502767882942-89f5af0ba7e9?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1528892952291-009c663ce843?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
];

const NAMES = [
  "roouse","propertyofdaddy","KiraKayleigh1","Yui-Ch","Runarunapi","IORio2",
  "bdbdzs","JordanXo","-AngelAri-","anchan_","HaileyMadow","DoriDelux66",
  "alana15","Cutiepiespanks","seraphine23","-minami-","ORLA86","ranran_ch",
  "nide_xiaogou","Fiona_Kent_","nyakotan","Madoka_0116","miamellycious","-LOCOMOCO-",
  "HotBella-","mbcaanna","Wet__Bunny","Katya_Katysha","Ran-o0_Oo-DX","Milf_Harper_Jones",
  "AuroraBliss","KiraStorm","LunaRaven","NatashaFire","CherryBlossom","VioletDream",
  "ScarletVR","IvyRose","ZoeHot","SofiaFire","AlexDream","RosePetal",
  "DaisyChain","SunnyDay","MoonLight","StarGazer","CocoLove","JasmineFire",
  "TigerLily","SilverFox","GoldenGirl","MiraHotX","rima__sexy","Queen_sousou",
  "xXXSexyqueen","Dirty_Secrettt","Ahlam7578","Hot_farass","Sophie_BbC","SaraOne",
  "katt008","Kinkyphatass","The_OnlyMustang","LOLA_ARAB1","missytrig","Rose_berry",
  "sophia___","Daloaa_Mery","ROYALASS25","NubianScarlett","AfroTide","DesiredQueen27",
  "Sexmalendar","lady-zeei","pay_tience","ButterButt101","Saggy_queen","Lamya-dalo3a",
  "meggsworld","feifei-love","Yuyouwei-","Angel-Lewd","CherryEmmy","sexi_noemi",
  "Mishelle-Brizo","Amberonee31","curvyflawless","Saorii_kiido","VenusX","LadyFire",
  "TempestRose","OceanEyes","SilkTouch","NeonDream","CrystalVibe","MidnightX",
  "PeachGlow","SapphireX","RubyRed","EmeraldX","DiamondDust","PlatinumX",
];

const FLAGS = ["🇿🇦","🇺🇸","🇧🇷","🇨🇴","🇷🇺","🇺🇦","🇯🇵","🇫🇷","🇩🇪","🇬🇧","🇲🇽","🇳🇬","🇹🇭","🇷🇴","🇵🇱","🇨🇦","🇦🇺","🇪🇸","🇮🇹","🇸🇪"];
const CATEGORIES = ["Girls", "Couples", "Guys", "Trans"];
const YEARS = ["Current year", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016"];

const TOTAL = 100;
const BATCH = 30;

// ── Points decay ──────────────────────────────────────────────────────────────
function getPoints(rank, year) {
  const yearMultiplier = year === "Current year" || year === "2025" ? 1
    : year === "2024" ? 0.92 : year === "2023" ? 0.85
    : year === "2022" ? 0.78 : year === "2021" ? 0.71
    : 0.65;
  const base =
    rank === 1 ? 487329 : rank === 2 ? 308030 : rank === 3 ? 291594
    : rank === 4 ? 273375 : rank === 5 ? 253385 : rank === 6 ? 238669
    : Math.round(487329 * Math.pow(0.94, rank - 1));
  return Math.round(base * yearMultiplier);
}

function ordinal(n) {
  const s = ["th","st","nd","rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ── Generate mock data ────────────────────────────────────────────────────────
function generateModels(year, category) {
  const seed = year + category;
  return Array.from({ length: TOTAL }, (_, i) => {
    const rank = i + 1;
    const nameIdx = (i + seed.length * 3) % NAMES.length;
    const photoIdx = (i + seed.length) % PHOTOS.length;
    return {
      rank,
      username: NAMES[nameIdx],
      photo: PHOTOS[photoIdx],
      points: getPoints(rank, year),
      isLive: i % 5 === 0,
      isMobile: i % 7 === 1,
      flag: FLAGS[i % FLAGS.length],
      year,
    };
  });
}

// ── Badge header for each card ────────────────────────────────────────────────
function RankBadge({ rank, points }) {
  const label = `${ordinal(rank)} Place`;
  const pts = points.toLocaleString();

  if (rank === 1) return (
    <div style={{ background:"linear-gradient(90deg,#c8960c,#f5d060)", padding:"6px 10px", fontSize:12, fontWeight:700, color:"#1a0a00", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span>{label}</span>
      <span style={{ display:"flex", alignItems:"center", gap:4 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#1a0a00"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
        {pts}
      </span>
    </div>
  );
  if (rank === 2) return (
    <div style={{ background:"linear-gradient(90deg,#8a9ba8,#c5d0da)", padding:"6px 10px", fontSize:12, fontWeight:700, color:"#111", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span>{label}</span>
      <span style={{ display:"flex", alignItems:"center", gap:4 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#111"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
        {pts}
      </span>
    </div>
  );
  if (rank === 3) return (
    <div style={{ background:"linear-gradient(90deg,#8b4e1e,#c47a3a)", padding:"6px 10px", fontSize:12, fontWeight:700, color:"#fff", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span>{label}</span>
      <span style={{ display:"flex", alignItems:"center", gap:4 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
        {pts}
      </span>
    </div>
  );
  return (
    <div style={{ background:"#1e1e1e", padding:"5px 10px", fontSize:11, fontWeight:500, color:"#aaa", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #2a2a2a" }}>
      <span>{label}</span>
      <span style={{ display:"flex", alignItems:"center", gap:4 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#aaa"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
        {pts}
      </span>
    </div>
  );
}

// ── Year badge shown on card image ───────────────────────────────────────────
function YearBadge({ year }) {
  const label = year === "Current year" ? new Date().getFullYear().toString() : year;
  return (
    <div style={{
      position:"absolute", top:6, right:6,
      background:"rgba(229,57,53,0.92)", color:"#fff",
      fontSize:10, fontWeight:700, padding:"2px 6px", borderRadius:3,
      backdropFilter:"blur(4px)",
    }}>{label}</div>
  );
}

// ── Rank medal overlay (top 3 only) ─────────────────────────────────────────
function MedalOverlay({ rank }) {
  if (rank > 3) return null;
  const emoji = rank === 1 ? "👑" : rank === 2 ? "🥈" : "🥉";
  return (
    <div style={{
      position:"absolute", top:8, left:8,
      fontSize:22, filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
    }}>{emoji}</div>
  );
}

// ── Individual model card ─────────────────────────────────────────────────────
function ModelCard({ model, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(model.username)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor:"pointer", borderRadius:4, overflow:"hidden",
        background:"#111", border:"1px solid #222",
        transition:"transform 0.18s ease, box-shadow 0.18s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.6)" : "none",
      }}
    >
      <RankBadge rank={model.rank} points={model.points} />
      <div style={{ position:"relative", aspectRatio:"3/4", overflow:"hidden" }}>
        <img
          src={model.photo} alt={model.username} loading="lazy"
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.3s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
        {/* gradient overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)", pointerEvents:"none" }} />

        {/* Badges */}
        <MedalOverlay rank={model.rank} />
        <YearBadge year={model.year} />

        {/* Status badges */}
        <div style={{ position:"absolute", top:6, left:6, display:"flex", gap:4 }}>
          {model.isLive && (
            <span style={{ background:"#e53935", color:"#fff", fontSize:9, fontWeight:800, padding:"2px 5px", borderRadius:3, letterSpacing:"0.05em" }}>LIVE</span>
          )}
          {model.isMobile && (
            <span style={{ background:"rgba(0,0,0,0.6)", borderRadius:4, width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid rgba(255,255,255,0.15)" }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            </span>
          )}
        </div>

        {/* Bottom info */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"8px 8px 6px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span style={{ fontSize:11, fontWeight:600, color:"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"80%" }}>
              {model.username}
            </span>
            <span style={{ fontSize:14, flexShrink:0 }}>{model.flag}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ borderRadius:4, overflow:"hidden", background:"#111", border:"1px solid #1e1e1e" }}>
      <div style={{ background:"#1e1e1e", height:29 }} />
      <div style={{ aspectRatio:"3/4", background:"linear-gradient(90deg,#1a1a1a 25%,#252525 50%,#1a1a1a 75%)", backgroundSize:"200% 100%", animation:"hofShimmer 1.2s infinite" }} />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function HallOfFamePage() {
  const router = useRouter();
  const [activeYear,     setActiveYear]     = useState("2025");
  const [activeCategory, setActiveCategory] = useState("Girls");
  const [isMobile,       setIsMobile]       = useState(false);
  const [visibleCount,   setVisibleCount]   = useState(BATCH);
  const [isLoading,      setIsLoading]      = useState(false);
  const sentinelRef = useRef(null);
  const loadingRef  = useRef(false);

  const allModels = generateModels(activeYear, activeCategory);
  const cols = isMobile ? 2 : 6;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { setVisibleCount(BATCH); }, [activeYear, activeCategory]);

  const loadMore = useCallback(() => {
    if (loadingRef.current || visibleCount >= TOTAL) return;
    loadingRef.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(v => Math.min(v + BATCH, TOTAL));
      setIsLoading(false);
      loadingRef.current = false;
    }, 200);
  }, [visibleCount]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { rootMargin:"0px 0px 400px 0px", threshold:0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const visible = allModels.slice(0, visibleCount);

  return (
    <div style={{ background:"#0d0d0d", minHeight:"100vh", color:"#fff" }}>
      <style>{`
        @keyframes hofShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .hof-year-btn:hover { color: #fff !important; }
        .hof-cat-btn:hover  { color: #ddd !important; }
      `}</style>

      {/* ── HERO ── */}
      <div style={{
        background:"linear-gradient(135deg,#2d0a0a 0%,#4a1010 40%,#2d0a0a 100%)",
        padding: isMobile ? "28px 16px 20px" : "36px 28px 24px",
        position:"relative", overflow:"hidden",
        borderBottom:"1px solid #3a1010",
      }}>
        {/* Decorative leaf/floral watermark */}
        <div style={{
          position:"absolute", right: isMobile ? -30 : 40, top:"50%", transform:"translateY(-50%)",
          fontSize: isMobile ? 100 : 200, opacity:0.08,
          pointerEvents:"none", userSelect:"none", lineHeight:1,
        }}>🏆</div>

        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
          <span style={{ fontSize: isMobile ? 24 : 32 }}>🏆</span>
          <h1 style={{ fontSize: isMobile ? 22 : 32, fontWeight:800, margin:0, letterSpacing:"-0.02em" }}>
            Hall of Fame
          </h1>
        </div>
        <p style={{ fontSize: isMobile ? 12 : 14, color:"#c88", margin:0 }}>
          Discover the best-performing models over the years.
        </p>

        <div style={{ height:1, background:"linear-gradient(90deg,#5a2020,transparent)", margin:"20px 0 16px" }} />

        {/* Year selector + Category dropdown */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          {/* Year tabs */}
          <div style={{ display:"flex", alignItems:"center", gap:0, overflowX:"auto", scrollbarWidth:"none", flexWrap: isMobile ? "wrap" : "nowrap" }}>
            {YEARS.map((year, idx) => {
              const isActive = activeYear === year;
              const isCurrent = year === "Current year";
              return (
                <button
                  key={year}
                  className="hof-year-btn"
                  onClick={() => setActiveYear(year)}
                  style={{
                    background: isActive ? (isCurrent ? "#c8960c" : "#333") : "none",
                    border: isActive ? "none" : "none",
                    borderRadius: isActive ? 20 : 0,
                    color: isActive ? (isCurrent ? "#1a0a00" : "#fff") : (isCurrent ? "#c8a020" : "#888"),
                    fontSize: isMobile ? 12 : 13,
                    fontWeight: isActive ? 700 : 500,
                    padding: isActive ? "5px 14px" : "5px 14px",
                    cursor:"pointer",
                    whiteSpace:"nowrap",
                    fontFamily:"inherit",
                    transition:"all 0.15s",
                  }}
                >
                  {year}
                </button>
              );
            })}
          </div>

          {/* Category dropdown */}
          <div style={{ position:"relative" }}>
            <select
              value={activeCategory}
              onChange={e => setActiveCategory(e.target.value)}
              style={{
                background:"#1e1e1e", border:"1px solid #3a2020", color:"#fff",
                padding:"7px 32px 7px 12px", borderRadius:6, fontSize:13,
                fontFamily:"inherit", cursor:"pointer", appearance:"none",
                outline:"none",
              }}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>♀ {cat}</option>
              ))}
            </select>
            <span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#888", fontSize:10 }}>▼</span>
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <div style={{ padding: isMobile ? "12px 8px 60px" : "16px 16px 60px", background:"#0d0d0d" }}>
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols}, 1fr)`, gap: isMobile ? 6 : 8 }}>
          {visible.map(model => (
            <ModelCard
              key={`${activeYear}-${activeCategory}-${model.rank}`}
              model={model}
              onClick={name => router.push(`/watch/${name}`)}
            />
          ))}
          {isLoading && Array.from({ length: cols }).map((_, i) => (
            <SkeletonCard key={`sk-${i}`} />
          ))}
        </div>

        {visibleCount < TOTAL && (
          <div ref={sentinelRef} style={{ height:1, marginTop:8 }} aria-hidden="true" />
        )}

        {visibleCount >= TOTAL && (
          <div style={{ textAlign:"center", marginTop:40, color:"#444", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <span style={{ display:"block", width:60, height:1, background:"#2a2a2a" }} />
            🏁 End of Hall of Fame — 100th place reached
            <span style={{ display:"block", width:60, height:1, background:"#2a2a2a" }} />
          </div>
        )}
      </div>
    </div>
  );
}