"use client";

import { Award, CheckCircle, Shield, Share2, Download } from "lucide-react";

interface CertificateProps {
  userName: string;
  courseName: string;
  level: string;
  date: string;
  certificateId: string;
  score: number;
}

export default function Certificate({
  userName,
  courseName,
  level,
  date,
  certificateId,
  score,
}: CertificateProps) {
  return (
    <div className="mx-auto max-w-4xl p-8">
      {/* Certificate Card */}
      <div className="relative overflow-hidden rounded-[40px] border-[12px] border-slate-900 bg-white p-12 shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-coral-50" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-peach-50" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl">
              <Award size={48} />
            </div>
            <div className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
              Certificate of Achievement
            </div>
            <h1 className="mt-4 text-5xl font-black text-slate-900">Linguafly</h1>
            <div className="mt-2 h-1 w-24 bg-coral-500" />
          </div>

          {/* Body */}
          <div className="mt-12 text-center">
            <p className="text-xl text-slate-600">This is to certify that</p>
            <h2 className="mt-4 text-4xl font-black text-slate-900 underline decoration-coral-500 decoration-4 underline-offset-8">
              {userName}
            </h2>
            <p className="mt-8 text-xl leading-relaxed text-slate-600">
              has successfully completed the course
              <br />
              <span className="text-2xl font-black text-slate-900">{courseName}</span>
              <br />
              reaching an official proficiency of
              <br />
              <span className="inline-block mt-2 rounded-xl bg-slate-900 px-6 py-2 text-2xl font-black text-white">
                Level {level}
              </span>
            </p>
            
            <div className="mt-8 flex justify-center gap-8">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Score</div>
                <div className="text-xl font-black text-slate-900">{score}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Date</div>
                <div className="text-xl font-black text-slate-900">{date}</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 flex items-end justify-between border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                <Shield size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Certificate</div>
                <div className="text-xs font-bold text-slate-900">ID: {certificateId}</div>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-2 h-px w-48 bg-slate-300" />
              <div className="text-sm font-black text-slate-900">Academic Director</div>
              <div className="text-[10px] font-bold text-slate-400">Linguafly Education</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-black text-white hover:brightness-95 transition">
          <Download size={18} />
          Download PDF
        </button>
        <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-black text-slate-700 hover:bg-slate-50 transition">
          <Share2 size={18} />
          Share to LinkedIn
        </button>
      </div>
    </div>
  );
}
