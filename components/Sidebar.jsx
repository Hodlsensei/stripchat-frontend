"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── SVG helper ─────────────────────────────────────────────────────
const SvgIcon = ({ children, size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

// ── Nav icons (matching reference site exactly) ────────────────────
const NAV_ICONS = {
  home: (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  ),
  gallery: (
    <SvgIcon>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </SvgIcon>
  ),
  recommend: (
    <SvgIcon>
      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
    </SvgIcon>
  ),
  favorites: (
    <SvgIcon>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
    </SvgIcon>
  ),
  privates: (
    <SvgIcon>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </SvgIcon>
  ),
  history: (
    <SvgIcon>
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
      <polyline points="12 7 12 12 15 15" />
    </SvgIcon>
  ),
};

// ── Data ───────────────────────────────────────────────────────────
const NAV = [
  { label: "Home",              href: "/",            icon: "home" },
  { label: "Gallery",           href: "/gallery",     icon: "gallery" },
  { label: "Recommended",       href: "/recommended", icon: "recommend" },
  { label: "My Favorites",      href: "/favorites",   icon: "favorites" },
  { label: "Best for Privates", href: "/privates",    icon: "privates" },
  { label: "Watch History",     href: "/history",     icon: "history" },
];

const SPECIALS = [
  { label: "United State",   count: 120,  flagCode: "us" },
  { label: "United Kingdom", count: 120,  flagCode: "gb" },
  { label: "Ukrainian",      count: 120,  flagCode: "ua" },
  { label: "New Models",     count: 1110, specialIcon: "bolt" },
  { label: "VR Cams",        count: 170,  vr: true },
  { label: "BDSM",           count: 69,   specialIcon: "bdsm" },
  { label: "Ticket Shows",   count: 107,  specialIcon: "ticket" },
];

const AGE = [
  { label: "Teen 18+",  count: 1325 },
  { label: "Young 22+", count: 3720 },
  { label: "MILF",      count: 1168 },
  { label: "Mature",    count: 176  },
  { label: "Granny",    count: 34   },
];
const ETHNICITY = [
  { label: "Arab",   count: 84   },
  { label: "Asian",  count: 941  },
  { label: "Ebony",  count: 619  },
  { label: "Indian", count: 342  },
  { label: "Latina", count: 2045 },
  { label: "Mixed",  count: 226  },
  { label: "White",  count: 2596 },
];
const BODY_TYPE = [
  { label: "Skinny",   count: 2333 },
  { label: "Athletic", count: 599  },
  { label: "Medium",   count: 2281 },
  { label: "Curvy",    count: 1343 },
  { label: "BBW",      count: 299  },
];
const HAIR = [
  { label: "Blonde",   count: 1157 },
  { label: "Black",    count: 1792 },
  { label: "Brunette", count: 3144 },
  { label: "Redhead",  count: 350  },
  { label: "Colorful", count: 346  },
];
const PRIVATE_SHOWS = [
  { label: "8–12 tk",              count: 2917 },
  { label: "16–24 tk",             count: 1961 },
  { label: "32–60 tk",             count: 1577 },
  { label: "90+ tk",               count: 342  },
  { label: "Recordable Privates",  count: 4556 },
  { label: "Spy on Shows",         count: 329  },
  { label: "Video Call (Cam2Cam)", count: 6443 },
];
const POPULAR = [
  { label: "Interactive Toy", count: 3983, specialIcon: "toy" },
  { label: "Mobile",          count: 1370, specialIcon: "mobile" },
  { label: "Group Sex",       count: 61   },
  { label: "Big Tits",        count: 2793 },
  { label: "Hairy Pussy",     count: 946  },
  { label: "Outdoor",         count: 905  },
  { label: "Big Ass",         count: 3926 },
  { label: "Anal",            count: 2557, hot: true },
  { label: "Squirt",          count: 3034 },
  { label: "Fuck Machine",    count: 620,  hot: true },
  { label: "Hardcore",        count: 194  },
  { label: "Blowjob",         count: 4690, hot: true },
  { label: "Pregnant",        count: 22   },
  { label: "Small Tits",      count: 1995 },
  { label: "Fisting",         count: 714  },
  { label: "Masturbation",    count: 5257 },
  { label: "Shaven",          count: 3348 },
  { label: "Deepthroat",      count: 3745, hot: true },
  { label: "Office",          count: 1038 },
  { label: "Foot Fetish",     count: 4281, hot: true },
];
const FOOTER = [
  "About Us","Blog","Support & FAQ","Billing Support",
  "Report Content","Media Inquiries","Privacy Policy",
  "Terms of Use","All Models","18 U.S.C. 2257 Record-Keeping Statement",
];

// ── Special icon renderer ──────────────────────────────────────────
function SpecialIcon({ flagCode, vr, type }) {
  if (flagCode) return (
    <img
      src={`https://flagcdn.com/w20/${flagCode}.png`}
      srcSet={`https://flagcdn.com/w40/${flagCode}.png 2x`}
      width={20} height={14} alt={flagCode}
      style={{ borderRadius: 2, objectFit: "cover", display: "block", flexShrink: 0 }}
    />
  );
  if (vr) return (
    <span style={{
      fontSize: 9, fontWeight: 700, padding: "2px 5px", borderRadius: 3,
      background: "#8b5cf6", color: "#fff", letterSpacing: ".03em", lineHeight: 1.5,
    }}>VR</span>
  );
  if (type === "bolt") return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
  if (type === "bdsm") return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="#9ca3af" stroke="none">
      <path d="M12 2C7 2 3 6 3 11c0 2.5 1 4.7 2.6 6.3L4 20h2l1.3-2H12h4.7L18 20h2l-1.6-2.7C20 15.7 21 13.5 21 11c0-5-4-9-9-9zm-3 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
    </svg>
  );
  if (type === "ticket") return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2}>
      <path d="M2 9a2 2 0 012-2h16a2 2 0 012 2v1a2 2 0 000 4v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1a2 2 0 000-4V9z" />
      <line x1="9" y1="7" x2="9" y2="17" strokeDasharray="2 2" />
    </svg>
  );
  if (type === "toy") return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="17" cy="7" r="3" />
      <path d="M14.5 9.5L3 21" />
      <path d="M13 11l1.5 1.5" />
    </svg>
  );
  if (type === "mobile") return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
  return null;
}

