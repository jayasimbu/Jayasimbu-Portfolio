import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayasimbu Jayamani — Full Stack Developer | AI Application Developer",
  description:
    "Portfolio of Jayasimbu Jayamani — Computer Science and Engineering graduate specializing in React.js, Next.js, TypeScript, Python, FastAPI, and AI-powered solutions. Explore featured projects LINKUP, VLM LLaVA, and MyFitness Hub.",
  keywords: [
    "Jayasimbu Jayamani",
    "Full Stack Developer",
    "AI Application Developer",
    "React.js",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "Ollama",
    "LLaVA",
    "EasyOCR",
    "Google Gemini API",
    "MongoDB",
    "Supabase",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Jayasimbu Jayamani" }],
  openGraph: {
    title: "Jayasimbu Jayamani — Full Stack Developer | AI Application Developer",
    description:
      "Building Modern Web Applications & AI-Powered Solutions. Explore full-stack and AI projects by Jayasimbu Jayamani.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#1d100e] text-[#f6ddd8]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
