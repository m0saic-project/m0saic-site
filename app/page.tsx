import Image from "next/image";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
        background: "#050509",
        color: "white",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      }}
    >
      <Image
        src="/m-Logo.png"
        alt="m0saic logo"
        width={250}
        height={120}
        style={{ marginBottom: "1.5rem" }}
      />

      <h1
        style={{
          fontSize: "3rem",
          fontWeight: 700,
          letterSpacing: "0.02em",
          marginBottom: "0.75rem",
        }}
      >
        m0saic
      </h1>

      <p
        style={{
          fontSize: "1.2rem",
          maxWidth: "640px",
          opacity: 0.85,
          lineHeight: 1.6,
          marginBottom: "1.25rem",
        }}
      >
        A declarative engine for building video mosaics, grids, and split-screen
        compositions.
      </p>

      <p
        style={{
          fontSize: "0.98rem",
          maxWidth: "520px",
          opacity: 0.7,
          lineHeight: 1.6,
        }}
      >
        Built for developers and creators who want precise, repeatable layouts
        without fighting a timeline.
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
    </main>
  );
}
