"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import StreamCard from "./StreamCard";
import { useCategory } from "./CategoryContext";

// ── Photo pools ────────────────────────────────────────────────────────────
const PHOTO_POOLS = {
  african: [
    "https://thumb-cdn77.xvideos-cdn.com/7cf709be-1545-4f75-b7b2-91a2bf3c5eff/0/xv_9_p.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/bcc3ad5f-e56d-4031-89dd-9e57b0fb8a66/0/xv_18_p.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/109c8f67-92b4-4462-a1ff-557a9c24fec9/0/xv_8_p.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/1270c747-9119-4cec-a851-5939b0fffb38/0/xv_30_p.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/31873630-628a-4817-990f-68f2b7f9c2a9/0/xv_27_p.jpg",
    "https://thumb-cdn77.xnxx-cdn.com/ae3716e7-d734-4131-86aa-23c4a7e239db/0/xn_24_t.jpg",
    "https://ic-nss.flixcdn.com/a/Yzg5MmRiZmM3Y2Q5MzgzODhjNWE3ZDYzMjk5ZTAwOWM/webp%2Cs%28w%3A704%2Ch%3A440%29/xc/nw/nwpmaQ/frame/original/18.jpg",
    "https://ic-vt-nss.xhcdn.com/a/MjZiODkxNmQ2NzJkMWJhajhiZmYxNmE0YTBjNzI0NGQ/s(w:2560,h:1440),webp/024/801/642/v2/2560x1440.245.webp",
    "https://www.tongabonga.com/media/thumbs_200/1/320/20060.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/1e1fdc91-f540-4f72-acd2-58ce81d27730/0/xv_4_t.jpg",
    "https://ic-vt-nss.xhcdn.com/a/YTdiZmYwMDk0NTM4Y2IwMTk0NjY3ZTBkY2IzZDJiYmI/s(w:2560,h:1440),webp/024/319/667/v2/2560x1440.218.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl3kh_xcjfbqmRbuqy4fdyzWGL2VYjOg4zYQ&s",
    "https://cdn1.44sex.com/upload/photos/2025/04/INCREDIBLE%20SEX%20South%20African%20Porn%20Star%20German%20Machine%20Drilled%20Pussy%20Melani%20xgmtl%20%5B44sex.com%5D.jpg",
  ],
  top: [
    "https://cdni.pornpics.com/460/7/63/91904270/91904270_064_e2e2.jpg",
    "https://thepornlinks.com/storage/2022/09/Stella-Cox1.jpeg",
    "https://cdni.pornpics.com/460/7/365/76559543/76559543_011_dc39.jpg",
    "https://ei-ph.rdtcdn.com/videos/202011/29/374970362/original/(m=eag28f)(mh=hcHGTXVg6minXVAC)15.jpg",
    "https://cdni.pornpics.com/460/7/284/63140195/63140195_093_8298.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6402/360x240/6.jpg",
    "https://lh3.googleusercontent.com/proxy/LNfMmbL0gCruHMuk77UbO31lTO8xo9bIQykxti23qQMLhjOi2WmdnU6kErs4l8Yc5ra4r9NtR4HEmWGaejnYY7ve5CAMCB8y0rH-1YzhKvR7v5UtAc0",
    "https://cdni.pornpics.com/460/7/764/26553342/26553342_060_0a5f.jpg",
    "https://cdni.pornpics.de/460/7/349/19684933/19684933_054_ac5c.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPQK3lCD49XqZlAAXSVYy57sPJtOhDlFGxw&s",
    "https://cdni.pornpics.com/460/7/837/64902410/64902410_052_5e18.jpg",
    "https://cdni.pornpics.com/460/7/246/32095369/32095369_121_3e72.jpg",
  ],
  couples: [
    "https://cdni.pornpics.com/460/7/63/91904270/91904270_064_e2e2.jpg",
    "https://cdni.pornpics.com/460/7/365/76559543/76559543_011_dc39.jpg",
    "https://cdni.pornpics.com/460/7/284/63140195/63140195_093_8298.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6402/360x240/6.jpg",
    "https://cdni.pornpics.com/460/7/764/26553342/26553342_060_0a5f.jpg",
    "https://cdni.pornpics.de/460/7/349/19684933/19684933_054_ac5c.jpg",
    "https://cdni.pornpics.com/460/7/837/64902410/64902410_052_5e18.jpg",
    "https://cdni.pornpics.com/460/7/246/32095369/32095369_121_3e72.jpg",
    "https://thepornlinks.com/storage/2022/09/Stella-Cox1.jpeg",
    "https://ei-ph.rdtcdn.com/videos/202011/29/374970362/original/(m=eag28f)(mh=hcHGTXVg6minXVAC)15.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPQK3lCD49XqZlAAXSVYy57sPJtOhDlFGxw&s",
  ],
  mobile: [
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6402/360x240/6.jpg",
    "https://cdni.pornpics.com/460/7/63/91904270/91904270_064_e2e2.jpg",
    "https://cdni.pornpics.com/460/7/365/76559543/76559543_011_dc39.jpg",
    "https://cdni.pornpics.com/460/7/284/63140195/63140195_093_8298.jpg",
    "https://cdni.pornpics.com/460/7/764/26553342/26553342_060_0a5f.jpg",
    "https://cdni.pornpics.de/460/7/349/19684933/19684933_054_ac5c.jpg",
    "https://cdni.pornpics.com/460/7/837/64902410/64902410_052_5e18.jpg",
    "https://thepornlinks.com/storage/2022/09/Stella-Cox1.jpeg",
    "https://ei-ph.rdtcdn.com/videos/202011/29/374970362/original/(m=eag28f)(mh=hcHGTXVg6minXVAC)15.jpg",
    "https://cdni.pornpics.com/460/7/246/32095369/32095369_121_3e72.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPQK3lCD49XqZlAAXSVYy57sPJtOhDlFGxw&s",
  ],
  trending: [
    "https://cdni.pornpics.com/460/7/837/64902410/64902410_052_5e18.jpg",
    "https://cdni.pornpics.com/460/7/246/32095369/32095369_121_3e72.jpg",
    "https://cdni.pornpics.com/460/7/63/91904270/91904270_064_e2e2.jpg",
    "https://thepornlinks.com/storage/2022/09/Stella-Cox1.jpeg",
    "https://cdni.pornpics.com/460/7/365/76559543/76559543_011_dc39.jpg",
    "https://ei-ph.rdtcdn.com/videos/202011/29/374970362/original/(m=eag28f)(mh=hcHGTXVg6minXVAC)15.jpg",
    "https://cdni.pornpics.com/460/7/284/63140195/63140195_093_8298.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6402/360x240/6.jpg",
    "https://cdni.pornpics.com/460/7/764/26553342/26553342_060_0a5f.jpg",
    "https://cdni.pornpics.de/460/7/349/19684933/19684933_054_ac5c.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPQK3lCD49XqZlAAXSVYy57sPJtOhDlFGxw&s",
  ],
  vr: [
    "https://cdni.pornpics.com/460/7/365/76559543/76559543_011_dc39.jpg",
    "https://cdni.pornpics.com/460/7/284/63140195/63140195_093_8298.jpg",
    "https://cdni.pornpics.com/460/7/63/91904270/91904270_064_e2e2.jpg",
    "https://thepornlinks.com/storage/2022/09/Stella-Cox1.jpeg",
    "https://ei-ph.rdtcdn.com/videos/202011/29/374970362/original/(m=eag28f)(mh=hcHGTXVg6minXVAC)15.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6402/360x240/6.jpg",
    "https://cdni.pornpics.com/460/7/764/26553342/26553342_060_0a5f.jpg",
    "https://cdni.pornpics.de/460/7/349/19684933/19684933_054_ac5c.jpg",
    "https://cdni.pornpics.com/460/7/837/64902410/64902410_052_5e18.jpg",
    "https://cdni.pornpics.com/460/7/246/32095369/32095369_121_3e72.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPQK3lCD49XqZlAAXSVYy57sPJtOhDlFGxw&s",
  ],
  featured: [
    "https://cdni.pornpics.com/460/7/63/91904270/91904270_064_e2e2.jpg",
    "https://thepornlinks.com/storage/2022/09/Stella-Cox1.jpeg",
    "https://cdni.pornpics.com/460/7/365/76559543/76559543_011_dc39.jpg",
    "https://ei-ph.rdtcdn.com/videos/202011/29/374970362/original/(m=eag28f)(mh=hcHGTXVg6minXVAC)15.jpg",
    "https://cdni.pornpics.com/460/7/284/63140195/63140195_093_8298.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6402/360x240/6.jpg",
    "https://lh3.googleusercontent.com/proxy/LNfMmbL0gCruHMuk77UbO31lTO8xo9bIQykxti23qQMLhjOi2WmdnU6kErs4l8Yc5ra4r9NtR4HEmWGaejnYY7ve5CAMCB8y0rH-1YzhKvR7v5UtAc0",
    "https://cdni.pornpics.com/460/7/764/26553342/26553342_060_0a5f.jpg",
    "https://cdni.pornpics.de/460/7/349/19684933/19684933_054_ac5c.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPQK3lCD49XqZlAAXSVYy57sPJtOhDlFGxw&s",
    "https://cdni.pornpics.com/460/7/837/64902410/64902410_052_5e18.jpg",
    "https://cdni.pornpics.com/460/7/246/32095369/32095369_121_3e72.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/7cf709be-1545-4f75-b7b2-91a2bf3c5eff/0/xv_9_p.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/bcc3ad5f-e56d-4031-89dd-9e57b0fb8a66/0/xv_18_p.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/109c8f67-92b4-4462-a1ff-557a9c24fec9/0/xv_8_p.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/1270c747-9119-4cec-a851-5939b0fffb38/0/xv_30_p.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/31873630-628a-4817-990f-68f2b7f9c2a9/0/xv_27_p.jpg",
    "https://thumb-cdn77.xnxx-cdn.com/ae3716e7-d734-4131-86aa-23c4a7e239db/0/xn_24_t.jpg",
    "https://ic-nss.flixcdn.com/a/Yzg5MmRiZmM3Y2Q5MzgzODhjNWE3ZDYzMjk5ZTAwOWM/webp%2Cs%28w%3A704%2Ch%3A440%29/xc/nw/nwpmaQ/frame/original/18.jpg",
    "https://www.tongabonga.com/media/thumbs_200/1/320/20060.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/1e1fdc91-f540-4f72-acd2-58ce81d27730/0/xv_4_t.jpg",
    "https://cdn1.44sex.com/upload/photos/2025/04/INCREDIBLE%20SEX%20South%20African%20Porn%20Star%20German%20Machine%20Drilled%20Pussy%20Melani%20xgmtl%20%5B44sex.com%5D.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
    "https://cdni.pornpics.com/460/7/837/64902410/64902410_052_5e18.jpg",
  ],
};

