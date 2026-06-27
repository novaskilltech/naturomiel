export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: "apitherapie" | "phytotherapie" | "produits-ruche" | "conseils-sante" | "recettes" | "origine-miels" | "actualites";
  categoryLabel: string;
  imageUrl: string;
  author: string;
  createdAt: string;
  seoTitle: string;
  seoDescription: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Le Miel de Jujubier (Sidr) : L'Or Liquide du Maroc et ses Vertus Exceptionnelles",
    slug: "vertus-miel-jujubier-sidr",
    category: "origine-miels",
    categoryLabel: "Origine des Miels",
    imageUrl: "/images/JUJUBIER.jpeg",
    author: "Dr. Apiculteur NaturoMiel",
    createdAt: "27 Juin 2026",
    seoTitle: "Bienfaits et vertus du Miel de Jujubier (Sidr) | NaturoMiel",
    seoDescription: "Découvrez pourquoi le miel de Jujubier (Sidr) du Maroc est l'un des miels les plus chers et les plus bénéfiques au monde. Origine, vertus et caractéristiques.",
    content: `
      Le miel de Jujubier, également connu sous le nom de miel de Sidr, est considéré à juste titre comme l'un des trésors les plus précieux de la ruche. Récolté dans des conditions souvent arides au cœur des montagnes marocaines, ce miel brut possède une réputation mondiale pour ses propriétés thérapeutiques exceptionnelles.

      ## Qu'est-ce que le Miel de Jujubier (Sidr) ?
      Le Jujubier (Ziziphus spina-christi) est un arbre épineux sauvage qui pousse dans les zones arides. Les abeilles qui récoltent son nectar produisent un miel d'une pureté incroyable, d'une couleur dorée profonde et au parfum unique.

      ## Les Bienfaits Majeurs pour la Santé
      1. **Renforcement du Système Immunitaire** : Sa haute concentration en antioxydants aide à lutter contre le stress oxydatif et soutient les défenses naturelles de l'organisme.
      2. **Énergie Naturelle Directe** : Composé de sucres simples facilement assimilables, il procure une énergie immédiate aux sportifs et aux personnes convalescentes.
      3. **Propriétés Antibactériennes et Cicatrisantes** : Traditionnellement utilisé pour apaiser les maux de gorge, il aide également à réparer les tissus cutanés en application locale.

      ## Comment le consommer au quotidien ?
      Pour profiter pleinement de ses vertus, il est conseillé de prendre une cuillère à café de miel de Jujubier le matin à jeun, ou dilué dans une tasse d'eau tiède ou une infusion douce (non bouillante pour préserver les enzymes).
    `
  },
  {
    id: "post-2",
    title: "Comment Renforcer ses Défenses Immunitaires en Automne grâce à l'Apithérapie",
    slug: "renforcer-immunite-apitherapie-automne",
    category: "apitherapie",
    categoryLabel: "Apithérapie",
    imageUrl: "/images/IMMUNITE.jpeg",
    author: "Naturopathe Cabinet",
    createdAt: "15 Juin 2026",
    seoTitle: "Renforcer son immunité à l'automne avec l'apithérapie | NaturoMiel",
    seoDescription: "Préparez votre corps aux changements de saison avec les produits de la ruche. Guide pratique sur la propolis, le pollen et les miels thérapeutiques.",
    content: `
      Le changement de saison est souvent synonyme de fatigue et de petites infections. L'apithérapie, ou l'utilisation des produits de la ruche à des fins de santé, offre une panoplie de remèdes naturels formidables pour traverser ces périodes en pleine forme.

      ## La Propolis : Le Bouclier de la Ruche
      Produite par les abeilles à partir de résines de bourgeons, la propolis sert à assainir la ruche. Pour l'homme, c'est un excellent désinfectant naturel. Elle aide à apaiser les maux de gorge et soutient activement les défenses de l'organisme.

      ## Le Pollen : Le Super-aliment Énergisant
      Le pollen sec est extrêmement riche en acides aminés essentiels, vitamines (notamment du groupe B) et minéraux. Une cure de pollen de 3 semaines aide à stimuler la flore intestinale et à lutter contre la fatigue passagère.

      ## Notre Préparation Signature : Le Miel Immunité
      Chez NaturoMiel, nous avons combiné le meilleur de la ruche dans notre **Miel Immunité**. En associant du miel d'Eucalyptus, de la propolis pure, du pollen sec et des graines de nigelle moulues, nous offrons une synergie active complète pour toute la famille.
    `
  },
  {
    id: "post-3",
    title: "Le Miel de Zaggoum (Euphorbe) : Un Trésor Chaud pour le Confort Respiratoire",
    slug: "bienfaits-miel-zaggoum-euphorbe-maroc",
    category: "conseils-sante",
    categoryLabel: "Conseils Santé",
    imageUrl: "/images/ZAGGOUM.jpeg",
    author: "Dr. Apiculteur NaturoMiel",
    createdAt: "05 Juin 2026",
    seoTitle: "Vertus du Miel de Zaggoum (Euphorbe) du Maroc | NaturoMiel",
    seoDescription: "Tout savoir sur le miel de Zaggoum (Daghmous), réputé pour sa saveur poivrée unique et ses vertus exceptionnelles sur les voies respiratoires.",
    content: `
      Le miel de Zaggoum (ou miel de Daghmous) est issu d'un cactus sauvage (Euphorbia resinifera) qui pousse principalement dans les montagnes arides de l'Atlas marocain. C'est un miel unique en son genre qui procure une sensation de chaleur incomparable dans la gorge lors de sa consommation.

      ## Une saveur et un effet surprenants
      Contrairement aux miels doux traditionnels, le miel de Zaggoum se distingue par un goût intense et une note poivrée prononcée. Cette sensation de picotement et de chaleur dans l'arrière-gorge est le signe de sa richesse en principes actifs et de son efficacité.

      ## Les Principaux usages thérapeutiques
      - **Confort Respiratoire** : Il aide à apaiser la toux et à dégager les voies respiratoires encombrées.
      - **Action Réchauffante** : Idéal pour les frileux ou en période hivernale pour stimuler la circulation locale.
      - **Soutien en cas d'allergies saisonnières** : Utilisé traditionnellement pour accompagner les personnes sujettes aux sensibilités saisonnières.
    `
  },
  {
    id: "post-gastrique",
    title: "Le Miel Gastrique : Recette Traditionnelle pour le Confort Digestif & Estomac",
    slug: "bienfaits-miel-gastrique-estomac-digestion",
    category: "apitherapie",
    categoryLabel: "Apithérapie",
    imageUrl: "/images/GASTRIQUE.jpeg",
    author: "NaturoMiel Nutrition",
    createdAt: "27 Juin 2026",
    seoTitle: "Le Miel Gastrique : Vertus digestives et composition | NaturoMiel",
    seoDescription: "Découvrez notre remède traditionnel Miel Gastrique à base de miel, gingembre, curcuma et fenouil pour apaiser l'estomac et réduire les ballonnements.",
    content: `
      Le miel gastrique est une préparation culinaire traditionnelle qui a été utilisée pendant des siècles dans de nombreuses cultures pour ses vertus thérapeutiques. Cette recette associe le miel, le gingembre en poudre, le curcuma et la graine de fenouil pour créer une synergie d'ingrédients naturels remarquables.

      ## Les Ingrédients Actifs du Miel Gastrique
      - **Le Miel** : Il apporte des propriétés antiseptiques et anti-inflammatoires reconnues pour apaiser les muqueuses de l'estomac et lutter contre les infections.
      - **Le Gingembre en Poudre** : Utilisé depuis des millénaires pour traiter les troubles digestifs, calmer les nausées, les vomissements et réduire l'inflammation interne.
      - **Le Curcuma** : Un antioxydant puissant dérivé de la racine de Curcuma Longa, il aide à protéger le corps et soulage les douleurs liées à l'inflammation.
      - **La Graine de Fenouil** : Idéale pour soulager les problèmes de digestion tels que les ballonnements, flatulences et spasmes abdominaux.

      ## Les Vertus Majeures pour Votre Digestion
      1. **Amélioration de la digestion** : Stimule le transit et apaise instantanément le reflux.
      2. **Réduction des ballonnements** : La graine de fenouil élimine les sensations de lourdeur après les repas.
      3. **Protection de l'estomac** : Les antioxydants du curcuma protègent les parois gastriques.
    `
  },
  {
    id: "post-balsamique",
    title: "Le Miel Balsamique : Une Synergie d'Huiles Essentielles pour les Voies Respiratoires",
    slug: "miel-balsamique-huiles-essentielles-respiratoire",
    category: "apitherapie",
    categoryLabel: "Apithérapie",
    imageUrl: "/images/MIEL BALSAMIQUE.jpeg",
    author: "Dr. Apiculteur NaturoMiel",
    createdAt: "27 Juin 2026",
    seoTitle: "Miel Balsamique : Bienfaits et utilisation pour la gorge | NaturoMiel",
    seoDescription: "Guide complet sur le Miel Balsamique : l'alliance du miel d'eucalyptus et des huiles essentielles majeures pour libérer la respiration.",
    content: `
      Le miel balsamique est une combinaison savante de miel d'eucalyptus brut et de plusieurs huiles essentielles alimentaires réputées. C'est un remède incontournable pour traverser les périodes de froid.

      ## Une Formulation Aromatique Puissante
      Ce mélange incorpore des essences végétales de premier choix :
      - **Huile essentielle d'Eucalyptus Radiata** : Idéale pour traiter les infections de la gorge et le rhume.
      - **Eucalyptus Globulus** : Action expectorante majeure qui dégage la congestion bronchique.
      - **Romarin à Cinéole** : Stimule la circulation et apporte de la clarté.
      - **Menthe Poivrée** : Antispasmodique et rafraîchissante.
      - **Ravintsara & Pin Sylvestre** : Antiviraux et fortifiants immunitaires reconnus.

      ## Pourquoi l'adopter en Hiver ?
      * **Dégagement immédiat** : Soulage le nez bouché et la toux.
      * **Renforcement de l'organisme** : Les propriétés antibactériennes du miel d'Eucalyptus préviennent l'aggravation des maux d'hiver.
      * **Anti-stress** : Le Ravintsara aide à réduire l'anxiété pour un repos optimal.
    `
  },
  {
    id: "post-immunite-remede",
    title: "Le Miel Immunité Complexe : Propolis, Pollen, Gelée Royale et Nigelle",
    slug: "miel-immunite-propolis-pollen-gelee-royale",
    category: "apitherapie",
    categoryLabel: "Apithérapie",
    imageUrl: "/images/IMMUNITE.jpeg",
    author: "Naturopathe Cabinet",
    createdAt: "27 Juin 2026",
    seoTitle: "Miel Immunité : Propolis, Pollen et Gelée Royale | NaturoMiel",
    seoDescription: "Découvrez les bienfaits du Miel Immunité, combinant propolis, pollen d'abeille, gelée royale et nigelle pour stimuler vos défenses.",
    content: `
      Notre Miel Immunité est le protecteur par excellence de la ruche. Il combine cinq ingrédients précieux de l'apithérapie traditionnelle pour soutenir votre forme physique.

      ## Les 5 Piliers du Miel Immunité
      1. **Miel d'Eucalyptus** : Riche en fer et potassium, avec des vertus antibactériennes.
      2. **Pollen d'Abeille** : Source exceptionnelle de protéines végétales et de vitamines B.
      3. **Propolis** : Richesse unique en flavonoïdes agissant comme un antibiotique naturel.
      4. **Gelée Royale** : Nourriture exclusive de la reine, hautement revitalisante.
      5. **Nigelle (Habba Sawda)** : Graine de cumin noir réputée pour ses vertus anti-inflammatoires.

      ## Bienfaits Digestifs et Cutanés
      En plus de fortifier l'immunité, ce mélange soutient l'équilibre de la flore intestinale grâce aux enzymes actives de la propolis. Il améliore également l'éclat de la peau grâce aux vertus antioxydantes de la nigelle et de la gelée royale.
    `
  },
  {
    id: "post-fortifiant",
    title: "Le Miel Fortifiant : L'alliance inédite du Miel d'Eucalyptus, du Pollen et de la Chlorelle",
    slug: "bienfaits-miel-fortifiant-pollen-chlorelle",
    category: "conseils-sante",
    categoryLabel: "Conseils Santé",
    imageUrl: "/images/FORTIFIANT.jpeg",
    author: "NaturoMiel Nutrition",
    createdAt: "27 Juin 2026",
    seoTitle: "Miel Fortifiant à la Chlorelle et Pollen | NaturoMiel",
    seoDescription: "Le miel fortifiant associe miel, pollen et chlorelle (algue verte détoxifiante) pour éliminer les toxines et booster votre tonus musculaire.",
    content: `
      Le miel fortifiant est une innovation naturelle de premier choix. Il associe le miel d'Eucalyptus, le pollen d'abeille et la chlorelle pour une cure détoxifiante majeure.

      ## La Chlorelle : Le Super-aliment Vert
      La chlorelle est une micro-algue verte d'eau douce réputée pour sa concentration exceptionnelle en chlorophylle. Elle agit comme un filtre naturel en aidant l'organisme à éliminer les métaux lourds et les toxines tout en apportant des antioxydants essentiels.

      ## Les Actions Clés du Miel Fortifiant
      * **Détoxification de l'organisme** grâce à l'action de la chlorophylle.
      * **Apport protéique et acides aminés** via le pollen sec, idéal pour la récupération musculaire des sportifs.
      * **Amélioration de l'absorption intestinale** grâce aux enzymes vivantes présentes dans le miel.
    `
  },
  // NOUVEAUX DOSSIERS DU BLOG WEB MIGRÉS
  {
    id: "post-horizons",
    title: "Du miel de tous horizons : Un Trésor Nutritionnel Inestimable",
    slug: "miel-de-tous-horizons-nutrition-et-bienfaits",
    category: "origine-miels",
    categoryLabel: "Origine des Miels",
    imageUrl: "/images/CIRCULATION.jpeg",
    author: "Dr. Apiculteur NaturoMiel",
    createdAt: "27 Juin 2026",
    seoTitle: "Du miel de tous horizons : bienfaits et nutrition | NaturoMiel",
    seoDescription: "Le miel est un produit ancestral d'une grande valeur. Analyse complète de ses vertus antiseptiques, anti-inflammatoires et nutritionnelles.",
    content: `
      Le miel est un produit naturel exceptionnel obtenu par les abeilles à partir du nectar des fleurs. Il est très apprécié pour son goût doux et sucré et est utilisé depuis des millénaires dans de nombreuses cultures pour ses propriétés médicinales uniques.

      ## Des Vertus Thérapeutiques Multiples
      Le miel possède de nombreuses vertus thérapeutiques validées. Il est notamment **antiseptique et cicatrisant**, ce qui en fait un excellent remède contre les maux de gorge et les petites coupures ou égratignures. Il agit également comme un expectorant naturel pour aider à soulager les symptômes de la toux sèche.

      ## Un Puissant Anti-inflammatoire et Antioxydant
      Les recherches montrent que le miel aide à réduire les marqueurs de l'inflammation et contribue à abaisser les niveaux de cholestérol dans le sang, favorisant ainsi une bonne santé cardiovasculaire. De plus, sa richesse en antioxydants en fait un allié idéal pour lutter contre le vieillissement de la peau.

      ## Une Mine de Nutriments Majeurs
      Le miel brut contient des vitamines du groupe B, de la vitamine C, ainsi que des minéraux indispensables comme le calcium, le fer et le zinc.
    `
  },
  {
    id: "post-trio-ruche",
    title: "Gelée Royale, Propolis et Pollen : Le Trio Protecteur d'Exception",
    slug: "gelee-royale-propolis-pollen-trio-ruche",
    category: "produits-ruche",
    categoryLabel: "Produits de la Ruche",
    imageUrl: "/images/POLLEN SEC.jpeg",
    author: "Naturopathe Cabinet",
    createdAt: "27 Juin 2026",
    seoTitle: "Gelée Royale, Propolis, Pollen : vertus protectrices | NaturoMiel",
    seoDescription: "Analyse des vertus thérapeutiques de la gelée royale, de la propolis et du pollen sauvage pour soutenir l'organisme et la vitalité.",
    content: `
      Au-delà du miel, les abeilles fabriquent d'autres trésors nutritionnels aux propriétés remarquables. Zoom sur la gelée royale, la propolis et le pollen.

      ## 1. La Gelée Royale : Nourriture de la Reine
      La gelée royale est sécrétée par les abeilles ouvrières pour nourrir exclusivement leur reine. C'est un concentré nutritif exceptionnel contenant des acides aminés libres, de la vitamine B5, des minéraux et des enzymes. Elle soutient le système immunitaire, aide à régénérer la flore intestinale et favorise un sommeil calme et réparateur.

      ## 2. La Propolis : Le Désinfectant Naturel
      La propolis est une résine protectrice récoltée sur les bourgeons des arbres. Les abeilles l'utilisent pour isoler la ruche des microbes. Pour l'homme, c'est un excellent antibiotique, antifongique et antiviral naturel. Elle est très efficace pour soigner l'acné, soulager la gorge et les infections de l'estomac.

      ## 3. Le Pollen Sauvage : Concentré de Protéines
      Riche en protéines et acides aminés essentiels, le pollen est un super-aliment idéal pour lutter contre la fatigue intellectuelle ou physique, et pour renforcer la digestion.
    `
  },
  {
    id: "post-rucher",
    title: "Le Rucher et le Rôle Crucial de l'Apiculteur dans la Nature",
    slug: "rucher-apiculteur-role-abeilles-pollinisation",
    category: "actualites",
    categoryLabel: "Actualités",
    imageUrl: "/images/CAROUBIER.jpeg",
    author: "Dr. Apiculteur NaturoMiel",
    createdAt: "27 Juin 2026",
    seoTitle: "Le Rucher et son rôle écologique : guide complet | NaturoMiel",
    seoDescription: "Découvrez le fonctionnement d'un rucher et le travail de l'apiculteur pour préserver les colonies d'abeilles et favoriser la pollinisation.",
    content: `
      Un rucher est un espace aménagé où sont élevées des abeilles pour produire du miel, de la cire et de la propolis. L'apiculteur en assure le suivi pour garantir le bien-être des colonies et préserver la biodiversité environnante.

      ## Pourquoi Élever et Protéger les Abeilles ?
      - **La Production Artisanale** : Récolte du miel, de la cire de qualité pour les soins, et de la propolis pure.
      - **La Pollinisation** : Les abeilles transportent le pollen de fleur en fleur, assurant la reproduction de 80% des espèces végétales et de nos cultures vivrières.
      - **La Biodiversité** : Un rucher bien géré dynamise l'écosystème floral d'une région entière.

      Le métier d'apiculteur exige une attention quotidienne pour s'assurer que les abeilles disposent d'eau pure, de fleurs variées et soient protégées des maladies.
    `
  },
  {
    id: "post-apitherapie-intro",
    title: "Introduction à l'Apithérapie : Se Soigner Naturellement par les Abeilles",
    slug: "introduction-apitherapie-se-soigner-par-les-abeilles",
    category: "apitherapie",
    categoryLabel: "Apithérapie",
    imageUrl: "/images/THYM.jpeg",
    author: "Naturopathe Cabinet",
    createdAt: "27 Juin 2026",
    seoTitle: "Introduction à l'Apithérapie et médecine des abeilles | NaturoMiel",
    seoDescription: "Comprendre l'apithérapie : l'utilisation médicinale du miel, de la propolis, de la gelée royale et même du venin d'abeille.",
    content: `
      L'apithérapie désigne l'usage des produits de la ruche à des fins thérapeutiques. Utilisée depuis l'Antiquité, cette médecine alternative revient en force grâce aux validations scientifiques récentes.

      ## Les Différentes Applications de l'Apithérapie
      - **Le Miel** : Pour la cicatrisation cutanée et l'apaisement des gorges irritées.
      - **La Propolis** : Pour ses effets immunostimulants et antimicrobiens.
      - **La Gelée Royale** : Pour stimuler le tonus général et la résistance nerveuse.
      - **Le Venin d'Abeille** : Utilisé sous contrôle médical strict dans le traitement de certaines affections articulaires.

      Cette médecine ancestrale constitue un accompagnement de choix dans le cadre d'un mode de vie sain.
    `
  },
  {
    id: "post-cire-abeille",
    title: "La Cire d'Abeille : Ses Bienfaits Méconnus pour la Peau et les Cheveux",
    slug: "bienfaits-cire-abeille-peau-et-cheveux",
    category: "produits-ruche",
    categoryLabel: "Produits de la Ruche",
    imageUrl: "/images/PROPOLIS.jpeg",
    author: "NaturoMiel Nutrition",
    createdAt: "27 Juin 2026",
    seoTitle: "Bienfaits de la cire d'abeille pour cosmétique | NaturoMiel",
    seoDescription: "La cire d'abeille est un hydratant exceptionnel pour les peaux sèches et abîmées. Découvrez ses vertus cicatrisantes et cosmétiques.",
    content: `
      La cire d'abeille est sécrétée par les abeilles ouvrières pour concevoir les alvéoles de stockage de la ruche. En cosmétique naturelle, c'est un ingrédient majeur aux propriétés extraordinaires.

      ## Hydratation et Protection Cutanée
      Grâce à sa richesse en esters gras, la cire d'abeille crée un film protecteur imperceptible sur la peau sans obstruer les pores. Elle retient l'hydratation naturelle et protège l'épiderme des agressions extérieures (vent, froid). Elle est particulièrement recommandée pour les peaux sèches ou gercées.

      ## Soin Capillaire Naturel
      La cire d'abeille nourrit en profondeur la fibre capillaire, scelle les pointes sèches et apporte une brillance incomparable aux cheveux ternes ou abîmés.

      ## Propriétés Antiseptiques et Apaisantes
      Naturellement anti-inflammatoire, elle aide à calmer les irritations mineures de la peau, les rougeurs et favorise la cicatrisation des brûlures légères.
    `
  },
  {
    id: "post-reine-bourdon",
    title: "La Reine et le Faux Bourdon : Les Secrets de la Reproduction de la Ruche",
    slug: "reine-des-abeilles-faux-bourdon-reproduction-ruche",
    category: "actualites",
    categoryLabel: "Actualités",
    imageUrl: "/images/FERTILITE.jpeg",
    author: "Dr. Apiculteur NaturoMiel",
    createdAt: "27 Juin 2026",
    seoTitle: "La Reine des abeilles et le faux bourdon : rôles | NaturoMiel",
    seoDescription: "Découvrez le fonctionnement biologique de la ruche : le rôle central de la Reine et l'utilité méconnue des faux bourdons.",
    content: `
      Au sein de la colonie d'abeilles, la cohésion repose sur une hiérarchie stricte. La Reine et le faux bourdon jouent des rôles majeurs et complémentaires pour assurer la survie de l'espèce.

      ## La Reine : Le Cœur de la Colonie
      Unique femelle féconde de la ruche, la reine passe sa vie à pondre des œufs pour renouveler la population. Elle est nourrie exclusivement de gelée royale pure, ce qui lui permet de vivre jusqu'à 5 ans (contre quelques semaines pour une ouvrière). Elle sécrète également des phéromones régulant la paix et le travail dans la ruche.

      ## Le Faux Bourdon : Une Abeille Mâle Indispensable
      Les faux bourdons sont les mâles de la colonie. Plus grands et robustes que les ouvrières, ils ne possèdent pas d'aiguillon et ne récoltent pas de nectar. Leur unique mission est de féconder les jeunes reines vierges lors du vol nuptial, assurant ainsi le brassage génétique indispensable à la résistance de la colonie.
    `
  }
];
