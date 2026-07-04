const STORAGE_KEYS = {
    sectionOrder: "resumeSectionOrder",
    template: "resumeTemplateSelection",
    visibility: "resumeSectionVisibility",
    customSectionCount: "resumeCustomSectionCount",
    coverLetters: "coverLetters",
    currentCoverLetterId: "currentCoverLetterId"
};


const defaultSectionVisibility = {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    languages: true
};


const defaultResumeCollections = {
    experience: [
        {
            position: "Formateur à temps partiel",
            company: "DECLITECH INNOVATION S.A.R.L",
            date: "Mai 2026 – Présent",
            description: "- Dispenser des formations complètes à des étudiants âgés de 7 à 17 ans dans plusieurs disciplines, notamment le développement de jeux vidéo, l'IoT et la programmation mobile.\n- Mettre en œuvre des stratégies d'apprentissage par projet (PBL), guidant les étudiants du concept initial à la création de produits numériques fonctionnels et de prototypes intelligents.\n- Vulgariser des concepts complexes de l'informatique (logique, algorithmes et intégration matérielle) en modules adaptés à l'âge et aux différents niveaux de compétences.\n- Animer des ateliers pratiques favorisant le développement de l'esprit critique, de la résolution de problèmes et de la créativité technique dans un environnement dynamique."
        },
        {
            position: "Ingénieur Logiciel Full Stack",
            company: "SPORTOPIA S.U.A.R.L",
            date: "Septembre 2024 – Décembre 2024",
            description: "- Diagnostiquer et résoudre un bug critique dans l'algorithme de mise en relation des profils utilisateurs développé avec Node.js, Express et TypeScript, rétablissant ainsi la fonctionnalité de matching entre les joueurs.\n- Réaliser un refactoring complet du backend et du frontend pour assurer une récupération fluide des données et une synchronisation en temps réel entre les API TypeScript et les composants UI de Flutter.\n- Exécuter des migrations de bases de données MySQL complexes pour corriger les incohérences relationnelles entre les entités utilisateurs et profils, améliorant considérablement l'intégrité des données et la stabilité globale de l'application.\n- Effectuer le nettoyage du code et l'optimisation des performances des modules Node.js et Flutter, réduisant la logique redondante et améliorant la maintenabilité à long terme.\n- Optimiser les requêtes MySQL et les relations de schéma pour prévenir les futures erreurs de logique de matchmaking, garantissant une couche de communication robuste et performante."
        },
        {
            position: "Développeur Java Full-Stack",
            company: "FUTUREPROOF S.A.R.L",
            date: "Septembre 2022 – Octobre 2024",
            description: "- Concevoir et implémenter des jobs Spring Batch pour le traitement et la livraison efficaces de grands ensembles de données de réponses GraphQL, améliorant considérablement les performances et l'évolutivité de l'application.\n- Migrer avec succès des services critiques de Spring Boot 2.7 vers 3.1 et intégrer Spring Security 6, garantissant l'alignement de l'application sur les dernières avancées du framework pour une sécurité et une maintenabilité accruees.\n- Développer un service de notification en temps réel via Firebase et intégrer un job de routine (cron job) pour la compression d'images à la volée, contribuant directement à une expérience utilisateur plus riche et performante.\n- Diriger l'implémentation de l'authentification Apple et de fonctionnalités de recherche avancées, y compris le filtrage basé sur la géolocalisation GPS, au sein de l'application mobile Flutter.\n- Gérer une migration stratégique de REST vers GraphQL tout en résolvant des incohérences transactionnelles et d'interface graphique complexes pour garantir un comportement système et un flux de données robustes.\n- Optimiser les interactions avec la base de données MySQL au sein de la couche de traitement par lots pour gérer des transferts de données à grande échelle sans compromettre la stabilité du système."
        },
        {
            position: "Développeur Full-Stack",
            company: "ZNET-IT S.A.R.L",
            date: "Juillet 2021 – Septembre 2022",
            description: "- Concevoir et implémenter un système complet de gestion de cabinet médical en utilisant Angular, Node.js, TypeScript, MongoDB et Mongoose, fluidifiant la gestion des dossiers patients et la planification des rendez-vous (Plateforme MedCity).\n- Développer un système de révision et de gestion de projets au sein d'une plateforme de Crowdfunding, offrant aux administrateurs un contrôle granulaire sur les approbations et rejets de projets afin de maintenir l'intégrité de la plateforme."
        }
    ],
    education: [
        {
            degree: "Diplôme National d'Ingénieur en Génie Logiciel",
            date: "Diplômé le 27/09/2024 | Institut Polytechnique Privé des Sciences Avancées de Sfax (IPSAS)"
        },
        {
            degree: "Licence en Sciences Informatiques (Informatique et Multimédia)",
            date: "Diplômé le 16/07/2021 | Institut Supérieur de l'Informatique et du Multimédia de Gabès (ISIM Gabès)"
        }
    ],
    skills: [
        "Node.js",
        "TypeScript",
        "Express",
        "Java",
        "Spring Boot",
        "Spring Batch",
        "Spring Security",
        "Angular",
        "Flutter",
        "GraphQL",
        "REST",
        "MySQL",
        "MongoDB",
        "Mongoose",
        "Firebase",
        "OpenTelemetry",
        "Jira Software",
        "Notion",
        "Confluence",
        "Python Scripting",
        "AI Automation",
        "AI Prompting",
        "JetBrains Suite"
    ],
    languages: [
        {
            name: "English",
            level: "B2 - British Council"
        },
        {
            name: "French",
            level: "B2 - Institut Français"
        }
    ]
};


