"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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

const HOF_NAMES = [
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
const REGIONS    = ["Africa","North America","South America","Europe","Asia & Pacific"];
const TABS       = ["Current Month Top","Last 24h Winners","Last Month Winners","Hall of Fame","Contest Rules"];
const CATEGORIES = ["Girls","Couples","Guys","Trans"];
const HOF_YEARS  = ["Current year","2025","2024","2023","2022","2021","2020","2019","2018","2017","2016"];

const CONTINENT_REGION = {
  AF:"Africa", NA:"North America", SA:"South America",
  EU:"Europe", AS:"Asia & Pacific", OC:"Asia & Pacific",
};

const BATCH     = 60;
const TOTAL     = 1000;
const HOF_BATCH = 30;
const HOF_TOTAL = 100;

function getPoints(rank) {
  if (rank === 1) return 5864;
  if (rank === 2) return 4568;
  if (rank === 3) return 4364;
  const max = 3540, min = 67;
  const ratio = (rank - 4) / (TOTAL - 4);
  return Math.max(min, Math.round(max * Math.pow(min / max, ratio)));
}

function getHofPoints(rank, year) {
  const mult = year === "Current year" || year === "2025" ? 1
    : year === "2024" ? 0.92 : year === "2023" ? 0.85
    : year === "2022" ? 0.78 : year === "2021" ? 0.71 : 0.65;
  const base =
    rank === 1 ? 487329 : rank === 2 ? 308030 : rank === 3 ? 291594
    : rank === 4 ? 273375 : rank === 5 ? 253385 : rank === 6 ? 238669
    : Math.round(487329 * Math.pow(0.94, rank - 1));
  return Math.round(base * mult);
}

function ordinal(n) {
  const s = ["th","st","nd","rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function generateModels(region) {
  const isAfrican = region === "Africa";
  return Array.from({ length: TOTAL }, (_, i) => {
    const rank = i + 1;
    const pool = isAfrican ? AFRICAN_PHOTOS : PHOTOS;
    return {
      rank,
      username: NAMES[i % NAMES.length] + (i >= NAMES.length ? "_" + Math.floor(i / NAMES.length) : ""),
      photo: pool[i % pool.length],
      points: getPoints(rank),
      isLive: i % 4 === 0,
      isMobile: i % 5 === 0,
      flag: FLAGS[i % FLAGS.length],
    };
  });
}

function generateHofModels(year, category) {
  const seed = year + category;
  return Array.from({ length: HOF_TOTAL }, (_, i) => {
    const rank = i + 1;
    const nameIdx = (i + seed.length * 3) % HOF_NAMES.length;
    const photoIdx = (i + seed.length) % PHOTOS.length;
    return {
      rank,
      username: HOF_NAMES[nameIdx],
      photo: PHOTOS[photoIdx],
      points: getHofPoints(rank, year),
      isLive: i % 5 === 0,
      isMobile: i % 7 === 1,
      flag: FLAGS[i % FLAGS.length],
      year,
    };
  });
}

function RankBadge({ rank }) {
  if (rank === 1) return (
    <div style={{ background:"linear-gradient(135deg,#f5a623,#f0c040)", padding:"5px 10px", fontSize:12, fontWeight:700, color:"#000", display:"flex", alignItems:"center", gap:5, borderRadius:"4px 4px 0 0" }}>
      1st Place - {getPoints(1).toLocaleString()}
    </div>
  );
  if (rank === 2) return (
    <div style={{ background:"linear-gradient(135deg,#b0bec5,#cfd8dc)", padding:"5px 10px", fontSize:12, fontWeight:700, color:"#000", display:"flex", alignItems:"center", gap:5, borderRadius:"4px 4px 0 0" }}>
      2nd Place - {getPoints(2).toLocaleString()}
    </div>
  );
  if (rank === 3) return (
    <div style={{ background:"linear-gradient(135deg,#bf7f50,#d4956a)", padding:"5px 10px", fontSize:12, fontWeight:700, color:"#fff", display:"flex", alignItems:"center", gap:5, borderRadius:"4px 4px 0 0" }}>
      3rd Place - {getPoints(3).toLocaleString()}
    </div>
  );
  return (
    <div style={{ background:"#f3f4f6", padding:"5px 10px", fontSize:11, fontWeight:600, color:"#555", display:"flex", alignItems:"center", gap:4, borderRadius:"4px 4px 0 0" }}>
      {ordinal(rank)} Place - {getPoints(rank).toLocaleString()}
    </div>
  );
}

function ModelCard({ model, onClick }) {
  return (
    <div onClick={() => onClick(model.username)} style={{ cursor:"pointer", borderRadius:4, overflow:"hidden", background:"#f3f4f6", border:"1px solid #e5e7eb" }}>
      <RankBadge rank={model.rank} />
      <div style={{ position:"relative", aspectRatio:"3/4", overflow:"hidden" }}>
        <img src={model.photo} alt={model.username} loading="lazy"
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:6, left:6, display:"flex", gap:4 }}>
          {model.isLive && <span style={{ background:"#e53935", color:"#fff", fontSize:9, fontWeight:800, padding:"2px 5px", borderRadius:3 }}>LIVE</span>}
          {model.isMobile && (
            <span style={{ background:"rgba(0,0,0,0.6)", borderRadius:4, width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            </span>
          )}
        </div>
        <div style={{ position:"absolute", bottom:24, right:6, fontSize:14 }}>{model.flag}</div>
        <div style={{ position:"absolute", bottom:6, left:6, right:6, fontSize:11, fontWeight:600, color:"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
          {model.username}
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{ borderRadius:4, overflow:"hidden", background:"#f3f4f6", border:"1px solid #e5e7eb" }}>
      <div style={{ background:"#e5e7eb", padding:"5px 10px", height:28 }} />
      <div style={{ aspectRatio:"3/4", background:"linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.2s infinite" }} />
    </div>
  );
}

function HofRankBadge({ rank, points }) {
  const label = ordinal(rank) + " Place";
  const pts = points.toLocaleString();
  const star = (color) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={color}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>
  );
  if (rank === 1) return (
    <div style={{ background:"linear-gradient(90deg,#c8960c,#f5d060)", padding:"6px 10px", fontSize:12, fontWeight:700, color:"#1a0a00", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span>{label}</span><span style={{ display:"flex", alignItems:"center", gap:4 }}>{star("#1a0a00")}{pts}</span>
    </div>
  );
  if (rank === 2) return (
    <div style={{ background:"linear-gradient(90deg,#8a9ba8,#c5d0da)", padding:"6px 10px", fontSize:12, fontWeight:700, color:"#111", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span>{label}</span><span style={{ display:"flex", alignItems:"center", gap:4 }}>{star("#111")}{pts}</span>
    </div>
  );
  if (rank === 3) return (
    <div style={{ background:"linear-gradient(90deg,#8b4e1e,#c47a3a)", padding:"6px 10px", fontSize:12, fontWeight:700, color:"#fff", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span>{label}</span><span style={{ display:"flex", alignItems:"center", gap:4 }}>{star("#fff")}{pts}</span>
    </div>
  );
  return (
    <div style={{ background:"#f3f4f6", padding:"5px 10px", fontSize:11, fontWeight:500, color:"#555", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #e5e7eb" }}>
      <span>{label}</span>
      <span style={{ display:"flex", alignItems:"center", gap:4 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#999"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
        {pts}
      </span>
    </div>
  );
}

function HofModelCard({ model, onClick }) {
  const [hovered, setHovered] = useState(false);
  const yearLabel = model.year === "Current year" ? new Date().getFullYear().toString() : model.year;
  const medal = model.rank === 1 ? "👑" : model.rank === 2 ? "🥈" : model.rank === 3 ? "🥉" : null;
  return (
    <div
      onClick={() => onClick(model.username)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor:"pointer", borderRadius:4, overflow:"hidden", background:"#fff", border:"1px solid #e5e7eb", transition:"transform 0.18s ease, box-shadow 0.18s ease", transform: hovered ? "translateY(-3px)" : "translateY(0)", boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.12)" : "none" }}
    >
      <HofRankBadge rank={model.rank} points={model.points} />
      <div style={{ position:"relative", aspectRatio:"3/4", overflow:"hidden" }}>
        <img src={model.photo} alt={model.username} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.3s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)", pointerEvents:"none" }} />
        {medal && <div style={{ position:"absolute", top:8, left:8, fontSize:22, filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}>{medal}</div>}
        <div style={{ position:"absolute", top:6, right:6, background:"rgba(229,57,53,0.92)", color:"#fff", fontSize:10, fontWeight:700, padding:"2px 6px", borderRadius:3 }}>{yearLabel}</div>
        <div style={{ position:"absolute", top:6, left: medal ? 38 : 6, display:"flex", gap:4 }}>
          {model.isLive && <span style={{ background:"#e53935", color:"#fff", fontSize:9, fontWeight:800, padding:"2px 5px", borderRadius:3 }}>LIVE</span>}
          {model.isMobile && (
            <span style={{ background:"rgba(0,0,0,0.6)", borderRadius:4, width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid rgba(255,255,255,0.15)" }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            </span>
          )}
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"8px 8px 6px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span style={{ fontSize:11, fontWeight:600, color:"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"80%" }}>{model.username}</span>
            <span style={{ fontSize:14, flexShrink:0 }}>{model.flag}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HofSkeletonCard() {
  return (
    <div style={{ borderRadius:4, overflow:"hidden", background:"#fff", border:"1px solid #e5e7eb" }}>
      <div style={{ background:"#f3f4f6", height:29 }} />
      <div style={{ aspectRatio:"3/4", background:"linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.2s infinite" }} />
    </div>
  );
}

function HallOfFame({ isMobile, router }) {
  const [activeYear, setActiveYear]         = useState("2025");
  const [activeCategory, setActiveCategory] = useState("Girls");
  const [visibleCount, setVisibleCount]     = useState(HOF_BATCH);
  const [isLoading, setIsLoading]           = useState(false);
  const sentinelRef = useRef(null);
  const loadingRef  = useRef(false);
  const allModels   = generateHofModels(activeYear, activeCategory);
  const cols        = isMobile ? 2 : 6;

  useEffect(() => { setVisibleCount(HOF_BATCH); }, [activeYear, activeCategory]);

  const loadMore = useCallback(() => {
    if (loadingRef.current || visibleCount >= HOF_TOTAL) return;
    loadingRef.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(v => Math.min(v + HOF_BATCH, HOF_TOTAL));
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
    <div style={{ background:"#f7f7f9", minHeight:"60vh" }}>
      <div style={{ background:"linear-gradient(135deg,#fff0f0 0%,#ffe4e4 40%,#fff0f0 100%)", padding: isMobile ? "28px 16px 20px" : "36px 28px 24px", position:"relative", overflow:"hidden", borderBottom:"1px solid #f0d0d0" }}>
        <div style={{ position:"absolute", right: isMobile ? -20 : 40, top:"50%", transform:"translateY(-50%)", fontSize: isMobile ? 100 : 200, opacity:0.08, pointerEvents:"none", userSelect:"none", lineHeight:1 }}>🏆</div>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
          <span style={{ fontSize: isMobile ? 24 : 32 }}>🏆</span>
          <h1 style={{ fontSize: isMobile ? 22 : 32, fontWeight:800, margin:0, letterSpacing:"-0.02em", color:"#222" }}>Hall of Fame</h1>
        </div>
        <p style={{ fontSize: isMobile ? 12 : 14, color:"#888", margin:0 }}>Discover the best-performing models over the years.</p>
        <div style={{ height:1, background:"linear-gradient(90deg,#f0c0c0,transparent)", margin:"20px 0 16px" }} />
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", overflowX:"auto", scrollbarWidth:"none", flexWrap: isMobile ? "wrap" : "nowrap", gap:2 }}>
            {HOF_YEARS.map(year => {
              const isActive = activeYear === year;
              const isCurrent = year === "Current year";
              return (
                <button key={year} onClick={() => setActiveYear(year)} style={{ background: isActive ? (isCurrent ? "#c8960c" : "#e5e7eb") : "none", border:"none", borderRadius: isActive ? 20 : 0, color: isActive ? (isCurrent ? "#fff" : "#222") : (isCurrent ? "#c8a020" : "#888"), fontSize: isMobile ? 12 : 13, fontWeight: isActive ? 700 : 500, padding:"5px 14px", cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit", transition:"all 0.15s" }}>{year}</button>
              );
            })}
          </div>
          <div style={{ position:"relative" }}>
            <select value={activeCategory} onChange={e => setActiveCategory(e.target.value)} style={{ background:"#fff", border:"1px solid #e5e7eb", color:"#222", padding:"7px 32px 7px 12px", borderRadius:6, fontSize:13, fontFamily:"inherit", cursor:"pointer", appearance:"none", outline:"none" }}>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#888", fontSize:10 }}>▼</span>
          </div>
        </div>
      </div>
      <div style={{ padding: isMobile ? "12px 8px 60px" : "16px 16px 60px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(" + cols + ", 1fr)", gap: isMobile ? 6 : 8 }}>
          {visible.map(model => (
            <HofModelCard key={activeYear + "-" + activeCategory + "-" + model.rank} model={model} onClick={name => router.push("/watch/" + name)} />
          ))}
          {isLoading && Array.from({ length: cols }).map((_, i) => <HofSkeletonCard key={"hsk-" + i} />)}
        </div>
        {visibleCount < HOF_TOTAL && <div ref={sentinelRef} style={{ height:1, marginTop:8 }} aria-hidden="true" />}
        {visibleCount >= HOF_TOTAL && (
          <div style={{ textAlign:"center", marginTop:40, color:"#bbb", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <span style={{ display:"block", width:60, height:1, background:"#e5e7eb" }} />
            End of Hall of Fame - 100th place reached
            <span style={{ display:"block", width:60, height:1, background:"#e5e7eb" }} />
          </div>
        )}
      </div>
    </div>
  );
}

const PRIZE_TABLE = {
  Girls: [
    { range:"1st place", amount:"$ 1000", gold:true },
    { range:"2nd place", amount:"$ 500", silver:true },
    { range:"3rd place", amount:"$ 250", bronze:true },
    { range:"4-10 place", amount:"$ 100" },
    { range:"11-20 place", amount:"$ 75" },
    { range:"21-40 place", amount:"$ 50" },
    { range:"41-60 place", amount:"$ 40" },
    { range:"61-80 place", amount:"$ 30" },
    { range:"81-100 place", amount:"$ 20" },
  ],
  Couples: [
    { range:"1st place", amount:"$ 1000", gold:true },
    { range:"2nd place", amount:"$ 500", silver:true },
    { range:"3rd place", amount:"$ 250", bronze:true },
    { range:"4-10 place", amount:"$ 100" },
    { range:"11-20 place", amount:"$ 75" },
  ],
  Guys: [
    { range:"1st place", amount:"$ 1000", gold:true },
    { range:"2nd place", amount:"$ 500", silver:true },
    { range:"3rd place", amount:"$ 250", bronze:true },
    { range:"4-10 place", amount:"$ 100" },
    { range:"11-20 place", amount:"$ 75" },
    { range:"21-40 place", amount:"$ 50" },
    { range:"41-60 place", amount:"$ 40" },
    { range:"61-80 place", amount:"$ 30" },
    { range:"81-100 place", amount:"$ 20" },
  ],
  Trans: [
    { range:"1st place", amount:"$ 1000", gold:true },
    { range:"2nd place", amount:"$ 500", silver:true },
    { range:"3rd place", amount:"$ 250", bronze:true },
    { range:"4-10 place", amount:"$ 100" },
    { range:"11-20 place", amount:"$ 75" },
    { range:"21-40 place", amount:"$ 50" },
    { range:"41-60 place", amount:"$ 40" },
    { range:"61-80 place", amount:"$ 30" },
    { range:"81-100 place", amount:"$ 20" },
  ],
};

const RULES = [
  { text:"Every 3 hours, we give away StripPoints to the top 5,000 performers in each category: Girls & Couples, Guys, and Trans. Ranking is based on token earnings and the number of unique paying viewers.", highlight:"Earn 2x StripPoints for broadcasting during Boost Time: 1:00 AM Sunday - 1:00 AM Monday." },
  { text:"The top 5 models of every 3 hours in each category (Girls & Couples, Guys, and Trans) receive cash rewards of", highlight:"$20, $10, $5, $5, and $5." },
  { text:"Based on the total number of StripPoints, performers can earn a place in the Current Month Top. Top spots are awarded regionally, ensuring the hottest talent from every corner shines!" },
  { text:"Once the month ends, we award cash prizes. Prizes go to the top 500 models in the Girls category (100 winners per continent), the top 100 in Guys and Trans, and the top 20 in Couples." },
];

function ContestRules({ isMobile }) {
  const [activeCategory, setActiveCategory] = useState("Girls");
  const prizes = PRIZE_TABLE[activeCategory] || PRIZE_TABLE.Girls;
  const CrownIcon = ({ color }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={color} style={{ flexShrink:0, marginRight:6 }}>
      <path d="M5 16L3 5l5.5 5L12 2l3.5 8L21 5l-2 11H5zm0 2h14v2H5v-2z"/>
    </svg>
  );
  return (
    <div style={{ background:"#fff", minHeight:"60vh", color:"#222" }}>
      <div style={{ background:"linear-gradient(180deg,#fff0f0 0%,#ffe4e4 100%)", padding: isMobile ? "28px 20px" : "36px 80px", display:"flex", alignItems:"center", gap: isMobile ? 20 : 60, position:"relative", overflow:"hidden", minHeight: isMobile ? 120 : 140 }}>
        <div style={{ fontSize: isMobile ? 40 : 68, fontWeight:900, color:"#e07010", letterSpacing:"-1px", lineHeight:1, whiteSpace:"nowrap" }}>$ 76 000+</div>
        <div>
          <div style={{ fontSize: isMobile ? 18 : 26, fontWeight:700, color:"#e07010", lineHeight:1.2 }}>Given away monthly!</div>
          <div style={{ fontSize: isMobile ? 14 : 18, color:"#555", marginTop:4, fontWeight:400 }}>Any model can win.</div>
        </div>
      </div>
      <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", background:"#fff" }}>
        <div style={{ flex: isMobile ? "none" : "0 0 55%", padding: isMobile ? "32px 20px" : "48px 80px 60px 80px" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
            {RULES.map((rule, i) => (
              <div key={i} style={{ display:"flex", gap:18, alignItems:"flex-start" }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:"#f3f4f6", border:"1px solid #e5e7eb", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:600, color:"#555", flexShrink:0, marginTop:1 }}>{i + 1}</div>
                <div style={{ paddingTop:4 }}>
                  <p style={{ margin:0, fontSize:14, color:"#555", lineHeight:1.7 }}>{rule.text}</p>
                  {rule.highlight && <p style={{ margin:"6px 0 0", fontSize:14, color:"#e07010", lineHeight:1.6 }}>{rule.highlight}</p>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:44 }}>
            <button style={{ background:"#f3f4f6", border:"1px solid #e5e7eb", color:"#555", padding:"12px 28px", borderRadius:20, fontSize:14, cursor:"pointer", fontFamily:"inherit", fontWeight:400 }}>Read full rules</button>
          </div>
        </div>
        <div style={{ flex: isMobile ? "none" : "0 0 45%", padding: isMobile ? "0 20px 40px" : "48px 60px 60px 0" }}>
          <p style={{ margin:"0 0 16px", fontSize:13, color:"#888", textAlign:"right" }}>Top performers each month get:</p>
          <div style={{ display:"flex", borderBottom:"1px solid #e5e7eb", marginBottom:0 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ background:"none", border:"none", cursor:"pointer", color: activeCategory === cat ? "#222" : "#888", fontSize:14, fontWeight:400, padding:"8px 18px 10px", borderBottom: activeCategory === cat ? "2px solid #e53935" : "2px solid transparent", fontFamily:"inherit", marginBottom:-1 }}>{cat}</button>
            ))}
          </div>
          <div>
            {prizes.map((row, i) => {
              const isTop3 = row.gold || row.silver || row.bronze;
              const iconClr = row.gold ? "#d4a017" : row.silver ? "#b0b0b0" : "#b87333";
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 4px", borderBottom:"1px solid #f3f4f6", borderLeft: isTop3 ? "3px solid #e53935" : "3px solid transparent", paddingLeft: isTop3 ? 12 : 4, background: isTop3 ? "#fff5f5" : "transparent" }}>
                  <div style={{ display:"flex", alignItems:"center" }}>
                    {isTop3 && <CrownIcon color={iconClr} />}
                    <span style={{ fontSize:14, color: isTop3 ? "#222" : "#888", fontWeight:400 }}>{row.range}</span>
                  </div>
                  <span style={{ fontSize:14, color: isTop3 ? "#222" : "#888", fontWeight:400 }}>{row.amount}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const L24_CATEGORIES = ["Girls & Couples", "Guys", "Trans"];

const SLOTS = [
  { time:"1:00 AM",  day:"Monday"   },
  { time:"10:00 PM", day:"Sunday"   },
  { time:"7:00 PM",  day:"Sunday"   },
  { time:"4:00 PM",  day:"Sunday"   },
  { time:"1:00 PM",  day:"Sunday"   },
  { time:"10:00 AM", day:"Sunday"   },
  { time:"7:00 AM",  day:"Sunday"   },
  { time:"4:00 AM",  day:"Sunday"   },
];

const IS_BOOST_DAY = { Monday:true, Sunday:true, Saturday:false, Friday:false };

const PLACE_LABELS = ["1st Place","2nd Place","3rd Place","4th Place","5th Place"];
const PLACE_CASH   = ["$20","$10","$5","$5","$5"];

const PLACE_HEADER_BG = [
  "linear-gradient(90deg,#c8960c,#e0b030)",
  "#4a5a6a",
  "linear-gradient(90deg,#c85c30,#e07040)",
  "#e5e7eb",
  "#e5e7eb",
];
const PLACE_HEADER_FG = ["#1a0a00","#fff","#fff","#555","#555"];

function slotPoints(day, place) {
  const boost  = [2000,1800,1600,1500,1400];
  const normal = [1000, 900, 800, 750, 700];
  return IS_BOOST_DAY[day] ? boost[place] : normal[place];
}

const L24_NAMES = [
  "Wonderful_Woman","undo-busoku69","Michelle_Wilsson","Gokujyo-Namanaka","Taylorlove303",
  "Evil_Giirls","TNT-Sister","stripmens_ultimate","altxnani","Cute_Mango",
  "-minami-","cdyyds-01","Miu1_girl","llovers4u2","_Nono",
  "Luckygirls-339","Mr_Genghis_Khan","JasmineXo","KiraKayleigh1","irohani_usagi",
  "SophieBaley","vv-77","Supergurl88","si-ren","Naachan_",
  "Rina_Babe","POCARI_SWEAT","Hot-dance520","Daidai-77","siorin_18",
  "neruneruru","GoddessDove","niko-jpn","AuroraBliss","KiraStorm",
  "LunaRaven","NatashaFire","CherryBlossom","VioletDream","MeiLing",
  "ScarletVR","IvyRose","ZoeHot","SofiaFire","AlexDream",
  "RosePetal","DaisyChain","SunnyDay","MoonLight","StarGazer",
  "Yiyi-707","The_Snowwhitee","Red-666","Cute_Mango2","G-Velvet",
  "Nebula-qiu","Horny_mommy","stripmens_ultimate2","Rina_Babe2","nidekikibabe-2026",
  "Mr_Genghis_Khan2","Suzu_ch_xx","karollovea","Nebula-qiu2","Invitation2seduction",
];

const L24_PHOTOS = [
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
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1507081323647-4d250478b919?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop",
];

function SPCoin({ size=13, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink:0 }}>
      <circle cx="10" cy="10" r="9" fill={color} opacity="0.25"/>
      <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5"/>
      <text x="10" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill={color}>S</text>
    </svg>
  );
}

function Last24hWinners({ isMobile, router }) {
  const [activeCategory, setActiveCategory] = useState("Girls & Couples");

  const slots = SLOTS.map((slot, si) => ({
    ...slot,
    boost: IS_BOOST_DAY[slot.day],
    models: Array.from({ length: 5 }, (_, place) => {
      const idx = (si * 5 + place + activeCategory.length * 2) % L24_NAMES.length;
      return {
        username: L24_NAMES[idx],
        photo:    L24_PHOTOS[idx % L24_PHOTOS.length],
        flag:     FLAGS[idx % FLAGS.length],
        isLive:   (si + place) % 7 === 0,
        isMobile: (si + place) % 11 === 0,
        isNew:    (si + place) % 13 === 0,
        isVR:     (si + place) % 17 === 0,
        hasMedal: (si + place) % 9 === 0,
      };
    }),
  }));

  const cols     = isMobile ? 2 : 5;
  const gridCols = isMobile ? "80px repeat(2,1fr)" : "160px repeat(5,1fr)";
  const cardHeight = isMobile ? 120 : 180;

  let lastRenderedDay = null;

  return (
    <div style={{ background:"#f7f7f9", minHeight:"60vh", color:"#222" }}>
      <div style={{
        background:"linear-gradient(135deg,#fff0f5 0%,#ffe4ee 60%,#fff0f5 100%)",
        padding: isMobile ? "28px 20px 0" : "44px 40px 0",
        position:"relative", overflow:"hidden",
        borderBottom:"1px solid #f0d0dc",
      }}>
        <div style={{
          position:"absolute", right: isMobile ? -10 : 0, top:0, bottom:0,
          display:"flex", alignItems:"center", gap: isMobile ? 4 : 16,
          opacity:0.08, pointerEvents:"none", userSelect:"none",
          paddingRight: isMobile ? 0 : 32,
        }}>
          {["♀","⚤","⚧"].map((s, i) => (
            <span key={i} style={{ fontSize: isMobile ? 72 : 150, color:"#e53935", lineHeight:1, opacity: [0.7, 1, 0.85][i] }}>{s}</span>
          ))}
        </div>
        <h1 style={{ fontSize: isMobile ? 18 : 24, fontWeight:700, margin:"0 0 10px", position:"relative", letterSpacing:"-0.01em", color:"#222" }}>
          Last 24h Winners: {activeCategory}
        </h1>
        <p style={{ fontSize: isMobile ? 12 : 13, color:"#888", margin:"0 0 30px", lineHeight:1.7, maxWidth:520, position:"relative" }}>
          Every 3 hours, we give away StripPoints to the top 5,000 performers in each category. Along with StripPoints, the top 5 winners also receive cash prizes. Ranking is based on token earnings and the number of unique paying users.
        </p>
        <div style={{ display:"flex", gap:0, position:"relative" }}>
          {L24_CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              background:"none", border:"none", cursor:"pointer",
              color: activeCategory === cat ? "#222" : "#888",
              fontSize: isMobile ? 13 : 14, fontWeight: activeCategory === cat ? 700 : 400,
              padding: isMobile ? "10px 16px 12px" : "12px 24px 14px",
              borderBottom: activeCategory === cat ? "2px solid #e53935" : "2px solid transparent",
              fontFamily:"inherit", transition:"color 0.15s", marginBottom:-1,
            }}>{cat}</button>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", padding: isMobile ? "12px 8px 40px" : "16px 16px 40px", background:"#f7f7f9", gap:0 }}>
        {slots.map((slot, si) => {
          const showDayHeader = slot.day !== lastRenderedDay;
          if (showDayHeader) lastRenderedDay = slot.day;
          return (
            <div key={si} style={{ marginBottom:12 }}>
              {showDayHeader && (
                <div style={{ display:"grid", gridTemplateColumns: gridCols, gap:4, marginBottom:4 }}>
                  <div style={{ background:"#e5e7eb", borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", padding:"10px 8px" }}>
                    <span style={{ fontSize:13, fontWeight:600, color:"#555" }}>{slot.day}</span>
                  </div>
                  {Array.from({ length: cols }, (_, place) => (
                    <div key={place} style={{ background: PLACE_HEADER_BG[place], borderRadius:4, display:"flex", alignItems:"center", padding: isMobile ? "7px 6px" : "9px 10px", gap:5 }}>
                      <span style={{ fontSize: isMobile ? 9 : 12, fontWeight:700, color: PLACE_HEADER_FG[place], whiteSpace:"nowrap" }}>
                        {PLACE_LABELS[place]}: {PLACE_CASH[place]},
                      </span>
                      <SPCoin size={12} color={PLACE_HEADER_FG[place]} />
                      <span style={{ fontSize: isMobile ? 9 : 12, fontWeight:700, color: PLACE_HEADER_FG[place] }}>
                        {slotPoints(slot.day, place).toLocaleString()}
                      </span>
                      {slot.boost && place === 0 && (
                        <span style={{ background:"#e53935", color:"#fff", fontSize:10, fontWeight:800, padding:"1px 6px", borderRadius:3, marginLeft:"auto", flexShrink:0 }}>2x</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display:"grid", gridTemplateColumns: gridCols, gap:4 }}>
                <div style={{ background: slot.boost ? "#ffe4e4" : "#f3f4f6", borderRadius:4, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"14px 8px", height: cardHeight, gap:8, border: slot.boost ? "1px solid #fca5a5" : "1px solid #e5e7eb" }}>
                  <span style={{ fontSize: isMobile ? 15 : 20, fontWeight:800, color:"#222", textAlign:"center", lineHeight:1.1 }}>{slot.time}</span>
                  {slot.boost && (
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                      <div style={{ width:24, height:1, background:"rgba(0,0,0,0.1)" }} />
                      <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#e53935"><path d="M12 2C9 5 7 9 7 13H5l-2 3h4v4h6v-4h4l-2-3h-2c0-4-2-8-5-11z"/></svg>
                        <span style={{ fontSize:8, fontWeight:700, color:"#e53935", letterSpacing:"0.07em", whiteSpace:"nowrap" }}>2X BOOST</span>
                      </div>
                    </div>
                  )}
                </div>
                {Array.from({ length: cols }, (_, place) => {
                  const model = slot.models[place];
                  if (!model) return <div key={place} style={{ background:"#f3f4f6", borderRadius:4, height: cardHeight }} />;
                  return (
                    <div key={place} onClick={() => router.push("/watch/" + model.username)} style={{ position:"relative", overflow:"hidden", cursor:"pointer", background:"#f3f4f6", height: cardHeight, borderRadius:4 }}>
                      <img src={model.photo} alt={model.username} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", position:"absolute", inset:0 }} />
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)", pointerEvents:"none" }} />
                      <div style={{ position:"absolute", top:5, left:5, display:"flex", gap:3, alignItems:"center" }}>
                        {model.isLive && <span style={{ background:"#e53935", color:"#fff", fontSize:9, fontWeight:800, padding:"2px 5px", borderRadius:3 }}>LIVE</span>}
                        {model.isVR && <span style={{ background:"#7c3aed", color:"#fff", fontSize:9, fontWeight:800, padding:"2px 5px", borderRadius:3 }}>VR</span>}
                        {model.isMobile && (
                          <span style={{ background:"rgba(0,0,0,0.55)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:3, width:16, height:16, display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5"><rect x="5" y="2" width="14" height="20" rx="2"/></svg>
                          </span>
                        )}
                      </div>
                      {model.hasMedal && (
                        <div style={{ position:"absolute", top:5, right:5, width:20, height:20, borderRadius:"50%", background:"#c8960c", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M5 16L3 5l5.5 5L12 2l3.5 8L21 5l-2 11H5zm0 2h14v2H5v-2z"/></svg>
                        </div>
                      )}
                      {model.isNew && !model.hasMedal && (
                        <span style={{ position:"absolute", top:5, right:5, background:"#f5a623", color:"#000", fontSize:9, fontWeight:800, padding:"2px 6px", borderRadius:3 }}>NEW</span>
                      )}
                      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"5px 7px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <span style={{ fontSize:10, fontWeight:600, color:"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"80%" }}>{model.username}</span>
                        <span style={{ fontSize:13, flexShrink:0 }}>{model.flag}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const LMW_TOTAL = 900;
const LMW_BATCH = 60;
const LMW_COLS  = 6;

const LMW_NAMES = [
  "xXXSexyamazon","Inaa-Love","katt008","Jacky_queen","Rose_berry","sugar-22",
  "fatisexy","AudreySpanksFuck-","Jumanaa","-The_Bee-","Ahlam7578","MissBinx",
  "Kinkyphatass","VICTORIA89","Dirty_Secrettt","BootyAndButterflies8","Hot_farass","Sophie_BbC_Squirt",
  "AuroraBliss","KiraStorm","LunaRaven","NatashaFire","CherryBlossom","VioletDream",
  "MeiLing","ScarletVR","IvyRose","ZoeHot","SofiaFire","AlexDream",
  "RosePetal","DaisyChain","SunnyDay","MoonLight","StarGazer","CocoLove",
  "JasmineFire","TigerLily","SilverFox","GoldenGirl","MiraHabibtek","rima__sexy",
  "Queen_sousou","Dirty_Secrettt2","Hot_farass2","ORLA86","missytrig","Daloaa_Mery",
  "ROYALASS25","NubianScarlett","AfroTideEmpress","DesiredQueen27","Sexmalendar","lady-zeei",
  "pay_tience","ButterButt101","Saggy_boobs","Lamya-dalo3a","KiraKayleigh1","GoddessDove",
];

const LMW_REGION_EMOJI = {
  "Africa":"🌍","North America":"🌎","South America":"🌎","Europe":"🌍","Asia & Pacific":"🌏",
};

function lmwGetPoints(rank) {
  if (rank === 1) return 6005;
  if (rank === 2) return 5920;
  if (rank === 3) return 4065;
  if (rank === 4) return 3745;
  if (rank === 5) return 3260;
  if (rank === 6) return 3171;
  const max = 3062, min = 40;
  const ratio = (rank - 7) / (LMW_TOTAL - 7);
  return Math.max(min, Math.round(max * Math.pow(min / max, ratio)));
}

function LmwRankBadge({ rank, points }) {
  const bg =
    rank === 1 ? "linear-gradient(90deg,#c8960c,#e0b030)" :
    rank === 2 ? "#8a9ba8" :
    rank === 3 ? "linear-gradient(90deg,#c85c30,#e07040)" : "#f3f4f6";
  const fg = rank === 1 ? "#1a0a00" : rank === 3 ? "#fff" : rank <= 6 ? "#fff" : "#555";
  return (
    <div style={{ background: bg, padding:"7px 10px", fontSize:12, fontWeight:700, color:fg, display:"flex", alignItems:"center", gap:5, borderRadius:"4px 4px 0 0" }}>
      <span>{ordinal(rank)} Place</span>
      <span style={{ display:"flex", alignItems:"center", gap:3, marginLeft:"auto" }}>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flexShrink:0 }}>
          <circle cx="10" cy="10" r="9" fill={fg} opacity="0.25"/>
          <circle cx="10" cy="10" r="9" stroke={fg} strokeWidth="1.5"/>
          <text x="10" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fill={fg}>S</text>
        </svg>
        {points.toLocaleString()}
      </span>
    </div>
  );
}

function LmwModelCard({ model, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={() => onClick(model.username)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ cursor:"pointer", borderRadius:4, overflow:"hidden", background:"#fff", border:"1px solid #e5e7eb", transition:"transform 0.15s ease", transform: hovered ? "translateY(-2px)" : "none" }}>
      <LmwRankBadge rank={model.rank} points={model.points} />
      <div style={{ position:"relative", aspectRatio:"3/4", overflow:"hidden" }}>
        <img src={model.photo} alt={model.username} loading="lazy"
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.3s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:6, left:6, display:"flex", gap:3, flexWrap:"wrap" }}>
          {model.isLive && <span style={{ background:"#e53935", color:"#fff", fontSize:9, fontWeight:800, padding:"2px 5px", borderRadius:3 }}>LIVE</span>}
          {model.isMobile && (
            <span style={{ background:"rgba(0,0,0,0.6)", borderRadius:4, width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            </span>
          )}
        </div>
        {model.rank <= 3 && (
          <div style={{ position:"absolute", top:6, right:6, width:22, height:22, borderRadius:"50%", background: model.rank===1?"#c8960c":model.rank===2?"#8a9ba8":"#8b4e1e", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M5 16L3 5l5.5 5L12 2l3.5 8L21 5l-2 11H5zm0 2h14v2H5v-2z"/></svg>
          </div>
        )}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"6px 8px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:11, fontWeight:600, color:"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"80%" }}>{model.username}</span>
          <span style={{ fontSize:14, flexShrink:0 }}>{model.flag}</span>
        </div>
      </div>
    </div>
  );
}

function LmwSkeletonCard() {
  return (
    <div style={{ borderRadius:4, overflow:"hidden", background:"#fff", border:"1px solid #e5e7eb" }}>
      <div style={{ background:"#f3f4f6", padding:"7px 10px", height:30 }} />
      <div style={{ aspectRatio:"3/4", background:"linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.2s infinite" }} />
    </div>
  );
}

function generateLmwModels(region, category) {
  const isAfrican = region === "Africa";
  const pool = isAfrican ? AFRICAN_PHOTOS : PHOTOS;
  const seed = region + category;
  return Array.from({ length: LMW_TOTAL }, (_, i) => {
    const rank = i + 1;
    const nameIdx = (i + seed.length * 7) % LMW_NAMES.length;
    const photoIdx = (i + seed.length * 3) % pool.length;
    return {
      rank,
      username: LMW_NAMES[nameIdx] + (i >= LMW_NAMES.length ? "_" + Math.floor(i / LMW_NAMES.length) : ""),
      photo: pool[photoIdx],
      points: lmwGetPoints(rank),
      isLive: i % 5 === 0,
      inGroupShow: i % 9 === 1,
      isMobile: i % 7 === 0,
      flag: FLAGS[i % FLAGS.length],
    };
  });
}

function LastMonthWinners({ isMobile, router }) {
  const [activeCategory, setActiveCategory] = useState("Girls");
  const [activeRegion,   setActiveRegion]   = useState("Africa");
  const [visibleCount,   setVisibleCount]   = useState(LMW_BATCH);
  const [isLoading,      setIsLoading]      = useState(false);
  const sentinelRef = useRef(null);
  const loadingRef  = useRef(false);
  const allModels = generateLmwModels(activeRegion, activeCategory);
  const cols      = isMobile ? 2 : LMW_COLS;

  useEffect(() => { setVisibleCount(LMW_BATCH); }, [activeRegion, activeCategory]);

  const loadMore = useCallback(() => {
    if (loadingRef.current || visibleCount >= LMW_TOTAL) return;
    loadingRef.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(v => Math.min(v + LMW_BATCH, LMW_TOTAL));
      setIsLoading(false);
      loadingRef.current = false;
    }, 200);
  }, [visibleCount]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { rootMargin:"0px 0px 600px 0px", threshold:0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const visible = allModels.slice(0, visibleCount);
  const regionEmoji = (r) => LMW_REGION_EMOJI[r] || "🌍";

  return (
    <div style={{ background:"#f7f7f9", minHeight:"100vh", color:"#222" }}>
      <div style={{ position:"relative", overflow:"hidden", background:"linear-gradient(135deg,#fff8f0 0%,#fff0e0 50%,#fff8f0 100%)", padding: isMobile ? "24px 16px 16px" : "32px 24px 20px", minHeight: isMobile ? 100 : 130, borderBottom:"1px solid #f0e0d0" }}>
        <div style={{ position:"absolute", right: isMobile ? -20 : 40, top:0, bottom:0, width: isMobile ? 180 : 320, opacity:0.15, display:"flex", alignItems:"center", justifyContent:"center", fontSize: isMobile ? 120 : 220, pointerEvents:"none", userSelect:"none" }}>
          {regionEmoji(activeRegion)}
        </div>
        <h1 style={{ fontSize: isMobile ? 18 : 24, fontWeight:700, margin:"0 0 6px", position:"relative", color:"#222" }}>
          Top {activeCategory} of the Last Month in {activeRegion}
        </h1>
        <p style={{ fontSize: isMobile ? 11 : 13, color:"#888", margin:0, position:"relative" }}>
          Ranked by total StripPoints earned. Top spots are awarded regionally to highlight the hottest talent.
        </p>
        <div style={{ display:"flex", gap:0, marginTop:16, position:"relative" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ background:"none", border:"none", cursor:"pointer", color: activeCategory === cat ? "#222" : "#888", fontSize:14, fontWeight: activeCategory === cat ? 700 : 400, padding:"4px 0", marginRight:20, borderBottom: activeCategory === cat ? "2px solid #e53935" : "2px solid transparent", fontFamily:"inherit" }}>{cat}</button>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", gap:8, padding:"12px 16px", overflowX:"auto", scrollbarWidth:"none", background:"#fff", borderBottom:"1px solid #e5e7eb" }}>
        {REGIONS.map(region => (
          <button key={region} onClick={() => setActiveRegion(region)} style={{ background: activeRegion === region ? "#f3f4f6" : "#fff", border: activeRegion === region ? "1px solid #d1d5db" : "1px solid #e5e7eb", color: activeRegion === region ? "#222" : "#888", fontSize:12, fontWeight: activeRegion === region ? 600 : 400, padding:"7px 14px", borderRadius:6, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
            {regionEmoji(region)} {region}
          </button>
        ))}
      </div>
      <div style={{ padding: isMobile ? "12px 8px 40px" : "16px 16px 40px", background:"#f7f7f9" }}>
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols}, 1fr)`, gap: isMobile ? 6 : 8 }}>
          {visible.map(model => (
            <LmwModelCard key={activeRegion + "-" + activeCategory + "-" + model.rank} model={model} onClick={name => router.push("/watch/" + name)} />
          ))}
          {isLoading && Array.from({ length: cols }).map((_, i) => <LmwSkeletonCard key={"lmsk-" + i} />)}
        </div>
        {visibleCount < LMW_TOTAL && <div ref={sentinelRef} style={{ height:1, marginTop:8 }} aria-hidden="true" />}
        {visibleCount >= LMW_TOTAL && (
          <div style={{ textAlign:"center", marginTop:32, color:"#bbb", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <span style={{ display:"block", width:60, height:1, background:"#e5e7eb" }} />
            You have reached the end of the leaderboard (900th place)
            <span style={{ display:"block", width:60, height:1, background:"#e5e7eb" }} />
          </div>
        )}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <>
      <footer style={{ background:"#fff", borderTop:"1px solid #e5e7eb", padding:"40px 40px 24px", color:"#222" }}>
        <div style={{ display:"flex", gap:40, flexWrap:"wrap" }}>
          <div style={{ flex:"0 0 260px", minWidth:220 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ width:28, height:28, background:"#e53935", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span style={{ fontWeight:700, fontSize:16 }}><span style={{ color:"#222" }}>STRIP</span><span style={{ color:"#888", fontWeight:400 }}>CHATBATE</span></span>
            </div>
            <p style={{ fontSize:11, color:"#888", lineHeight:1.7, margin:"0 0 12px" }}>
              Stripchatbate is the world's premier 18+ LIVE adult entertainment destination for real connection and adult play.
            </p>
            <p style={{ fontSize:11, color:"#aaa", lineHeight:1.6, margin:"0 0 24px" }}>
              All models appearing on this site have contractually confirmed to us that they are 18 years of age or older.
            </p>
          </div>
          <div style={{ flex:1, display:"flex", gap:0, flexWrap:"wrap", justifyContent:"space-between", minWidth:0 }}>
            {[
              { title:"Stripchatbate", links:["About Stripchatbate","Blog","X","Reddit","Media Inquiries"] },
              { title:"Legal & Safety", links:["Privacy Policy","Terms of Use","DMCA Policy","Cookies Policy","Parental Control Guide","EU Research Program","Anti-Slavery Help"] },
              { title:"Work With Us", links:["Affiliate Program"] },
              { title:"Help & Support", links:["Support & FAQ","Billing Support","DMCA Protection"] },
            ].map(col => (
              <div key={col.title} style={{ minWidth:120, marginBottom:24 }}>
                <h4 style={{ fontSize:11, fontWeight:700, color:"#222", margin:"0 0 16px", letterSpacing:"0.08em", textTransform:"uppercase" }}>{col.title}</h4>
                {col.links.map(l => (
                  <div key={l} style={{ marginBottom:12 }}>
                    <a href="#" style={{ fontSize:13, color:"#888", textDecoration:"none" }}
                      onMouseEnter={e => e.currentTarget.style.color="#222"}
                      onMouseLeave={e => e.currentTarget.style.color="#888"}
                    >{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid #e5e7eb", marginTop:32, paddingTop:20, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:20 }}>
            {["RTA","SafeLabeling.org","ASACP"].map(l => (
              <span key={l} style={{ fontSize:10, color:"#aaa", fontWeight:700, letterSpacing:"0.05em" }}>{l}</span>
            ))}
          </div>
          <span style={{ fontSize:11, color:"#aaa" }}>18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement</span>
          <div style={{ width:32, height:32, borderRadius:"50%", border:"1px solid #e5e7eb", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:11, color:"#888", fontWeight:700 }}>18+</span>
          </div>
        </div>
      </footer>
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"#e53935", padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"center", gap:16, zIndex:999 }}>
        <span style={{ color:"#fff", fontSize:15, fontWeight:500 }}>Join Stripchatbate to interact with models!</span>
        <button style={{ background:"#fff", color:"#e53935", border:"none", padding:"8px 20px", borderRadius:20, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Join FREE</button>
      </div>
    </>
  );
}

function FlagImg({ code, size = 20 }) {
  if (!code || code === "africa") {
    return <span style={{ fontSize: size - 4, lineHeight: 1, flexShrink: 0 }}>🌍</span>;
  }
  return (
    <img
      src={`https://flagcdn.com/${size}x${Math.round(size * 0.75)}/${code}.png`}
      srcSet={`https://flagcdn.com/${size * 2}x${Math.round(size * 0.75 * 2)}/${code}.png 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt={code.toUpperCase()}
      style={{ borderRadius: 2, flexShrink: 0, objectFit: "cover", display: "inline-block", verticalAlign: "middle" }}
    />
  );
}

export default function TopModelsPage() {
  const router = useRouter();
  const [activeTab,      setActiveTab]      = useState("Current Month Top");
  const [activeCategory, setActiveCategory] = useState("Girls");
  const [activeRegion,   setActiveRegion]   = useState("Africa");
  const [isMobile,       setIsMobile]       = useState(false);
  const [visibleCount,   setVisibleCount]   = useState(BATCH);
  const [isLoading,      setIsLoading]      = useState(false);
  const sentinelRef = useRef(null);
  const loadingRef  = useRef(false);
  const allModels   = generateModels(activeRegion);
  const cols        = isMobile ? 2 : 6;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) })
      .then(r => r.json())
      .then(d => { const region = CONTINENT_REGION[d.continent_code] || "Africa"; setActiveRegion(region); })
      .catch(() => {});
  }, []);

  useEffect(() => { setVisibleCount(BATCH); }, [activeRegion, activeTab, activeCategory]);

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
      { rootMargin:"0px 0px 600px 0px", threshold:0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const visible = allModels.slice(0, visibleCount);
  const regionEmoji = (r) => r === "Asia & Pacific" ? "🌏" : r === "North America" || r === "South America" ? "🌎" : "🌍";

  const [showCategories, setShowCategories] = useState(false);

  const CONTINENT_SVG = {
    "Africa": (
      <svg viewBox="0 0 200 220" style={{ width:"100%", height:"100%", opacity:0.12 }} fill="#e53935">
        <path d="M80,10 C60,12 45,20 40,35 C35,50 38,60 30,75 C22,90 15,95 18,115 C21,135 35,145 40,165 C45,185 55,205 70,215 C85,225 100,215 112,200 C124,185 128,165 140,150 C152,135 165,130 168,115 C171,100 160,88 158,72 C156,56 162,42 155,30 C148,18 130,12 115,10 C100,8 90,8 80,10Z"/>
      </svg>
    ),
    "North America": (
      <svg viewBox="0 0 200 200" style={{ width:"100%", height:"100%", opacity:0.12 }} fill="#e53935">
        <path d="M30,20 C20,30 15,50 20,70 C25,90 40,95 45,115 C50,135 40,155 55,170 C70,185 90,180 105,165 C120,150 125,130 140,120 C155,110 170,115 175,100 C180,85 165,70 155,55 C145,40 145,20 130,12 C115,4 95,8 80,15 C65,22 50,18 40,20 C38,20 32,19 30,20Z"/>
      </svg>
    ),
    "South America": (
      <svg viewBox="0 0 160 220" style={{ width:"100%", height:"100%", opacity:0.12 }} fill="#e53935">
        <path d="M55,10 C40,15 30,30 28,50 C26,70 35,80 38,100 C41,120 30,135 35,155 C40,175 60,195 80,205 C100,215 118,200 125,180 C132,160 122,140 125,120 C128,100 142,88 138,68 C134,48 118,30 100,18 C82,6 68,6 55,10Z"/>
      </svg>
    ),
    "Europe": (
      <svg viewBox="0 0 180 160" style={{ width:"100%", height:"100%", opacity:0.12 }} fill="#e53935">
        <path d="M40,20 C28,28 22,42 25,58 C28,74 42,78 48,92 C54,106 48,122 60,132 C72,142 90,138 105,128 C120,118 126,102 140,94 C154,86 168,88 172,74 C176,60 164,46 152,36 C140,26 124,22 108,18 C92,14 76,16 62,20 C56,22 46,18 40,20Z"/>
      </svg>
    ),
    "Asia & Pacific": (
      <svg viewBox="0 0 240 180" style={{ width:"100%", height:"100%", opacity:0.12 }} fill="#e53935">
        <path d="M20,40 C10,55 12,75 25,88 C38,101 58,98 72,110 C86,122 88,142 105,150 C122,158 140,148 155,135 C170,122 172,102 185,90 C198,78 215,75 218,60 C221,45 208,32 194,24 C180,16 162,18 147,25 C132,32 120,42 104,44 C88,46 72,38 58,32 C44,26 30,28 20,40Z"/>
      </svg>
    ),
  };

  const CategoriesModal = () => {
    const SectionLabel = ({ children }) => (
      <div style={{
        fontSize:10, fontWeight:700, color:"#888",
        letterSpacing:"0.1em", textTransform:"uppercase",
        background:"#f3f4f6", padding:"5px 8px",
        borderRadius:3, marginBottom:10,
      }}>{children}</div>
    );

    const Item = ({ label, count, icon }) => (
      <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:6, cursor:"pointer", lineHeight:1.4 }}
        onMouseEnter={e => e.currentTarget.style.opacity="0.7"}
        onMouseLeave={e => e.currentTarget.style.opacity="1"}>
        {icon && <span style={{ fontSize:12, flexShrink:0, display:"flex", alignItems:"center" }}>{icon}</span>}
        <span style={{ fontSize:13, color:"#374151", fontWeight:400 }}>{label}</span>
        {count !== undefined && <span style={{ fontSize:12, color:"#9ca3af", marginLeft:1 }}>{count}</span>}
      </div>
    );

    const FlagItem = ({ code, label, count }) => (
      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6, cursor:"pointer", lineHeight:1.4 }}
        onMouseEnter={e => e.currentTarget.style.opacity="0.7"}
        onMouseLeave={e => e.currentTarget.style.opacity="1"}>
        <FlagImg code={code} size={20} />
        <span style={{ fontSize:13, color:"#374151", fontWeight:400 }}>{label}</span>
        {count !== undefined && <span style={{ fontSize:12, color:"#9ca3af", marginLeft:1 }}>{count}</span>}
      </div>
    );

    const IconHeart    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
    const IconThumb    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>;
    const IconClock    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>;
    const IconGallery  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>;
    const IconLock     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
    const IconMobile   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
    const IconZap      = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f0b429" strokeWidth="2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>;
    const IconVR       = () => <span style={{ background:"#1565C0", color:"#fff", fontSize:8, fontWeight:800, padding:"1px 4px", borderRadius:2 }}>VR</span>;
    const IconBDSM     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
    const IconTicket   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/><line x1="12" y1="7" x2="12" y2="17"/></svg>;
    const IconToy      = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e040fb" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>;
    const IconFoot     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e040fb" strokeWidth="2"><path d="M8.56 2.9A7 7 0 0 1 19 9v1l1.93 3.86A2 2 0 0 1 19.14 16H5a2 2 0 0 1-1.8-2.9L5 9V7a7 7 0 0 1 3.56-6.1z"/></svg>;
    const IconGlobe    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    const IconHeel     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M2 20h4l10-10-4-4L2 16v4z"/><path d="M18 2l4 4-2 2-4-4 2-2z"/></svg>;
    const IconEye      = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
    const IconGrid     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
    const IconController = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e040fb" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4"/><circle cx="16" cy="11" r="1"/><circle cx="19" cy="13" r="1"/></svg>;
    const IconRecordable = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="#9ca3af"/></svg>;

    return (
      <>
      <div
        style={{ position:"fixed", inset:0, zIndex:1200, background:"rgba(0,0,0,0.4)" }}
        onClick={() => setShowCategories(false)}
      />
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position:"fixed",
          top: 52,
          left: 0,
          bottom: 0,
          width: isMobile ? "100vw" : "min(1300px, 82vw)",
          zIndex: 1201,
          background:"#fff",
          color:"#374151",
          overflowY:"auto",
          fontFamily:"system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
          fontSize:13,
          scrollbarWidth:"thin",
          scrollbarColor:"#e5e7eb transparent",
          borderRight:"1px solid #e5e7eb",
          boxShadow:"4px 0 24px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ padding: isMobile ? "20px 16px" : "28px 32px", position:"relative" }}>
          <button onClick={() => setShowCategories(false)} style={{ position:"absolute", top:16, right:20, background:"none", border:"none", color:"#9ca3af", fontSize:20, cursor:"pointer", lineHeight:1, zIndex:10 }}>✕</button>

          <div style={{ marginBottom:32 }}>
            <h2 style={{ display:"flex", alignItems:"center", gap:10, fontSize:22, fontWeight:700, color:"#222", margin:"0 0 16px" }}>
              <IconGrid /> Categories
            </h2>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5,1fr)", gap:"0 24px" }}>
              <div>
                <SectionLabel>Main</SectionLabel>
                <Item icon={<IconHeart/>} label="My Favorites" />
                <Item icon={<IconThumb/>} label="Recommended" />
                <Item icon={<IconClock/>} label="Watch History" />
                <Item icon={<IconGallery/>} label="Gallery" />
                <Item icon={<IconLock/>} label="Best for Privates" />
              </div>
              <div>
                <SectionLabel>Specials</SectionLabel>
                <FlagItem code="ng" label="Nigerian" count={1} />
                <FlagItem code="ua" label="Ukrainian" count={78} />
                <Item icon={<IconZap/>} label="New Models" count={774} />
                <Item icon={<IconVR/>} label="VR Cams" count={177} />
                <Item icon={<IconBDSM/>} label="BDSM" count={42} />
                <Item icon={<IconTicket/>} label="Ticket & Group Shows" count={92} />
              </div>
              <div>
                <SectionLabel>Popular</SectionLabel>
                <Item icon={<IconToy/>} label="Interactive Toy" count={3117} />
                <Item icon={<IconMobile/>} label="Mobile" count={1128} />
                <Item label="Group Sex" count={76} />
                <Item label="Big Tits" count={2173} />
                <Item label="Hairy Pussy" count={819} />
                <Item label="Outdoor" count={735} />
                <Item label="Big Ass" count={3054} />
              </div>
              <div>
                <SectionLabel>&nbsp;</SectionLabel>
                <Item label="Anal" count={2111} icon={<IconFoot/>} />
                <Item label="Squirt" count={2416} />
                <Item label="Fuck Machine" count={503} icon={<IconFoot/>} />
                <Item label="Hardcore" count={187} />
                <Item label="Blowjob" count={3705} icon={<IconFoot/>} />
                <Item label="Pregnant" count={19} />
                <Item label="Small Tits" count={1578} />
              </div>
              <div>
                <SectionLabel>&nbsp;</SectionLabel>
                <Item label="Fisting" count={576} />
                <Item label="Masturbation" count={4153} />
                <Item label="Shaven" count={2687} />
                <Item label="Deepthroat" count={2969} icon={<IconFoot/>} />
                <Item label="Office" count={767} />
                <Item label="Foot Fetish" count={3273} icon={<IconFoot/>} />
              </div>
            </div>
          </div>

          <div style={{ height:1, background:"#f3f4f6", margin:"0 0 28px" }} />

          <div style={{ marginBottom:32 }}>
            <h2 style={{ display:"flex", alignItems:"center", gap:10, fontSize:22, fontWeight:700, color:"#222", margin:"0 0 16px" }}>
              <IconEye /> Appearance
            </h2>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5,1fr)", gap:"0 24px" }}>
              <div>
                <SectionLabel>Age</SectionLabel>
                <Item label="Teen 18+" count={919} />
                <Item label="Young 22+" count={2842} />
                <Item label="MILF" count={919} />
                <Item label="Mature" count={138} />
                <Item label="Granny" count={18} />
              </div>
              <div>
                <SectionLabel>Ethnicity</SectionLabel>
                <Item label="Arab" count={60} />
                <Item label="Asian" count={731} />
                <Item label="Ebony" count={450} />
                <Item label="Indian" count={247} />
                <Item label="Latina" count={1860} />
                <Item label="Mixed" count={181} />
                <Item label="White" count={1747} />
              </div>
              <div>
                <SectionLabel>Body Type</SectionLabel>
                <Item label="Skinny" count={1835} />
                <Item label="Athletic" count={449} />
                <Item label="Medium" count={1683} />
                <Item label="Curvy" count={1025} />
                <Item label="BBW" count={268} />
              </div>
              <div>
                <SectionLabel>Hair</SectionLabel>
                <Item label="Blonde" count={854} />
                <Item label="Black" count={1516} />
                <Item label="Brunette" count={1698} />
                <Item label="Redhead" count={401} />
                <Item label="Colorful" count={221} />
              </div>
              <div>
                <SectionLabel>Body Traits</SectionLabel>
                <Item label="Bald" count={5} />
                <Item label="Big Ass" count={3054} />
                <Item label="Big Clit" count={1028} />
                <Item label="Big Nipples" count={1442} />
                <Item label="Big Tits" count={2173} />
                <Item label="Hairy armpits" count={292} />
                <Item label="Hairy Pussy" count={819} />
                <Item label="Shaven" count={2687} />
                <Item label="Small Tits" count={1578} />
                <Item label="Trimmed" count={1104} />
              </div>
            </div>
          </div>

          <div style={{ height:1, background:"#f3f4f6", margin:"0 0 28px" }} />

          <div style={{ marginBottom:32 }}>
            <h2 style={{ display:"flex", alignItems:"center", gap:10, fontSize:22, fontWeight:700, color:"#222", margin:"0 0 16px" }}>
              <IconTicket /> Activities on Request
            </h2>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5,1fr)", gap:"0 24px" }}>
              <div>
                <SectionLabel>Private Show</SectionLabel>
                <Item label="8-12 tk" count={2066} />
                <Item label="16-24 tk" count={1493} />
                <Item label="32-60 tk" count={1287} />
                <Item label="90+ tk" count={308} />
                <Item label="Video Call (Cam2Cam)" count={4866} />
                <Item label="Recordable Privates" count={3550} />
                <Item label="Spy on Shows" count={260} />
              </div>
              <div>
                <SectionLabel>Activities</SectionLabel>
                <Item label="69 Position" count={812} />
                <Item label="Ahegao" count={2996} />
                <Item label="Anal" count={2111} icon={<IconFoot/>} />
                <Item label="Anal Toys" count={1738} />
                <Item label="Ass to Mouth" count={866} />
                <Item label="Blowjob" count={3705} icon={<IconFoot/>} />
                <Item label="Bukkake" count={136} />
                <Item label="Camel Toe" count={2627} />
                <Item label="Cock Rating" count={2190} />
                <Item label="Cosplay" count={836} icon={<IconFoot/>} />
                <Item label="Cowgirl" count={2842} />
                <Item label="Creampie" count={1205} />
                <Item label="Cumshot" count={835} />
                <Item label="Deepthroat" count={2969} icon={<IconFoot/>} />
                <Item label="Dildo or Vibrator" count={3761} />
              </div>
              <div>
                <SectionLabel>&nbsp;</SectionLabel>
                <Item label="Dirty Talk" count={3524} />
                <Item label="Doggy Style" count={4238} icon={<IconFoot/>} />
                <Item label="Double Penetration" count={1143} />
                <Item label="Erotic Dance" count={4000} />
                <Item label="Facesitting" count={1288} />
                <Item label="Facial" count={1236} />
                <Item label="Fingering" count={4177} icon={<IconFoot/>} />
                <Item label="Fisting" count={576} />
                <Item label="Flashing" count={2257} />
                <Item label="Footjob" count={1344} />
                <Item label="Foursome" count={19} />
                <Item label="Fuck Machine" count={503} icon={<IconFoot/>} />
                <Item label="Gagging" count={1357} />
                <Item label="Gangbang" count={29} />
                <Item label="Gape" count={523} />
              </div>
              <div>
                <SectionLabel>&nbsp;</SectionLabel>
                <Item label="Glory Hole" count={134} />
                <Item label="Handjob" count={2425} />
                <Item label="Hardcore" count={187} />
                <Item label="Humiliation" count={2137} />
                <Item label="Jerk-off Instruction" count={1946} />
                <Item label="Massage" count={1167} />
                <Item label="Masturbation" count={4153} />
                <Item label="Nipple Toys" count={1571} />
                <Item label="Oil Show" count={3600} />
                <Item label="Orgasm" count={3349} />
                <Item label="Pegging" count={241} />
                <Item label="Pussy Licking" count={445} />
                <Item label="Role Play" count={2405} />
                <Item label="Sex Toys" count={3507} />
                <Item label="Sexting" count={3524} />
              </div>
              <div>
                <SectionLabel>Device</SectionLabel>
                <Item label="Shower" count={1255} />
                <Item label="Spanking" count={3959} />
                <Item label="Squirt" count={2416} />
                <Item label="Strapon" count={390} />
                <Item label="Striptease" count={3752} />
                <Item label="Swing" count={146} />
                <Item label="Threesome" count={38} />
                <Item label="Tittyfuck" count={2908} />
                <Item label="Topless" count={3401} />
                <Item label="Twerk" count={3133} />
                <Item label="Upskirt" count={1867} />
                <Item label="Yoga" count={1058} />
                <Item label="Anal Toys" count={1738} />
                <Item label="Dildo or Vibrator" count={3761} />
                <Item label="Fuck Machine" count={503} icon={<IconFoot/>} />
                <Item icon={<IconToy/>} label="Interactive Toy" count={3117} />
                <Item label="Kiiroo" count={5} />
                <Item label="Lovense" count={3114} />
                <Item label="Nipple Toys" count={1571} />
                <Item label="Sex Toys" count={3507} />
                <Item label="Strapon" count={390} />
              </div>
            </div>
          </div>

          <div style={{ height:1, background:"#f3f4f6", margin:"0 0 28px" }} />

          <div style={{ marginBottom:32 }}>
            <h2 style={{ display:"flex", alignItems:"center", gap:10, fontSize:22, fontWeight:700, color:"#222", margin:"0 0 16px" }}>
              <IconGrid /> Specifics
            </h2>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5,1fr)", gap:"0 24px" }}>
              <div>
                <SectionLabel>Subcultures</SectionLabel>
                <Item label="Anime Girls" count={310} />
                <Item label="Club Girls" count={142} />
                <Item label="E-girl" count={153} />
                <Item label="Emo" count={176} />
                <Item label="Gamers" count={209} />
                <Item label="Glamour" count={592} />
                <Item label="Goth" count={283} />
                <Item label="Gym Babe" count={404} />
                <Item label="Housewives" count={575} />
                <Item label="K-pop" count={122} />
                <Item label="Nerds" count={127} />
                <Item label="Punks" count={59} />
                <Item label="Queers" count={48} />
                <Item label="Romantic" count={1049} />
                <Item label="Student" count={1613} />
                <Item label="Tomboys" count={95} />
              </div>
              <div>
                <SectionLabel>Broadcast</SectionLabel>
                <Item label="HD" count={4700} />
                <Item icon={<IconMobile/>} label="Mobile" count={1139} />
                <Item icon={<IconRecordable/>} label="Recordable" count={3774} />
                <Item icon={<IconVR/>} label="VR Cams" count={178} />
              </div>
              <div>
                <SectionLabel>Show Type</SectionLabel>
                <Item label="ASMR" count={113} />
                <Item label="Cooking" count={780} />
                <Item label="Flirting" count={18} icon={<IconFoot/>} />
                <Item label="Group Sex" count={76} />
                <Item label="Interracial" count={6} />
                <Item icon={<IconZap/>} label="New Models" count={775} />
                <Item label="Office" count={767} />
                <Item label="Old & Young 22+" count={18} />
                <Item label="Outdoor" count={741} />
                <Item label="POV" count={882} />
                <Item icon={<IconTicket/>} label="Ticket & Group Shows" count={94} />
                <Item icon={<IconController/>} label="Video Games" count={60} />
              </div>
              <div>
                <SectionLabel>Gender Identity</SectionLabel>
                <Item label="Non-binary" count={36} />
              </div>
              <div>
                <SectionLabel>Orientation</SectionLabel>
                <Item label="Lesbian" count={108} />
              </div>
            </div>
          </div>

          <div style={{ height:1, background:"#f3f4f6", margin:"0 0 28px" }} />

          <div style={{ marginBottom:32 }}>
            <h2 style={{ display:"flex", alignItems:"center", gap:10, fontSize:22, fontWeight:700, color:"#222", margin:"0 0 16px" }}>
              <IconGlobe /> Countries &amp; Languages
            </h2>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5,1fr)", gap:"0 24px" }}>
              <div>
                <SectionLabel>North America</SectionLabel>
                <FlagItem code="us" label="American"   count={145} />
                <FlagItem code="ca" label="Canadian"   count={16}  />
                <FlagItem code="mx" label="Mexican"    count={23}  />
                <div style={{ height:16 }} />
                <SectionLabel>South America</SectionLabel>
                <FlagItem code="ar" label="Argentinian" count={27}   />
                <FlagItem code="br" label="Brazilian"   count={50}   />
                <FlagItem code="cl" label="Chilean"     count={6}    />
                <FlagItem code="co" label="Colombian"   count={1832} />
                <FlagItem code="ec" label="Ecuadorian"  count={8}    />
                <FlagItem code="pe" label="Peruvian"    count={12}   />
                <FlagItem code="uy" label="Uruguayan"   count={1}    />
                <FlagItem code="ve" label="Venezuelan"  count={140}  />
              </div>
              <div>
                <SectionLabel>Europe</SectionLabel>
                <FlagItem code="at" label="Austrian"   count={1}   />
                <FlagItem code="be" label="Belgian"    count={1}   />
                <FlagItem code="bg" label="Bulgarian"  count={1}   />
                <FlagItem code="cz" label="Czech"      count={1}   />
                <FlagItem code="nl" label="Dutch"      count={1}   />
                <FlagItem code="ee" label="Estonian"   count={1}   />
                <FlagItem code="fr" label="French"     count={11}  />
                <FlagItem code="de" label="German"     count={13}  />
                <FlagItem code="hu" label="Hungarian"  count={2}   />
                <FlagItem code="ie" label="Irish"      count={1}   />
                <FlagItem code="it" label="Italian"    count={9}   />
              </div>
              <div>
                <SectionLabel>&nbsp;</SectionLabel>
                <FlagItem code="lv" label="Latvian"    count={1}   />
                <FlagItem code="no" label="Nordic"     count={2}   />
                <FlagItem code="pl" label="Polish"     count={2}   />
                <FlagItem code="pt" label="Portuguese" count={1}   />
                <FlagItem code="ro" label="Romanian"   count={112} />
                <FlagItem code="es" label="Spanish"    count={6}   />
                <FlagItem code="se" label="Swedish"    count={2}   />
                <FlagItem code="ch" label="Swiss"      count={1}   />
                <FlagItem code="gb" label="UK Models"  count={15}  />
                <FlagItem code="ua" label="Ukrainian"  count={77}  />
              </div>
              <div>
                <SectionLabel>Asia &amp; Pacific</SectionLabel>
                <FlagItem code="au" label="Australian" count={7}   />
                <FlagItem code="cn" label="Chinese"    count={159} />
                <FlagItem code="ph" label="Filipino"   count={43}  />
                <FlagItem code="in" label="Indian"     count={254} />
                <FlagItem code="jp" label="Japanese"   count={38}  />
                <FlagItem code="kr" label="Korean"     count={1}   />
                <FlagItem code="my" label="Malaysian"  count={1}   />
                <FlagItem code="lk" label="Sri Lankan" count={21}  />
                <FlagItem code="th" label="Thai"       count={7}   />
                <FlagItem code="vn" label="Vietnamese" count={200} />
                <div style={{ height:16 }} />
                <SectionLabel>Africa</SectionLabel>
                <FlagItem code="africa" label="African"       count={216} />
                <FlagItem code="ke"     label="Kenyan"        count={55}  />
                <FlagItem code="mg"     label="Malagasy"      count={1}   />
                <FlagItem code="ng"     label="Nigerian"      count={1}   />
                <FlagItem code="za"     label="South African" count={113} />
                <FlagItem code="ug"     label="Ugandan"       count={1}   />
                <FlagItem code="zw"     label="Zimbabwean"    count={24}  />
                <div style={{ height:16 }} />
                <SectionLabel>Middle East</SectionLabel>
                <FlagItem code="ae" label="Arab"    count={60} />
                <FlagItem code="tr" label="Turkish" count={4}  />
              </div>
              <div>
                <SectionLabel>Languages</SectionLabel>
                <FlagItem code="br" label="Portuguese Speaking" count={50}   />
                <FlagItem code="ru" label="Russian Speaking"    count={422}  />
                <FlagItem code="es" label="Spanish Speaking"    count={2060} />
              </div>
            </div>
          </div>

          <div style={{ height:1, background:"#f3f4f6", margin:"0 0 28px" }} />

          <div style={{ marginBottom:16 }}>
            <h2 style={{ display:"flex", alignItems:"center", gap:10, fontSize:22, fontWeight:700, color:"#222", margin:"0 0 16px" }}>
              <IconHeel /> Fetishes &amp; Kinks
            </h2>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap:"0 24px" }}>
              <div>
                <Item icon={<IconBDSM/>} label="BDSM" count={42} />
                <Item label="Cock Rating" count={2207} />
                <Item label="Corset" count={651} />
                <Item label="Cuckold" count={658} />
                <Item label="Foot Fetish" count={3302} icon={<IconFoot/>} />
                <Item label="Heels" count={2818} />
              </div>
              <div>
                <Item label="Jeans" count={275} />
                <Item label="Latex" count={682} />
                <Item label="Leather" count={831} />
                <Item label="Mistress" count={1063} />
                <Item label="Nylon" count={1333} />
                <Item label="Piercing" count={498} />
              </div>
              <div>
                <Item label="Pregnant" count={20} />
                <Item label="Smoking" count={1667} />
                <Item label="Sport Gear" count={301} />
                <Item label="Tattoos" count={732} />
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  };

  return (
    <div style={{ background:"#f7f7f9", minHeight:"100vh", color:"#222", paddingBottom:60 }}>
      <style>{`@keyframes shimmer { 0% { background-position:200% 0; } 100% { background-position:-200% 0; } }`}</style>

      {showCategories && <CategoriesModal />}

      {/* Sticky tab nav */}
      <div style={{ background:"#fff", borderBottom:"1px solid #e5e7eb", position:"sticky", top:0, zIndex:100, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", overflowX:"auto", scrollbarWidth:"none", padding:"0 16px" }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background:"none", border:"none", cursor:"pointer", color: activeTab === tab ? "#222" : "#888", fontSize:13, fontWeight: activeTab === tab ? 700 : 400, padding:"12px 16px", whiteSpace:"nowrap", borderBottom: activeTab === tab ? "2px solid #e53935" : "2px solid transparent", fontFamily:"inherit" }}>{tab}</button>
          ))}
          <button
            onClick={() => setShowCategories(true)}
            style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:6, padding:"0 8px 0 16px", color:"#555", fontSize:12, cursor:"pointer", whiteSpace:"nowrap", background:"none", border:"none", fontFamily:"inherit", height:"100%", minHeight:44 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Categories
          </button>
        </div>
      </div>

      {activeTab === "Hall of Fame"       && <><HallOfFame isMobile={isMobile} router={router} /><Footer /></>}
      {activeTab === "Last 24h Winners"   && <><Last24hWinners isMobile={isMobile} router={router} /><Footer /></>}
      {activeTab === "Last Month Winners" && <><LastMonthWinners isMobile={isMobile} router={router} /><Footer /></>}
      {activeTab === "Contest Rules"      && <><ContestRules isMobile={isMobile} /><Footer /></>}

      {activeTab !== "Hall of Fame" && activeTab !== "Contest Rules" && activeTab !== "Last 24h Winners" && activeTab !== "Last Month Winners" && (
        <>
          {/* Hero header */}
          <div style={{ position:"relative", overflow:"hidden", background:"linear-gradient(100deg, #fff5f5 0%, #fff0f0 30%, #ffe4e4 55%, #ffd0d0 100%)", padding: isMobile ? "24px 16px 0" : "32px 28px 0", minHeight: isMobile ? 110 : 145, borderBottom:"1px solid #f0d0d0" }}>
            <div style={{ position:"absolute", right:0, top:0, bottom:0, width: isMobile ? 160 : 340, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none", userSelect:"none" }}>
              {CONTINENT_SVG[activeRegion] || CONTINENT_SVG["Africa"]}
            </div>
            <h1 style={{ fontSize: isMobile ? 16 : 20, fontWeight:700, margin:"0 0 5px", position:"relative", color:"#222" }}>
              Top {activeCategory} of the Month in {activeRegion}
            </h1>
            <p style={{ fontSize: isMobile ? 11 : 13, color:"#888", margin:"0 0 18px", position:"relative" }}>
              Ranked by total StripPoints earned. Top spots are awarded regionally to highlight the hottest talent.
            </p>
            <div style={{ display:"flex", gap:0, position:"relative", borderTop:"1px solid rgba(0,0,0,0.06)" }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{ background:"none", border:"none", cursor:"pointer", color: activeCategory === cat ? "#222" : "#888", fontSize:14, fontWeight: activeCategory === cat ? 700 : 400, padding:"10px 20px 12px", borderBottom: activeCategory === cat ? "2px solid #e53935" : "2px solid transparent", fontFamily:"inherit", marginBottom:-1 }}>{cat}</button>
              ))}
            </div>
          </div>

          {/* Region filter */}
          <div style={{ display:"flex", gap:8, padding:"12px 16px", overflowX:"auto", scrollbarWidth:"none", background:"#fff", borderBottom:"1px solid #e5e7eb" }}>
            {REGIONS.map(region => (
              <button key={region} onClick={() => setActiveRegion(region)} style={{ background: activeRegion === region ? "#f3f4f6" : "#fff", border: "1px solid " + (activeRegion === region ? "#d1d5db" : "#e5e7eb"), color: activeRegion === region ? "#222" : "#888", fontSize:12, fontWeight: activeRegion === region ? 600 : 400, padding:"7px 14px", borderRadius:6, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit", display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:16, lineHeight:1 }}>
                  {region === "Africa" ? "🌍" : region === "North America" || region === "South America" ? "🌎" : region === "Asia & Pacific" ? "🌏" : "🌍"}
                </span>
                {region}
              </button>
            ))}
          </div>

          {/* Model grid */}
          <div style={{ padding: isMobile ? "12px 8px 40px" : "16px 16px 40px", background:"#f7f7f9" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(" + cols + ", 1fr)", gap: isMobile ? 6 : 8 }}>
              {visible.map(model => (
                <ModelCard key={activeRegion + "-" + model.rank} model={model} onClick={name => router.push("/watch/" + name)} />
              ))}
              {isLoading && Array.from({ length: cols }).map((_, i) => <SkeletonCard key={"sk-" + i} />)}
            </div>
            {visibleCount < TOTAL && <div ref={sentinelRef} style={{ height:1, marginTop:8 }} aria-hidden="true" />}
            {visibleCount >= TOTAL && <div style={{ textAlign:"center", marginTop:32, color:"#bbb", fontSize:13 }}>You have reached the end of the leaderboard (1,000th place)</div>}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}