// ── Reusable pieces ────────────────────────────────────────────────
const Divider = () => (
  <div style={{ height: 1, background: "#f3f4f6", margin: "6px 0" }} />
);

function SecLabel({ text }) {
  return (
    <div style={{
      padding: "10px 16px 3px", fontSize: 10, fontWeight: 700,
      letterSpacing: ".09em", textTransform: "uppercase", color: "#9ca3af",
    }}>{text}</div>
  );
}

// ── Plain row: NO icon slot (Age, Ethnicity, Body Type, Hair, Private Shows) ──
function PlainRow({ label, count, hot, href = "#" }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={href} style={{
      display: "flex", alignItems: "center",
      padding: "6px 16px",
      color: "#374151", fontSize: 13, fontWeight: 400,
      textDecoration: "none",
      background: hov ? "#f9fafb" : "transparent",
      transition: "background .1s",
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={{ flex: 1 }}>{label}{hot && <span style={{ color: "#f472b6", fontSize: 11, marginLeft: 4 }}>✦✦</span>}</span>
      <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>
        {count.toLocaleString()}
      </span>
    </Link>
  );
}

// ── Icon row: has icon slot (Specials, Popular) ────────────────────
function IconRow({ label, count, flagCode, vr, specialIcon, emoji, hot, href = "#" }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={href} style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "6px 16px",
      color: "#374151", fontSize: 13, fontWeight: 400,
      textDecoration: "none",
      background: hov ? "#f9fafb" : "transparent",
      transition: "background .1s",
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={{ width: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {flagCode || vr || specialIcon
          ? <SpecialIcon flagCode={flagCode} vr={vr} type={specialIcon} />
          : emoji
            ? <span style={{ fontSize: 14, lineHeight: 1 }}>{emoji}</span>
            : null
        }
      </span>
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {label}
        {hot && <span style={{ color: "#f472b6", fontSize: 11, marginLeft: 4 }}>✦✦</span>}
      </span>
      <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, flexShrink: 0 }}>
        {count.toLocaleString()}
      </span>
    </Link>
  );
}

