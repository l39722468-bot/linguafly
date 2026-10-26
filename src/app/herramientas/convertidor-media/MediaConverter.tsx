"use client";

import { useRef, useState } from "react";
import { ArrowDownToLine, AudioLines, CheckCircle2, FileImage, FileUp, Image as ImageIcon, RotateCw, Scissors, ShieldCheck, X } from "lucide-react";

type ToolKey = "png" | "jpg" | "webp" | "resize" | "compress" | "rotate" | "svg" | "wav" | "trim";
type Category = "all" | "image" | "audio" | "design";
const toolInfo: Record<ToolKey, { title: string; description: string; category: Category }> = {
  png: { title: "Convertir a PNG", description: "Exporta una imagen como PNG.", category: "image" },
  jpg: { title: "Convertir a JPG", description: "Crea una imagen JPG compatible.", category: "image" },
  webp: { title: "Convertir a WebP", description: "Optimiza imágenes para la web.", category: "image" },
  resize: { title: "Redimensionar imagen", description: "Cambia el ancho y alto en píxeles.", category: "image" },
  compress: { title: "Comprimir imagen", description: "Reduce el peso con calidad ajustable.", category: "image" },
  rotate: { title: "Rotar imagen", description: "Gira la imagen 90 grados.", category: "image" },
  svg: { title: "SVG a PNG", description: "Rasteriza gráficos vectoriales SVG.", category: "design" },
  wav: { title: "Audio a WAV", description: "Convierte audio compatible a WAV PCM.", category: "audio" },
  trim: { title: "Cortar audio", description: "Selecciona un fragmento y expórtalo.", category: "audio" },
};
const cards: { key: ToolKey; icon: string; color: string; category: Category }[] = [
  { key: "png", icon: "▧", color: "pink", category: "image" },
  { key: "jpg", icon: "▣", color: "blue", category: "image" },
  { key: "webp", icon: "W", color: "green", category: "image" },
  { key: "resize", icon: "⛶", color: "orange", category: "image" },
  { key: "compress", icon: "▱", color: "purple", category: "image" },
  { key: "rotate", icon: "↻", color: "yellow", category: "image" },
  { key: "svg", icon: "◇", color: "purple", category: "design" },
  { key: "wav", icon: "♫", color: "green", category: "audio" },
  { key: "trim", icon: "✂", color: "pink", category: "audio" },
];

