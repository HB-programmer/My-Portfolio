import type { VisitorMode } from "../types/portfolio";

const STORAGE_KEY = "ride-mode";

// A shared link can preselect the mode (?mode=recruiter), otherwise remember the visitor's last pick.
export function readInitialMode(): VisitorMode | null {
  const param = new URLSearchParams(window.location.search).get("mode")?.toLowerCase();
  if (param === "recruiter" || param === "hr" || param === "hire") return "recruiter";
  if (param === "explorer" || param === "dev") return "explorer";

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "recruiter" || saved === "explorer") return saved;
  } catch {
    // Storage can be unavailable (private mode); fall through to no preselection.
  }
  return null;
}

export function saveMode(mode: VisitorMode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Non-essential convenience; ignore storage failures.
  }
}
