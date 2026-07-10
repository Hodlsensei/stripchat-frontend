"use client";
import { useState, useEffect, useRef } from "react";

const FONT = "'DM Sans', 'Helvetica Neue', Helvetica, sans-serif";

const BG = "#111111";
const BORDER = "#2e2e2e";
const TEXT = "#f0f0f0";
const MUTED = "#888";
const SUBTLE = "#555";
const GOLD = "#f5a623";
const GREEN = "#4caf50";
const RED = "#FCA311";

const LEAGUE_COLORS = { grey:"#9e9e9e", bronze:"#cd7f32", silver:"#b0bec5", gold:"#f5a623", diamond:"#8e24aa", royal:"#FCA311", legend:"#e53935" };

const FAKE_USERS = [
  { name:"JimmyTheDriver", league:"royal", level:83, ultimate:true },
  { name:"AddeBlo",        league:"royal", level:91, ultimate:true, tier:3 },
  { name:"Znoll",          league:"silver", level:24 },
  { name:"Barney12sean",   league:"diamond", level:58 },
  { name:"Rlan46",         league:"gold", level:44 },
  { name:"RiverNile80",    league:"silver", level:19 },
  { name:"discolite69",    league:"silver", level:12 },
  { name:"squid95",        league:"gold", level:47 },
  { name:"kano6530",       league:"diamond", level:61 },
];

const TIP_COMMENTS = ["Arch that ASS !", "Let's see the back 🍑", "Show me those feet", "Turn around for me", null, null];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randUser() { return pick(FAKE_USERS); }

function makeMessage(type) {
  const user = randUser();
  const base = { id: Date.now() + Math.random(), user, type };
  switch (type) {
    case "tip":
      return { ...base, amount: [10,15,20,25,40,44,50][Math.floor(Math.random()*7)], comment: pick(TIP_COMMENTS) };
    case "lovense":
      return { ...base, power: pick(["Medium","High"]), duration: pick([5,10,15]) };
    case "goal":
      return { ...base, left: Math.max(0, Math.floor(Math.random()*300)) };
    case "knight":
      return { ...base };
    case "purchase":
      return { ...base, price: pick([20,30,60,99]) };
    default:
      return { ...base, text: pick([
        "haha","yes ma'am","you just popped up","Hi sexy","Stunning 😍","Oh yes x",
        "Cum back!","Hello","You just become more beautiful every day","Patience 👑🔥",
        "We're pretty divided politically.","Babe when you come online text me to play pvt..!!",
      ]) };
  }
}

const TYPE_WEIGHTS = ["regular","regular","regular","tip","lovense","regular","regular","purchase","regular"];

function UserBadge({ user, size = 15 }) {
  if (!user) return null;
  const color = LEAGUE_COLORS[user.league] || MUTED;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4 }}>
      {user.ultimate && <span style={{ fontSize:size-3, color: GOLD }}>★</span>}
      <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:size, height:size, borderRadius:"50%", background:color, color:"#000", fontSize:size*0.55, fontWeight:800, flexShrink:0 }}>
        {user.level}
      </span>
      <span style={{ color, fontWeight:700, fontSize:12 }}>{user.name}</span>
    </span>
  );
}

