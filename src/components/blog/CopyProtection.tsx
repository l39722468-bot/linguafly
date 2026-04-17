"use client";

import { useEffect, useCallback, useState } from "react";

export function CopyProtection({ children }: { children: React.ReactNode }) {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = useCallback((e: ClipboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".article-content")) {
      e.preventDefault();
      setShowToast(true);
    }
  }, []);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".article-content")) {
      e.preventDefault();
      setShowToast(true);
    }
  }, []);

  const handleDragStart = useCallback((e: DragEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".article-content")) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("copy", handleCopy);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, [handleCopy, handleContextMenu, handleDragStart]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      <div
        className="article-content-protected"
        style={{ WebkitUserSelect: "none", userSelect: "none" }}
      >
        {children}
      </div>

      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium">
            <svg
              className="w-5 h-5 text-amber-400 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5z" />
            </svg>
            <span>Este contenido está protegido. ¡Compártelo con el botón de compartir!</span>
          </div>
        </div>
      )}
    </>
  );
}