const templates = [
    {
        id: "classic",
        name: "Classic Professional",
        description: "Balanced spacing and a timeless single-column resume.",
        preview: ["Centered header", "Clean section rules"],
        controls: {
            globalFontSelect: "'Inter', sans-serif",
            baseFontSize: "14px",
            sectionTitleColor: "#0f172a",
            textColor: "#1e293b",
            nameColor: "#0f172a",
            headlineColor: "#334155",
            expTitleColor: "#0f172a",
            companyColor: "#475569",
            dateColor: "#64748b",
            sectionTitleSize: "0.9rem",
            skillsColumnsSelect: "3"
        }
    },
    {
        id: "executive",
        name: "Executive Slate",
        description: "Left-aligned and refined with strong hierarchy.",
        preview: ["Editorial heading", "Refined experience blocks"],
        controls: {
            globalFontSelect: "'Merriweather', serif",
            baseFontSize: "14px",
            sectionTitleColor: "#12344d",
            textColor: "#263645",
            nameColor: "#12344d",
            headlineColor: "#425d74",
            expTitleColor: "#0f2740",
            companyColor: "#5b7085",
            dateColor: "#71869a",
            sectionTitleSize: "0.85rem",
            skillsColumnsSelect: "2"
        }
    },
    {
        id: "compact",
        name: "Compact ATS",
        description: "Dense, efficient, and optimized for space.",
        preview: ["Tighter spacing", "High-information layout"],
        controls: {
            globalFontSelect: "'Roboto', sans-serif",
            baseFontSize: "13px",
            sectionTitleColor: "#111827",
            textColor: "#1f2937",
            nameColor: "#111827",
            headlineColor: "#4b5563",
            expTitleColor: "#111827",
            companyColor: "#4b5563",
            dateColor: "#6b7280",
            sectionTitleSize: "0.85rem",
            skillsColumnsSelect: "4"
        }
    }
];

const themePresets = [
    {
        id: "navy",
        name: "Navy",
        colors: {
            sectionTitleColor: "#0f172a",
            textColor: "#1e293b",
            nameColor: "#0f172a",
            headlineColor: "#334155",
            expTitleColor: "#0f172a",
            companyColor: "#475569",
            dateColor: "#64748b"
        }
    },
    {
        id: "emerald",
        name: "Emerald",
        colors: {
            sectionTitleColor: "#14532d",
            textColor: "#1f2937",
            nameColor: "#14532d",
            headlineColor: "#2f6b4f",
            expTitleColor: "#14532d",
            companyColor: "#3f6f5d",
            dateColor: "#5f7b72"
        }
    },
    {
        id: "burgundy",
        name: "Burgundy",
        colors: {
            sectionTitleColor: "#6b1124",
            textColor: "#2f1d22",
            nameColor: "#6b1124",
            headlineColor: "#8a3649",
            expTitleColor: "#6b1124",
            companyColor: "#7e5360",
            dateColor: "#9a6e78"
        }
    }
];

const baseSectionMeta = [
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "languages", label: "Languages" }
];

const presetSectionTemplates = {
    projects: {
        title: "Projects",
        content: "Project Name\n- What you built\n- Stack used\n- Outcome or measurable impact"
    },
    certifications: {
        title: "Certifications",
        content: "Certification Name - Issuing Organization - Year"
    },
    awards: {
        title: "Awards",
        content: "Award Title - Organization - Why it mattered"
    },
    volunteer: {
        title: "Volunteer Work",
        content: "Organization / Role\n- Contribution\n- Impact"
    }
};


export { STORAGE_KEYS, defaultSectionVisibility, defaultResumeCollections, templates, themePresets, baseSectionMeta, presetSectionTemplates };