"use client";

import React, { useEffect, useRef, useState } from "react";

const OwloChat = ({
  title,
  width,
  partnerId,
  spaceId,
}: {
  title?: string;
  width?: number;
  partnerId: string;
  spaceId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Close when clicking outside
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!panelRef.current) return;
      if (panelRef.current.contains(e.target as Node)) return;
      setOpen(false);
      setMinimized(false);
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const toggleOpen = () => {
    setOpen((v) => !v);
    if (!open) setMinimized(false);
  };

  return (
    <div aria-live="polite">
      <div className="fixed bottom-6 right-6 z-50 flex items-end">
        <div ref={panelRef} className="relative">
          {/* Panel: only render when open */}
          {open && (
            <div
              className={`mb-3 transition-all duration-200 origin-bottom-right`}
              style={{ width: width ?? 380 }}
            >
              <div className="bg-white shadow-xl rounded-lg overflow-hidden border">
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-primario text-white">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{title ?? "Owlo Chat"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Cerrar chat"
                      title="Cerrar chat"
                      className="p-1 rounded hover:bg-indigo-500/30"
                      onClick={() => {
                        setOpen(false);
                        setMinimized(false);
                      }}
                    >
                      {/* Reuse the minimize icon but act as close */}
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content area: when minimized show small bar, else iframe filling the area */}
                <div
                  className={"bg-gray-50"}
                  style={{ height: minimized ? 56 : 620 }}
                >
                  {minimized ? (
                    <div className="p-4 text-sm text-gray-600">
                      Minimizado — haz clic en el icono para abrir
                    </div>
                  ) : (
                    <div className="h-full w-full">
                      <iframe
                        title={title ?? "Owlo Chat"}
                        src={`https://www.drakorian.ai/web/chat?partnerId=${partnerId}&spaceId=${spaceId}`}
                        className="h-full w-full border-0"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Floating button */}
          <button
            aria-expanded={open}
            aria-label={open ? "Cerrar chat" : "Abrir chat"}
            onClick={toggleOpen}
            className="mt-3 ml-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primario text-white shadow-xl hover:bg-primario focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwloChat;
