import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
    title: "Mohammed Wadudul Islam | Writer, Producer & Artist",
    description:
      "Selected films, visual work and writing by Mohammed Wadudul Islam, a writer, producer and artist working in development communication.",
    openGraph: {
      title: "Mohammed Wadudul Islam",
      description: "Writer, producer and artist. Selected films, visual work and writing.",
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: "Mohammed Wadudul Islam — Writer, Producer, Artist" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Mohammed Wadudul Islam",
      description: "Writer, producer and artist. Selected films, visual work and writing.",
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
