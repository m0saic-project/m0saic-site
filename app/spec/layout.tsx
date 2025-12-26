

import { SkeletonBackground } from "../../components/SkeletonBackground/SkeletonBackground";

export const metadata = {
  title: "m0saic · Specification",
};


export default function SpecLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <SkeletonBackground opacity={0.09} enabledInfiniteScroll={false} />

      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "3rem 1.5rem 5rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            width: "100%",
            backgroundColor: "#0b0b10",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "2.5rem 2.75rem",
            borderRadius: "20px",
            boxShadow: "0 20px 120px -20px rgba(0,0,0,0.85)",
          }}
        >
            <a
  href="/"
  style={{
    display: "inline-block",
    marginBottom: "1.25rem",
    fontSize: "0.85rem",
    opacity: 0.6,
    color: "inherit",
    textDecoration: "none",
  }}
>
  ← Back to m0saic
</a>

          {children}
        </div>
      </section>
    </main>
  );
}