// ── Sections config per gender tab ─────────────────────────────────────────
const SECTIONS_BY_CATEGORY = {
  girls: [
    { key: "african",  title: "African"                    },
    { key: "top",      title: "Top Free Live Sex Cams"     },
    { key: "couples",  title: "Couples Live Sex Cams"      },
    { key: "mobile",   title: "Mobile Live Sex Cams"       },
    { key: "trending", title: "New Trending Live Sex Cams" },
    { key: "vr",       title: "VR Cams"                    },
  ],
  couples: [
    { key: "couples",  title: "Top Couples Live Now"       },
    { key: "trending", title: "Trending Couples"           },
    { key: "mobile",   title: "Mobile Couples"             },
    { key: "vr",       title: "Couples VR Cams"            },
    { key: "african",  title: "African Couples"            },
  ],
  guys: [
    { key: "top",      title: "Top Guys Live Now"          },
    { key: "trending", title: "Trending Guys"              },
    { key: "mobile",   title: "Mobile Guys"                },
    { key: "vr",       title: "Guys VR Cams"               },
    { key: "african",  title: "African Guys"               },
  ],
  trans: [
    { key: "top",      title: "Top Trans Live Now"         },
    { key: "trending", title: "Trending Trans"             },
    { key: "mobile",   title: "Mobile Trans"               },
    { key: "vr",       title: "Trans VR Cams"              },
    { key: "couples",  title: "Trans Couples"              },
  ],
};

