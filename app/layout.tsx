import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
    title: "Mohammed Wadudul Islam | Communications, Media & Strategy",
    description:
      "An eleven-year portfolio of documentary film, communication strategy, research translation and public-interest campaigns.",
    openGraph: {
      title: "Mohammed Wadudul Islam",
      description: "Stories that move people & systems.",
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: "Mohammed Wadudul Islam — Stories that move people and systems" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Mohammed Wadudul Islam",
      description: "Stories that move people & systems.",
      images: [imageUrl],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