export default function MediaConverter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tool, setTool] = useState<ToolKey>("png");
  const [category, setCategory] = useState<Category>("all");
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(82);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [rotate, setRotate] = useState(90);
  const [start, setStart] = useState("0");
  const [end, setEnd] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [result, setResult] = useState<{ url: string; name: string; size: number } | null>(null);
  const [audioDuration, setAudioDuration] = useState<number | null>(null);

  const isAudio = tool === "wav" || tool === "trim";
  const chooseTool = (next: ToolKey) => {
    setTool(next); setFile(null); setError(""); setSuccess(""); setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  };
  const loadFile = (next: File | null) => {
    setFile(next); setError(""); setSuccess("");
    if (result) URL.revokeObjectURL(result.url);
    setResult(null);
    setAudioDuration(null);
    if (next && next.size > 100 * 1024 * 1024) {
      setFile(null); setError("El archivo supera 100 MB. Selecciona uno más pequeño para evitar problemas de memoria.");
    }
  };
  const download = (blob: Blob, suffix: string, ext: string) => {
    const url = URL.createObjectURL(blob);
    setResult({ url, name: (file?.name || "archivo").replace(/\.[^.]+$/, "") + suffix + "." + ext, size: blob.size });
    setSuccess("Conversión completada. El archivo está listo para descargar.");
  };
  const canvasBlob = (canvas: HTMLCanvasElement, mime: string, q: number) =>
    new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("El navegador no pudo exportar el formato elegido.")), mime, q));
  const runConversion = async () => {
    if (!file) return;
    setBusy(true); setError(""); setSuccess(""); setResult(null);
    try {
      if (isAudio) {
        const AC = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AC) throw new Error("Este navegador no ofrece Web Audio API. Prueba con un navegador actualizado.");
        const ctx = new AC();
        try {
          const buffer = await ctx.decodeAudioData(await file.arrayBuffer());
          const from = tool === "trim" ? Number(start) : 0;
          const to = tool === "trim" ? Number(end || buffer.duration) : buffer.duration;
          if (!Number.isFinite(from) || !Number.isFinite(to) || from < 0 || to > buffer.duration || to <= from) throw new Error("Introduce un intervalo válido dentro de la duración del audio.");
          const rate = buffer.sampleRate, channels = buffer.numberOfChannels;
          const begin = Math.floor(from * rate), finish = Math.min(buffer.length, Math.floor(to * rate)), length = finish - begin;
          const ab = new ArrayBuffer(44 + length * channels * 2), view = new DataView(ab);
          const write = (offset: number, text: string) => { for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i)); };
          write(0, "RIFF"); view.setUint32(4, 36 + length * channels * 2, true); write(8, "WAVE"); write(12, "fmt ");
          view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, channels, true); view.setUint32(24, rate, true);
          view.setUint32(28, rate * channels * 2, true); view.setUint16(32, channels * 2, true); view.setUint16(34, 16, true);
          write(36, "data"); view.setUint32(40, length * channels * 2, true);
          let offset = 44;
          for (let i = begin; i < finish; i++) for (let c = 0; c < channels; c++) {
            const sample = Math.max(-1, Math.min(1, buffer.getChannelData(c)[i]));
            view.setInt16(offset, sample < 0 ? sample * 32768 : sample * 32767, true); offset += 2;
          }
          download(new Blob([ab], { type: "audio/wav" }), tool === "trim" ? "-recortado" : "-convertido", "wav");
        } catch (e) {
          if (e instanceof Error && (e.name === "EncodingError" || e.name === "NotSupportedError")) throw new Error("El navegador no puede decodificar este códec. Prueba con un archivo WAV, MP3 u OGG compatible.");
          throw e;
        } finally { await ctx.close(); }
        return;
      }
      let image: HTMLImageElement;
      const objectUrl = URL.createObjectURL(file);
      try {
        image = await new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image(); img.onload = () => resolve(img);
          img.onerror = () => reject(new Error("No se puede abrir este formato en el navegador. HEIC y formatos profesionales necesitan un conversor adicional."));
          img.src = objectUrl;
        });
        let w = Number(width) || image.naturalWidth, h = Number(height) || image.naturalHeight;
        if (width && !height) h = Math.round(image.naturalHeight * w / image.naturalWidth);
        else if (height && !width) w = Math.round(image.naturalWidth * h / image.naturalHeight);
        if (tool === "rotate" && (rotate === 90 || rotate === 270)) { w = image.naturalHeight; h = image.naturalWidth; }
        if (![w, h].every(n => Number.isInteger(n) && n > 0 && n <= 12000)) throw new Error("Ancho y alto deben estar entre 1 y 12.000 píxeles.");
        const canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("No se pudo crear el lienzo de imagen.");
        const mime = tool === "jpg" ? "image/jpeg" : tool === "webp" || tool === "compress" ? "image/webp" : "image/png";
        if (mime === "image/jpeg") { ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, w, h); }
        if (tool === "rotate") { ctx.translate(w / 2, h / 2); ctx.rotate(rotate * Math.PI / 180); ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2); }
        else ctx.drawImage(image, 0, 0, w, h);
        const blob = await canvasBlob(canvas, mime, quality / 100);
        download(blob, "-convertido", mime === "image/jpeg" ? "jpg" : mime === "image/webp" ? "webp" : "png");
      } finally { URL.revokeObjectURL(objectUrl); }
    } catch (e) { setError(e instanceof Error ? e.message : "No se pudo convertir el archivo."); }
    finally { setBusy(false); }
  };

  const allowed = isAudio ? "audio/*,video/*" : ".png,.jpg,.jpeg,.webp,.gif,.bmp,.svg,.avif,image/*";
  return (
    <div className="ml-page">
      <style jsx>{`
        .ml-page{--blue:#2864f0;--ink:#111b32;--muted:#64718b;--line:#e4eaf4;color:var(--ink);background:#f7f9fd;min-height:100vh;font-family:inherit;padding-bottom:56px}
        .ml-nav{height:68px;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 max(22px,calc((100vw - 1240px)/2));gap:20px}
        .ml-brand{display:flex;align-items:center;gap:10px;font-weight:850;font-size:21px;letter-spacing:-.7px}.ml-mark{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;color:#fff;background:linear-gradient(140deg,#3478ff,#7a4df5 55%,#ff5a8c)}
        .ml-nav a{color:#455572;text-decoration:none;font-size:14px}.ml-wrap{max-width:1240px;margin:auto;padding:0 24px}.ml-hero{display:grid;grid-template-columns:1.05fr .95fr;align-items:center;gap:35px;padding-top:54px;padding-bottom:34px}.ml-kicker{text-transform:uppercase;letter-spacing:2.5px;font-size:11px;font-weight:800;color:#7485a6;margin-bottom:14px}.ml-hero h1{font-size:clamp(34px,4.5vw,54px);line-height:1.05;letter-spacing:-2px;margin:0 0 17px;font-weight:850}.ml-gradient{color:#7452f4}.ml-hero p{line-height:1.7;color:#4e5e7b;font-size:16px;max-width:650px}.ml-trust{display:flex;flex-wrap:wrap;gap:10px 18px;color:#445571;font-size:12px}.ml-trust span{display:flex;align-items:center;gap:6px}.ml-illustration{min-height:250px;border-radius:35px;background:linear-gradient(135deg,#e2edff,#f1e9ff 55%,#e1fbef);display:flex;align-items:center;justify-content:center;gap:12px;transform:rotate(-1deg)}.ml-artcard{width:116px;height:140px;border-radius:22px;background:#fff;box-shadow:0 12px 25px #283e791b;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;font-size:43px}.ml-artcard:nth-child(2){background:#7557e9;color:white;transform:translateY(14px) rotate(5deg)}.ml-artcard small{font-size:11px;font-weight:800;color:#344563}.ml-artcard:nth-child(2) small{color:#fff}.ml-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:4px 0 28px}.ml-tabs button{border:1px solid transparent;border-radius:11px;padding:11px 15px;background:#edf1f8;color:#34435e;font-size:13px;font-weight:650}.ml-tabs button.active{background:var(--blue);color:white}.ml-heading{display:flex;justify-content:space-between;align-items:center;margin:24px 0 13px}.ml-heading h2{font-size:20px;margin:0;letter-spacing:-.5px}.ml-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:11px}.ml-tool{display:flex;gap:12px;align-items:flex-start;text-align:left;padding:16px;border:1px solid var(--line);background:white;border-radius:14px;color:var(--ink);min-height:105px;cursor:pointer;transition:.15s}.ml-tool:hover,.ml-tool.selected{border-color:#9dbaff;box-shadow:0 8px 20px #263e7510;transform:translateY(-1px)}.ml-icon{height:43px;min-width:43px;border-radius:12px;display:grid;place-items:center;font-size:20px;background:#e4edff;color:#2864f0}.ml-tool:nth-child(3n+1) .ml-icon{background:#ffe6eb;color:#df4867}.ml-tool:nth-child(3n+2) .ml-icon{background:#e2edff}.ml-tool:nth-child(3n) .ml-icon{background:#ddf9e8;color:#0e9560}.ml-tool strong{display:block;font-size:13px;margin:3px 0 7px}.ml-tool small{display:block;color:#687692;font-size:12px;line-height:1.45}.ml-work{margin-top:28px;background:white;border:1px solid var(--line);border-radius:22px;padding:25px;box-shadow:0 12px 35px #18305e0d}.ml-worktop{display:flex;justify-content:space-between;align-items:flex-start;gap:15px;margin-bottom:20px}.ml-work h2{font-size:23px;margin:0 0 6px}.ml-worktop p{margin:0;color:var(--muted);font-size:13px}.ml-close{border:1px solid var(--line);border-radius:10px;background:white;padding:8px 11px;color:#485775;cursor:pointer}.ml-workgrid{display:grid;grid-template-columns:1fr .8fr;gap:17px}.ml-drop{border:2px dashed #c8d5eb;background:#fafbff;border-radius:16px;min-height:270px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:22px;transition:.15s}.ml-drop.drag{border-color:var(--blue);background:#edf4ff}.ml-uploadicon{width:56px;height:56px;border-radius:17px;background:#e8f0ff;color:var(--blue);display:grid;place-items:center;margin-bottom:12px}.ml-drop h3{margin:0 0 7px;font-size:16px}.ml-drop p{font-size:12px;color:var(--muted);line-height:1.5;margin:0 0 16px}.ml-file{max-width:100%;overflow-wrap:anywhere;color:#30405e;font-size:12px;margin:12px 0}.ml-btn{border:0;border-radius:10px;background:var(--blue);color:#fff;padding:12px 16px;font-weight:750;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;font-size:13px}.ml-btn:disabled{opacity:.5;cursor:not-allowed}.ml-secondary{border:1px solid #dfe7f5;border-radius:10px;background:#eef3fc;color:#30405e;padding:10px 13px;font-size:12px;font-weight:650;cursor:pointer}.ml-settings{border:1px solid var(--line);border-radius:16px;padding:19px}.ml-settings h3{margin:0 0 17px;font-size:15px}.ml-field{margin-bottom:16px}.ml-field label{display:block;font-weight:700;font-size:12px;margin-bottom:7px;color:#3b4963}.ml-field select,.ml-field input[type=number],.ml-field input[type=text]{width:100%;padding:10px 11px;border:1px solid #dce4f0;border-radius:9px;background:white;color:#1a2945;font:inherit;font-size:13px}.ml-fields{display:grid;grid-template-columns:1fr 1fr;gap:9px}.ml-field input[type=range]{width:100%;accent-color:var(--blue)}.ml-range{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#586986}.ml-note{font-size:11px;line-height:1.5;color:#6a7892;margin-top:8px}.ml-alert{padding:12px 14px;border-radius:10px;font-size:12px;line-height:1.5;margin-top:13px;background:#fff4e7;color:#89520b}.ml-alert.error{background:#fff0f1;color:#a52b42}.ml-alert.ok{background:#e9faf2;color:#126744}.ml-result{border-top:1px solid var(--line);margin-top:16px;padding-top:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.ml-result span{font-size:12px;color:#435372;overflow-wrap:anywhere}.ml-features{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:30px}.ml-feature{padding:18px;border:1px solid var(--line);background:white;border-radius:15px}.ml-feature h3{font-size:14px;margin:10px 0 7px}.ml-feature p{font-size:12px;line-height:1.5;color:#687692;margin:0}.ml-footer{max-width:1190px;margin:36px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:#6b7890;font-size:11px;line-height:1.5}
        @media(max-width:850px){.ml-hero{grid-template-columns:1fr}.ml-illustration{min-height:190px}.ml-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ml-workgrid{grid-template-columns:1fr}.ml-features{grid-template-columns:1fr}}@media(max-width:480px){.ml-wrap{padding:0 15px}.ml-hero{padding-top:35px}.ml-grid{grid-template-columns:1fr}.ml-work{padding:15px}.ml-artcard{width:88px;height:116px;font-size:34px}.ml-nav{padding:0 16px}.ml-hero h1{letter-spacing:-1.3px}}
      `}</style>
      <header className="ml-nav"><a href="/" className="ml-brand"><span className="ml-mark">✦</span> LinguaFly <span style={{ color: "#2864f0", fontSize: 12, background: "#edf3ff", padding: "5px 9px", borderRadius: 20 }}>Media Lab</span></a><a href="/aprender-ingles">Volver a aprender inglés ↗</a></header>
      <section className="ml-wrap ml-hero">
        <div><div className="ml-kicker">CONVIERTE · EDITA · PRACTICA</div><h1>Prepara tus recursos para <span className="ml-gradient">aprender inglés</span></h1><p>Convierte imágenes y audio para tus ejercicios, clases y materiales. Herramientas gratuitas que funcionan en tu navegador, sin registro y con tus archivos en tu dispositivo.</p><div className="ml-trust"><span><CheckCircle2 size={16} color="#1da978"/> Gratis</span><span><CheckCircle2 size={16} color="#1da978"/> Sin registro</span><span><ShieldCheck size={16} color="#1da978"/> Procesamiento local</span></div></div>
        <div className="ml-illustration" aria-hidden="true"><div className="ml-artcard"><ImageIcon size={46} color="#2864f0"/><small>IMAGEN</small></div><div className="ml-artcard"><AudioLines size={43}/><small>AUDIO</small></div><div className="ml-artcard"><FileImage size={42} color="#fa8a45"/><small>DISEÑO</small></div></div>
      </section>
      <main className="ml-wrap">
        <div className="ml-tabs">{(["all", "image", "audio", "design"] as Category[]).map(cat => <button key={cat} className={category === cat ? "active" : ""} onClick={() => setCategory(cat)}>{cat === "all" ? "✣ Todas" : cat === "image" ? "▧ Imagen" : cat === "audio" ? "♫ Audio" : "◉ Diseño"}</button>)}</div>
        <div className="ml-heading"><h2>Herramientas gratuitas</h2><span style={{ fontSize: 12, color: "#65738e" }}>{cards.filter(c => category === "all" || c.category === category).length} herramientas</span></div>
        <div className="ml-grid">{cards.filter(c => category === "all" || c.category === category).map(card => <button key={card.key} className={"ml-tool " + (tool === card.key ? "selected" : "")} onClick={() => chooseTool(card.key)}><span className="ml-icon">{card.icon}</span><span><strong>{toolInfo[card.key].title}</strong><small>{toolInfo[card.key].description}</small></span></button>)}</div>
        <section className="ml-work" id="ml-work"><div className="ml-worktop"><div><h2>{toolInfo[tool].title}</h2><p>Selecciona un archivo, ajusta las opciones y descarga el resultado.</p></div><button className="ml-close" onClick={() => { loadFile(null); setSuccess(""); setError(""); }}>Limpiar</button></div>
          <div className="ml-workgrid"><div className="ml-drop" onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("drag"); }} onDragLeave={e => e.currentTarget.classList.remove("drag")} onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove("drag"); loadFile(e.dataTransfer.files?.[0] || null); }}>
              <div className="ml-uploadicon"><FileUp size={27}/></div><h3>Arrastra tu archivo aquí</h3><p>o selecciona desde tu dispositivo<br/>Máximo recomendado: 25 MB</p><button className="ml-btn" onClick={() => inputRef.current?.click()}>Seleccionar archivo</button><input ref={inputRef} hidden type="file" accept={allowed} onChange={e => loadFile(e.target.files?.[0] || null)}/>{file && <div className="ml-file"><strong>{file.name}</strong><br/>{(file.size / 1024 / 1024).toFixed(2)} MB · {file.type || "tipo no detectado"}<br/><button className="ml-secondary" style={{ marginTop: 8 }} onClick={() => { loadFile(null); if(inputRef.current) inputRef.current.value = ""; }}>Quitar archivo</button></div>}
            </div><div className="ml-settings"><h3>Opciones de conversión</h3>{!isAudio && <><div className="ml-field"><label>Formato de salida</label><select value={tool === "jpg" ? "jpg" : tool === "webp" || tool === "compress" ? "webp" : "png"} onChange={e => { if (result) URL.revokeObjectURL(result.url); setResult(null); setSuccess(""); setError(""); setTool(e.target.value === "jpg" ? "jpg" : e.target.value === "webp" ? "webp" : "png"); }}><option value="png">PNG — alta calidad</option><option value="jpg">JPG — compatible</option><option value="webp">WebP — optimizado para web</option></select></div>{tool !== "rotate" && <div className="ml-field"><label>Dimensiones (px, opcional)</label><div className="ml-fields"><input aria-label="Ancho en píxeles" type="number" min="1" max="12000" placeholder="Ancho original" value={width} onChange={e => setWidth(e.target.value)}/><input aria-label="Alto en píxeles" type="number" min="1" max="12000" placeholder="Alto original" value={height} onChange={e => setHeight(e.target.value)}/></div><div className="ml-note">Puedes indicar solo un lado para conservar la proporción automáticamente.</div></div>}{tool === "rotate" && <div className="ml-field"><label>Rotación</label><select value={rotate} onChange={e => setRotate(Number(e.target.value))}><option value={90}>90° derecha</option><option value={180}>180°</option><option value={270}>90° izquierda</option></select></div>}<div className="ml-field"><div className="ml-range"><label>Calidad</label><span>{quality}%</span></div><input aria-label="Calidad de salida" type="range" min="10" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))}/><div className="ml-note">La calidad afecta principalmente a JPG y WebP.</div></div></>}
            {isAudio && <><div className="ml-field"><label>Formato de salida</label><select disabled value="wav"><option value="wav">WAV — PCM 16 bits</option></select></div>{tool === "trim" && <div className="ml-note" style={{ marginBottom: 12 }}>Carga el audio para conocer su duración; el intervalo debe estar dentro de ella.{audioDuration !== null ? ` Duración detectada: ${audioDuration.toFixed(1)} s.` : ""}</div><div className="ml-fields"><div className="ml-field"><label>Inicio (segundos)</label><input type="number" min="0" step="0.1" value={start} onChange={e => setStart(e.target.value)}/></div><div className="ml-field"><label>Fin (segundos)</label><input type="number" min="0" step="0.1" placeholder="Final del audio" value={end} onChange={e => setEnd(e.target.value)}/></div></div>}<div className="ml-alert">La compatibilidad del audio depende del navegador. MP3, AAC y FLAC como salida requieren un codificador adicional.</div></>}
            <div className="ml-note">El archivo se procesa localmente. No se envía a LinguaFly.</div><button className="ml-btn" style={{ width: "100%", marginTop: 12 }} disabled={!file || busy} onClick={runConversion}>{busy ? "Procesando…" : "Convertir archivo"} <ArrowDownToLine size={16}/></button>
          </div></div>
          {error && <div className="ml-alert error" role="alert">{error}</div>}{success && <div className="ml-alert ok" role="status">{success}</div>}{result && <div className="ml-result"><span>{result.name} · {(result.size / 1024 / 1024).toFixed(2)} MB</span><a className="ml-btn" href={result.url} download={result.name}><ArrowDownToLine size={16}/> Descargar archivo</a></div>}
        </section>
        <div className="ml-features"><div className="ml-feature"><ShieldCheck size={23} color="#2864f0"/><h3>Privacidad primero</h3><p>Los archivos compatibles se procesan en tu dispositivo, sin subirlos a un servidor.</p></div><div className="ml-feature"><RotateCw size={23} color="#2864f0"/><h3>Sencillo y rápido</h3><p>Elige una herramienta, ajusta las opciones y descarga el resultado.</p></div><div className="ml-feature"><Scissors size={23} color="#2864f0"/><h3>Creado para tus clases</h3><p>Prepara audios de listening, imágenes para vocabulario y materiales didácticos.</p></div></div>
      </main>
      <footer className="ml-footer">LinguaFly · Herramientas gratuitas para preparar recursos de inglés. Nota: esta versión convierte imágenes compatibles y audio que el navegador pueda decodificar. HEIC, PSD, AI y exportación a MP3 requieren motores adicionales.</footer>
    </div>
  );
}