// ── Featured section title per tab ─────────────────────────────────────────
const FEATURED_TITLE = {
  girls:   "Featured Live Sex Shows",
  couples: "Featured Couples Live Shows",
  guys:    "Featured Guys Live Shows",
  trans:   "Featured Trans Live Shows",
};

const FLAGS = ["🇿🇦","🇺🇸","🇧🇷","🇨🇴","🇷🇺","🇺🇦","🇯🇵","🇫🇷","🇩🇪","🇬🇧","🇲🇽","🇳🇬","🇹🇭","🇷🇴","🇵🇱","🇬🇷","🇮🇹","🇪🇸","🇨🇿","🇸🇪"];
const CATS  = ["girls","girls","girls","guys","couples","trans"];
const NAMES = [
  "AuroraBliss","KiraStorm","LunaRaven","NatashaFire","CherryBlossom","VioletDream",
  "MeiLingHot","RosePetal","ScarletVR","CocoLove","IvyRose","StellaX","NubiaNights",
  "EbonyQueen","SaharaHot","ZuluPrincess","BongoBeauty","LagosLove","CairoNights",
  "MobileQueen","PhoneFlirt","TrendingNow","HotNew2024","ViralStar","FreshFace",
  "VRQueenX","VirtualVixen","VRStar360","ImmersiveAlex","MetaLove","FireAndIce",
  "HoneyAndBear","JadeAndRex","AlexAndMia","TokyoCouple","RioNights","MadridPair",
  "MikeThunder","AlexGreek","DanteXXX","StarBoy","GuyOnPhone","NovaMale",
  "ZoeTransQueen","TransMobile","JustStarted","NewcomerX","BreakoutStar","FreshHeat",
];

