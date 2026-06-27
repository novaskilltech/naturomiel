import React from "react";
import Navbar from "@/components/Navbar";
import { BLOG_POSTS } from "@/lib/blogData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Schema.org Article structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.imageUrl],
    "datePublished": "2026-06-27T09:30:00+01:00",
    "author": [{
      "@type": "Person",
      "name": post.author,
      "url": "https://www.naturomiel.fr"
    }]
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Insert JSON-LD directly into the head for perfect SEO execution */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />

      <main className="flex-grow bg-bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto bg-white border border-gold-champagne/15 p-6 sm:p-12 space-y-8 shadow-sm">
          
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-olive-light hover:text-gold-dark transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Retour aux dossiers
          </Link>

          {/* Article Info */}
          <div className="space-y-4">
            <span className="bg-gold-champagne/20 text-gold-dark text-[9px] font-bold uppercase tracking-widest px-3 py-1 inline-block">
              {post.categoryLabel}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-dark-deep font-light leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-olive-light border-y border-gold-champagne/10 py-3 mt-4">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4 stroke-[1.5]" /> {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 stroke-[1.5]" /> {post.createdAt}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 stroke-[1.5]" /> Lecture 5 min</span>
            </div>
          </div>

          {/* Banner image */}
          <div className="h-80 w-full overflow-hidden bg-bg-cream">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Editorial Content */}
          <div className="prose prose-stone prose-sm sm:prose-base max-w-none text-dark-soft leading-relaxed space-y-6">
            {post.content.split("\n\n").map((paragraph, idx) => {
              const cleanText = paragraph.trim();
              if (!cleanText) return null;

              // Title tags parsing
              if (cleanText.startsWith("##")) {
                return (
                  <h2 key={idx} className="font-serif text-xl sm:text-2xl text-dark-deep font-semibold pt-4">
                    {cleanText.replace("##", "").trim()}
                  </h2>
                );
              }
              // List points parsing
              if (cleanText.startsWith("-") || cleanText.match(/^\d\./)) {
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-olive-light">
                    {cleanText.split("\n").map((item, subIdx) => (
                      <li key={subIdx}>{item.replace(/^-\s*|^\d\.\s*/, "").trim()}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={idx} className="text-xs sm:text-sm md:text-base font-light">
                  {cleanText}
                </p>
              );
            })}
          </div>

          {/* Share or follow link */}
          <div className="border-t border-gold-champagne/10 pt-6 flex justify-between items-center text-xs">
            <span className="text-olive-light font-medium">Partager cet article d'apithérapie</span>
            <div className="flex gap-4">
              <a href="https://wa.me/212716014148" className="hover:text-gold-dark transition-colors font-bold uppercase tracking-wider text-[10px]">
                WhatsApp
              </a>
              <a href="mailto:naturomiel@gmail.com" className="hover:text-gold-dark transition-colors font-bold uppercase tracking-wider text-[10px]">
                Email
              </a>
            </div>
          </div>

        </article>
      </main>
    </div>
  );
}
