"use client";

import { SkeletonBackground } from "../components/SkeletonBackground/SkeletonBackground";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SpecLinkGate() {
  const searchParams = useSearchParams();
  const showSpecLink = searchParams.get("spec") === "1";

  if (!showSpecLink) return null;

  return (
    <a
      href="/spec"
      style={{
        marginTop: "1.5rem",
        fontSize: "0.85rem",
        opacity: 0.55,
        color: "inherit",
        textDecoration: "none",
      }}
    >
      View technical specification →
    </a>
  );
}

export default function Home() {
  const searchParams = useSearchParams();
const showSpecLink = searchParams.get("spec") === "1";

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#050509",
        color: "white",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      }}
    >
      {/* BACKGROUND */}
      <SkeletonBackground opacity={0.14} enabledInfiniteScroll />

      {/* HERO – sits in the upper third-ish of the viewport */}
      <section
        style={{
          minHeight: "100vh",
          padding: "3.5rem 1.5rem 5rem", // top / sides / bottom
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // not vertically centered
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* vignette behind hero card */}
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            height: "60vh",
            background:
              "radial-gradient(circle, rgba(0,0,0,0.35), rgba(0,0,0,0))",
            filter: "blur(40px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            backgroundColor: "#050509",
            padding: "3rem 3.5rem",
            borderRadius: "28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 20px 120px -20px rgba(0,0,0,0.85)",
            maxWidth: "640px",
            width: "90%",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <img
            src="/m-logo.png"
            alt="m0saic logo"
            style={{
              width: "190px",
              height: "auto",
              marginBottom: "1.25rem",
            }}
          />

          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              marginBottom: "0.6rem",
            }}
          >
            m0saic
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              maxWidth: "640px",
              margin: "0 auto 1.25rem",
              opacity: 0.85,
              lineHeight: 1.6,
            }}
          >
            A declarative engine for building video mosaics, grids, and
            split-screen compositions.
          </p>

          <p
            style={{
              fontSize: "0.98rem",
              maxWidth: "520px",
              margin: "0 auto",
              opacity: 0.7,
              lineHeight: 1.6,
            }}
          >
            Built for developers and creators who want precise, repeatable
            layouts without fighting a timeline.
          </p>

          <p
            style={{
              marginTop: "2.5rem",
              fontSize: "0.9rem",
              opacity: 0.45,
            }}
          >
            v1 coming soon · Made with ❤️ in NYC
          </p>
<Suspense fallback={null}>
  <SpecLinkGate />
</Suspense>
        </div>
      </section>
    </main>
  );
}