function GoalIcon({ size = 14, color = GREEN }) {
  return <svg width={size} height={size} viewBox="0 0 22 22" fill={color}><path d="M11 1C5.477 1 1 5.477 1 11a10 10 0 0020 0c0-1.16-.21-2.31-.61-3.39l-1.6 1.6c.14.59.21 1.19.21 1.79a8 8 0 11-8-8c.6 0 1.2.07 1.79.21L14.4 1.6C13.31 1.21 12.16 1 11 1zm7 0l-4 4v1.5l-2.55 2.55C11.3 9 11.15 9 11 9a2 2 0 102 2c0-.15 0-.3-.05-.45L15.5 8H17l4-4h-3V1zm-7 4a6 6 0 106 6h-2a4 4 0 11-4-4V5z"/></svg>;
}
function VibrationIcon({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill={GOLD}><path d="M7.878 15.63a1.033 1.033 0 01-1.46-1.46l1.46 1.46Zm5.547-1.46a1.032 1.032 0 11-1.46 1.46l1.46-1.46Zm-7.008 0a4.955 4.955 0 017.008 0l-.73.73-.73.73a2.89 2.89 0 00-4.087 0l-1.46-1.46Z"/><path d="M4.246 10.943a8.026 8.026 0 0111.05-.284l.3.284.07.08a1.033 1.033 0 01-1.452 1.452l-.08-.07-.221-.213a5.96 5.96 0 00-8.206.212 1.033 1.033 0 01-1.461-1.46Z"/></svg>;
}
function KnightIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 100 100" fill={GOLD}><path d="m50 10.4v79.2c-4 0-14.5-4-23.3-15-8.4-10.6-15.4-27.8-16-53.2zm0-9.4-1.3.3-44.2 12.3-3.3 1v3.4c0 29 8.2 49.3 18.4 62.2 10.2 12.8 21.8 18.6 30.4 18.6s20.3-5.8 30.5-18.6 18.5-33 18.5-62.2v-3.4l-3.5-1-44.2-12.3z"/></svg>;
}
function CameraIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 20 13" fill={GOLD}><path d="M19.2 1l-4.5 2.6v-1a2 2 0 00-2-2h-10a2 2 0 00-2 2v7.9c0 1 1 2 2 2h10a2 2 0 002-2v-1l4.5 2.6V.9z"/></svg>;
}
function AlbumIcon({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 100 100" fill={MUTED}><path d="M85.8 2H14.2C8.6 2 4 6 4 11v63.7c0 5 4.6 9 10.2 9h71.6c5.6 0 10.2-4 10.2-9V11c0-5-4.6-9-10.2-9zm0 71.6H14.2V12.2h71.6v61.4zm0 17.2a8 8 0 01-8 8H22.2a8 8 0 01-8-8h71.6zM50 44.2a11.5 11.5 0 110-23 11.5 11.5 0 010 23zm23 15.3v3.8H27v-3.8C27 51.8 42.3 48 50 48c7.7 0 23 3.8 23 11.5z"/></svg>;
}

function ChatMessage({ msg, modelName, color }) {
  switch (msg.type) {
    case "tip":
      return (
        <div style={{ background:"rgba(245,166,35,0.08)", borderRadius:4, padding:"6px 8px" }}>
          <div style={{ fontSize:12 }}>
            <UserBadge user={msg.user} /> <span style={{ color:MUTED }}>tipped</span> <strong style={{ color:GOLD }}>{msg.amount} tk</strong>
          </div>
          {msg.comment && (
            <div style={{ marginTop:5, display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
              <span style={{ display:"inline-flex", alignItems:"center", gap:4, background:"#2a2a2a", border:`1px solid ${BORDER}`, borderRadius:20, padding:"2px 10px", fontSize:10, color:"#ccc", fontWeight:700 }}>
                💬 Tip Menu
              </span>
              <span style={{ fontSize:11, color:"#ccc" }}>{msg.comment}</span>
            </div>
          )}
        </div>
      );
    case "lovense":
      return (
        <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.03)", borderRadius:4, padding:"5px 8px" }}>
          <VibrationIcon />
          <span style={{ fontSize:12, color:"#ccc" }}>
            <span style={{ color:GOLD, fontWeight:700 }}>{msg.power}</span> vibration <span style={{ color:MUTED }}>{msg.duration}s</span> by <span style={{ color:"#ddd" }}>{msg.user.name}</span>
          </span>
        </div>
      );
    case "goal":
      return (
        <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(76,175,80,0.06)", borderLeft:`2px solid ${GREEN}`, borderRadius:4, padding:"6px 8px" }}>
          <GoalIcon />
          <div style={{ fontSize:11, color:"#ccc" }}>
            <strong style={{ color:GREEN }}>{msg.left} tk</strong> left to reach the goal:
            <div style={{ fontSize:11, color:MUTED, marginTop:1 }}>BEND OVER SPANK ASS X5</div>
          </div>
        </div>
      );
    case "knight":
      return (
        <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", fontSize:12, color:MUTED, padding:"4px 2px" }}>
          <CameraIcon /> <span style={{ color:"#ccc", fontWeight:600 }}>{modelName}</span> has Knighted
          <UserBadge user={msg.user} /> <KnightIcon />
        </div>
      );
    case "purchase":
      return (
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 2px" }}>
          <AlbumIcon />
          <span style={{ fontSize:11, color:MUTED }}>
            <UserBadge user={msg.user} /> just purchased <span style={{ color:"#9cc9ff", textDecoration:"underline" }}>photo album</span> for <strong style={{ color:"#ccc" }}>{msg.price}</strong> tokens
          </span>
        </div>
      );
    case "welcome":
      return (
        <div style={{ padding:"6px 2px", fontSize:12, lineHeight:1.6, color:"#ccc" }}>
          <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:2 }}>
            <CameraIcon /> <span style={{ color:"#ccc", fontWeight:700 }}>{modelName}</span>
          </div>
          Hey, sweeties, your tips are much appreciated if you like what you see 😍<br/>
          My pvts are OPEN… who's coming to play? 🔥💋
        </div>
      );
    default:
      return (
        <div style={{ fontSize:12, lineHeight:1.6 }}>
          <UserBadge user={msg.user} /> <span style={{ color:"#ddd" }}>{msg.text}</span>
        </div>
      );
  }
}

