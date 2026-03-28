"use client";
import { useState } from "react";
import Link from "next/link";

const LETTERS = ["Main", "#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

// ── Tiny icon helpers ──────────────────────────────────────────────
function IcBolt() {
  return <svg width={14} height={14} viewBox="0 0 24 24" fill="#facc15" stroke="none" style={{display:"inline",verticalAlign:"middle",marginRight:4}}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
}
function IcVR() {
  return <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,padding:"1px 4px",borderRadius:3,background:"#7c3aed",color:"#fff",marginRight:5,verticalAlign:"middle"}}>VR</span>;
}
function IcMobile() {
  return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth={2} strokeLinecap="round" style={{display:"inline",verticalAlign:"middle",marginRight:4}}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
}
function IcRecord() {
  return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth={2} style={{display:"inline",verticalAlign:"middle",marginRight:4}}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="#aaa"/></svg>;
}
function IcTicket() {
  return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth={2} style={{display:"inline",verticalAlign:"middle",marginRight:4}}><path d="M2 9a2 2 0 012-2h16a2 2 0 012 2v1a2 2 0 000 4v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1a2 2 0 000-4V9z"/></svg>;
}
function IcKey() {
  return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth={2} style={{display:"inline",verticalAlign:"middle",marginRight:4}}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;
}
function IcBDSM() {
  return <svg width={14} height={14} viewBox="0 0 24 24" fill="#aaa" stroke="none" style={{display:"inline",verticalAlign:"middle",marginRight:4}}><path d="M12 2C7 2 3 6 3 11c0 2.5 1 4.7 2.6 6.3L4 20h2l1.3-2H12h4.7L18 20h2l-1.6-2.7C20 15.7 21 13.5 21 11c0-5-4-9-9-9zm-3 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/></svg>;
}
function IcInteractive() {
  return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth={2} strokeLinecap="round" style={{display:"inline",verticalAlign:"middle",marginRight:4}}><circle cx="17" cy="7" r="3"/><path d="M14.5 9.5L3 21"/><path d="M13 11l1.5 1.5"/></svg>;
}

const Hot = () => <span style={{color:"#ec4899",fontSize:11,marginLeft:2}}>✦✦</span>;
const Flag = ({code}) => <img src={`https://flagcdn.com/w20/${code}.png`} width={18} height={13} alt={code} style={{borderRadius:2,marginRight:6,objectFit:"cover",verticalAlign:"middle",flexShrink:0}}/>;

// ── Core item ──────────────────────────────────────────────────────
function Item({label, count, hot, icon, flag}) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{display:"flex",alignItems:"center",padding:"3.5px 0"}}>
      {flag && <Flag code={flag}/>}
      {icon==="bolt"      && <IcBolt/>}
      {icon==="vr"        && <IcVR/>}
      {icon==="mobile"    && <IcMobile/>}
      {icon==="record"    && <IcRecord/>}
      {icon==="ticket"    && <IcTicket/>}
      {icon==="key"       && <IcKey/>}
      {icon==="bdsm"      && <IcBDSM/>}
      {icon==="interact"  && <IcInteractive/>}
      <Link href="#" style={{textDecoration:"none",color:hov?"#e5192b":"#e5e5e5",transition:"color .12s",fontSize:13.5,fontWeight:500,lineHeight:1}}
        onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
        {label}
        {hot && <Hot/>}
        {typeof count==="number" && count>0 &&
          <span style={{color:"#6b7280",fontWeight:400,marginLeft:5,fontSize:13}}>{count.toLocaleString()}</span>}
      </Link>
    </div>
  );
}

// ── Column header — full-width dark bar ────────────────────────────
function CH({title, span}) {
  return (
    <div style={{
      background:"#1e1e1e", padding:"6px 12px",
      fontSize:10.5, fontWeight:700, letterSpacing:".09em",
      textTransform:"uppercase", color:"#6b7280",
      marginBottom:8, gridColumn: span ? `span ${span}` : undefined,
      boxSizing:"border-box",
    }}>{title}</div>
  );
}

// ── Section title ──────────────────────────────────────────────────
function ST({icon, title}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
      <span style={{color:"#d1d5db",display:"flex"}}>{icon}</span>
      <h2 style={{margin:0,fontSize:22,fontWeight:700,color:"#fff",letterSpacing:"-0.3px"}}>{title}</h2>
    </div>
  );
}

