"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
const SCRIPT_LOAD_TIMEOUT = 8000;

function CaptchaForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/";
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "verifying" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const widgetRendered = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToken = useCallback(
    async (token: string) => {
      setStatus("verifying");
      try {
        const res = await fetch("/api/captcha/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          setStatus("success");
          setTimeout(() => {
            window.location.href = redirectTo;
          }, 400);
        } else {
          const data = await res.json().catch(() => ({}));
          setErrorMsg(data.error || "Verificación fallida. Inténtalo de nuevo.");
          setStatus("error");
        }
      } catch {
        setErrorMsg("Error de conexión. Inténtalo de nuevo.");
        setStatus("error");
      }
    },
    [redirectTo]
  );

  const renderWidget = useCallback(() => {
    if (!containerRef.current || widgetRendered.current) return;
    const turnstile = (window as any).turnstile;
    if (!turnstile?.render) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    widgetRendered.current = true;
    setStatus("ready");

    turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      callback: handleToken,
      "error-callback": () => {
        setErrorMsg("El desafío falló. Pulsa el botón para reintentar.");
        setStatus("error");
      },
      "expired-callback": () => {
        setErrorMsg("La verificación ha expirado. Pulsa el botón para reintentar.");
        setStatus("error");
      },
      theme: "light",
      language: "es",
    });
  }, [handleToken]);

  useEffect(() => {
    if (widgetRendered.current) return;

    timeoutRef.current = setTimeout(() => {
      if (!widgetRendered.current) {
        setErrorMsg("No se pudo cargar la verificación. Puede ser un bloqueador de anuncios o un problema de red.");
        setStatus("error");
      }
    }, SCRIPT_LOAD_TIMEOUT);

    if ((window as any).turnstile?.render) {
      renderWidget();
    } else {
      const existingScript = document.querySelector(
        'script[src*="challenges.cloudflare.com/turnstile"]'
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad";
        script.async = true;
        script.onerror = () => {
          setErrorMsg("No se pudo cargar el script de verificación. Desactiva el bloqueador de anuncios e inténtalo de nuevo.");
          setStatus("error");
        };
        (window as any).onTurnstileLoad = renderWidget;
        document.head.appendChild(script);
      } else {
        const checkInterval = setInterval(() => {
          if ((window as any).turnstile?.render) {
            clearInterval(checkInterval);
            renderWidget();
          }
        }, 200);
        setTimeout(() => clearInterval(checkInterval), SCRIPT_LOAD_TIMEOUT);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [renderWidget]);

  const handleRetry = () => {
    widgetRendered.current = false;
    setStatus("loading");
    setErrorMsg("");

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    const turnstile = (window as any).turnstile;
    if (turnstile?.render) {
      renderWidget();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-coral-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-coral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
        </div>

        <h1 className="font-display text-2xl font-black text-slate-900 mb-3">
          Verificación de seguridad
        </h1>

        <p className="text-slate-600 mb-8 text-sm leading-relaxed">
          Estamos verificando que eres una persona real. Este paso solo ocurre una vez y protege nuestra web de ataques automatizados.
        </p>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="w-8 h-8 border-3 border-slate-200 border-t-coral-500 rounded-full animate-spin" />
            <p className="text-sm text-slate-500">Cargando verificación...</p>
          </div>
        )}

        <div ref={containerRef} className="flex justify-center mb-6" />

        {status === "verifying" && (
          <div className="flex items-center justify-center gap-2 text-coral-600 font-medium text-sm">
            <div className="w-5 h-5 border-2 border-coral-200 border-t-coral-600 rounded-full animate-spin" />
            Verificando...
          </div>
        )}

        {status === "success" && (
          <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Verificado. Redirigiendo...
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <p className="text-red-600 text-sm font-medium">{errorMsg}</p>
            <button
              onClick={handleRetry}
              className="px-6 py-2.5 bg-coral-600 text-white rounded-xl font-bold text-sm hover:bg-coral-700 transition-colors cursor-pointer"
              type="button"
            >
              Reintentar
            </button>
          </div>
        )}

        <p className="text-xs text-slate-400 mt-8">
          Protegido por Cloudflare Turnstile
        </p>
      </div>
    </div>
  );
}

export default function CaptchaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 max-w-md w-full text-center">
            <div className="w-8 h-8 border-3 border-slate-200 border-t-coral-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-slate-500">Cargando...</p>
          </div>
        </div>
      }
    >
      <CaptchaForm />
    </Suspense>
  );
}
