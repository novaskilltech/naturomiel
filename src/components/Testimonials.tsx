"use client";

import React, { useState, useEffect } from "react";
import { Star, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";

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

function TestimonialCard({ review }: { review: Testimonial }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map absolute mouse delta offset to smooth rotations
  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.025,
        boxShadow: "0 25px 50px -12px rgba(184, 134, 11, 0.2)"
      }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className="bg-white border border-gold-champagne/15 p-6 sm:p-8 flex flex-col justify-between hover:border-gold-dark/40 transition-colors duration-300 relative h-full min-h-[240px] will-change-transform cursor-pointer select-none"
    >
      {/* Background layer effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gold-champagne/5 pointer-events-none" />

      <MessageSquare 
        className="absolute top-6 right-6 h-8 w-8 text-gold-champagne/15 stroke-[1.5] pointer-events-none transition-transform duration-300" 
        style={{ transform: "translateZ(30px)" }} 
      />
      
      <div className="space-y-4 relative z-10" style={{ transform: "translateZ(45px)" }}>
        {/* Gold Stars */}
        <div className="flex gap-0.5" style={{ transform: "translateZ(20px)" }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-gold-dark text-gold-dark" />
          ))}
        </div>

        <p className="text-xs sm:text-sm text-dark-soft italic font-light leading-relaxed">
          "{review.text}"
        </p>
      </div>

      <div 
        className="pt-6 border-t border-gold-champagne/5 mt-6 flex justify-between items-end relative z-10" 
        style={{ transform: "translateZ(30px)" }}
      >
        <div>
          <h4 className="font-serif text-sm font-semibold text-dark-deep">{review.name}</h4>
          <p className="text-[10px] text-olive-light mt-0.5">{review.role}</p>
        </div>
        <span className="text-[9px] text-olive-light font-mono">{review.date.replace("Visité en ", "")}</span>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Safe clamping of index if screen size changes
  useEffect(() => {
    const maxIdx = Math.max(0, REVIEWS.length - itemsPerPage);
    if (currentIndex > maxIdx) {
      setCurrentIndex(maxIdx);
    }
  }, [itemsPerPage, currentIndex]);

  const maxIndex = Math.max(0, REVIEWS.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-24 bg-bg-cream border-t border-gold-champagne/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
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

        {/* Carousel Window */}
        <div className="relative px-2 sm:px-10">
          <div className="overflow-hidden py-4"> {/* Added padding vertical for 3D scale and lift bounds */}
            <motion.div 
              className="flex"
              animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {REVIEWS.map((review, idx) => (
                <div 
                  key={idx} 
                  className="px-4 flex-shrink-0"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <TestimonialCard review={review} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation controls */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-dark-deep hover:text-white text-dark-deep border border-gold-champagne/30 p-2 sm:p-3 transition-colors shadow-sm focus:outline-none z-10 hidden sm:block"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-dark-deep hover:text-white text-dark-deep border border-gold-champagne/30 p-2 sm:p-3 transition-colors shadow-sm focus:outline-none z-10 hidden sm:block"
            aria-label="Avis suivant"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(maxIndex + 1)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 transition-all rounded-full ${
                currentIndex === idx 
                  ? "w-8 bg-gold-dark" 
                  : "w-2.5 bg-gold-champagne/30 hover:bg-gold-champagne"
              }`}
              aria-label={`Aller à la diapositive ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