const IcEye = <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/></svg>;
const IcThumb = <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>;
const IcGrid = <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
const IcHeel = <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M20 20H4l4-8 4 4 4-8 4 12z"/></svg>;
const IcGlobe = <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;

const S = {marginBottom:52};
const grid5 = {display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:0};

// ── SECTIONS ───────────────────────────────────────────────────────

function Appearance() {
  return (
    <div style={S}>
      <ST icon={IcEye} title="Appearance"/>
      <div style={grid5}>
        <div>
          <CH title="AGE"/>
          {[["Teen 18+",1426],["Young 22+",3998],["MILF",1207],["Mature",218],["Granny",25]].map(([l,c])=><Item key={l} label={l} count={c}/>)}
        </div>
        <div>
          <CH title="ETHNICITY"/>
          {[["Arab",95],["Asian",856],["Ebony",644],["Indian",357],["Latina",2995],["Mixed",240],["White",2217]].map(([l,c])=><Item key={l} label={l} count={c}/>)}
        </div>
        <div>
          <CH title="BODY TYPE"/>
          {[["Skinny",2534],["Athletic",602],["Medium",2314],["Curvy",1563],["BBW",386]].map(([l,c])=><Item key={l} label={l} count={c}/>)}
        </div>
        <div>
          <CH title="HAIR"/>
          {[["Blonde",1084],["Black",2045],["Brunette",3444],["Redhead",361],["Colorful",390]].map(([l,c])=><Item key={l} label={l} count={c}/>)}
        </div>
        <div>
          <CH title="BODY TRAITS"/>
          {[["Bald",17],["Big Ass",4407],["Big Clit",1519],["Big Nipples",2068],["Big Tits",3072],null,["Hairy armpits",423],["Hairy Pussy",1124],["Shaven",3893],["Small Tits",2290],["Trimmed",1646]].map((i,idx)=>
            i ? <Item key={i[0]} label={i[0]} count={i[1]}/> : <div key={idx} style={{height:8}}/>
          )}
        </div>
      </div>
    </div>
  );
}

