import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const [animateLetters, setAnimateLetters] = useState(false);

  useEffect(() => {
    // Check if mobile
    const isMobile = window.innerWidth < 768;
    
    setTimeout(() => setAnimateLetters(true), 50);

    // FAST progress
    const totalDuration = isMobile ? 1200 : 1600;
    const steps = 100;
    const intervalTime = totalDuration / steps;

    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setPhase("exiting");
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 400);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (phase === "done") return null;

  const letters = "thirtythree".split("");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        backgroundColor: "#030303",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "15vh",
        opacity: phase === "exiting" ? 0 : 1,
        transition: "opacity 0.4s ease-out",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80vw",
          height: "50vh",
          background: "radial-gradient(ellipse at 50% 0%, rgba(251,146,60,0.1) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Logo - AT TOP */}
      <div style={{ overflow: "hidden", marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {letters.map((letter, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontSize: "clamp(2.5rem, 10vw, 5rem)",
                fontWeight: 700,
                color: "#fff",
                fontFamily: "'Syne', system-ui, sans-serif",
                letterSpacing: "-0.02em",
                transform: animateLetters ? "translateY(0)" : "translateY(-100%)",
                opacity: animateLetters ? 1 : 0,
                transition: `transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s, opacity 0.5s ease ${i * 0.04}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Progress bar - SMOOTH */}
      <div style={{ width: "min(200px, 60vw)" }}>
        <div
          style={{
            height: "2px",
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #f59e0b, #ea580c)",
              borderRadius: "2px",
              // Smooth transition for each 1% increment
              transition: "width 0.028s linear",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.75rem",
            fontSize: "0.7rem",
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          <span>LOADING</span>
          <span style={{ color: "#f59e0b" }}>{progress}%</span>
        </div>
      </div>

      {/* Corner decorations */}
      <div style={{ position: "absolute", top: "20px", left: "20px", width: "30px", height: "30px", borderLeft: "2px solid rgba(245,158,11,0.2)", borderTop: "2px solid rgba(245,158,11,0.2)" }} />
      <div style={{ position: "absolute", top: "20px", right: "20px", width: "30px", height: "30px", borderRight: "2px solid rgba(245,158,11,0.2)", borderTop: "2px solid rgba(245,158,11,0.2)" }} />
      <div style={{ position: "absolute", bottom: "20px", left: "20px", width: "30px", height: "30px", borderLeft: "2px solid rgba(245,158,11,0.2)", borderBottom: "2px solid rgba(245,158,11,0.2)" }} />
      <div style={{ position: "absolute", bottom: "20px", right: "20px", width: "30px", height: "30px", borderRight: "2px solid rgba(245,158,11,0.2)", borderBottom: "2px solid rgba(245,158,11,0.2)" }} />
    </div>
  );
}
