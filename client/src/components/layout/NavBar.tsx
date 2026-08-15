import { NavLink } from "react-router-dom";

export default function NavBar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
      isActive ? "bg-accent text-white" : "text-ink/60 hover:text-ink hover:bg-ink/5"
    }`;

  return (
    <header className="h-14 shrink-0 border-b border-line bg-white flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-md bg-accent text-white flex items-center justify-center font-display font-bold text-sm">
          e
        </span>
        <span className="font-display font-semibold text-sm sm:text-base hidden xs:inline">E-Digital Books</span>
      </div>
      <nav className="flex items-center gap-1 bg-surface rounded-lg p-1 border border-line">
        <NavLink to="/editor" className={linkClass}>
          Editor
        </NavLink>
        <NavLink to="/reader" className={linkClass}>
          Reader
        </NavLink>
      </nav>
    </header>
  );
}
