"use client";

type Key = "spec" | "validate" | "tutorials" | "playground" | "dictionary";

const ITEMS: { key: Key; label: string; href: string }[] = [
  { key: "spec", label: "Spec", href: "/spec" },
  { key: "validate", label: "Validate", href: "/spec/validate" },
  { key: "tutorials", label: "Tutorials", href: "/spec/tutorials" },
  { key: "playground", label: "Playground", href: "/spec/playground" },
  { key: "dictionary", label: "Dictionary", href: "/spec/dictionary" },
];

export function SpecNav(props: { active: Key }) {
  const { active } = props;

  const styleFor = (isActive: boolean): React.CSSProperties => ({
    color: "inherit",
    textDecoration: "none",
    opacity: isActive ? 1 : 0.55,
    fontWeight: isActive ? 600 : 400,
    cursor: isActive ? "default" : "pointer",
  });

  return (
    <nav
      style={{
        display: "flex",
        gap: "1.25rem",
        fontSize: "0.85rem",
        margin: "1.25rem 0 2rem",
        flexWrap: "wrap",
      }}
    >
      {ITEMS.map((it) =>
        it.key === active ? (
          <span key={it.key} style={styleFor(true)}>
            {it.label}
          </span>
        ) : (
          <a key={it.key} href={it.href} style={styleFor(false)}>
            {it.label}
          </a>
        )
      )}
    </nav>
  );
}
