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
  homeRemedy?: {
    case: string;
    recipe: string;
  };
}

export const PRODUCTS: Product[] = [
  // MIELS
  {
    id: "miel-jujubier",
    name: "Miel de Jujubier (Sidr)",
    category: "HONEY",
    origin: "Maroc",
    description: "Le Miel de Jujubier (Sidr) est un trésor ancestral réputé pour ses propriétés antibactériennes et cicatrisantes exceptionnelles. Issu du jujubier sauvage, dont les vertus purifiantes et fortifiantes sont célébrées en apithérapie, ce nectar rare agit comme un véritable régénérant pour l'organisme et la peau.",
    taste: "Intense, caramélisé, légèrement boisé avec des notes chaudes persistantes.",
    texture: "Onctueuse, dense, très lente à cristalliser.",
    usageTips: "Prendre une cuillère à café le matin à jeun pour booster l'énergie naturelle, ou l'intégrer dans vos boissons chaudes douces.",
    crystallization: "Très lente (reste liquide de nombreux mois).",
    imageUrl: "/images/jujubier_luxury_jar.png",
    variants: [
      { id: "v-jujubier-500", weight: "500 g", price: 28, stock: 25 },
      { id: "v-jujubier-1000", weight: "1 kg", price: 55, stock: 15 }
    ],
    benefits: [
      "Puissant antibactérien et antioxydant naturel",
      "Favorise la cicatrisation des plaies, brûlures et imperfections cutanées",
      "Renforce intensément le système immunitaire et combat la fatigue générale"
    ],
    homeRemedy: {
      case: "Acné, cicatrices ou brûlures légères",
      recipe: "Appliquez une fine couche de miel de Jujubier directement sur la zone concernée préalablement nettoyée. Laissez poser sous une compresse stérile pendant 30 à 60 minutes avant de rincer délicatement à l'eau tiède."
    }
  },
  {
    id: "miel-zaggoum",
    name: "Miel de Zaggoum (Euphorbe)",
    category: "HONEY",
    origin: "Maroc",
    description: "Le Miel de Zaggoum (issu de l'Euphorbia resinifera) provient d'une plante grasse des montagnes de l'Atlas aux vertus réchauffantes et stimulantes. Ce miel singulier est traditionnellement utilisé pour ses propriétés anti-inflommatoires, particulièrement bénéfiques pour apaiser les voies respiratoires et soulager les maux de gorge tenaces.",
    taste: "Puissant, chaud, poivré en fin de bouche, très distinctif.",
    texture: "Liquide à légèrement crémeuse.",
    usageTips: "Idéal pour réchauffer la gorge en hiver ou pour accompagner des plats gastronomiques audacieux.",
    crystallization: "Moyenne.",
    imageUrl: "/images/zaggoum_luxury_jar.png",
    variants: [
      { id: "v-zaggoum-500", weight: "500 g", price: 28, stock: 30 },
      { id: "v-zaggoum-1000", weight: "1 kg", price: 55, stock: 20 }
    ],
    benefits: [
      "Action anti-inflammatoire et antispasmodique ciblée sur la gorge",
      "Procure une sensation de chaleur thérapeutique immédiate",
      "Soutient le tonus cardiovasculaire et stimule la circulation"
    ],
    homeRemedy: {
      case: "Toux sèche ou irritation de la gorge",
      recipe: "Mélangez une cuillère à café de miel de Zaggoum dans une demi-tasse d'eau tiède avec une pincée de gingembre moulu. Buvez lentement par petites gorgées le soir avant le coucher."
    }
  },
  {
    id: "miel-thym",
    name: "Miel de Thym",
    category: "HONEY",
    origin: "Maroc (Moyen-Atlas)",
    description: "Le Miel de Thym sauvage hérite des propriétés antiseptiques majeures et antibactériennes du thym. Réputé en apithérapie clinique comme l'un des meilleurs agents de cicatrisation, il est également un allié précieux pour dégager les voies respiratoires et stimuler le système digestif fatigué.",
    taste: "Très aromatique, herbacé, chaud, avec une pointe d'acidité rafraîchissante.",
    texture: "Crémeuse et veloutée.",
    usageTips: "S'utilise traditionnellement pour apaiser la gorge, sucrer les infusions ou en application cutanée légère.",
    crystallization: "Rapide à moyenne, texture finement granuleuse agréable.",
    imageUrl: "/images/thym_luxury_jar.png",
    variants: [
      { id: "v-thym-500", weight: "500 g", price: 28, stock: 40 },
      { id: "v-thym-1000", weight: "1 kg", price: 55, stock: 25 }
    ],
    benefits: [
      "Propriétés antiseptiques, antivirales et cicatrisantes hors pair",
      "Soulage rapidement les infections des voies respiratoires (bronches, gorge)",
      "Aide à réguler la digestion et apaise les spasmes intestinaux"
    ],
    homeRemedy: {
      case: "Brûlure superficielle ou petite coupure",
      recipe: "Après avoir désinfecté la lésion à l'eau claire, étalez une couche généreuse de miel de Thym et recouvrez d'une gaze stérile. Renouvelez l'application toutes les 24 heures pour accélérer la régénération cutanée."
    }
  },
  {
    id: "miel-fenouil",
    name: "Miel de Fenouil",
    category: "HONEY",
    origin: "Maroc",
    description: "Le Miel de Fenouil concentre les vertus carminatives et antispasmodiques des graines de fenouil. Naturellement doux et anisé, il est le partenaire privilégié du confort intestinal, luttant efficacement contre les ballonnements, les spasmes digestifs et favorisant un transit harmonieux après les repas.",
    taste: "Doux, suave, avec de délicates notes d'anis et de réglisse.",
    texture: "Liquide et limpide.",
    usageTips: "Délicieux dans une infusion de camomille ou de verveine après le repas pour favoriser le confort digestif.",
    crystallization: "Lente.",
    imageUrl: "/images/fenouil_luxury_jar.png",
    variants: [
      { id: "v-fenouil-500", weight: "500 g", price: 13, stock: 50 },
      { id: "v-fenouil-1000", weight: "1 kg", price: 25, stock: 35 }
    ],
    benefits: [
      "Soulage les ballonnements, gaz et digestions difficiles",
      "Propriétés antispasmodiques apaisant les coliques et douleurs abdominales",
      "Favorise traditionnellement la lactation chez les mères allaitantes"
    ],
    homeRemedy: {
      case: "Ballonnements et digestion lente après repas",
      recipe: "Infusez quelques graines de camomille ou de verveine dans de l'eau chaude. Ajoutez une cuillère à café de miel de Fenouil une fois l'infusion tiédie et consommez après le repas."
    }
  },
  {
    id: "miel-eucalyptus",
    name: "Miel d'Eucalyptus",
    category: "HONEY",
    origin: "Maroc",
    description: "Le Miel d'Eucalyptus est un merveilleux expectorant naturel qui puise ses vertus dans les feuilles d'eucalyptus, riches en eucalyptol. Il est idéalement recommandé pour purifier les voies respiratoires, calmer les accès de toux grasse et soutenir l'organisme face aux agressions climatiques hivernales.",
    taste: "Boisé, légèrement mentholé, frais et persistant.",
    texture: "Crémeuse ou liquide dorée.",
    usageTips: "À diluer dans une eau tiède avec un zeste de citron pour un confort respiratoire optimal.",
    crystallization: "Moyenne.",
    imageUrl: "/images/eucalyptus_luxury_jar.png",
    variants: [
      { id: "v-eucalyptus-500", weight: "500 g", price: 13, stock: 45 },
      { id: "v-eucalyptus-1000", weight: "1 kg", price: 25, stock: 30 }
    ],
    benefits: [
      "Expectorant et antiseptique des voies respiratoires",
      "Calme la toux grasse et aide à fluidifier les sécrétions bronchiques",
      "Aide à lutter contre les états fébriles et les refroidissements"
    ],
    homeRemedy: {
      case: "Encombrement bronchique et nez bouché",
      recipe: "Dans un bol d'eau frémissante, ajoutez une cuillère à soupe de miel d'Eucalyptus. Inhalez les vapeurs sous une serviette pendant 10 minutes pour dégager instantanément les sinus."
    }
  },
  {
    id: "miel-caroubier",
    name: "Miel de Caroubier",
    category: "HONEY",
    origin: "Maroc",
    description: "Le Miel de Caroubier est reconnu pour ses remarquables vertus régulatrices sur l'appareil digestif. Issu des fleurs du caroubier, riche en tanins et fibres douces, il aide à apaiser les muqueuses irritées de l'estomac, à réduire le reflux acide et à réguler le transit intestinal.",
    taste: "Intense, chaud, notes prononcées de caramel cuit et de cacao.",
    texture: "Épaisse, sirupeuse.",
    usageTips: "Excellent substitut au sucre dans les pâtisseries haut de gamme ou sur des tartines de pain complet au petit déjeuner.",
    crystallization: "Très lente.",
    imageUrl: "/images/caroubier_luxury_jar.png",
    variants: [
      { id: "v-caroubier-500", weight: "500 g", price: 13, stock: 35 },
      { id: "v-caroubier-1000", weight: "1 kg", price: 25, stock: 20 }
    ],
    benefits: [
      "Protège et tapisse la muqueuse gastrique contre l'acidité",
      "Régulateur naturel du transit (efficace contre la diarrhée et la constipation)",
      "Riche en oligo-éléments et minéraux essentiels"
    ],
    homeRemedy: {
      case: "Reflux gastrique ou aigreurs d'estomac",
      recipe: "Prenez une cuillère à café de miel de Caroubier pur environ 15 à 20 minutes avant chaque repas principal pour protéger les parois de l'estomac."
    }
  },
  {
    id: "miel-ronces",
    name: "Miel de Ronces du Désert",
    category: "HONEY",
    origin: "Maroc (Régions pré-désertiques)",
    description: "Le Miel de Ronces du Désert possède des vertus astringentes et toniques héritées de la ronce sauvage. Particulièrement riche en fer et minéraux, il est conseillé pour fortifier les organismes fatigués, calmer les maux de bouche (aphtes, gencives) et apaiser les maux de gorge.",
    taste: "Sauvage, fruité, légèrement boisé avec une finale persistante.",
    texture: "Liquide ambrée.",
    usageTips: "Idéal pour napper les desserts aux fruits frais ou pour sucrer les yaourts artisanaux.",
    crystallization: "Moyenne.",
    imageUrl: "/images/ronces_luxury_jar.png",
    variants: [
      { id: "v-ronces-500", weight: "500 g", price: 13, stock: 20 },
      { id: "v-ronces-1000", weight: "1 kg", price: 25, stock: 15 }
    ],
    benefits: [
      "Propriétés astringentes et cicatrisantes pour la sphère buccale",
      "Tonique général et revitalisant riche en minéraux (fer, magnésium)",
      "Aide à calmer les inflammations de la gorge et les enrouements"
    ],
    homeRemedy: {
      case: "Aphtes ou gencives irritées",
      recipe: "Appliquez une noisette de miel de Ronces du Désert directement sur l'aphte ou la zone irritée à l'aide d'un coton-tige. Laissez agir sans rincer. Renouvelez 3 fois par jour."
    }
  },
  {
    id: "miel-campagne",
    name: "Miel de Campagne",
    category: "HONEY",
    origin: "Maroc (Plaines fleuries)",
    description: "Le Miel de Campagne est une synergie polyflorale printanière regroupant les forces de multiples plantes sauvages. Ce miel doux et équilibré est un excellent fortifiant quotidien pour toute la famille, réputé pour ses vertus calmantes douces qui favorisent la détente et le repos.",
    taste: "Floral, doux, harmonieux et riche en nuances.",
    texture: "Liquide dorée claire.",
    usageTips: "Le miel polyvalent de toute la famille, parfait pour cuisiner, napper ou infuser.",
    crystallization: "Moyenne à rapide.",
    imageUrl: "/images/campagne_luxury_jar.png",
    variants: [
      { id: "v-campagne-500", weight: "500 g", price: 13, stock: 80 },
      { id: "v-campagne-1000", weight: "1 kg", price: 25, stock: 50 }
    ],
    benefits: [
      "Fortifiant naturel polyvalent adapté aux enfants et adultes",
      "Vertus apaisantes douces favorisant la détente nerveuse",
      "Riche en antioxydants variés issus de fleurs diverses"
    ],
    homeRemedy: {
      case: "Difficultés d'endormissement ou stress passager",
      recipe: "Diluez une cuillère à café de miel de Campagne dans une tasse de lait végétal tiède (ou d'infusion de tilleul) 30 minutes avant de vous coucher pour un sommeil serein."
    }
  },
  {
    id: "miel-acacia-gommier",
    name: "Miel d'Acacia Gommier du Sahara",
    category: "HONEY",
    origin: "Maroc (Sahara)",
    description: "Le Miel d'Acacia Gommier du Sahara (Talha) est un élixir rare aux propriétés anti-inflommatoires et dépuratives exceptionnelles. Fortement estimé dans les traditions nomades pour soutenir la vitalité des voies respiratoires et hépatiques, son faible indice glycémique en fait également un choix de prédilection.",
    taste: "Robuste, boisé, avec des arômes profonds de réglisse et de caramel brun.",
    texture: "Liquide, très sombre, cristallisation lente.",
    usageTips: "Prendre une cuillère à café pure le matin pour soutenir la vitalité globale ou apaiser les voies respiratoires.",
    crystallization: "Très lente.",
    imageUrl: "/images/acacia_sahara_luxury_jar.png",
    variants: [
      { id: "v-acacia-gommier-500", weight: "500 g", price: 28, stock: 8 },
      { id: "v-acacia-gommier-1000", weight: "1 kg", price: 55, stock: 4 }
    ],
    benefits: [
      "Indice glycémique bas, adapté à une consommation modérée",
      "Action anti-inflommatoire et apaisante pour les poumons",
      "Soutient les fonctions dépuratives du foie et facilite la digestion"
    ],
    homeRemedy: {
      case: "Toux sèche persistante et irritante",
      recipe: "Mélangez une cuillère à café de miel d'Acacia Gommier avec le jus d'un demi-citron jaune pressé dans de l'eau tiède. Buvez le matin à jeun pour apaiser la gorge."
    }
  },

  // PRODUITS DE LA RUCHE
  {
    id: "pollen-sec",
    name: "Pollen Sec Sauvage",
    category: "HIVE_PRODUCT",
    origin: "Maroc",
    description: "Notre pollen sec est récolté avec soin par nos apiculteurs partenaires dans des zones préservées de toute pollution. Super-aliment exceptionnel, il constitue une source naturelle remarquable de protéines végétales, de vitamines et de minéraux pour retrouver tonus et vitalité.",
    imageUrl: "/images/pollen_luxury_jar.png",
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
    imageUrl: "/images/propolis_luxury_jar.png",
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
