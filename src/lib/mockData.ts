export interface ProductVariant {
  id: string;
  weight: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: "HONEY" | "THERAPEUTIC_BLEND" | "HIVE_PRODUCT";
  origin?: string;
  taste?: string;
  texture?: string;
  usageTips?: string;
  crystallization?: string;
  imageUrl: string;
  variants: ProductVariant[];
  composition?: string[];
  benefits?: string[];
  precautions?: string[];
}

export const PRODUCTS: Product[] = [
  // MIELS
  {
    id: "miel-jujubier",
    name: "Miel de Jujubier (Sidr)",
    category: "HONEY",
    origin: "Maroc",
    description: "Le Miel de Jujubier du Maroc (Sidr) est l'un des miels les plus prestigieux et recherchés au monde. Issu d'un arbre sauvage des zones arides, il possède des vertus exceptionnelles et un goût d'une richesse incomparable.",
    taste: "Intense, caramélisé, légèrement boisé avec des notes chaudes persistantes.",
    texture: "Onctueuse, dense, très lente à cristalliser.",
    usageTips: "Prendre une cuillère à café le matin à jeun pour booster l'énergie naturelle, ou l'intégrer dans vos boissons chaudes douces.",
    crystallization: "Très lente (reste liquide de nombreux mois).",
    imageUrl: "/images/jujubier_luxury_jar.png",
    variants: [
      { id: "v-jujubier-500", weight: "500 g", price: 20, stock: 25 },
      { id: "v-jujubier-1000", weight: "1 kg", price: 35, stock: 15 }
    ]
  },
  {
    id: "miel-zaggoum",
    name: "Miel de Zaggoum (Euphorbe)",
    category: "HONEY",
    origin: "Maroc",
    description: "Le Miel de Zaggoum (issu de l'Euphorbia resinifera) est un miel unique originaire des montagnes de l'Atlas. C'est un miel rare réputé pour sa saveur singulière et sa sensation de chaleur caractéristique dans la gorge.",
    taste: "Puissant, chaud, poivré en fin de bouche, très distinctif.",
    texture: "Liquide à légèrement crémeuse.",
    usageTips: "Idéal pour réchauffer la gorge en hiver ou pour accompagner des plats gastronomiques audacieux.",
    crystallization: "Moyenne.",
    imageUrl: "/images/ZAGGOUM.jpeg",
    variants: [
      { id: "v-zaggoum-500", weight: "500 g", price: 18, stock: 30 },
      { id: "v-zaggoum-1000", weight: "1 kg", price: 35, stock: 20 }
    ]
  },
  {
    id: "miel-thym",
    name: "Miel de Thym",
    category: "HONEY",
    origin: "Maroc (Moyen-Atlas)",
    description: "Miel de montagne récolté sur les flancs ensoleillés du Moyen-Atlas, notre Miel de Thym sauvage possède des arômes intenses et des vertus antiseptiques et cicatrisantes reconnues depuis l'Antiquité.",
    taste: "Très aromatique, herbacé, chaud, avec une pointe d'acidité rafraîchissante.",
    texture: "Crémeuse et veloutée.",
    usageTips: "S'utilise traditionnellement pour apaiser la gorge, sucrer les infusions ou en application cutanée légère.",
    crystallization: "Rapide à moyenne, texture finement granuleuse agréable.",
    imageUrl: "/images/thym_luxury_jar.png",
    variants: [
      { id: "v-thym-500", weight: "500 g", price: 18, stock: 40 },
      { id: "v-thym-1000", weight: "1 kg", price: 35, stock: 25 }
    ]
  },
  {
    id: "miel-fenouil",
    name: "Miel de Fenouil",
    category: "HONEY",
    origin: "Maroc",
    description: "Un miel original et d'une grande douceur, apprécié pour ses notes anisées subtiles. Il est traditionnellement recommandé pour accompagner la digestion et apporter un confort après les repas.",
    taste: "Doux, suave, avec de délicates notes d'anis et de réglisse.",
    texture: "Liquide et limpide.",
    usageTips: "Délicieux dans une infusion de camomille ou de verveine après le repas pour favoriser le confort digestif.",
    crystallization: "Lente.",
    imageUrl: "/images/FENOUIL.jpeg",
    variants: [
      { id: "v-fenouil-500", weight: "500 g", price: 13, stock: 50 },
      { id: "v-fenouil-1000", weight: "1 kg", price: 25, stock: 35 }
    ]
  },
  {
    id: "miel-eucalyptus",
    name: "Miel d'Eucalyptus",
    category: "HONEY",
    origin: "Maroc",
    description: "Récolté dans les grandes forêts d'eucalyptus, ce miel offre une fraîcheur immédiate en bouche et un parfum boisé caractéristique. Il est parfait pour accompagner les périodes de fraîcheur hivernale.",
    taste: "Boisé, légèrement mentholé, frais et persistant.",
    texture: "Crémeuse ou liquide dorée.",
    usageTips: "À diluer dans une eau tiède avec un zeste de citron pour un confort respiratoire optimal.",
    crystallization: "Moyenne.",
    imageUrl: "/images/EUCALYPTUS.jpeg",
    variants: [
      { id: "v-eucalyptus-500", weight: "500 g", price: 13, stock: 45 },
      { id: "v-eucalyptus-1000", weight: "1 kg", price: 25, stock: 30 }
    ]
  },
  {
    id: "miel-caroubier",
    name: "Miel de Caroubier",
    category: "HONEY",
    origin: "Maroc",
    description: "Issu des fleurs du caroubier, ce miel sombre et épais dévoile des arômes uniques de chocolat et de caramel. Une véritable gourmandise naturelle réputée pour ses vertus apaisantes digestives.",
    taste: "Intense, chaud, notes prononcées de caramel cuit et de cacao.",
    texture: "Épaisse, sirupeuse.",
    usageTips: "Excellent substitut au sucre dans les pâtisseries haut de gamme ou sur des tartines de pain complet au petit déjeuner.",
    crystallization: "Très lente.",
    imageUrl: "/images/CAROUBIER.jpeg",
    variants: [
      { id: "v-caroubier-500", weight: "500 g", price: 13, stock: 35 },
      { id: "v-caroubier-1000", weight: "1 kg", price: 25, stock: 20 }
    ]
  },
  {
    id: "miel-ronces",
    name: "Miel de Ronces du Désert",
    category: "HONEY",
    origin: "Maroc (Régions pré-désertiques)",
    description: "Un miel rare et sauvage récolté sur les ronces poussant dans les vallées arides bordant le désert marocain. Un nectar sauvage d'une grande richesse minérale.",
    taste: "Sauvage, fruité, légèrement boisé avec une finale persistante.",
    texture: "Liquide ambrée.",
    usageTips: "Idéal pour napper les desserts aux fruits frais ou pour sucrer les yaourts artisanaux.",
    crystallization: "Moyenne.",
    imageUrl: "/images/RONCES DU DESERT.jpeg",
    variants: [
      { id: "v-ronces-500", weight: "500 g", price: 13, stock: 20 },
      { id: "v-ronces-1000", weight: "1 kg", price: 25, stock: 15 }
    ]
  },
  {
    id: "miel-campagne",
    name: "Miel de Campagne",
    category: "HONEY",
    origin: "Maroc (Plaines fleuries)",
    description: "Une superbe composition florale printanière regroupant le nectar d'eucalyptus, de chardon-Marie, de pin, de trèfle et de multiples fleurs sauvages. Équilibré et polyvalent.",
    taste: "Floral, doux, harmonieux et riche en nuances.",
    texture: "Liquide dorée claire.",
    usageTips: "Le miel polyvalent de toute la famille, parfait pour cuisiner, napper ou infuser.",
    crystallization: "Moyenne à rapide.",
    imageUrl: "/images/CIRCULATION.jpeg",
    variants: [
      { id: "v-campagne-500", weight: "500 g", price: 13, stock: 80 },
      { id: "v-campagne-1000", weight: "1 kg", price: 25, stock: 50 }
    ]
  },

  // PRODUITS DE LA RUCHE
  {
    id: "pollen-sec",
    name: "Pollen Sec Sauvage",
    category: "HIVE_PRODUCT",
    origin: "Maroc",
    description: "Notre pollen sec est récolté avec soin par nos apiculteurs partenaires dans des zones préservées de toute pollution. Super-aliment exceptionnel, il constitue une source naturelle remarquable de protéines végétales, de vitamines et de minéraux pour retrouver tonus et vitalité.",
    imageUrl: "/images/POLLEN SEC.jpeg",
    variants: [
      { id: "v-pollen-250", weight: "250 g", price: 12.5, stock: 40 }
    ],
    benefits: [
      "Source naturelle de protéines et acides aminés essentiels",
      "Riche en vitamines du groupe B et minéraux",
      "Soutien de la flore intestinale et renforcement de la vitalité globale"
    ],
    usageTips: "Consommer une cuillère à soupe par jour, nature au petit-déjeuner, mélangé à un yaourt, une compote ou un jus de fruits frais."
  },
  {
    id: "propolis-francaise",
    name: "Propolis Française Pure",
    category: "HIVE_PRODUCT",
    origin: "France",
    description: "La propolis est une résine naturelle protectrice collectée par les abeilles sur les bourgeons des arbres. Cette propolis pure de qualité supérieure est reconnue pour sa richesse exceptionnelle en antioxydants et polyphénols.",
    imageUrl: "/images/PROPOLIS.jpeg",
    variants: [
      { id: "v-propolis-20", weight: "20 g", price: 10, stock: 100 }
    ],
    benefits: [
      "Soutien puissant des défenses naturelles de l'organisme",
      "Riche en polyphénols antioxydants",
      "Favorise l'hygiène buccale et procure un confort immédiat de la gorge"
    ],
    usageTips: "Mâcher doucement un petit morceau de 1g après le repas, ou utiliser sous forme d'infusion/décoction légère pour la gorge."
  },

  // MÉLANGES THÉRAPEUTIQUES
  {
    id: "melange-immunite",
    name: "Miel Immunité",
    category: "THERAPEUTIC_BLEND",
    description: "Une formulation d'exception associant l'énergie du miel d'Eucalyptus/Jujubier aux vertus protectrices du pollen, de la propolis et de la nigelle (habba sawda). Le bouclier naturel idéal.",
    imageUrl: "/images/IMMUNITE.jpeg",
    composition: ["Miel d'Eucalyptus ou de Jujubier", "Pollen sec", "Extrait de Propolis pure", "Graines de Nigelle moulues"],
    benefits: ["Soutien actif des défenses immunitaires", "Vitalité accrue lors des changements de saison", "Richesse en micronutriments protecteurs"],
    usageTips: "Prendre une cuillère à café chaque matin pendant 21 jours, de préférence à jeun.",
    precautions: ["Déconseillé aux personnes allergiques aux produits de la ruche.", "Ne convient pas aux enfants de moins de 3 ans."],
    variants: [
      { id: "v-immunite-250", weight: "250 g", price: 19, stock: 30 }
    ]
  },
  {
    id: "melange-balsamique",
    name: "Miel Balsamique",
    category: "THERAPEUTIC_BLEND",
    description: "Une infusion aromatique de miel d'Eucalyptus enrichie en huiles essentielles alimentaires pour dégager instantanément les voies respiratoires et apporter une agréable sensation de fraîcheur.",
    imageUrl: "/images/MIEL BALSAMIQUE.jpeg",
    composition: ["Miel d'Eucalyptus", "HE Eucalyptus Globulus", "HE Eucalyptus Citronné", "HE Ravintsara", "HE Menthe Poivrée", "HE Orange Douce"],
    benefits: ["Confort respiratoire", "Sensation de fraîcheur", "Bien-être des voies respiratoires"],
    usageTips: "Prendre une cuillère à café à laisser fondre lentement sous la langue.",
    precautions: ["Contient des huiles essentielles.", "Interdit aux femmes enceintes/allaitantes et enfants de moins de 12 ans."],
    variants: [
      { id: "v-balsamique-250", weight: "250 g", price: 18, stock: 25 }
    ]
  },
  {
    id: "melange-gastrique",
    name: "Miel Gastrique",
    category: "THERAPEUTIC_BLEND",
    description: "La synergie douce du miel de Caroubier marié aux poudres de fenouil, de nigelle et de curcuma pour apaiser les estomacs sensibles, réduire les ballonnements et faciliter la digestion après les repas.",
    imageUrl: "/images/GASTRIQUE.jpeg",
    composition: ["Miel de Caroubier", "Fenouil", "Nigelle", "Curcuma"],
    benefits: ["Confort digestif", "Soulage les ballonnements", "Facilite la digestion"],
    usageTips: "Prendre une cuillère à café diluée dans de l'eau tiède avant les repas.",
    variants: [
      { id: "v-gastrique-250", weight: "250 g", price: 17, stock: 40 }
    ]
  },
  {
    id: "melange-articulations",
    name: "Miel Articulations",
    category: "THERAPEUTIC_BLEND",
    description: "L'association ciblée du miel de Zaggoum traditionnel réputé chaud et des épices anti-inflammatoires ancestrales comme le curcuma et le gingembre pour favoriser le confort articulaire.",
    imageUrl: "/images/ARTICULATION.jpeg",
    composition: ["Miel de Zaggoum", "Curcuma", "Gingembre"],
    benefits: ["Confort articulaire", "Favorise la mobilité", "Bien-être musculaire"],
    usageTips: "Prendre une cuillère à café par jour dans une infusion tiède.",
    variants: [
      { id: "v-articulations-250", weight: "250 g", price: 18, stock: 35 }
    ]
  },
  {
    id: "melange-booster",
    name: "Miel Booster",
    category: "THERAPEUTIC_BLEND",
    description: "Une formulation énergisante majeure combinant le Miel de Jujubier haut de gamme avec le maca du Pérou, le ginseng de Sibérie et le pollen pour stimuler la vitalité physique et mentale.",
    imageUrl: "/images/FORTIFIANT.jpeg",
    composition: ["Miel de Jujubier", "Maca", "Ginseng", "Pollen"],
    benefits: ["Énergie et tonus", "Endurance accrue", "Stimule la vitalité globale"],
    usageTips: "Une cuillère à café le matin au réveil en cure de 3 semaines.",
    variants: [
      { id: "v-booster-250", weight: "250 g", price: 22, stock: 20 }
    ]
  },
  {
    id: "melange-memoire",
    name: "Miel Mémoire & Concentration",
    category: "THERAPEUTIC_BLEND",
    description: "Une formulation d'exception conçue pour stimuler l'activité cognitive, renforcer la mémoire et soutenir la clarté mentale en période d'examen ou d'effort intellectuel intense.",
    imageUrl: "/images/MEMOIRE ET CONCENTRATION.jpeg",
    composition: ["Miel de Campagne", "Ashwagandha", "Pollen"],
    benefits: ["Améliore la concentration", "Clarté mentale et mémoire", "Réduction de la fatigue cognitive"],
    usageTips: "Prendre une cuillère à café le matin en cure.",
    variants: [
      { id: "v-memoire-250", weight: "250 g", price: 18, stock: 30 }
    ]
  },
  {
    id: "melange-sommeil",
    name: "Miel Sommeil",
    category: "THERAPEUTIC_BLEND",
    description: "Une formule relaxante alliant la douceur du miel de Campagne au pouvoir apaisant de l'ashwagandha et de la camomille pour préparer le corps et l'esprit à une nuit paisible.",
    imageUrl: "/images/SOMMEIL.jpeg",
    composition: ["Miel de Campagne", "Ashwagandha", "Camomille"],
    benefits: ["Détente et relaxation", "Aide à l'endormissement", "Sommeil réparateur"],
    usageTips: "Prendre une cuillère à café dans une infusion tiède 30 minutes avant le coucher.",
    variants: [
      { id: "v-sommeil-250", weight: "250 g", price: 17, stock: 45 }
    ]
  },
  {
    id: "melange-fertilite",
    name: "Miel Fertilité",
    category: "THERAPEUTIC_BLEND",
    description: "Formulation traditionnelle à base de miel de Jujubier de haute qualité et de pollen de palmier pur pour soutenir la vitalité.",
    imageUrl: "/images/FERTILITE.jpeg",
    composition: ["Miel de Jujubier", "Pollen de palmier"],
    benefits: ["Formulation traditionnelle", "Énergie et vitalité globale", "Ingrédients naturels bruts"],
    precautions: ["Ne jamais considérer comme un médicament ou traitement hormonal.", "Demander conseil à un professionnel de santé."],
    variants: [
      { id: "v-fertilite-250", weight: "250 g", price: 24, stock: 15 }
    ]
  },
  {
    id: "melange-allergies",
    name: "Miel Allergies",
    category: "THERAPEUTIC_BLEND",
    description: "Synergie d'accompagnement pour soutenir les défenses naturelles de l'organisme et apaiser les voies respiratoires lors des changements de saison.",
    imageUrl: "/images/ALLERGIES.jpeg",
    composition: ["Miel de Zaggoum ou Daghmous", "Propolis", "Huile de nigelle", "Nigelle moulue"],
    benefits: ["Soutien des défenses naturelles", "Confort des voies respiratoires", "Accompagnement lors des allergies saisonnières"],
    usageTips: "Prendre une cuillère à café par jour dès le début du printemps.",
    variants: [
      { id: "v-allergies-250", weight: "250 g", price: 19, stock: 25 }
    ]
  }
];
