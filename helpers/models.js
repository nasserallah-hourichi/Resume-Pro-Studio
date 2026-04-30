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
            position: "Full Stack Developer",
            company: "Palm.ai",
            date: "October 2025 – Present",
            description: "- Redesign and re-architecture of the Palm v2 application using NestJS and React.js. Implementation of a multi-tenant architecture, reducing Azure costs from €4,000 to €300/month (~92%). Set up CI/CD pipelines, environment management with Docker, and automated backups. Integrated automation solutions (n8n) and intelligent processing using LLM APIs to optimize certain workflows. Utilized Azure Blob Storage for file management and designed a scalable, optimized infrastructure."
        },
        {
            position: "Full Stack Developer",
            company: "QuickText",
            date: "October 2024 – October 2025",
            description: "- Responsible for the maintenance, optimization, and evolution of Velma, an AI-powered hotel assistant deployed in over 1,700 hotels. Led a high-traffic platform with strong requirements for performance, scalability, and reliability. - Continuous improvement of user experience and interface performance, delivering robust, maintainable, and quality-focused features. Closely collaborated with product, AI, and operations teams to solve complex issues and optimize the overall architecture. - Design and integration of LLM-based solutions and orchestration of automated workflows (n8n, APIs), contributing to the optimization of operational workflows and an enhanced customer experience."
        },
        {
            position: "Web Development Instructor (Part-Time)",
            company: "TeachCode",
            date: "December 2024 – April 2025",
            description: "- Web Development Mentor, guiding learners on fundamental and advanced modern web concepts. Training in engineering thinking: clean architecture, scalability, testing, and solving real world problems. Practical mentorship with NestJS/Spring Boot (backend) and Angular (frontend). Introduction to modern lightweight frameworks (HonoJS) and serverless architectures. Deployment of applications using Cloudflare Workers. Promoted best practices in API design, project structuring, Git, and CI/CD pipelines."
        },
        {
            position: "Full Stack Developer",
            company: "TekabDev",
            date: "June 2022 – October 2024",
            description: "- Designed an edge-optimized code generation platform (Cloudflare) enabling automatic creation of production-ready projects (Spring Boot / Angular) with DTO generation via OpenAPI (API-First approach). - Developed a full-stack platform (GraphQL, UI) with LLM integration (Gemini, Claude, OpenAI) for intelligent code generation and workflow optimization. Implemented automated workflows (n8n, Zapier) for process orchestration, code generation, data processing, and task automation. Implemented CI/CD v2 (Docker, Kubernetes), reducing deployment effort by ~80%. Designed a distributed microservices architecture supporting ~50k concurrent users with low latency. Managed PostgreSQL migrations and deployed a self-service GraphQL platform, reducing infrastructure code by ~35%."
        },
        {
            position: "Frontend Developer (Internship)",
            company: "Beenomi",
            date: "April 2022 – June 2022",
            description: "- Complete redesign of the Beenomi application using Java Spring Boot (backend) and React.js (frontend). Improved and optimized the platform for better performance and scalability. Redesigned the user interface for a more modern and intuitive experience. Implemented development best practices and enhanced code maintainability."
        },
        {
            position: "Full Stack Developer (Internship)",
            company: "ASM - All Soft Multimedia",
            date: "February 2022 – June 2022",
            description: "- Developed an HR management system using Angular and Laravel.  - Collaborative work using Agile/Scrum methodology: participated in sprints and Scrum ceremonies, coordinated with product and design teams, prioritized tasks, tracked progress, and delivered incremental features, while promoting continuous improvement."
        },
        {
            position: "Full Stack Developer (Internship)",
            company: "ASM - All Soft Multimedia",
            date: "July 2021 – August 2021",
            description: "- Developed a fleet management system using Angular and Laravel.  - Created modules for fleet management and analytical reporting. Contributed to a hybrid production system, ensuring performance and reliability."
        }
    ],
    education: [
        {
            degree: "National Engineering Degree in Computer Science",
            date: "2022 – 2025 | Private Polytechnic Institute of Advanced Sciences of Sfax"
        },
        {
            degree: "Bachelor’s Degree in Computer Science and Multimedia",
            date: "2019 – 2022 | Higher Institute of Computer Science and Multimedia of Sfax"
        }
    ],
    skills: [
        "Java",
        "NestJs",
        "Spring Boot",
        "Laravel",
        "GraphQL",
        "RabbitMQ",
        "Apache JMeter",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "ElasticSearch",
        "Docker",
        "Kubernetes (K8S)",
        "Azure Cloud",
        "Cloudflare",
        "Git",
        "Prometheus",
        "Kibana",
        "Grafana",
        "Nginx",
        "Zapier",
        "N8N",
        "Serverless",
        "Redis",
        "BullMQ",
        "Angular",
        "ReactJs",
        "NextJs",
        "JUnit",
        "Jest",
        "Selenium",
        "Playwright",
        "Gemini",
        "Claude",
        "(LLM APIs)",
        "Docker Model Runner",
        "Recommendation Systems",
        "M2"
    ],
    languages: [
        {
            name: "English",
            level: "Professional working proficiency (B2)"
        },
        {
            name: "French",
            level: "Professional working proficiency (B2)"
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
    // {
    //     id: "modern",
    //     name: "Modern Accent",
    //     description: "High-contrast header with a polished studio feel.",
    //     preview: ["Accent header", "Sharper visual rhythm"],
    //     controls: {
    //         globalFontSelect: "'Montserrat', sans-serif",
    //         baseFontSize: "14px",
    //         sectionTitleColor: "#0b3b66",
    //         textColor: "#243647",
    //         nameColor: "#f8fafc",
    //         headlineColor: "#dbe7f3",
    //         expTitleColor: "#0b3b66",
    //         companyColor: "#4f6980",
    //         dateColor: "#6b7f93",
    //         sectionTitleSize: "0.9rem",
    //         skillsColumnsSelect: "3"
    //     }
    // },
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