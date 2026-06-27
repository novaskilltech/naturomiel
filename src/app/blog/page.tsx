"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { BLOG_POSTS, BlogPost } from "@/lib/blogData";
import Link from "next/link";
import { Search, BookOpen, Clock } from "lucide-react";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "ALL" || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { key: "ALL", label: "Tous les articles" },
    { key: "apitherapie", label: "Apithérapie" },
    { key: "origine-miels", label: "Origine des Miels" },
    { key: "conseils-sante", label: "Conseils Santé" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-bg-cream py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">
            Savoir, Santé & Nature
          </span>
          <h1 className="font-serif text-4xl font-light text-dark-deep sm:text-5xl">
            Le Blog NaturoMiel
          </h1>
          <p className="mx-auto max-w-lg text-xs text-olive-light">
            Découvrez nos dossiers exclusifs rédigés par nos experts en apithérapie et nutrition pour apprendre à utiliser au mieux les bienfaits de la ruche.
          </p>
          <div className="h-[1px] w-20 bg-gold-champagne mx-auto mt-4" />
        </div>

        {/* Search & Categories */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-gold-champagne/10 pb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeCategory === cat.key
                    ? "bg-dark-deep text-white"
                    : "bg-white text-dark-soft hover:bg-gold-champagne/10 border border-gold-champagne/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gold-champagne" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un article..."
              className="w-full bg-white border border-gold-champagne/20 py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-gold-dark"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xs text-olive-light">Aucun article ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col bg-white border border-gold-champagne/10 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Image */}
                <div className="h-56 w-full overflow-hidden bg-bg-cream">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-gold-dark font-bold uppercase tracking-wider">
                      <span>{post.categoryLabel}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.createdAt}</span>
                    </div>

                    <h3 className="font-serif text-lg font-medium text-dark-deep hover:text-gold-dark transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-xs text-olive-light line-clamp-3 leading-relaxed">
                      {post.seoDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gold-champagne/5 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-olive-light">Par {post.author}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-semibold uppercase tracking-wider text-dark-deep hover:text-gold-dark inline-flex items-center gap-1"
                    >
                      Lire la suite <BookOpen className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter Signup (Premium CRO) */}
        <section className="mt-24 bg-bg-ivory border border-gold-champagne/20 p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
          <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-gold-dark block">Newsletter exclusive</span>
          <h3 className="font-serif text-2xl text-dark-deep">Rejoignez le Club Privé NaturoMiel</h3>
          <p className="text-xs text-olive-light max-w-md mx-auto leading-relaxed">
            Recevez nos conseils saisonniers d'apithérapie, nos recettes exclusives à base de miel et soyez informé en avant-première du retour en stock de nos miels sauvages rares.
          </p>
          
          <form onSubmit={(e) => { e.preventDefault(); alert('Merci pour votre inscription !'); }} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              required
              type="email"
              placeholder="Votre adresse e-mail"
              className="bg-white border border-gold-champagne/30 py-2.5 px-4 text-xs flex-grow focus:outline-none focus:border-gold-dark"
            />
            <button
              type="submit"
              className="bg-dark-deep hover:bg-gold-dark text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              S'inscrire
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