function generateCard(tag, index) {
  const pool = PHOTO_POOLS[tag] || PHOTO_POOLS.featured;
  const name = NAMES[index % NAMES.length] + (index >= NAMES.length ? `_${Math.floor(index / NAMES.length)}` : "");
  return {
    id:         `${tag}_${index}`,
    username:   name,
    photo:      pool[index % pool.length],
    region:     FLAGS[index % FLAGS.length],
    category:   CATS[index % CATS.length],
    viewers:    Math.max(300, 35000 - index * 79 + (index % 7) * 1100),
    isNew:      index % 9 === 0,
    hd:         index % 3 !== 0,
    mobile:     index % 5 === 0,
    hasPrivate: index % 4 !== 0,
    vr:         tag === "vr",
    tags:       [tag],
  };
}

const COLS    = 6;
const GAP     = 8;
const BATCH_H = 12;
const BATCH_V = 24;

// ── Horizontal scrolling section ───────────────────────────────────────────
function HorizontalSection({ title, tag }) {
  const containerRef = useRef(null);
  const scrollRef    = useRef(null);
  const sentinelRef  = useRef(null);
  const loadingRef   = useRef(false);
  const nextRef      = useRef(BATCH_H);

  const [cards,   setCards]   = useState(() => Array.from({ length: BATCH_H * 2 }, (_, i) => generateCard(tag, i)));
  const [loading, setLoading] = useState(false);
  const [cardW,   setCardW]   = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const compute = () => {
      const w = containerRef.current.offsetWidth;
      setCardW(Math.floor((w - (COLS - 1) * GAP) / COLS));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    const sentinel  = sentinelRef.current;
    if (!container || !sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingRef.current) {
          loadingRef.current = true;
          setLoading(true);
          setTimeout(() => {
            const start = nextRef.current;
            const batch = Array.from({ length: BATCH_H }, (_, i) => generateCard(tag, start + i));
            nextRef.current = start + BATCH_H;
            setCards(prev => [...prev, ...batch]);
            setLoading(false);
            loadingRef.current = false;
          }, 250);
        }
      },
      { root: container, rootMargin: "0px 400px 0px 0px", threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [tag, cardW]);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: (cardW + GAP) * COLS, behavior: "smooth" });
  };

  const colCount = Math.ceil(cards.length / 2);

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 10, paddingBottom: 8, borderBottom: "2px solid #f0f0f0",
      }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>{title}</span>
        <button style={{
          background: "none", border: "1px solid #e0e0e0", cursor: "pointer",
          color: "#e53935", fontSize: 12, fontFamily: "inherit",
          padding: "4px 12px", borderRadius: 20, fontWeight: 600,
        }}>See All</button>
      </div>

      <div ref={containerRef} style={{ position: "relative", overflow: "hidden" }}>
        <div ref={scrollRef} style={{ overflowX: "auto", overflowY: "hidden", scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style>{`
            .hscroll::-webkit-scrollbar { display: none; }
            @keyframes shimmer {
              0%   { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>

          {cardW > 0 && (
            <div
              className="hscroll"
              style={{
                display: "grid",
                gridTemplateRows: "repeat(2, auto)",
                gridAutoFlow: "column",
                gridAutoColumns: cardW,
                gap: GAP,
                width: colCount * cardW + (colCount - 1) * GAP,
              }}
            >
              {cards.map(s => (
                <div key={s.id} style={{ width: cardW }}>
                  <StreamCard streamer={s} gridMode />
                </div>
              ))}

              {loading && Array.from({ length: BATCH_H }).map((_, i) => (
                <div key={`sk-${i}`} style={{
                  width: cardW, aspectRatio: "3/2", borderRadius: 8,
                  background: "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)",
                  backgroundSize: "200% 100%", animation: "shimmer 1.2s infinite",
                }}/>
              ))}

              <div ref={sentinelRef} style={{ width: 1, height: "100%", gridRow: "1 / span 2" }} />
            </div>
          )}
        </div>

        <button
          onClick={scrollRight}
          style={{
            position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer", padding: 0,
            lineHeight: 1, color: "#555", fontSize: 28, fontWeight: 300, zIndex: 10, userSelect: "none",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#e53935"}
          onMouseLeave={e => e.currentTarget.style.color = "#555"}
          aria-label="Scroll right"
        >›</button>
      </div>
    </div>
  );
}

// ── Vertical infinite-scroll featured grid ─────────────────────────────────
function FeaturedSection({ cols, title }) {
  const [cards,   setCards]   = useState(() => Array.from({ length: BATCH_V }, (_, i) => generateCard("featured", i)));
  const [loading, setLoading] = useState(false);
  const nextRef    = useRef(BATCH_V);
  const loadingRef = useRef(false);
  const sentinelRef= useRef(null);

  const loadMore = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setTimeout(() => {
      const start = nextRef.current;
      const batch = Array.from({ length: BATCH_V }, (_, i) => generateCard("featured", start + i));
      nextRef.current = start + BATCH_V;
      setCards(prev => [...prev, ...batch]);
      setLoading(false);
      loadingRef.current = false;
    }, 300);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { rootMargin: "0px 0px 600px 0px", threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div>
      <div style={{
        display: "flex", alignItems: "center", marginBottom: 10,
        paddingBottom: 8, borderBottom: "2px solid #f0f0f0",
      }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>{title}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: GAP }}>
        {cards.map(s => <StreamCard key={s.id} streamer={s} gridMode />)}
      </div>
      <div ref={sentinelRef} style={{ height: 1, marginTop: 8 }} aria-hidden="true" />
      {loading && (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: GAP, marginTop: 8 }}>
          {Array.from({ length: BATCH_V }).map((_, i) => (
            <div key={`sk-${i}`} style={{
              aspectRatio: "3/2", borderRadius: 8,
              background: "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)",
              backgroundSize: "200% 100%", animation: "shimmer 1.2s infinite",
            }}/>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const { category } = useCategory();
  const [isMobile,  setIsMobile]  = useState(false);
  const [showPromo, setShowPromo] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 820);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cols = isMobile ? 2 : COLS;

  // Pick sections for the active tab; fall back to girls
  const sections = SECTIONS_BY_CATEGORY[category] ?? SECTIONS_BY_CATEGORY.girls;
  const featuredTitle = FEATURED_TITLE[category] ?? FEATURED_TITLE.girls;

  return (
    <div style={{ background: "#fff", minHeight: "100%", color: "#1a1a1a", fontFamily: "Inter, system-ui, sans-serif" }}>
      <main style={{ padding: isMobile ? "16px 8px 80px" : "16px 16px 80px" }}>

        {/* Promo banner */}
        {showPromo && (
          <div style={{
            background: "linear-gradient(90deg,#b71c1c 0%,#e53935 30%,#e53935 70%,#b71c1c 100%)",
            borderRadius: 8, padding: "10px 14px 10px 12px",
            marginBottom: 24, display: "flex", alignItems: "center", gap: 12,
            boxShadow: "0 2px 8px rgba(229,57,53,0.25)",
          }}>
            <div style={{
              background: "linear-gradient(135deg,#f57c00,#ff8f00)",
              borderRadius: 7, width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, fontSize: 20,
            }}>🎁</div>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#fff", whiteSpace: "nowrap", flexShrink: 0 }}>Special for You</span>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", whiteSpace: "nowrap", marginRight: 10 }}>
              Get tokens now with <span style={{ fontWeight: 700, color: "#ffe082" }}>25% OFF!</span>
            </span>
            <button style={{
              background: "transparent", border: "1.5px solid rgba(255,255,255,0.7)",
              color: "#fff", fontWeight: 700, fontSize: 12,
              padding: "5px 16px", borderRadius: 20, cursor: "pointer",
              whiteSpace: "nowrap", fontFamily: "inherit", flexShrink: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >GET TOKENS</button>
            <div style={{ flex: 1 }} />
            <button onClick={() => setShowPromo(false)} style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.6)",
              cursor: "pointer", fontSize: 14, padding: 0, fontFamily: "inherit", flexShrink: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
            >✕</button>
          </div>
        )}

        {/* Horizontal sections — re-renders when category changes */}
        {sections.map(sec => (
          <HorizontalSection key={`${category}-${sec.key}-${sec.title}`} title={sec.title} tag={sec.key} />
        ))}

        {/* Vertical infinite featured grid */}
        <FeaturedSection key={category} cols={cols} title={featuredTitle} />

      </main>

      {/* Bottom join banner */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
        background: "#e53935", padding: "10px 20px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        boxShadow: "0 -2px 12px rgba(229,57,53,0.3)",
      }}>
        <span style={{ fontSize: 18 }}>💬</span>
        <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>Join Stripchatbate to interact with models!</span>
        <button style={{
          background: "#fff", border: "none", color: "#e53935",
          fontWeight: 700, fontSize: 13, padding: "6px 18px",
          borderRadius: 20, cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}>Join FREE</button>
      </div>
    </div>
  );
}