function NavItem({ item, active, collapsed }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={item.href} style={{
      display: "flex", alignItems: "center",
      gap: collapsed ? 0 : 12,
      justifyContent: collapsed ? "center" : "flex-start",
      padding: collapsed ? "10px 0" : "9px 16px",
      color: active ? "#e5192b" : "#374151",
      fontWeight: active ? 600 : 400, fontSize: 13.5,
      textDecoration: "none", whiteSpace: "nowrap",
      background: active ? "#fff0f0" : hov ? "#f3f4f6" : "transparent",
      position: "relative", transition: "background .1s, color .1s",
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {active && !collapsed && (
        <span style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: 3, background: "#e5192b", borderRadius: "0 2px 2px 0",
        }} />
      )}
      <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 18 }}>
        {NAV_ICONS[item.icon]}
      </span>
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

function FooterLink({ label }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href="#" style={{
      display: "block", padding: "4px 16px",
      fontSize: 12, color: hov ? "#374151" : "#6b7280",
      textDecoration: "none", transition: "color .1s",
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {label}
    </Link>
  );
}

function AllCatsBtn({ iconOnly }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href="/categories" style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
      width: "100%", padding: iconOnly ? "8px 0" : "8px 12px",
      border: "1.5px solid",
      borderColor: hov ? "#e5192b" : "#e5e7eb",
      borderRadius: 8,
      background: hov ? "#fff0f0" : "white",
      color: hov ? "#e5192b" : "#374151",
      fontSize: 11, fontWeight: 700, cursor: "pointer",
      textTransform: "uppercase", letterSpacing: ".06em",
      transition: "all .12s", textDecoration: "none",
      boxSizing: "border-box",
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
      {!iconOnly && "All Categories"}
    </Link>
  );
}

function LangRow() {
  const [hov, setHov] = useState(false);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "10px 16px 16px", cursor: "pointer",
      background: hov ? "#f9fafb" : "transparent", transition: "background .1s",
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={{ fontSize: 15 }}>🌐</span>
      <span style={{ fontSize: 13, color: "#374151" }}>English</span>
      <span style={{ marginLeft: "auto", color: "#9ca3af", fontSize: 11 }}>▾</span>
    </div>
  );
}

function CollapseBtn({ collapsed, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 10, cursor: "pointer",
      color: hov ? "#374151" : "#9ca3af",
      background: "white", border: "none",
      borderTop: "1px solid #f3f4f6",
      transition: "color .12s", width: "100%",
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <svg width={15} height={15} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d={collapsed ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} />
      </svg>
    </button>
  );
}

function TokensBanner({ collapsed }) {
  const [hov, setHov] = useState(false);
  if (collapsed) return null;
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        margin: "10px 10px 4px", borderRadius: 8,
        background: hov
          ? "linear-gradient(135deg,#2e7d32,#43a047)"
          : "linear-gradient(135deg,#388e3c,#4caf50)",
        padding: "10px 12px",
        display: "flex", alignItems: "center", gap: 10,
        cursor: "pointer", transition: "background .2s",
        boxShadow: "0 2px 8px rgba(76,175,80,0.3)",
      }}>
      {/* Stacked coins SVG matching reference site */}
      <svg width={38} height={38} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        {/* Bottom coin */}
        <ellipse cx="19" cy="29" rx="11" ry="5" fill="#e6a817" />
        <rect x="8" y="24" width="22" height="5" fill="#e6a817" />
        <ellipse cx="19" cy="24" rx="11" ry="5" fill="#fdd835" />
        <ellipse cx="19" cy="24" rx="8" ry="3.2" fill="#f9a825" />
        {/* Middle coin */}
        <ellipse cx="19" cy="21" rx="11" ry="5" fill="#e6a817" />
        <rect x="8" y="16" width="22" height="5" fill="#e6a817" />
        <ellipse cx="19" cy="16" rx="11" ry="5" fill="#fdd835" />
        <ellipse cx="19" cy="16" rx="8" ry="3.2" fill="#f9a825" />
        {/* Top coin */}
        <ellipse cx="19" cy="13" rx="11" ry="5" fill="#e6a817" />
        <rect x="8" y="8" width="22" height="5" fill="#e6a817" />
        <ellipse cx="19" cy="8" rx="11" ry="5" fill="#fdd835" />
        <ellipse cx="19" cy="8" rx="8" ry="3.2" fill="#f9a825" />
        {/* $ symbol on top coin */}
        <text x="19" y="11" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#e6a817" fontFamily="Arial">$</text>
      </svg>
      <div style={{ lineHeight: 1.25 }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>
          50 <span style={{ fontSize: 13, fontWeight: 600 }}>Tokens</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: 500 }}>to Win Now</div>
      </div>
    </div>
  );
}

