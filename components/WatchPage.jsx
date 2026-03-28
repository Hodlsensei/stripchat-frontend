"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StreamPlayer from "./StreamPlayer";
import LiveChat from "./LiveChat";
import TipModal from "./TipModal";

const COLORS = ["#c0392b","#8e24aa","#1e88e5","#00acc1","#43a047","#fb8c00"];
const FLAGS  = ["🇿🇦","🇺🇸","🇧🇷","🇺🇦","🇯🇵","🇫🇷","🇩🇪","🇬🇧"];

export default function WatchPage({ username }) {
  const router = useRouter();
  const [viewers, setViewers]     = useState(Math.floor(Math.random() * 20000) + 1000);
  const [showTip, setShowTip]     = useState(false);
  const [following, setFollowing] = useState(false);
  const [tokens, setTokens]       = useState(0);
  const [activeTab, setActiveTab] = useState("Profile");
  const [goalAmount]              = useState(Math.floor(Math.random() * 300) + 100);
  const [goalCurrent, setGoalCurrent] = useState(Math.floor(Math.random() * 150) + 20);
  const [goalText]                = useState("kepp going fuck anal very hard");
  const [privatePrice]            = useState([8,16,32,60][Math.floor(Math.random()*4)]);

  const color = COLORS[username?.charCodeAt(0) % COLORS.length] || "#c0392b";
  const flag  = FLAGS[username?.charCodeAt(0) % FLAGS.length] || "🇺🇸";
  const goalPct = Math.min(100, Math.round((goalCurrent / goalAmount) * 100));

  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => Math.max(100, v + Math.floor(Math.random() * 20) - 9));
      setGoalCurrent(v => Math.min(goalAmount, v + Math.floor(Math.random() * 3)));
    }, 3000);
    return () => clearInterval(id);
  }, [goalAmount]);

  const tabs = ["Profile", "Videos", "Photos", "Feed"];

  return (
    <div style={{ height:"100vh", background:"#111", display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* ── TOP NAVBAR ── */}
      <div style={{
        height: 48, background:"#1a1a1a", borderBottom:"1px solid rgba(255,255,255,0.08)",
        display:"flex", alignItems:"center", padding:"0 16px", gap:12, flexShrink:0,
      }}>
        {/* Back button */}
        <button onClick={()=>router.back()} style={{background:"none",border:"none",color:"#aaa",cursor:"pointer",padding:"4px 8px",fontSize:20,lineHeight:1}}>‹</button>

        {/* Avatar + name */}
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff",border:"2px solid rgba(255,255,255,0.15)"}}>
            {username?.[0]?.toUpperCase()}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:14,fontWeight:700,color:"#fff"}}>{username}</span>
            <span style={{fontSize:12}}>{flag}</span>
            <span style={{background:"#e53935",color:"#fff",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:3,letterSpacing:".05em"}}>LIVE</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",alignItems:"center",height:"100%",marginLeft:8,gap:2}}>
          {tabs.map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{
              background:"none", border:"none", cursor:"pointer",
              padding:"0 14px", height:"100%", fontSize:13,
              color: activeTab===tab ? "#fff" : "#888",
              borderBottom: activeTab===tab ? "2px solid #e53935" : "2px solid transparent",
              fontFamily:"inherit", fontWeight: activeTab===tab ? 600 : 400,
              transition:"color .15s",
            }}>{tab}</button>
          ))}
        </div>

        {/* Join Fan Club */}
        <button style={{
          marginLeft:4, background:"transparent", border:"1px solid #e53935",
          color:"#e53935", fontSize:12, fontWeight:700, padding:"6px 14px",
          borderRadius:20, cursor:"pointer", fontFamily:"inherit",
          display:"flex", alignItems:"center", gap:6, flexShrink:0,
          transition:"background .15s",
        }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(229,57,53,0.1)"}
          onMouseLeave={e=>e.currentTarget.style.background="transparent"}
        >
          🤍 Join Fan Club
        </button>

        <div style={{flex:1}}/>

        {/* Follow button */}
        <button onClick={()=>setFollowing(f=>!f)} style={{
          background: following?"rgba(229,57,53,0.15)":"transparent",
          border:`1px solid ${following?"#e53935":"rgba(255,255,255,0.2)"}`,
          color: following?"#e53935":"#aaa",
          fontSize:12, padding:"6px 14px", borderRadius:6,
          cursor:"pointer", fontFamily:"inherit", flexShrink:0,
          transition:"all .15s",
        }}>
          {following ? "❤️ Following" : "🤍 Follow"}
        </button>

        {/* Next Model */}
        <button onClick={()=>router.back()} style={{
          background:"none", border:"none", color:"#888", fontSize:13,
          cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4, flexShrink:0,
        }}>
          Next Model <span style={{fontSize:16}}>›</span>
        </button>

        {/* Categories */}
        <button style={{
          background:"none", border:"none", color:"#888", fontSize:13,
          cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6, flexShrink:0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#888"><path d="M4 6h16v2H4zm3 5h10v2H7zm3 5h4v2h-4z"/></svg>
          Categories
        </button>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{flex:1, display:"flex", overflow:"hidden"}}>

        {/* LEFT — Video player */}
        <div style={{flex:1, minWidth:0, display:"flex", flexDirection:"column", background:"#000"}}>
          <StreamPlayer username={username} color={color} emoji="😍" viewers={viewers}/>
        </div>

        {/* RIGHT — Live Chat */}
        <LiveChat username={username} viewers={viewers} onTipClick={()=>setShowTip(true)}/>
      </div>

      {/* ── BOTTOM ACTION BAR ── */}
      <div style={{
        height:52, background:"#1a1a1a", borderTop:"1px solid rgba(255,255,255,0.08)",
        display:"flex", alignItems:"center", padding:"0 16px", gap:12, flexShrink:0,
      }}>
        {/* Heart / follow icon */}
        <button onClick={()=>setFollowing(f=>!f)} style={{
          background:"none", border:"none", cursor:"pointer", padding:6,
          color: following ? "#e53935" : "#888", fontSize:20, lineHeight:1, flexShrink:0,
        }}>
          {following ? "❤️" : "🤍"}
        </button>

        {/* Viewer count */}
        <span style={{fontSize:13,color:"#888",flexShrink:0}}>
          {viewers.toLocaleString()}
        </span>

        {/* Goal bar */}
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
            <span style={{fontSize:11,color:"#888",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
              Goal: <span style={{color:"#f0a500",fontWeight:600}}>{goalCurrent} tk</span> {goalText}
            </span>
            <span style={{fontSize:11,color:"#888",flexShrink:0}}>{goalPct}%</span>
          </div>
          <div style={{width:"100%",height:4,background:"rgba(255,255,255,0.08)",borderRadius:4,overflow:"hidden"}}>
            <div style={{width:`${goalPct}%`,height:"100%",background:"#4caf50",borderRadius:4,transition:"width .5s"}}/>
          </div>
        </div>

        {/* King of the room */}
        <div style={{flexShrink:0,fontSize:11,color:"#888",textAlign:"right",display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
          <span>King of the room:</span>
          <span style={{color:"#f0a500",fontWeight:600}}>🔥 TopFan</span>
        </div>

        {/* Private Show button */}
        <button style={{
          background:"transparent", border:"1px solid rgba(255,255,255,0.25)",
          color:"#fff", fontSize:13, fontWeight:600, padding:"8px 16px",
          borderRadius:6, cursor:"pointer", fontFamily:"inherit", flexShrink:0,
          display:"flex", alignItems:"center", gap:6, transition:"border-color .15s",
        }}
          onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.5)"}
          onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.25)"}
        >
          Private Show <span style={{color:"#f0a500",fontWeight:700}}>{privatePrice} tk</span>
          <span style={{fontSize:12,color:"#888"}}>▼</span>
        </button>

        {/* Send Tip button */}
        <button onClick={()=>setShowTip(true)} style={{
          background:"#4caf50", border:"none", color:"#fff",
          fontSize:13, fontWeight:700, padding:"8px 20px", borderRadius:6,
          cursor:"pointer", fontFamily:"inherit", flexShrink:0,
          display:"flex", alignItems:"center", gap:8, transition:"opacity .15s",
        }}
          onMouseEnter={e=>e.currentTarget.style.opacity=".88"}
          onMouseLeave={e=>e.currentTarget.style.opacity="1"}
        >
          Send Tip
          <div style={{width:26,height:26,borderRadius:"50%",background:"rgba(0,0,0,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🪙</div>
        </button>
      </div>

      {/* Tip Modal */}
      {showTip && (
        <TipModal
          username={username}
          tokens={tokens}
          onClose={()=>setShowTip(false)}
          onTip={(amount)=>{
            setTokens(t=>Math.max(0,t-amount));
            setShowTip(false);
          }}
        />
      )}
    </div>
  );
}