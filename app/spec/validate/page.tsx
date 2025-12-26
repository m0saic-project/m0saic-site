"use client";

import { useRef, useState } from "react";
import { SpecNav } from "../../../components/SpecNav/SpecNav";

export default function Page() {
  const [text, setText] = useState("");
  const isValid = looksLikeM0saic(text);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function onPickFile() {
    fileInputRef.current?.click();
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      setText(content);
    } finally {
      // allow re-uploading the same file
      e.target.value = "";
    }
  }

  function onDragOver(e: React.DragEvent) {
  e.preventDefault();
}

async function onDrop(e: React.DragEvent) {
  e.preventDefault();
  const file = e.dataTransfer.files?.[0];
  if (!file) return;
  const content = await file.text();
  setText(content);
}

function looksLikeM0saic(s: string) {
  const t = s.trim();
  if (!t) return false;

  // only allow digits and m0saic punctuation
  if (!/^[0-9\{\}\[\]\(\),\-]+$/.test(t)) return false;

  // balanced brackets
  const stack: string[] = [];
  const open = new Set(["(", "[", "{"]);
  const closeToOpen: Record<string, string> = { ")": "(", "]": "[", "}": "{" };

  for (const ch of t) {
    if (open.has(ch)) stack.push(ch);
    else if (ch in closeToOpen) {
      const need = closeToOpen[ch];
      const got = stack.pop();
      if (got !== need) return false;
    }
  }

  return stack.length === 0;
}

  return (
    <>
      <h1>Validate</h1>
      <SpecNav active="validate" />

      <p style={{ opacity: 0.8, marginBottom: "1rem" }}>
        Paste a m0saic string to validate and preview its layout.
      </p>

<div
  onDragOver={onDragOver}
  onDrop={onDrop}
  style={{
    borderRadius: 12,
  }}
>
  <textarea
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Paste m0saic string here… (or drag & drop a .m0 / .m0saic file)"
    spellCheck={false}
    style={{
      width: "100%",
      minHeight: 180,
      resize: "vertical",
      padding: "12px 14px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.04)",
      color: "white",
      outline: "none",
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontSize: 13,
      lineHeight: 1.45,
    }}
  />
</div>

{isValid && (
  <div
    style={{
      marginTop: "0.9rem",
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.03)",
      fontSize: "0.85rem",
      opacity: 0.8,
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
    }}
  >
    <span>
      <strong>Chars:</strong> {text.length.toLocaleString()}
    </span>
    <span>
      <strong>Lines:</strong> {text.length ? text.split(/\r?\n/).length : 0}
    </span>
  </div>
)}



      <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem" }}>
  <button
    type="button"
    onClick={() => setText("")}
    disabled={!text.length}
    style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "white",
      padding: "8px 10px",
      borderRadius: 10,
      cursor: text.length ? "pointer" : "default",
      opacity: text.length ? 0.9 : 0.4,
      fontSize: "0.85rem",
    }}
  >
    Clear
  </button>
</div>

      <div style={{ marginTop: "0.75rem" }}>
        <button
          type="button"
          onClick={onPickFile}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            margin: 0,
            color: "inherit",
            opacity: 0.65,
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "0.85rem",
          }}
        >
          or upload a .m0 / .m0saic file
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".m0,.m0saic,text/plain"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
      </div>

{isValid && (
  <div style={{ marginTop: "1.25rem" }}>
    <h2 style={{ fontSize: "1.1rem", marginBottom: "0.6rem" }}>Preview</h2>

    <div
      style={{
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.02)",
        padding: "14px",
        minHeight: 220,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        opacity: 0.75,
      }}
    >
      <div>
        Preview rendering coming next.
        <div style={{ marginTop: 6, fontSize: "0.85rem", opacity: 0.7 }}>
          (Validator + lightweight geometry renderer)
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
}
