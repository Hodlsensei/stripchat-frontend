"use client";
import { useState } from "react";
import Link from "next/link";

const LETTERS = ["Main","#","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

// ── Icons ──────────────────────────────────────────────────────────
const IcBolt  = () => <svg width={13} height={13} viewBox="0 0 24 24" fill="#facc15" stroke="none" style={{display:"inline",verticalAlign:"middle",marginRight:3}}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
const IcVR    = () => <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,padding:"1px 4px",borderRadius:3,background:"#7c3aed",color:"#fff",marginRight:5,verticalAlign:"middle"}}>VR</span>;
const IcMob   = () => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" style={{display:"inline",verticalAlign:"middle",marginRight:4}}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
const IcRec   = () => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} style={{display:"inline",verticalAlign:"middle",marginRight:4}}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="#9ca3af"/></svg>;
const IcTkt   = () => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} style={{display:"inline",verticalAlign:"middle",marginRight:4}}><path d="M2 9a2 2 0 012-2h16a2 2 0 012 2v1a2 2 0 000 4v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1a2 2 0 000-4V9z"/></svg>;
const IcKey   = () => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} style={{display:"inline",verticalAlign:"middle",marginRight:4}}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;
const IcBDSM  = () => <svg width={13} height={13} viewBox="0 0 24 24" fill="#9ca3af" stroke="none" style={{display:"inline",verticalAlign:"middle",marginRight:4}}><path d="M12 2C7 2 3 6 3 11c0 2.5 1 4.7 2.6 6.3L4 20h2l1.3-2H12h4.7L18 20h2l-1.6-2.7C20 15.7 21 13.5 21 11c0-5-4-9-9-9zm-3 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/></svg>;
const IcItoy  = () => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" style={{display:"inline",verticalAlign:"middle",marginRight:4}}><circle cx="17" cy="7" r="3"/><path d="M14.5 9.5L3 21"/><path d="M13 11l1.5 1.5"/></svg>;
const Hot     = () => <span style={{color:"#ec4899",fontSize:11,marginLeft:2}}>✦✦</span>;
const Flag    = ({c}) => <img src={`https://flagcdn.com/w20/${c}.png`} width={20} height={14} alt={c} style={{borderRadius:2,marginRight:7,objectFit:"cover",verticalAlign:"middle",flexShrink:0,display:"inline"}}/>;

// ── Single item ────────────────────────────────────────────────────
function Item({label,count,hot,ic,flag}){
  const [h,setH]=useState(false);
  return(
    <div style={{display:"flex",alignItems:"center",padding:"4px 0"}}>
      {flag&&<Flag c={flag}/>}
      {ic==="bolt"  &&<IcBolt/>}
      {ic==="vr"    &&<IcVR/>}
      {ic==="mob"   &&<IcMob/>}
      {ic==="rec"   &&<IcRec/>}
      {ic==="tkt"   &&<IcTkt/>}
      {ic==="key"   &&<IcKey/>}
      {ic==="bdsm"  &&<IcBDSM/>}
      {ic==="itoy"  &&<IcItoy/>}
      <Link href="#" style={{textDecoration:"none",color:h?"#e5192b":"#e5e7eb",transition:"color .1s",fontSize:14,lineHeight:1}}
        onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>
        <span style={{fontWeight:500}}>{label}</span>
        {hot&&<Hot/>}
        {count>0&&<span style={{color:"#6b7280",fontWeight:400,marginLeft:5,fontSize:13.5}}>{count.toLocaleString()}</span>}
      </Link>
    </div>
  );
}

// ── Column header bar ──────────────────────────────────────────────
function CH({t}){
  return(
    <div style={{background:"#1f2937",padding:"5px 12px",fontSize:10,fontWeight:700,
      letterSpacing:".1em",textTransform:"uppercase",color:"#6b7280",marginBottom:10}}>
      {t}
    </div>
  );
}

// ── Section title ──────────────────────────────────────────────────
function ST({icon,title}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:22}}>
      <span style={{color:"#d1d5db",display:"flex"}}>{icon}</span>
      <h2 style={{margin:0,fontSize:22,fontWeight:700,color:"#fff",letterSpacing:"-0.3px"}}>{title}</h2>
    </div>
  );
}

