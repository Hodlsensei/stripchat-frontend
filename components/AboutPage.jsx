"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const FLOAT_IMAGES = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80",
  "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=200&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200&q=80",
];

const POSITIONS = [
  { top: "5%",  left: "2%",  size: 90,  delay: 0 },
  { top: "2%",  left: "22%", size: 120, delay: 0.3 },
  { top: "8%",  left: "48%", size: 160, delay: 0.6 },
  { top: "3%",  left: "68%", size: 100, delay: 0.9 },
  { top: "5%",  left: "85%", size: 130, delay: 1.2 },
  { top: "35%", left: "1%",  size: 70,  delay: 0.2 },
  { top: "30%", left: "18%", size: 110, delay: 0.5 },
  { top: "38%", left: "38%", size: 130, delay: 0.8 },
  { top: "32%", left: "60%", size: 150, delay: 1.1 },
  { top: "28%", left: "80%", size: 80,  delay: 1.4 },
  { top: "62%", left: "5%",  size: 140, delay: 0.4 },
  { top: "60%", left: "28%", size: 90,  delay: 0.7 },
  { top: "65%", left: "50%", size: 170, delay: 1.0 },
  { top: "58%", left: "72%", size: 100, delay: 1.3 },
  { top: "63%", left: "88%", size: 120, delay: 0.1 },
  { top: "85%", left: "15%", size: 80,  delay: 0.6 },
];

