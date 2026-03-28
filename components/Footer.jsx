"use client";

export default function Footer() {
  return (
    <footer style={{ background: "#111", color: "#aaa", fontFamily: "inherit" }}>

      {/* Main footer content */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(220px,320px) 1fr 1fr 1fr 1fr",
        gap: 40,
        padding: "40px 32px 32px",
        maxWidth: 1300,
        margin: "0 auto",
      }}
      className="footer-grid"
      >

        {/* Left: Logo + description + QR */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <img src="/stripchatbate-rd.png" alt="Stripchatbate" style={{ height: 28, objectFit: "contain" }} />
          </div>

          {/* Language selector */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid #333", borderRadius: 6,
            padding: "6px 12px", fontSize: 12, cursor: "pointer",
            marginBottom: 16, color: "#ccc",
          }}>
            🌐 English ▾
          </div>

          <p style={{ fontSize: 12, lineHeight: 1.7, color: "#888", marginBottom: 12 }}>
            Stripchatbate is the world's premier 18+ LIVE adult entertainment destination for real
            connection and adult play. Watch, chat, and explore your desires with real people
            streaming live every day, and over 150,000 amateurs, professionals, and couples to
            choose from every month. You're guaranteed to find your dream match on Stripchatbate.
            Experience real live sex and sex live shows without scripts, filters, or bots. Every
            show is live and interactive: talk, tip, take control of interactive toys, or go private to
            share the moment. This is adult entertainment built on real attention and human
            connection — where you're not just watching, you're part of it.
          </p>

          <p style={{ fontSize: 11, color: "#666", marginBottom: 20, lineHeight: 1.6 }}>
            All models appearing on this site have contractually confirmed to us that they are 18
            years of age or older.
          </p>

          {/* QR Code card */}
          <div style={{
            background: "#1a1a1a", borderRadius: 8, padding: "14px 16px",
            display: "flex", alignItems: "center", gap: 14,
            border: "1px solid #2a2a2a", maxWidth: 300,
          }}>
            {/* QR code placeholder */}
            <div style={{
              width: 64, height: 64, background: "#fff", borderRadius: 4,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, fontSize: 32,
            }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                {/* QR code pattern */}
                <rect width="56" height="56" fill="white"/>
                <rect x="4" y="4" width="20" height="20" rx="2" fill="#111"/>
                <rect x="7" y="7" width="14" height="14" rx="1" fill="white"/>
                <rect x="9" y="9" width="10" height="10" fill="#111"/>
                <rect x="32" y="4" width="20" height="20" rx="2" fill="#111"/>
                <rect x="35" y="7" width="14" height="14" rx="1" fill="white"/>
                <rect x="37" y="9" width="10" height="10" fill="#111"/>
                <rect x="4" y="32" width="20" height="20" rx="2" fill="#111"/>
                <rect x="7" y="35" width="14" height="14" rx="1" fill="white"/>
                <rect x="9" y="37" width="10" height="10" fill="#111"/>
                <rect x="32" y="32" width="6" height="6" fill="#111"/>
                <rect x="40" y="32" width="6" height="6" fill="#111"/>
                <rect x="32" y="40" width="6" height="6" fill="#111"/>
                <rect x="40" y="40" width="6" height="6" fill="#111"/>
                <rect x="48" y="32" width="4" height="4" fill="#111"/>
                <rect x="48" y="40" width="4" height="4" fill="#111"/>
                <rect x="28" y="28" width="4" height="4" fill="#111"/>
                <rect x="36" y="28" width="4" height="4" fill="#111"/>
                <rect x="44" y="28" width="4" height="4" fill="#111"/>
                <rect x="28" y="36" width="4" height="4" fill="#111"/>
                <rect x="28" y="44" width="4" height="4" fill="#111"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Get Stripchatbate App</div>
              <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5 }}>
                For quick <span style={{ color: "#4fc3f7" }}>mobile</span> access & notifications, scan the QR
                code with your phone camera
              </div>
            </div>
          </div>
        </div>

        {/* Column 1: STRIPCHATBATE */}
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: ".08em", marginBottom: 16, marginTop: 0 }}>
            STRIPCHATBATE
          </h4>
          {[
            { icon: "ℹ️", label: "About Stripchatbate" },
            { icon: "📝", label: "Blog" },
            { icon: "✖", label: "X" },
            { icon: "🤖", label: "Reddit" },
            { icon: "📋", label: "Media Inquiries" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer", fontSize: 13, color: "#aaa" }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "#aaa"}
            >
              <span style={{ fontSize: 14 }}>{icon}</span> {label}
            </div>
          ))}

          {/* I Have Questions Left button */}
          <button style={{
            marginTop: 24,
            background: "none", border: "1px solid #444",
            color: "#ccc", fontSize: 13, padding: "10px 20px",
            borderRadius: 20, cursor: "pointer", fontFamily: "inherit",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#888"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#444"}
          >
            I Have Questions Left
          </button>
        </div>

        {/* Column 2: LEGAL & SAFETY */}
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: ".08em", marginBottom: 16, marginTop: 0 }}>
            LEGAL & SAFETY
          </h4>
          {[
            "Privacy Policy",
            "Terms of Use",
            "DMCA Policy",
            "Cookies Policy",
            "Parental Control Guide",
            "EU Research Program",
            "Anti-Slavery Help",
          ].map(label => (
            <div key={label} style={{ marginBottom: 12, cursor: "pointer", fontSize: 13, color: "#aaa", borderBottom: "1px solid #222", paddingBottom: 10 }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "#aaa"}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Column 3: WORK WITH US */}
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: ".08em", marginBottom: 16, marginTop: 0 }}>
            WORK WITH US
          </h4>
          {["Affiliate Program"].map(label => (
            <div key={label} style={{ marginBottom: 12, cursor: "pointer", fontSize: 13, color: "#aaa", borderBottom: "1px solid #222", paddingBottom: 10 }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "#aaa"}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Column 4: HELP & SUPPORT */}
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: ".08em", marginBottom: 16, marginTop: 0 }}>
            HELP & SUPPORT
          </h4>
          {[
            "Support & FAQ",
            "Billing Support",
            "DMCA Protection",
          ].map(label => (
            <div key={label} style={{ marginBottom: 12, cursor: "pointer", fontSize: 13, color: "#aaa", borderBottom: "1px solid #222", paddingBottom: 10 }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "#aaa"}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom compliance bar */}
      <div style={{
        borderTop: "1px solid #222",
        padding: "16px 32px",
        display: "flex", alignItems: "center",
        gap: 20, flexWrap: "wrap",
        maxWidth: 1300, margin: "0 auto",
      }}>
        {/* Trust badges */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          {/* RTA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ border: "1px solid #555", borderRadius: 3, padding: "3px 6px", fontSize: 11, fontWeight: 800, color: "#ccc", letterSpacing: 1 }}>RTA</div>
          </div>
          {/* SafeLabeling */}
          <div style={{ fontSize: 10, color: "#666", textAlign: "center", lineHeight: 1.3 }}>
            <div style={{ fontWeight: 700, color: "#888" }}>✓ SafeLabeling.org</div>
            <div>COMPLIANT WEBSITE</div>
          </div>
          {/* ASACP */}
          <div style={{ fontSize: 10, color: "#666", textAlign: "center", lineHeight: 1.3 }}>
            <div style={{ fontWeight: 700, color: "#888" }}>ASACP</div>
            <div>APPROVED MEMBER</div>
          </div>
          {/* ICRA-like */}
          <div style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
            🔒
          </div>
        </div>

        {/* Compliance text */}
        <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: "#555" }}>
          18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement
        </div>

        {/* 18+ badge */}
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          border: "2px solid #555", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 800, color: "#888",
          flexShrink: 0,
        }}>
          18+
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px !important;
            padding: 24px 16px !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}