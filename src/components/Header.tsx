import { navItems } from "../data/portfolio";
import type { VisitorMode } from "../types/portfolio";

type HeaderProps = {
  mode: VisitorMode;
  onToggleMode: () => void;
};

export function Header({ mode, onToggleMode }: HeaderProps) {
  const recruiter = mode === "recruiter";

  return (
    <header className="site-header">
      <a className="brand" href={recruiter ? "#brief" : "#garage"} aria-label="Harshit Bhardwaj home">
        <span className="brand-mark">HB</span>
        <span>Rider Developer</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems[mode].map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <button
        className={`mode-toggle mono ${recruiter ? "is-recruiter" : ""}`}
        type="button"
        onClick={onToggleMode}
        aria-label={`Ride mode: ${recruiter ? "Fast Lane" : "Road Trip"}. Switch mode`}
      >
        <span className="mode-toggle-track">
          <i />
        </span>
        {recruiter ? "Fast Lane" : "Road Trip"}
      </button>
    </header>
  );
}