function scrollToBottom(el, smooth = true) {
  if (!el) return;
  el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "instant" });
}

export default function LiveChat({ username, viewers, onTipClick }) {
  const [messages, setMessages] = useState(() => {
    const seed = ["welcome", ...Array.from({ length: 10 }, () => pick(TYPE_WEIGHTS))];
    return seed.map(makeMessage);
  });
  const [input, setInput] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const messagesRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setMessages(prev => [...prev, makeMessage(pick(TYPE_WEIGHTS))].slice(-100));
    }, 2500 + Math.random() * 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { if (autoScroll) scrollToBottom(messagesRef.current); }, [messages, autoScroll]);

  const handleScroll = () => {
    const el = messagesRef.current;
    if (!el) return;
    setAutoScroll(el.scrollHeight - el.scrollTop - el.clientHeight < 60);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(), type: "regular",
      user: { name: "You", league: "silver", level: 1 },
      text: input.trim(),
    }]);
    setInput("");
    setAutoScroll(true);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden", background:BG, fontFamily:FONT }}>

      <div
        ref={messagesRef}
        onScroll={handleScroll}
        style={{ flex:1, minHeight:0, overflowY:"auto", overflowX:"hidden", padding:"10px 12px", display:"flex", flexDirection:"column", gap:7, scrollbarWidth:"thin", scrollbarColor:"#333 transparent" }}
      >
        {messages.map(msg => (
          <div key={msg.id} style={{ flexShrink:0 }}>
            <ChatMessage msg={msg} modelName={username} />
          </div>
        ))}
      </div>

      {!autoScroll && (
        <div style={{ textAlign:"center", padding:"5px 0", background:"#161616", borderTop:`1px solid ${BORDER}`, flexShrink:0 }}>
          <button onClick={() => { setAutoScroll(true); scrollToBottom(messagesRef.current); }} style={{ background:"#222", border:`1px solid ${BORDER}`, color:"#ccc", fontSize:11, fontWeight:600, padding:"4px 14px", borderRadius:10, cursor:"pointer", fontFamily:"inherit" }}>
            ↓ New messages
          </button>
        </div>
      )}

      <div style={{ padding:"10px 12px", borderTop:`1px solid ${BORDER}`, display:"flex", gap:8, flexShrink:0, background:BG }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Public message..."
          maxLength={300}
          style={{ flex:1, background:"#1e1e1e", border:`1px solid ${BORDER}`, borderRadius:20, padding:"8px 14px", color:TEXT, fontSize:12, fontFamily:"inherit", outline:"none" }}
        />
        <button style={{ background:"none", border:"none", color:MUTED, cursor:"pointer", padding:4, fontSize:17, lineHeight:1, flexShrink:0 }}>😊</button>
        <button onClick={sendMessage} style={{ background:RED, border:"none", color:"#000", width:32, height:32, borderRadius:"50%", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>➤</button>
      </div>
    </div>
  );
}