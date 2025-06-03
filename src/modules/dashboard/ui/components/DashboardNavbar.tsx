"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./DashboardCommand";
import { useEffect, useState } from "react";

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex px-4 gap-2 items-center py-3 border-b bg-background">
        <Button onClick={toggleSidebar} className="size-9" variant="outline">
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          onClick={() => setCommandOpen((open) => !open)}
          variant="outline"
          size="sm"
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 bg-muted font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
};
