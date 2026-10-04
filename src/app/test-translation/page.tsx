import type { Metadata } from "next";
import { TranslatedText } from "@/components/course/exercises/TranslatedText";

export const metadata: Metadata = {
  title: "Test de traducción (interno)",
  robots: { index: false, follow: false },
};

export default function TestPage() {
  return (
    <div className="p-20 space-y-8">
      <h1 className="text-2xl font-bold">Translation Test Page</h1>
      
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1. Lexicon Match (should work as before)</h2>
        <p className="p-4 border rounded">
          <TranslatedText text="Hello, my name is John." />
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">2. Explicit Translation (New [[word|translation]] syntax)</h2>
        <p className="p-4 border rounded">
          <TranslatedText text="This is a [[test|prueba]] of the [[new system|nuevo sistema]]." />
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">3. Mixed Mode</h2>
        <p className="p-4 border rounded">
          <TranslatedText text="Hello, this is a [[test|prueba]] for John." />
        </p>
      </section>
    </div>
  );
}
