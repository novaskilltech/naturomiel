"use client";

import React from "react";
import { Star, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  date: string;
}

const REVIEWS: Testimonial[] = [
  {
    name: "Djaout Sara",
    role: "Local Guide • 114 avis",
    text: "Nous sommes venu tout à l'heure avec mon mari. Le monsieur nous a super bien conseillé et est très sympathique. Moi qui n'aimais pas le miel jusqu'à aujourd'hui, c'est une super découverte (notamment le miel de lavande) !",
    date: "Visité en mai 2024"
  },
  {
    name: "N D",
    role: "Local Guide • 26 avis",
    text: "De bons conseils, miel de qualité avec suivi et traçabilité. Les produits pour l'immunité et les cures sont super pour nos enfants comme pour nous, adultes. Je recommande vivement cette boutique.",
    date: "Visité en janvier 2023"
  },
  {
    name: "ANOUSONE FRANCK AMINE",
    role: "Local Guide • 99 avis",
    text: "Excellent SERVICE !!! Livraison à domicile et toujours disponible pour répondre aux questions. On sent la passion autour des produits de la ruche. Des produits de qualité à un très bon tarif ! Foncez !",
    date: "Visité en février 2022"
  },
  {
    name: "MICHAEL HADJADJ",
    role: "Local Guide • 26 avis",
    text: "Pour moi, le meilleur magasin de miel, et de très très loin ! Avec en prime les conseils avisés d'un véritable expert du miel. Une très belle découverte, allez-y les yeux fermés.",
    date: "Visité en avril 2023"
  },
  {
    name: "Hassen Trabelsi",
    role: "6 avis",
    text: "Je recommande cet apiculteur qui vend du miel de très bonne qualité. Il se déplace lui-même vérifier la qualité du miel qu'il met en vente, j'ai rarement vu une telle rigueur chez les vendeurs de produits de la ruche.",
    date: "Visité en mai 2021"
  },
  {
    name: "Créature D'Allah",
    role: "2 avis",
    text: "Heureusement que j'avais les produits Naturomiel pendant le Covid, et même quand j'ai un simple rhume j'utilise toujours leurs produits. Ils sont d'une qualité exceptionnelle.",
    date: "Visité en mars 2023"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-bg-cream border-t border-gold-champagne/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark flex items-center justify-center gap-1.5">
            <Star className="h-3 w-3 fill-gold-dark text-gold-dark" /> Avis Clients Google Maps
          </span>
          <h2 className="font-serif text-3xl font-light text-dark-deep sm:text-5xl">
            Ce que disent nos clients
          </h2>
          <p className="text-xs text-olive-light max-w-md mx-auto">
            Une note globale exceptionnelle de <strong className="text-dark-deep">4.9/5</strong> basée sur plus de 69 avis certifiés.
          </p>
          <div className="h-[1px] w-20 bg-gold-champagne mx-auto mt-4" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-gold-champagne/10 p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative"
            >
              <MessageSquare className="absolute top-6 right-6 h-8 w-8 text-gold-champagne/10 stroke-[1.5]" />
              
              <div className="space-y-4">
                {/* Gold Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold-dark text-gold-dark" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-dark-soft italic font-light leading-relaxed">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-6 border-t border-gold-champagne/5 mt-6 flex justify-between items-end">
                <div>
                  <h4 className="font-serif text-sm font-semibold text-dark-deep">{review.name}</h4>
                  <p className="text-[10px] text-olive-light mt-0.5">{review.role}</p>
                </div>
                <span className="text-[9px] text-olive-light font-mono">{review.date.replace("Visité en ", "")}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