function Activities() {
  const PS = [
    {label:"8-12 tk",count:3187},{label:"16-24 tk",count:2185},{label:"32-60 tk",count:1589},
    {label:"90+ tk",count:361},{label:"Video Call (Cam2Cam)",count:6904},
    {label:"Recordable Privates",count:5195},{label:"Spy on Shows",count:377},
  ];
  const A1 = [
    {label:"69 Position",count:1090},{label:"Ahegao",count:4358},{label:"Anal",count:2945,hot:true},
    {label:"Anal Toys",count:2409},{label:"Ass to Mouth",count:1236},{label:"Blowjob",count:5339,hot:true},
    {label:"Bukkake",count:167},{label:"Camel Toe",count:3868},{label:"Cock Rating",count:2980},
    {label:"Cosplay",count:1163,hot:true},{label:"Cowgirl",count:4063},{label:"Creampie",count:1820},
    {label:"Cumshot",count:1312},{label:"Deepthroat",count:4386,hot:true},{label:"Dildo or Vibrator",count:5424},
    {label:"Dirty Talk",count:5110},{label:"Doggy Style",count:6119,hot:true},{label:"Double Penetration",count:1602},
  ];
  const A2 = [
    {label:"Erotic Dance",count:5816},{label:"Facesitting",count:1789},{label:"Facial",count:1848},
    {label:"Fingering",count:6127,hot:true},{label:"Fisting",count:802},{label:"Flashing",count:3151},
    {label:"Footjob",count:1945},{label:"Foursome",count:23},{label:"Fuck Machine",count:787,hot:true},
    {label:"Gagging",count:1963},{label:"Gangbang",count:43},{label:"Gape",count:706},
    {label:"Glory Hole",count:158},{label:"Handjob",count:3269},{label:"Hardcore",count:278},
    {label:"Humiliation",count:3140},{label:"Jerk-off Instruction",count:2743},{label:"Massage",count:1689},
  ];
  const A3 = [
    {label:"Masturbation",count:5948},{label:"Nipple Toys",count:2278},{label:"Oil Show",count:5218},
    {label:"Orgasm",count:4791},{label:"Pegging",count:305},{label:"Pussy Licking",count:650},
    {label:"Role Play",count:3419},{label:"Sex Toys",count:4967},{label:"Sexting",count:5110},
    {label:"Shower",count:1810},{label:"Spanking",count:5713},{label:"Squirt",count:3510},
    {label:"Strapon",count:547},{label:"Striptease",count:5443},{label:"Swing",count:176},
    {label:"Threesome",count:46},{label:"Tittyfuck",count:4162},{label:"Topless",count:4833},
  ];
  const A4 = [
    {label:"Twerk",count:4650},{label:"Upskirt",count:2453},{label:"Yoga",count:1427},
  ];
  const DV = [
    {label:"Anal Toys",count:2409},{label:"Dildo or Vibrator",count:5424},
    {label:"Fuck Machine",count:787,hot:true},{label:"Interactive Toy",count:4493,icon:"interact"},
    {label:"Kiiroo",count:3},{label:"Lovense",count:4493},
    {label:"Nipple Toys",count:2278},{label:"Sex Toys",count:4967},{label:"Strapon",count:547},
  ];

  return (
    <div style={S}>
      <ST icon={IcThumb} title="Activities on Request"/>
      {/* Grid: PS(1) | ACTIVITIES header spanning 4 cols | DEVICE(1) */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr", gap:0}}>
        {/* Private Show */}
        <div>
          <CH title="PRIVATE SHOW"/>
          {PS.map(i=><Item key={i.label} {...i}/>)}
        </div>
        {/* Activities — spans 4 columns */}
        <div style={{gridColumn:"span 4"}}>
          <div style={{background:"#1e1e1e",padding:"6px 12px",fontSize:10.5,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",color:"#6b7280",marginBottom:8}}>ACTIVITIES</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0}}>
            <div>{A1.map(i=><Item key={i.label} {...i}/>)}</div>
            <div>{A2.map(i=><Item key={i.label} {...i}/>)}</div>
            <div>{A3.map(i=><Item key={i.label} {...i}/>)}</div>
            <div>{A4.map(i=><Item key={i.label} {...i}/>)}</div>
          </div>
        </div>
        {/* Device */}
        <div>
          <CH title="DEVICE"/>
          {DV.map(i=><Item key={i.label} {...i}/>)}
        </div>
      </div>
    </div>
  );
}

function Specifics() {
  const SUB = [
    {label:"Anime Girls",count:429},{label:"Club Girls",count:224},{label:"E-girl",count:195},
    {label:"Emo",count:193},{label:"Gamers",count:252},{label:"Glamour",count:942},
    {label:"Goth",count:374},{label:"Gym Babe",count:528},{label:"Housewives",count:767},
    {label:"K-pop",count:146},{label:"Nerds",count:156},{label:"Punks",count:71},
    {label:"Queers",count:45},{label:"Romantic",count:1262},{label:"Student",count:2434},
    {label:"Tomboys",count:115},
  ];
  const BC = [
    {label:"HD",count:6607},
    {label:"Mobile",count:1557,icon:"mobile"},
    {label:"Recordable",count:5467,icon:"record"},
    {label:"VR Cams",count:218,icon:"vr"},
  ];
  const ST2 = [
    {label:"ASMR",count:159},{label:"Cooking",count:994},{label:"Flirting",count:31,icon:"key"},
    {label:"Group Sex",count:95},{label:"Interracial",count:7},{label:"New Models",count:1153,icon:"bolt"},
    {label:"Office",count:977},{label:"Old & Young 22+",count:32},{label:"Outdoor",count:1019},
    {label:"Pornstars",count:1},{label:"POV",count:1269},
    {label:"Ticket & Group Shows",count:135,icon:"ticket"},{label:"Video Games",count:90,hot:true},
    {label:"VTubers",count:2},
  ];

  return (
    <div style={S}>
      <ST icon={IcGrid} title="Specifics"/>
      <div style={grid5}>
        <div><CH title="SUBCULTURES"/>{SUB.map(i=><Item key={i.label} {...i}/>)}</div>
        <div><CH title="BROADCAST"/>{BC.map(i=><Item key={i.label} {...i}/>)}</div>
        <div><CH title="SHOW TYPE"/>{ST2.map(i=><Item key={i.label} {...i}/>)}</div>
        <div><CH title="GENDER IDENTITY"/><Item label="Non-binary" count={42}/></div>
        <div><CH title="ORIENTATION"/><Item label="Lesbian" count={149}/></div>
      </div>
    </div>
  );
}

function Fetishes() {
  const C1=[{label:"BDSM",count:82,icon:"bdsm"},{label:"Cock Rating",count:2998},{label:"Corset",count:888},{label:"Cuckold",count:879},{label:"Foot Fetish",count:4665,hot:true},{label:"Heels",count:3956}];
  const C2=[{label:"Jeans",count:364},{label:"Latex",count:934},{label:"Leather",count:1165},{label:"Mistress",count:1442},{label:"Nylon",count:1760},{label:"Piercing",count:646}];
  const C3=[{label:"Pregnant",count:30},{label:"Smoking",count:2347},{label:"Sport Gear",count:427},{label:"Tattoos",count:1004}];

  return (
    <div style={S}>
      <ST icon={IcHeel} title="Fetishes & Kinks"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr) 1fr 1fr",gap:0}}>
        <div>
          <CH title="FETISHES & KINKS"/>
          {C1.map(i=><Item key={i.label} {...i}/>)}
        </div>
        <div style={{paddingTop:30}}>{C2.map(i=><Item key={i.label} {...i}/>)}</div>
        <div style={{paddingTop:30}}>{C3.map(i=><Item key={i.label} {...i}/>)}</div>
        <div/><div/>
      </div>
    </div>
  );
}

function Countries() {
  const NA=[{label:"American",count:190,flag:"us"},{label:"Canadian",count:19,flag:"ca"},{label:"Mexican",count:35,flag:"mx"}];
  const SA=[{label:"Argentinian",count:38,flag:"ar"},{label:"Brazilian",count:58,flag:"br"},{label:"Chilean",count:6,flag:"cl"},{label:"Colombian",count:3045,flag:"co"},{label:"Ecuadorian",count:9,flag:"ec"},{label:"Peruvian",count:15,flag:"pe"},{label:"Uruguayan",count:0,flag:"uy"},{label:"Venezuelan",count:179,flag:"ve"}];
  const EU1=[{label:"Austrian",count:1,flag:"at"},{label:"Belgian",count:1,flag:"be"},{label:"Bulgarian",count:1,flag:"bg"},{label:"Croatian",count:0,flag:"hr"},{label:"Czech",count:1,flag:"cz"},{label:"Danish",count:1,flag:"dk"},{label:"Dutch",count:1,flag:"nl"},{label:"Estonian",count:1,flag:"ee"},{label:"Finnish",count:0,flag:"fi"},{label:"French",count:14,flag:"fr"},{label:"Georgian",count:0,flag:"ge"},{label:"German",count:21,flag:"de"},{label:"Greek",count:3,flag:"gr"},{label:"Hungarian",count:3,flag:"hu"},{label:"Irish",count:1,flag:"ie"},{label:"Italian",count:16,flag:"it"}];
  const EU2=[{label:"Latvian",count:3,flag:"lv"},{label:"Lithuanian",count:1,flag:"lt"},{label:"Nordic",count:11,flag:"no"},{label:"Norwegian",count:1,flag:"no"},{label:"Polish",count:3,flag:"pl"},{label:"Portuguese",count:9,flag:"pt"},{label:"Romanian",count:163,flag:"ro"},{label:"Serbian",count:1,flag:"rs"},{label:"Slovakian",count:1,flag:"sk"},{label:"Slovenian",count:0,flag:"si"},{label:"Spanish",count:11,flag:"es"},{label:"Swedish",count:10,flag:"se"},{label:"Swiss",count:2,flag:"ch"},{label:"UK Models",count:20,flag:"gb"},{label:"Ukrainian",count:64,flag:"ua"}];
  const AP=[{label:"Australian",count:2,flag:"au"},{label:"Chinese",count:174,flag:"cn"},{label:"Filipino",count:72,flag:"ph"},{label:"Indian",count:367,flag:"in"},{label:"Japanese",count:48,flag:"jp"},{label:"Korean",count:1,flag:"kr"},{label:"Malaysian",count:1,flag:"my"},{label:"Sri Lankan",count:20,flag:"lk"},{label:"Thai",count:7,flag:"th"},{label:"Vietnamese",count:220,flag:"vn"}];
  const AF=[{label:"African",count:292,flag:"ng"},{label:"Kenyan",count:62,flag:"ke"},{label:"Malagasy",count:1,flag:"mg"},{label:"Nigerian",count:1,flag:"ng"},{label:"South African",count:171,flag:"za"},{label:"Ugandan",count:1,flag:"ug"},{label:"Zimbabwean",count:32,flag:"zw"}];
  const ME=[{label:"Arab",count:101,flag:"sa"},{label:"Israeli",count:2,flag:"il"},{label:"Turkish",count:4,flag:"tr"}];
  const LG=[{label:"Portuguese Speaking",count:58,flag:"pt"},{label:"Russian Speaking",count:549,flag:"ru"},{label:"Spanish Speaking",count:3342,flag:"es"}];

  return (
    <div style={S}>
      <ST icon={IcGlobe} title="Countries & Languages"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr 1fr 1fr 1fr",gap:0}}>
        {/* Col 1: North + South America */}
        <div>
          <CH title="NORTH AMERICA"/>
          {NA.map(i=><Item key={i.label} {...i}/>)}
          <div style={{height:16}}/>
          <CH title="SOUTH AMERICA"/>
          {SA.map(i=><Item key={i.label} {...i}/>)}
        </div>
        {/* Col 2: Europe — 2 internal columns */}
        <div>
          <CH title="EUROPE"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
            <div>{EU1.map(i=><Item key={i.label} {...i}/>)}</div>
            <div>{EU2.map(i=><Item key={i.label} {...i}/>)}</div>
          </div>
        </div>
        {/* Col 3: Asia Pacific */}
        <div>
          <CH title="ASIA & PACIFIC"/>
          {AP.map(i=><Item key={i.label} {...i}/>)}
        </div>
        {/* Col 4: Africa */}
        <div>
          <CH title="AFRICA"/>
          {AF.map(i=><Item key={i.label} {...i}/>)}
        </div>
        {/* Col 5: Middle East + Languages */}
        <div>
          <CH title="MIDDLE EAST"/>
          {ME.map(i=><Item key={i.label} {...i}/>)}
          <div style={{height:16}}/>
          <CH title="LANGUAGES"/>
          {LG.map(i=><Item key={i.label} {...i}/>)}
        </div>
      </div>
    </div>
  );
}

// ── FOOTER matching reference exactly ─────────────────────────────
function Footer() {
  return (
    <div style={{background:"#181818",borderTop:"1px solid #222",padding:"40px 24px 0"}}>
      <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr 1.2fr 0.8fr 1fr",gap:40,marginBottom:40}}>

        {/* Brand column */}
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:"#1a1a1a",border:"2px solid #333",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="#e5192b"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
            </div>
            <span style={{fontSize:15,fontWeight:800,color:"#fff",letterSpacing:"0.3px"}}>
              STRIP<span style={{color:"#e5192b"}}>CHAT</span>BATE
            </span>
          </div>

          {/* Language selector */}
          <div style={{display:"inline-flex",alignItems:"center",gap:8,border:"1px solid #333",borderRadius:6,padding:"6px 12px",marginBottom:20,cursor:"pointer",background:"#1e1e1e"}}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <span style={{color:"#d1d5db",fontSize:13}}>English</span>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth={2}><polyline points="6 9 12 15 18 9"/></svg>
          </div>

          <p style={{color:"#6b7280",fontSize:12.5,lineHeight:1.75,margin:"0 0 12px"}}>
            Stripchatbate is the world&apos;s premier 18+ LIVE adult entertainment destination for real connection and adult play. Watch, chat, and explore your desires with real people streaming live every day, and over 150,000 amateurs, professionals, and couples to choose from every month. You&apos;re guaranteed to find your dream match on Stripchatbate.
          </p>
          <p style={{color:"#6b7280",fontSize:12.5,lineHeight:1.75,margin:"0 0 20px"}}>
            Experience real live sex and sex live shows without scripts, filters, or bots. Every show is live and interactive: talk, tip, take control of interactive toys, or go private to share the moment. This is adult entertainment built on real attention and human connection — where you&apos;re not just watching, you&apos;re part of it.
          </p>
          <p style={{color:"#4b5563",fontSize:12,lineHeight:1.6,margin:"0 0 24px"}}>
            All models appearing on this site have contractually confirmed to us that they are 18 years of age or older.
          </p>

          {/* QR Code box */}
          <div style={{border:"1px solid #2a2a2a",borderRadius:8,padding:"16px",display:"flex",gap:14,alignItems:"center",marginBottom:0,background:"#1a1a1a",maxWidth:320}}>
            {/* QR code SVG placeholder */}
            <div style={{width:68,height:68,flexShrink:0,background:"#fff",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width={56} height={56} viewBox="0 0 56 56" fill="none">
                {/* QR pattern */}
                <rect width={56} height={56} fill="white"/>
                <rect x={4} y={4} width={20} height={20} rx={2} fill="#111"/>
                <rect x={7} y={7} width={14} height={14} rx={1} fill="white"/>
                <rect x={10} y={10} width={8} height={8} rx={1} fill="#111"/>
                <rect x={32} y={4} width={20} height={20} rx={2} fill="#111"/>
                <rect x={35} y={7} width={14} height={14} rx={1} fill="white"/>
                <rect x={38} y={10} width={8} height={8} rx={1} fill="#111"/>
                <rect x={4} y={32} width={20} height={20} rx={2} fill="#111"/>
                <rect x={7} y={35} width={14} height={14} rx={1} fill="white"/>
                <rect x={10} y={38} width={8} height={8} rx={1} fill="#111"/>
                <rect x={32} y={32} width={4} height={4} fill="#111"/>
                <rect x={38} y={32} width={4} height={4} fill="#111"/>
                <rect x={44} y={32} width={4} height={4} fill="#111"/>
                <rect x={32} y={38} width={4} height={4} fill="#111"/>
                <rect x={44} y={38} width={4} height={4} fill="#111"/>
                <rect x={38} y={44} width={4} height={4} fill="#111"/>
                <rect x={44} y={44} width={4} height={4} fill="#111"/>
                <rect x={26} y={4} width={4} height={4} fill="#111"/>
                <rect x={26} y={10} width={4} height={4} fill="#111"/>
                <rect x={26} y={16} width={4} height={4} fill="#111"/>
                <rect x={4} y={26} width={4} height={4} fill="#111"/>
                <rect x={10} y={26} width={4} height={4} fill="#111"/>
                <rect x={16} y={26} width={4} height={4} fill="#111"/>
                <rect x={22} y={26} width={4} height={4} fill="#111"/>
              </svg>
            </div>
            <div>
              <div style={{color:"#fff",fontSize:13.5,fontWeight:600,marginBottom:4}}>Get Stripchatbate App</div>
              <div style={{color:"#6b7280",fontSize:12,lineHeight:1.5}}>For quick mobile access & notifications, scan the QR code with your phone camera</div>
            </div>
          </div>
        </div>

        {/* Stripchatbate links */}
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",marginBottom:16,paddingBottom:12,borderBottom:"1px solid #222"}}>STRIPCHATBATE</div>
          {["About Stripchatbate","Blog","X","Reddit","Media Inquiries"].map(l=>(
            <Link key={l} href="#" style={{display:"block",color:"#9ca3af",fontSize:13.5,textDecoration:"none",marginBottom:2,padding:"5px 0",borderBottom:"1px solid #1e1e1e"}}
              onMouseEnter={e=>e.currentTarget.style.color="#fff"}
              onMouseLeave={e=>e.currentTarget.style.color="#9ca3af"}>{l}</Link>
          ))}
        </div>

        {/* Legal */}
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",marginBottom:16,paddingBottom:12,borderBottom:"1px solid #222"}}>LEGAL & SAFETY</div>
          {["Privacy Policy","Terms of Use","DMCA Policy","Cookies Policy","Parental Control Guide","EU Research Program","Anti-Slavery Help"].map(l=>(
            <Link key={l} href="#" style={{display:"block",color:"#9ca3af",fontSize:13.5,textDecoration:"none",marginBottom:2,padding:"5px 0",borderBottom:"1px solid #1e1e1e"}}
              onMouseEnter={e=>e.currentTarget.style.color="#fff"}
              onMouseLeave={e=>e.currentTarget.style.color="#9ca3af"}>{l}</Link>
          ))}
        </div>

        {/* Work with us */}
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",marginBottom:16,paddingBottom:12,borderBottom:"1px solid #222"}}>WORK WITH US</div>
          {["Affiliate Program"].map(l=>(
            <Link key={l} href="#" style={{display:"block",color:"#9ca3af",fontSize:13.5,textDecoration:"none",marginBottom:2,padding:"5px 0",borderBottom:"1px solid #1e1e1e"}}
              onMouseEnter={e=>e.currentTarget.style.color="#fff"}
              onMouseLeave={e=>e.currentTarget.style.color="#9ca3af"}>{l}</Link>
          ))}
          <div style={{height:24}}/>
          <button style={{border:"1px solid #4b5563",borderRadius:20,padding:"10px 20px",background:"none",color:"#d1d5db",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>
            I Have Questions Left
          </button>
        </div>

        {/* Help */}
        <div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",marginBottom:16,paddingBottom:12,borderBottom:"1px solid #222"}}>HELP & SUPPORT</div>
          {["Support & FAQ","Billing Support","DMCA Protection"].map(l=>(
            <Link key={l} href="#" style={{display:"block",color:"#9ca3af",fontSize:13.5,textDecoration:"none",marginBottom:2,padding:"5px 0",borderBottom:"1px solid #1e1e1e"}}
              onMouseEnter={e=>e.currentTarget.style.color="#fff"}
              onMouseLeave={e=>e.currentTarget.style.color="#9ca3af"}>{l}</Link>
          ))}
        </div>
      </div>

      {/* Bottom bar with RTA badges */}
      <div style={{borderTop:"1px solid #1e1e1e",padding:"20px 0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:20}}>
          {/* RTA badge */}
          <div style={{border:"1px solid #333",borderRadius:4,padding:"4px 8px",color:"#555",fontSize:10,fontWeight:700,letterSpacing:".05em"}}>RTA</div>
          {/* SafeLabeling */}
          <div style={{color:"#444",fontSize:10,fontWeight:600}}>SafeLabeling.org<br/><span style={{fontWeight:400}}>COMPLIANT WEBSITE</span></div>
          {/* ASACP */}
          <div style={{border:"1px solid #333",borderRadius:4,padding:"4px 8px",color:"#555",fontSize:10,fontWeight:700}}>ASACP<br/><span style={{fontWeight:400,fontSize:9}}>APPROVED MEMBER</span></div>
        </div>
        <span style={{color:"#374151",fontSize:11.5}}>18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement</span>
        <span style={{border:"1px solid #374151",borderRadius:4,padding:"3px 10px",color:"#6b7280",fontSize:13,fontWeight:600}}>18+</span>
      </div>
    </div>
  );
}

// ── MAIN ───────────────────────────────────────────────────────────
export default function AllCategoriesPage() {
  const [active, setActive] = useState("Main");
  const [search, setSearch] = useState("");

  return (
    <div style={{background:"#111",minHeight:"100%",fontFamily:"'Inter',-apple-system,'Segoe UI',sans-serif",color:"#e5e5e5"}}>

      {/* Header */}
      <div style={{padding:"24px 24px 0"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:20}}>
          <h1 style={{margin:0,fontSize:26,fontWeight:700,color:"#fff",letterSpacing:"-0.5px"}}>
            All Categories — Cam Girls on Live Sex Chat
          </h1>
          <div style={{display:"flex",alignItems:"center",gap:8,background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:20,padding:"8px 16px",width:220}}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find categories"
              style={{background:"none",border:"none",outline:"none",color:"#e0e0e0",fontSize:13,width:"100%",fontFamily:"inherit"}}/>
          </div>
        </div>

        {/* Alphabet bar */}
        <div style={{display:"flex",borderBottom:"1px solid #1e1e1e",overflowX:"auto",scrollbarWidth:"none"}}>
          {LETTERS.map(l=>(
            <button key={l} onClick={()=>setActive(l)} style={{
              background:"none",border:"none",cursor:"pointer",padding:"8px 9px",
              fontSize:13,fontWeight:active===l?700:400,
              color:active===l?"#e5192b":"#6b7280",
              borderBottom:active===l?"2px solid #e5192b":"2px solid transparent",
              marginBottom:-1,transition:"color .12s",whiteSpace:"nowrap",fontFamily:"inherit",
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div style={{padding:"32px 24px 0"}}>
        <Appearance/>
        <div style={{height:1,background:"#1e1e1e",margin:"8px 0 40px"}}/>
        <Activities/>
        <div style={{height:1,background:"#1e1e1e",margin:"8px 0 40px"}}/>
        <Specifics/>
        <div style={{height:1,background:"#1e1e1e",margin:"8px 0 40px"}}/>
        <Fetishes/>
        <div style={{height:1,background:"#1e1e1e",margin:"8px 0 40px"}}/>
        <Countries/>
      </div>

      <Footer/>
    </div>
  );
}