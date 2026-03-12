import { CSSProperties } from "react"

export const colors = {
  primary: "#0e101c",
  secondary: "#bf1650",
  lightBlue: "#516391",
  blue: "#1e2a4a",
  lightPink: "#ec5990",
  errorPink: "#fbecf2",
  buttonBlue: "#191d3a",
  link: "#ff7aa8",
  green: "#1bda2b",
}

export const styles = {
  sectionTitle: {
    margin: "0 0 0.25rem",
    fontSize: "0.875rem",
    fontWeight: 600,
  },
  preBlock: {
    margin: 0,
    padding: "0.5rem",
    borderRadius: "0.375rem",
    background: "#f3f4f6",
    color: "#111827",
    overflow: "auto",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "0.75rem",
    lineHeight: 1.4,
  },
  fieldRow: {
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
  },
  fieldRowSummary: {
    padding: "0.25rem 0.5rem",
    cursor: "pointer",
    userSelect: "none" as const,
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "0.75rem",
  },
  fieldRowBodyContainer: {
    margin: 0,
    padding: "0.5rem",
    background: "#f3f4f6",
  },
  fieldRowBody: {
    margin: 0,
    color: "#111827",
    overflow: "auto",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "0.75rem",
    lineHeight: 1.4,
  },
  stateList: {
    display: "grid",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  stateListSummary: {
    margin: 0,
    cursor: "pointer",
    userSelect: "none" as const,
    fontSize: "0.875rem",
    fontWeight: 600,
  },
  emptyNotice: {
    margin: 0,
    padding: "0.5rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    color: "#6b7280",
    fontSize: "0.75rem",
  },
  panelContainer: {
    position: "fixed",
    right: "1rem",
    bottom: "1rem",
    zIndex: 50,
  },
  toggleButton: {
    marginBottom: "0.5rem",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#111827",
    fontSize: "0.75rem",
    fontWeight: 500,
    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.12)",
    cursor: "pointer",
  },
  panel: {
    width: "min(92vw, 30rem)",
    maxHeight: "70vh",
    overflow: "auto",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#111827",
    padding: "0.75rem",
    fontSize: "0.75rem",
    boxShadow: "0 10px 20px rgba(15, 23, 42, 0.18)",
  },
  panelTitle: {
    margin: "0 0 0.75rem",
    fontSize: "0.875rem",
    fontWeight: 600,
  },
  panelContent: {
    display: "grid",
    gap: "0.75rem",
  },
} satisfies Record<string, CSSProperties>