const EYE  = <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/></svg>;
const HAND = <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>;
const GRID = <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
const HEEL = <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M20 20H4l4-8 4 4 4-8 4 12z"/></svg>;
const GLOB = <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;

const W = "100%";
const g5 = {display:"grid",gridTemplateColumns:"repeat(5,1fr)",columnGap:0,rowGap:0};

// ── APPEARANCE ─────────────────────────────────────────────────────
function Appearance(){
  return(
    <div style={{marginBottom:56}}>
      <ST icon={EYE} title="Appearance"/>
      <div style={g5}>
        <div><CH t="AGE"/>
          {[["Teen 18+",1784],["Young 22+",4374],["MILF",1540],["Mature",304],["Granny",67]].map(([l,c])=><Item key={l} label={l} count={c}/>)}
        </div>
        <div><CH t="ETHNICITY"/>
          {[["Arab",173],["Asian",980],["Ebony",599],["Indian",370],["Latina",3755],["Mixed",240],["White",2475]].map(([l,c])=><Item key={l} label={l} count={c}/>)}
        </div>
        <div><CH t="BODY TYPE"/>
          {[["Skinny",3070],["Athletic",713],["Medium",2691],["Curvy",1682],["BBW",423]].map(([l,c])=><Item key={l} label={l} count={c}/>)}
        </div>
        <div><CH t="HAIR"/>
          {[["Blonde",1275],["Black",2531],["Brunette",3908],["Redhead",422],["Colorful",390]].map(([l,c])=><Item key={l} label={l} count={c}/>)}
        </div>
        <div><CH t="BODY TRAITS"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:24}}>
            <div>
              {[["Bald",16],["Big Ass",5069],["Big Clit",1845],["Big Nipples",2407],["Big Tits",3535]].map(([l,c])=><Item key={l} label={l} count={c}/>)}
            </div>
            <div>
              {[["Hairy armpits",528],["Hairy Pussy",1308],["Shaven",4676],["Small Tits",2804],["Trimmed",2128]].map(([l,c])=><Item key={l} label={l} count={c}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ACTIVITIES ─────────────────────────────────────────────────────
function Activities(){
  const PS=[
    {l:"8-12 tk",c:3964},{l:"16-24 tk",c:2334},{l:"32-60 tk",c:1707},{l:"90+ tk",c:423},
    {l:"Video Call (Cam2Cam)",c:7986},{l:"Recordable Privates",c:6110},{l:"Spy on Shows",c:389},
  ];
  const A1=[
    {l:"69 Position",c:1244},{l:"Ahegao",c:5256},{l:"Anal",c:3110,hot:true},{l:"Anal Toys",c:2623},
    {l:"Ass to Mouth",c:1355},{l:"Blowjob",c:6102,hot:true},{l:"Bukkake",c:200},{l:"Camel Toe",c:4743},
    {l:"Cock Rating",c:3529},{l:"Cosplay",c:1400,hot:true},{l:"Cowgirl",c:4638},{l:"Creampie",c:2180},
    {l:"Cumshot",c:1439},{l:"Deepthroat",c:5011,hot:true},{l:"Dildo or Vibrator",c:6168},
    {l:"Dirty Talk",c:5900},{l:"Doggy Style",c:6904,hot:true},{l:"Double Penetration",c:1745},
  ];
  const A2=[
    {l:"Erotic Dance",c:6823},{l:"Facesitting",c:1922},{l:"Facial",c:2022},
    {l:"Fingering",c:6902,hot:true},{l:"Fisting",c:930},{l:"Flashing",c:3437},
    {l:"Footjob",c:2489},{l:"Foursome",c:25},{l:"Fuck Machine",c:905,hot:true},
    {l:"Gagging",c:2197},{l:"Gangbang",c:43},{l:"Gape",c:731},
    {l:"Glory Hole",c:201},{l:"Handjob",c:3700},{l:"Hardcore",c:258},
    {l:"Humiliation",c:3774},{l:"Jerk-off Instruction",c:3425},{l:"Massage",c:2146},
  ];
  const A3=[
    {l:"Masturbation",c:6815},{l:"Nipple Toys",c:2701},{l:"Oil Show",c:6010},
    {l:"Orgasm",c:5406},{l:"Pegging",c:410},{l:"Pussy Licking",c:748},
    {l:"Role Play",c:4273},{l:"Sex Toys",c:5736},{l:"Sexting",c:5900},
    {l:"Shower",c:2021},{l:"Spanking",c:6730},{l:"Squirt",c:3834},
    {l:"Strapon",c:659},{l:"Striptease",c:6421},{l:"Swing",c:243},
    {l:"Threesome",c:48},{l:"Tittyfuck",c:4915},{l:"Topless",c:5753},
  ];
  const A4=[{l:"Twerk",c:5347},{l:"Upskirt",c:2847},{l:"Yoga",c:1835}];
  const DV=[
    {l:"Anal Toys",c:2623},{l:"Dildo or Vibrator",c:6168},
    {l:"Fuck Machine",c:905,hot:true},{l:"Interactive Toy",c:4936,ic:"itoy"},
    {l:"Kiiroo",c:2},{l:"Lovense",c:4936},{l:"Nipple Toys",c:2701},
    {l:"Sex Toys",c:5736},{l:"Strapon",c:659},
  ];

  return(
    <div style={{marginBottom:56}}>
      <ST icon={HAND} title="Activities on Request"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 4fr 1fr",columnGap:0}}>
        {/* Private Show */}
        <div>
          <CH t="PRIVATE SHOW"/>
          {PS.map(i=><Item key={i.l} label={i.l} count={i.c}/>)}
        </div>
        {/* Activities — 4 internal columns under one header */}
        <div>
          <div style={{background:"#1f2937",padding:"5px 12px",fontSize:10,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#6b7280",marginBottom:10}}>ACTIVITIES</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
            <div>{A1.map(i=><Item key={i.l} label={i.l} count={i.c} hot={i.hot}/>)}</div>
            <div>{A2.map(i=><Item key={i.l} label={i.l} count={i.c} hot={i.hot}/>)}</div>
            <div>{A3.map(i=><Item key={i.l} label={i.l} count={i.c} hot={i.hot}/>)}</div>
            <div>{A4.map(i=><Item key={i.l} label={i.l} count={i.c}/>)}</div>
          </div>
        </div>
        {/* Device */}
        <div>
          <CH t="DEVICE"/>
          {DV.map(i=><Item key={i.l} label={i.l} count={i.c} hot={i.hot} ic={i.ic}/>)}
        </div>
      </div>
    </div>
  );
}

// ── SPECIFICS ──────────────────────────────────────────────────────
function Specifics(){
  const SUB=[
    {l:"Anime Girls",c:521},{l:"Club Girls",c:326},{l:"E-girl",c:273},{l:"Emo",c:257},
    {l:"Gamers",c:324},{l:"Glamour",c:1179},{l:"Goth",c:403},{l:"Gym Babe",c:763},
    {l:"Housewives",c:1080},{l:"K-pop",c:187},{l:"Nerds",c:184},{l:"Punks",c:92},
    {l:"Queers",c:66},{l:"Romantic",c:1232},{l:"Student",c:2820},{l:"Tomboys",c:167},
  ];
  const BC=[
    {l:"HD",c:7742},{l:"Mobile",c:1555,ic:"mob"},{l:"Recordable",c:6453,ic:"rec"},{l:"VR Cams",c:210,ic:"vr"},
  ];
  const SHT=[
    {l:"ASMR",c:197},{l:"Cooking",c:1138},{l:"Flirting",c:31,ic:"key"},
    {l:"Group Sex",c:118},{l:"Interracial",c:10},{l:"New Models",c:1477,ic:"bolt"},
    {l:"Office",c:1261},{l:"Old & Young 22+",c:40},{l:"Outdoor",c:1260},
    {l:"Pornstars",c:1},{l:"POV",c:1564},
    {l:"Ticket & Group Shows",c:182,ic:"tkt"},{l:"Video Games",c:106,hot:true},{l:"VTubers",c:0},
  ];
  return(
    <div style={{marginBottom:56}}>
      <ST icon={GRID} title="Specifics"/>
      <div style={g5}>
        <div><CH t="SUBCULTURES"/>{SUB.map(i=><Item key={i.l} label={i.l} count={i.c}/>)}</div>
        <div><CH t="BROADCAST"/>{BC.map(i=><Item key={i.l} label={i.l} count={i.c} ic={i.ic}/>)}</div>
        <div><CH t="SHOW TYPE"/>{SHT.map(i=><Item key={i.l} label={i.l} count={i.c} hot={i.hot} ic={i.ic}/>)}</div>
        <div><CH t="GENDER IDENTITY"/><Item label="Non-binary" count={56}/></div>
        <div><CH t="ORIENTATION"/><Item label="Lesbian" count={230}/></div>
      </div>
    </div>
  );
}

// ── FETISHES ───────────────────────────────────────────────────────
function Fetishes(){
  const C1=[{l:"BDSM",c:103,ic:"bdsm"},{l:"Cock Rating",c:3534},{l:"Corset",c:1145},{l:"Cuckold",c:1021},{l:"Foot Fetish",c:5654,hot:true},{l:"Heels",c:4946}];
  const C2=[{l:"Jeans",c:479},{l:"Latex",c:1246},{l:"Leather",c:1425},{l:"Mistress",c:1603},{l:"Nylon",c:2191},{l:"Piercing",c:686}];
  const C3=[{l:"Pregnant",c:46},{l:"Smoking",c:2494},{l:"Sport Gear",c:639},{l:"Tattoos",c:1165}];
  return(
    <div style={{marginBottom:56}}>
      <ST icon={HEEL} title="Fetishes & Kinks"/>
      {/* No sub-header — items flow in 3 columns directly */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",columnGap:0}}>
        <div>{C1.map(i=><Item key={i.l} label={i.l} count={i.c} hot={i.hot} ic={i.ic}/>)}</div>
        <div>{C2.map(i=><Item key={i.l} label={i.l} count={i.c}/>)}</div>
        <div>{C3.map(i=><Item key={i.l} label={i.l} count={i.c}/>)}</div>
        <div/><div/>
      </div>
    </div>
  );
}

// ── COUNTRIES ──────────────────────────────────────────────────────
function Countries(){
  const NA=[{l:"American",c:132,f:"us"},{l:"Canadian",c:16,f:"ca"},{l:"Mexican",c:7,f:"mx"}];
  const SA=[{l:"Argentinian",c:14,f:"ar"},{l:"Brazilian",c:48,f:"br"},{l:"Chilean",c:1,f:"cl"},{l:"Colombian",c:4073,f:"co"},{l:"Ecuadorian",c:3,f:"ec"},{l:"Peruvian",c:8,f:"pe"},{l:"Uruguayan",c:0,f:"uy"},{l:"Venezuelan",c:181,f:"ve"}];
  const EU1=[{l:"Austrian",c:10,f:"at"},{l:"Belgian",c:6,f:"be"},{l:"Bulgarian",c:2,f:"bg"},{l:"Croatian",c:0,f:"hr"},{l:"Czech",c:5,f:"cz"},{l:"Danish",c:0,f:"dk"},{l:"Dutch",c:11,f:"nl"},{l:"Estonian",c:0,f:"ee"},{l:"Finnish",c:0,f:"fi"},{l:"French",c:41,f:"fr"},{l:"Georgian",c:0,f:"ge"},{l:"German",c:53,f:"de"},{l:"Greek",c:1,f:"gr"},{l:"Hungarian",c:11,f:"hu"},{l:"Irish",c:0,f:"ie"},{l:"Italian",c:49,f:"it"}];
  const EU2=[{l:"Latvian",c:1,f:"lv"},{l:"Lithuanian",c:0,f:"lt"},{l:"Nordic",c:2,f:"no"},{l:"Norwegian",c:0,f:"no"},{l:"Polish",c:5,f:"pl"},{l:"Portuguese",c:1,f:"pt"},{l:"Romanian",c:126,f:"ro"},{l:"Serbian",c:3,f:"rs"},{l:"Slovakian",c:1,f:"sk"},{l:"Slovenian",c:0,f:"si"},{l:"Spanish",c:13,f:"es"},{l:"Swedish",c:2,f:"se"},{l:"Swiss",c:1,f:"ch"},{l:"UK Models",c:45,f:"gb"},{l:"Ukrainian",c:147,f:"ua"}];
  const AP=[{l:"Australian",c:3,f:"au"},{l:"Chinese",c:273,f:"cn"},{l:"Filipino",c:56,f:"ph"},{l:"Indian",c:365,f:"in"},{l:"Japanese",c:92,f:"jp"},{l:"Korean",c:6,f:"kr"},{l:"Malaysian",c:2,f:"my"},{l:"Sri Lankan",c:21,f:"lk"},{l:"Thai",c:6,f:"th"},{l:"Vietnamese",c:209,f:"vn"}];
  const AF=[{l:"African",c:189,f:"ng"},{l:"Kenyan",c:31,f:"ke"},{l:"Malagasy",c:1,f:"mg"},{l:"Nigerian",c:0,f:"ng"},{l:"South African",c:122,f:"za"},{l:"Ugandan",c:1,f:"ug"},{l:"Zimbabwean",c:18,f:"zw"}];
  const ME=[{l:"Arab",c:171,f:"sa"},{l:"Israeli",c:1,f:"il"},{l:"Turkish",c:11,f:"tr"}];
  const LG=[{l:"Portuguese Speaking",c:49,f:"pt"},{l:"Russian Speaking",c:550,f:"ru"},{l:"Spanish Speaking",c:4300,f:"es"}];

  return(
    <div style={{marginBottom:56}}>
      <ST icon={GLOB} title="Countries & Languages"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr 1fr 1fr 1fr",columnGap:0}}>
        {/* Col1: N.America + S.America */}
        <div>
          <CH t="NORTH AMERICA"/>
          {NA.map(i=><Item key={i.l} label={i.l} count={i.c} flag={i.f}/>)}
          <div style={{height:18}}/>
          <CH t="SOUTH AMERICA"/>
          {SA.map(i=><Item key={i.l} label={i.l} count={i.c} flag={i.f}/>)}
        </div>
        {/* Col2: Europe (2 internal cols) */}
        <div>
          <CH t="EUROPE"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
            <div>{EU1.map(i=><Item key={i.l} label={i.l} count={i.c} flag={i.f}/>)}</div>
            <div>{EU2.map(i=><Item key={i.l} label={i.l} count={i.c} flag={i.f}/>)}</div>
          </div>
        </div>
        {/* Col3: Asia */}
        <div>
          <CH t="ASIA & PACIFIC"/>
          {AP.map(i=><Item key={i.l} label={i.l} count={i.c} flag={i.f}/>)}
        </div>
        {/* Col4: Africa */}
        <div>
          <CH t="AFRICA"/>
          {AF.map(i=><Item key={i.l} label={i.l} count={i.c} flag={i.f}/>)}
        </div>
        {/* Col5: Middle East + Languages */}
        <div>
          <CH t="MIDDLE EAST"/>
          {ME.map(i=><Item key={i.l} label={i.l} count={i.c} flag={i.f}/>)}
          <div style={{height:18}}/>
          <CH t="LANGUAGES"/>
          {LG.map(i=><Item key={i.l} label={i.l} count={i.c} flag={i.f}/>)}
        </div>
      </div>
    </div>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────────
function Footer(){
  return(
    <div style={{background:"#181818",marginTop:40}}>
      <div style={{maxWidth:1340,margin:"0 auto",padding:"40px 24px 0"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.8fr 1fr 1.3fr 0.8fr 1fr",gap:48,marginBottom:0}}>

          {/* Brand */}
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:34,height:34,borderRadius:"50%",background:"#111",border:"2px solid #2a2a2a",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="#e5192b"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
              </div>
              <span style={{fontSize:16,fontWeight:800,color:"#fff",letterSpacing:"0.2px"}}>
                STRIP<span style={{color:"#e5192b"}}>CHAT</span>BATE
              </span>
            </div>

            {/* Language */}
            <div style={{display:"inline-flex",alignItems:"center",gap:8,border:"1px solid #2a2a2a",borderRadius:6,padding:"7px 14px",marginBottom:18,cursor:"pointer",background:"#1e1e1e"}}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              <span style={{color:"#d1d5db",fontSize:13}}>English</span>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2}><polyline points="6 9 12 15 18 9"/></svg>
            </div>

            <p style={{color:"#6b7280",fontSize:12.5,lineHeight:1.8,margin:"0 0 10px"}}>
              Stripchatbate is the world&apos;s premier 18+ LIVE adult entertainment destination for real connection and adult play. Watch, chat, and explore your desires with real people streaming live every day, and over 150,000 amateurs, professionals, and couples to choose from every month. You&apos;re guaranteed to find your dream match on Stripchatbate.
            </p>
            <p style={{color:"#6b7280",fontSize:12.5,lineHeight:1.8,margin:"0 0 10px"}}>
              Experience real live sex and sex live shows without scripts, filters, or bots. Every show is live and interactive: talk, tip, take control of interactive toys, or go private to share the moment. This is adult entertainment built on real attention and human connection — where you&apos;re not just watching, you&apos;re part of it.
            </p>
            <p style={{color:"#4b5563",fontSize:12,lineHeight:1.7,margin:"0 0 20px"}}>
              All models appearing on this site have contractually confirmed to us that they are 18 years of age or older.
            </p>

            {/* QR box */}
            <div style={{border:"1px solid #2a2a2a",borderRadius:10,padding:"18px",display:"flex",gap:16,alignItems:"center",background:"#1a1a1a",maxWidth:340}}>
              <div style={{width:72,height:72,flexShrink:0,background:"#fff",borderRadius:6,padding:4,boxSizing:"border-box"}}>
                <svg width={64} height={64} viewBox="0 0 64 64" fill="none">
                  <rect width={64} height={64} fill="white"/>
                  <rect x={4} y={4} width={24} height={24} rx={2} fill="#111"/>
                  <rect x={8} y={8} width={16} height={16} rx={1} fill="white"/>
                  <rect x={12} y={12} width={8} height={8} rx={1} fill="#111"/>
                  <rect x={36} y={4} width={24} height={24} rx={2} fill="#111"/>
                  <rect x={40} y={8} width={16} height={16} rx={1} fill="white"/>
                  <rect x={44} y={12} width={8} height={8} rx={1} fill="#111"/>
                  <rect x={4} y={36} width={24} height={24} rx={2} fill="#111"/>
                  <rect x={8} y={40} width={16} height={16} rx={1} fill="white"/>
                  <rect x={12} y={44} width={8} height={8} rx={1} fill="#111"/>
                  <rect x={36} y={36} width={4} height={4} fill="#111"/>
                  <rect x={44} y={36} width={4} height={4} fill="#111"/>
                  <rect x={52} y={36} width={4} height={4} fill="#111"/>
                  <rect x={36} y={44} width={4} height={4} fill="#111"/>
                  <rect x={52} y={44} width={4} height={4} fill="#111"/>
                  <rect x={44} y={52} width={4} height={4} fill="#111"/>
                  <rect x={52} y={52} width={4} height={4} fill="#111"/>
                  <rect x={30} y={4} width={4} height={4} fill="#111"/>
                  <rect x={30} y={12} width={4} height={4} fill="#111"/>
                  <rect x={4} y={30} width={4} height={4} fill="#111"/>
                  <rect x={12} y={30} width={4} height={4} fill="#111"/>
                  <rect x={20} y={30} width={4} height={4} fill="#111"/>
                  <rect x={28} y={30} width={4} height={4} fill="#111"/>
                </svg>
              </div>
              <div>
                <div style={{color:"#fff",fontSize:14,fontWeight:600,marginBottom:6}}>Get Stripchatbate App</div>
                <div style={{color:"#6b7280",fontSize:12,lineHeight:1.6}}>For quick mobile access & notifications, scan the QR code with your phone camera</div>
              </div>
            </div>
          </div>

          {/* Links cols */}
          {[
            {title:"STRIPCHATBATE", links:[{t:"About Stripchatbate"},{t:"Blog"},{t:"X"},{t:"Reddit"},{t:"Media Inquiries"}]},
            {title:"LEGAL & SAFETY", links:[{t:"Privacy Policy"},{t:"Terms of Use"},{t:"DMCA Policy"},{t:"Cookies Policy"},{t:"Parental Control Guide"},{t:"EU Research Program"},{t:"Anti-Slavery Help"}]},
            {title:"WORK WITH US", links:[{t:"Affiliate Program"}], btn:true},
            {title:"HELP & SUPPORT", links:[{t:"Support & FAQ"},{t:"Billing Support"},{t:"DMCA Protection"}]},
          ].map(col=>(
            <div key={col.title}>
              <div style={{fontSize:10.5,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#9ca3af",marginBottom:0,paddingBottom:10,borderBottom:"1px solid #2a2a2a"}}>{col.title}</div>
              {col.links.map(l=>(
                <Link key={l.t} href="#" style={{display:"block",color:"#9ca3af",fontSize:13.5,textDecoration:"none",padding:"8px 0",borderBottom:"1px solid #1e1e1e"}}
                  onMouseEnter={e=>e.currentTarget.style.color="#fff"}
                  onMouseLeave={e=>e.currentTarget.style.color="#9ca3af"}>{l.t}</Link>
              ))}
              {col.btn&&(
                <button style={{marginTop:28,border:"1px solid #4b5563",borderRadius:20,padding:"10px 22px",background:"none",color:"#d1d5db",fontSize:13.5,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
                  I Have Questions Left
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{borderTop:"1px solid #1e1e1e",marginTop:40,padding:"20px 0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:24}}>
            <div style={{border:"1px solid #374151",borderRadius:4,padding:"4px 10px",color:"#6b7280",fontSize:11,fontWeight:800,letterSpacing:"0.05em"}}>RTA</div>
            <div style={{display:"flex",flexDirection:"column"}}>
              <span style={{color:"#4b5563",fontSize:10,fontWeight:700}}>SafeLabeling.org</span>
              <span style={{color:"#374151",fontSize:9}}>COMPLIANT WEBSITE</span>
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
              <span style={{color:"#4b5563",fontSize:10,fontWeight:700}}>ASACP</span>
              <span style={{color:"#374151",fontSize:9}}>APPROVED MEMBER</span>
            </div>
            <div style={{width:24,height:24,borderRadius:"50%",border:"1px solid #374151",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
          </div>
          <span style={{color:"#374151",fontSize:12}}>18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement</span>
          <span style={{border:"1px solid #374151",borderRadius:4,padding:"3px 10px",color:"#6b7280",fontSize:13,fontWeight:600}}>18+</span>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ───────────────────────────────────────────────────────────
export default function AllCategoriesPage(){
  const [active,setActive]=useState("Main");
  const [search,setSearch]=useState("");

  return(
    <div style={{background:"#111",minHeight:"100%",fontFamily:"'Inter',-apple-system,'Segoe UI',sans-serif",color:"#e5e7eb"}}>

      {/* Header */}
      <div style={{padding:"20px 24px 0"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:16}}>
          <h1 style={{margin:0,fontSize:24,fontWeight:700,color:"#fff",letterSpacing:"-0.4px"}}>
            All Categories - Cam Girls on Live Sex Chat
          </h1>
          <div style={{display:"flex",alignItems:"center",gap:8,background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:20,padding:"8px 16px"}}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find categories"
              style={{background:"none",border:"none",outline:"none",color:"#e5e7eb",fontSize:13,width:160,fontFamily:"inherit"}}/>
          </div>
        </div>

        {/* Alphabet bar */}
        <div style={{display:"flex",borderBottom:"1px solid #1e1e1e",overflowX:"auto",scrollbarWidth:"none"}}>
          {LETTERS.map(l=>(
            <button key={l} onClick={()=>setActive(l)} style={{
              background:"none",border:"none",cursor:"pointer",padding:"8px 10px",
              fontSize:13,fontWeight:active===l?700:400,
              color:active===l?"#e5192b":"#6b7280",
              borderBottom:active===l?"2px solid #e5192b":"2px solid transparent",
              marginBottom:-1,transition:"color .12s",whiteSpace:"nowrap",fontFamily:"inherit",
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div style={{padding:"28px 24px 0"}}>
        <Appearance/>
        <div style={{height:1,background:"#1e1e1e",margin:"0 0 40px"}}/>
        <Activities/>
        <div style={{height:1,background:"#1e1e1e",margin:"0 0 40px"}}/>
        <Specifics/>
        <div style={{height:1,background:"#1e1e1e",margin:"0 0 40px"}}/>
        <Fetishes/>
        <div style={{height:1,background:"#1e1e1e",margin:"0 0 40px"}}/>
        <Countries/>
      </div>

      <Footer/>
    </div>
  );
}