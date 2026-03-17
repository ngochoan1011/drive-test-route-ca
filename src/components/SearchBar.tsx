import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import Fuse from "fuse.js";
import type { TestCenter } from "@/data/testCenters";

interface SearchBarProps {
  centers: TestCenter[];
  onSelect: (center: TestCenter) => void;
}

const SearchBar = ({ centers, onSelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const fuse = useMemo(
    () => new Fuse(centers, { keys: ["name", "city", "address"], threshold: 0.4 }),
    [centers]
  );

  const results = query.length > 0 ? fuse.search(query).map((r) => r.item) : [];

  return (
    <div className="absolute top-4 left-4 right-4 z-10 max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search test centres..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full h-11 pl-10 pr-10 rounded-full bg-background border border-border shadow-lg text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-accent"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="mt-2 rounded-xl bg-background border border-border shadow-lg overflow-hidden">
          {results.map((center) => (
            <button
              key={center.id}
              onClick={() => {
                onSelect(center);
                setQuery("");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-accent transition-colors flex flex-col gap-0.5 min-h-[44px]"
            >
              <span className="text-sm font-semibold text-foreground">{center.name}</span>
              <span className="text-xs text-muted-foreground">{center.address}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
