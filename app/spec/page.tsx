import { SpecNav } from "../../components/SpecNav/SpecNav";

export default function SpecPage() {
  return (
    <>
      <h1>m0saic Specification</h1>

      <p style={{ opacity: 0.65, marginTop: "0.25rem"}}>
        Official technical specification
      </p>

      <p style={{ fontSize: "0.8rem", opacity: 0.5, marginTop: "0.25 rem", marginBottom: "0.75rem" }}>
  Status: Draft · Actively evolving
</p>


<SpecNav active="spec" />

      <p>
        m0saic is a low-level, deterministic layout specification. It defines spatial
        structure independently of rendering or assets.
      </p>

      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Version:</strong> v1
        <br />
        <a
          href="https://github.com/m0saic-project/m0saic-spec/blob/main/SPEC.md"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          Canonical specification (GitHub)
        </a>
      </p>

      <h2>Grammar</h2>
      <p>Coming soon.</p>

      <h2>Semantics</h2>
      <p>Coming soon.</p>

      <h2>Validation Rules</h2>
      <p>Coming soon.</p>

      <h2>Versioning</h2>
      <p>Coming soon.</p>
    </>
  );
}