// ── Main Sidebar ───────────────────────────────────────────────────
export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside style={{
      width: "100%", height: "100%", background: "#fff",
      display: "flex", flexDirection: "column", overflow: "hidden",
      fontFamily: "-apple-system,'Segoe UI',sans-serif",
    }}>
      <div style={{
        flex: 1, overflowY: "auto", overflowX: "hidden",
        padding: "8px 0 16px",
        scrollbarWidth: "thin", scrollbarColor: "#e5e7eb transparent",
      }}>

        <TokensBanner collapsed={collapsed} />

        {/* Main nav */}
        {NAV.map(item => (
          <NavItem key={item.href} item={item} active={pathname === item.href} collapsed={collapsed} />
        ))}

        <Divider />

        {/* Specials */}
        {!collapsed && <SecLabel text="Specials" />}
        {SPECIALS.map(s =>
          collapsed ? (
            <div key={s.label} style={{ padding: "8px 0", textAlign: "center" }}>
              {s.flagCode
                ? <img src={`https://flagcdn.com/w20/${s.flagCode}.png`} width={20} height={14} alt={s.flagCode} style={{ borderRadius: 2, display: "inline-block" }} />
                : s.vr
                  ? <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 3px", borderRadius: 3, background: "#8b5cf6", color: "#fff" }}>VR</span>
                  : s.specialIcon === "bolt"
                    ? <span style={{ color: "#f59e0b", fontSize: 14 }}>⚡</span>
                    : null}
            </div>
          ) : (
            <IconRow key={s.label} label={s.label} count={s.count}
              flagCode={s.flagCode} vr={s.vr} specialIcon={s.specialIcon} />
          )
        )}

        {!collapsed && (
          <>
            <Divider />
            <SecLabel text="Age" />
            {AGE.map(s => <PlainRow key={s.label} {...s} />)}

            <Divider />
            <SecLabel text="Ethnicity" />
            {ETHNICITY.map(s => <PlainRow key={s.label} {...s} />)}

            <Divider />
            <SecLabel text="Body Type" />
            {BODY_TYPE.map(s => <PlainRow key={s.label} {...s} />)}

            <Divider />
            <SecLabel text="Hair" />
            {HAIR.map(s => <PlainRow key={s.label} {...s} />)}

            <Divider />
            <SecLabel text="Private Shows" />
            {PRIVATE_SHOWS.map(s => <PlainRow key={s.label} {...s} />)}

            <Divider />
            <SecLabel text="Popular" />
            {POPULAR.map(s =>
              s.specialIcon || s.flagCode || s.vr
                ? <IconRow key={s.label} {...s} />
                : <PlainRow key={s.label} label={s.label} count={s.count} hot={s.hot} />
            )}

            <div style={{
              padding: "8px 12px",
              position: "sticky",
              bottom: 0,
              background: "#fff",
              borderTop: "1px solid #f3f4f6",
              zIndex: 10,
            }}>
              <AllCatsBtn />
            </div>

            <Divider />
            <div style={{ padding: "4px 0 8px" }}>
              {FOOTER.map(l => <FooterLink key={l} label={l} />)}
            </div>
            <Divider />
            <LangRow />
          </>
        )}


      </div>

      <CollapseBtn collapsed={collapsed} onClick={() => setCollapsed(c => !c)} />
    </aside>
  );
}