export default function AboutPage() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 100000;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  const S = { fontFamily: "'Helvetica Neue', Arial, sans-serif" };

  return (
    <div style={{ background: "#0d0d0d", color: "#fff", ...S, overflowX: "hidden", paddingBottom: 60 }}>

      {/* ── 1. HERO ── */}
      <section style={{
        background: "#c0392b", minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "80px 24px", position: "relative",
      }}>
        <h1 style={{
          fontSize: "clamp(60px,12vw,160px)", fontWeight: 900,
          color: "#fff", margin: "0 0 48px", letterSpacing: "-3px", textAlign: "center",
        }}>Stripchatbate</h1>

        <div style={{
          width: "min(860px,92vw)", borderRadius: 12, overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)", position: "relative",
        }}>
          <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=80"
            alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }}/>
          {/* LIVE badge */}
          <div style={{ position: "absolute", top: 16, left: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ background: "#e53935", color: "#fff", fontWeight: 800, fontSize: 13, padding: "3px 10px", borderRadius: 4 }}>LIVE</span>
            <span style={{ color: "#fff", fontWeight: 600, fontSize: 14, textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>1,169 viewers</span>
          </div>
          {/* Chat bubbles */}
          <div style={{ position: "absolute", bottom: 60, left: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { user: "LOWERCASE GUY", msg: "Is it cool if I bring my cousin?", color: "#fff" },
              { user: "HotLobster", msg: "You're amazing! don't stop", color: "#e53935" },
              { user: "JessAdams", msg: "More tips to cummmm...", color: "#4caf50" },
            ].map((c, i) => (
              <div key={i} style={{ background: "rgba(0,0,0,0.6)", borderRadius: 6, padding: "4px 10px", fontSize: 12, maxWidth: 280 }}>
                <span style={{ color: c.color, fontWeight: 700 }}>{c.user} </span>
                <span style={{ color: "rgba(255,255,255,0.9)" }}>{c.msg}</span>
              </div>
            ))}
          </div>
          {/* Bar */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "rgba(0,0,0,0.75)", padding: "10px 16px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: 20, padding: "6px 14px", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
              Message...
            </div>
            <button style={{ background: "transparent", border: "1.5px solid #f5c842", color: "#f5c842", padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              Start Private
            </button>
            <button style={{ background: "#4caf50", border: "none", color: "#fff", padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              Send Tip
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. A place of sexual freedom ── */}
      <section style={{ background: "#0d0d0d", padding: "100px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 20, color: "rgba(255,255,255,0.65)", marginBottom: 16 }}>A place of sexual freedom.</p>
        <div style={{ width: 60, height: 1, background: "#555", margin: "0 auto 28px" }}/>
        <p style={{ fontSize: "clamp(15px,2vw,20px)", color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.8 }}>
          Join our <span style={{ color: "#e53935", fontWeight: 700 }}>open-minded community</span> and enjoy interactive
          pleasures with thousands of models for FREE.
        </p>
        <button onClick={() => router.push("/")} style={{
          background: "#c0392b", border: "none", color: "#fff",
          fontSize: 18, fontWeight: 700, padding: "16px 40px", borderRadius: 40,
          cursor: "pointer", boxShadow: "0 0 40px rgba(192,57,43,0.4)",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "#e53935"}
          onMouseLeave={e => e.currentTarget.style.background = "#c0392b"}
        >Start for FREE →</button>
      </section>

      {/* ── 3. You want it? You got it! ── */}
      <section style={{ background: "#0d0d0d", padding: "80px 24px" }}>
        {/* Welcome pill */}
        <div style={{
          maxWidth: 680, margin: "0 auto 80px",
          border: "1.5px solid #333", borderRadius: 50,
          padding: "18px 32px", display: "flex", alignItems: "center", gap: 16,
        }}>
          <span style={{ fontSize: 36 }}>🕊️</span>
          <p style={{ margin: 0, fontSize: 15, color: "#fff", lineHeight: 1.5 }}>
            Welcome to the world of erotic livestreaming and{" "}
            <span style={{ color: "#e53935", fontWeight: 700 }}>sexual freedom.</span>
          </p>
          <button style={{ marginLeft: "auto", background: "none", border: "none", color: "#fff", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>
            Learn more →
          </button>
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <span style={{ fontSize: 40 }}>🕹️</span>
            <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, margin: "16px 0 8px", lineHeight: 1 }}>
              You want it?<br/>You got it!
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, marginBottom: 40 }}>Pick an activity from the list below</p>
            {[
              { icon: "📳", title: "Vibrotoys",  desc: "Play with models' toys in real time." },
              { icon: "📋", title: "Polls",      desc: "Vote for what you want to see next." },
              { icon: "🎮", title: "Games",      desc: "Play interactive games to add even more action!" },
            ].map(item => (
              <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 32 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700 }}>{item.title}</p>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: 14 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tip menu card */}
          <div style={{ background: "#1a1a1a", borderRadius: 12, overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80"
              alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}/>
            <div style={{ padding: 20 }}>
              <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 16 }}>Tip Menu</p>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#666", marginBottom: 8 }}>
                <span>ACTIVITY</span><span>TOKENS</span>
              </div>
              {[
                { act: "Suck Finger",   tk: 35,  red: false },
                { act: "Blowjob",       tk: 70,  red: false },
                { act: "Oil Show",      tk: 85,  red: false },
                { act: "Ahegao",        tk: 115, red: true },
                { act: "Dancing Naked", tk: 555, red: false },
              ].map(r => (
                <div key={r.act} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "10px 8px", borderRadius: 6, marginBottom: 2,
                  background: r.red ? "#c0392b" : "transparent", fontSize: 14,
                }}>
                  <span>{r.act}</span><span style={{ fontWeight: 700 }}>{r.tk}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                {[20, 50, 100, 200, 250].map(n => (
                  <button key={n} style={{
                    padding: "6px 14px", borderRadius: 20,
                    background: n === 20 ? "#4caf50" : "#2a2a2a",
                    border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
                  }}>{n}</button>
                ))}
              </div>
              <button style={{
                width: "100%", marginTop: 12, background: "#4caf50", border: "none",
                color: "#fff", padding: "12px 0", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer",
              }}>Send 20 tk</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Be in control (red diagonal stripe) ── */}
      <section style={{
        position: "relative", background: "#0d0d0d",
        padding: "80px 24px 0", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "50%",
          background: "#c0392b", clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
        }}/>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(36px,5vw,72px)", fontWeight: 900, marginBottom: 60 }}>Be in control</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[
                { icon: "📳", title: "Vibrotoys",  desc: "Play with models' toys in real time." },
                { icon: "📋", title: "Polls",      desc: "Vote for what you want to see next." },
                { icon: "🎮", title: "Games",      desc: "Play interactive games to add even more action!" },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700 }}>{item.title}</p>
                    <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: 14 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=80"
                alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. 1-on-1 with a model ── */}
      <section style={{ background: "#0d0d0d", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>❤️</div>
        <h2 style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 900, marginBottom: 48 }}>
          1-on-1<br/>with a model
        </h2>
        <div style={{ maxWidth: 860, margin: "0 auto 0" }}>
          <div style={{ borderRadius: 12, overflow: "hidden", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
            <img src="https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=900&q=80"
              alt="" style={{ width: "100%", aspectRatio: "16/7", objectFit: "cover", objectPosition: "top", display: "block" }}/>
            <div style={{
              position: "absolute", top: 16, right: 16,
              background: "rgba(0,0,0,0.75)", borderRadius: 10, padding: "10px 14px", textAlign: "center",
            }}>
              <p style={{ margin: "0 0 4px", fontSize: 11, color: "#aaa" }}>119 reviews</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontWeight: 800, fontSize: 16 }}>4.9</span>
                <span style={{ color: "#f5c842" }}>★★★★★</span>
              </div>
            </div>
          </div>
          {/* Features bar */}
          <div style={{
            background: "#c0392b", padding: "20px",
            display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap",
          }}>
            {[
              { icon: "🎥", text: "Video call whenever you like" },
              { icon: "▶️", text: "Recordable Private shows" },
              { icon: "👑", text: "100% of the model's attention" },
            ].map(f => (
              <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>{f.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Immerse yourself in VR ── */}
      <section style={{ background: "#0d0d0d", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>🥽</div>
        <h2 style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 900, marginBottom: 16 }}>
          Immerse<br/>yourself in VR
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: 32 }}>
          Put your headset on and enjoy the show<br/>right in your browser
        </p>
        <button style={{
          background: "#4f9cf5", border: "none", color: "#fff",
          fontSize: 16, fontWeight: 700, padding: "14px 32px", borderRadius: 30,
          cursor: "pointer", marginBottom: 60,
        }}>Explore VR →</button>
        <div style={{ maxWidth: 860, margin: "0 auto", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=80"
            alt="" style={{ width: "100%", aspectRatio: "16/7", objectFit: "cover", display: "block" }}/>
        </div>
      </section>

      {/* ── 7. More than 100,000 models (floating images) ── */}
      <section style={{
        background: "#0d0d0d", minHeight: "80vh",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <style>{`
          @keyframes floatUp {
            0%   { transform: translateY(0px); }
            100% { transform: translateY(-20px); }
          }
        `}</style>
        {FLOAT_IMAGES.map((url, i) => {
          const pos = POSITIONS[i % POSITIONS.length];
          return (
            <div key={i} style={{
              position: "absolute", top: pos.top, left: pos.left,
              width: pos.size, height: pos.size, borderRadius: 16, overflow: "hidden",
              animation: `floatUp ${3 + (i % 3)}s ease-in-out ${pos.delay}s infinite alternate`,
            }}>
              <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>
          );
        })}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", pointerEvents: "none" }}>
          <p style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginBottom: 0 }}>More than</p>
          <p style={{
            fontSize: "clamp(80px,16vw,200px)", fontWeight: 900,
            color: "rgba(255,255,255,0.1)", lineHeight: 1, margin: 0, letterSpacing: "-4px",
          }}>{count.toLocaleString()}</p>
          <p style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginTop: 0 }}>models</p>
        </div>
      </section>

      {/* ── 8. LGBTQ+ ── */}
      <section style={{ background: "#0d0d0d", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 80, marginBottom: 20 }}>🏳️‍🌈</div>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, marginBottom: 12 }}>LGBTQ+ friendly community</p>
        <h2 style={{ fontSize: "clamp(40px,6vw,80px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
          Be yourself.<br/>Be proud.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 18, maxWidth: 500, margin: "0 auto" }}>
          Love is love. Stripchatbate celebrates and welcomes this diverse and vibrant world we all live in.
        </p>
      </section>

      {/* ── 9. A place of sexual freedom (dark card) ── */}
      <section style={{ background: "#0d0d0d", padding: "40px 24px" }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          background: "linear-gradient(135deg,#1a0505,#2a0808)",
          border: "1.5px solid #c0392b", borderRadius: 16,
          padding: "60px 48px", display: "flex", alignItems: "center", gap: 48,
        }}>
          <span style={{ fontSize: 80, flexShrink: 0 }}>📣</span>
          <div>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, margin: "0 0 14px" }}>
              A place of sexual freedom
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, margin: 0, lineHeight: 1.7 }}>
              There is no shame in sensuality. Feel liberated with models who bare it all.
            </p>
          </div>
        </div>
      </section>

      {/* ── 10. Enjoy on all devices ── */}
      <section style={{
        background: "linear-gradient(135deg,#1a0505 0%,#0d0d0d 45%,#c0392b 100%)",
        padding: "100px 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <h2 style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 900 }}>
            Enjoy Stripchatbate<br/>on all devices
          </h2>
          <div style={{ position: "relative" }}>
            {/* Desktop mockup */}
            <div style={{ background: "#1a1a1a", borderRadius: 10, border: "2px solid #333" }}>
              <div style={{ background: "#2a2a2a", padding: "7px 12px", display: "flex", alignItems: "center", gap: 5 }}>
                {["#ff5f57","#febc2e","#28c840"].map(c => (
                  <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }}/>
                ))}
              </div>
              <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80"
                alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }}/>
            </div>
            {/* Phone mockup */}
            <div style={{
              position: "absolute", bottom: -24, right: -24,
              width: 110, background: "#1a1a1a",
              border: "3px solid #c0392b", borderRadius: 16, overflow: "hidden",
            }}>
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80"
                alt="" style={{ width: "100%", aspectRatio: "9/16", objectFit: "cover", display: "block" }}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Join the most joyful adult experience ── */}
      <section style={{
        background: "radial-gradient(ellipse at 30% 50%, #3a0a0a 0%, #0d0d0d 70%)",
        padding: "120px 24px",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
            <div style={{ width: 4, minHeight: 200, background: "#c0392b", flexShrink: 0, borderRadius: 2 }}/>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%", background: "#c0392b",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                }}>💬</div>
                <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1, color: "#888" }}>STRIPCHATBATE</span>
              </div>
              <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, margin: "0 0 32px", lineHeight: 1.1 }}>
                Join the most<br/>joyful adult<br/>experience
              </h2>
              <button onClick={() => router.push("/")} style={{
                background: "#fff", border: "none", color: "#0d0d0d",
                fontSize: 16, fontWeight: 700, padding: "14px 32px", borderRadius: 30, cursor: "pointer",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#ddd"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >Join Now →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#111", padding: "60px 24px 32px", borderTop: "1px solid #1e1e1e" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 32, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#c0392b", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13 }}>S</div>
                <span style={{ fontWeight: 800, fontSize: 15 }}>STRIPCHATBATE</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, lineHeight: 1.8, marginBottom: 16 }}>
                Stripchatbate is the world's premier 18+ LIVE adult entertainment destination for real connection and adult play.
              </p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>
                All models appearing on this site have contractually confirmed to us that they are 18 years of age or older.
              </p>
            </div>
            {[
              { title: "STRIPCHATBATE", links: ["About Stripchatbate","Blog","X","Reddit","Media Inquiries"] },
              { title: "LEGAL & SAFETY", links: ["Privacy Policy","Terms of Use","DMCA Policy","Cookies Policy","Parental Control Guide"] },
              { title: "WORK WITH US",  links: ["Webcam Affiliate Program"] },
              { title: "HELP & SUPPORT",links: ["Support & FAQ","Billing Support","DMCA Protection"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#666", letterSpacing: 1, marginBottom: 14 }}>{col.title}</p>
                {col.links.map(link => (
                  <p key={link} style={{ margin: "0 0 9px" }}>
                    <a href="#" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textDecoration: "none" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                    >{link}</a>
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div style={{
            borderTop: "1px solid #222", paddingTop: 20,
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          }}>
            <div style={{ display: "flex", gap: 20 }}>
              {["RTA","SafeLabeling","ASACP"].map(b => (
                <span key={b} style={{ fontSize: 11, color: "#555", fontWeight: 700 }}>{b}</span>
              ))}
            </div>
            <span style={{ fontSize: 11, color: "#555" }}>18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement</span>
            <span style={{ background: "#333", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>18+</span>
          </div>
        </div>
      </footer>

      {/* Fixed bottom banner */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
        background: "#e53935", padding: "10px 20px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        boxShadow: "0 -2px 12px rgba(229,57,53,0.3)",
      }}>
        <span style={{ fontSize: 18 }}>💬</span>
        <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>Join Stripchatbate to interact with models!</span>
        <button onClick={() => router.push("/")} style={{
          background: "#fff", border: "none", color: "#e53935",
          fontWeight: 700, fontSize: 13, padding: "6px 18px", borderRadius: 20, cursor: "pointer",
        }}>Join FREE</button>
      </div>

    </div>
  );
}