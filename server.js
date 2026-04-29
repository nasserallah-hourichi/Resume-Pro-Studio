const translations = {
    en: {
        fullName: "Anis Ghabi",
        title: "Software Engineer | Full Stack Developer",
        phone: "+21690770350",
        email: "anisghabi8@gmail.com",
        address: "Calgary, AB, Canada",
        summaryLabel: "Professional Summary",
        summaryText: "Software Engineer / Full Stack Developer with 4+ years of experience in building scalable web applications. Specialized in microservices architecture with full mastery of the development lifecycle (frontend, backend, databases). Experienced in integrating LLMs (Gemini, Claude, OpenAI) and automating workflows using n8n (self-hosted) and Zapier. Skilled in web scraping (Playwright), orchestration, APIs, and alerting systems (Telegram bots). Strong background in clean code practices, unit testing, DevOps (Docker, CI/CD), and Agile/Scrum methodologies. Capable of designing and delivering robust, autonomous, data- and AI-driven solutions",
        experienceLabel: "Work Experience",
        educationLabel: "Education",
        skillsLabel: "Core Competencies",
        languagesLabel: "Languages",
        footerNote: "Copyright (c) 2026 Anis Ghabi. All rights reserved.",
        linkedin: "linkedin.com/in/ghabi-anis"
    },
    fr: {
        fullName: "Ghabi Anis",
        title: "Ingénieur Logiciel | Développeur Full Stack",
        phone: "+21690770350",
        email: "anisghabi8@gmail.com",
        address: "Calgary, AB, Canada",
        summaryLabel: "Sommaire professionnel",
        summaryText: "Ingénieur Logiciel / Développeur Full Stack avec 4+ ans d'expérience dans la construction d'applications web évolutives. Spécialisé en architecture microservices avec maîtrise complète du cycle de vie du développement (frontend, backend, bases de données). Expérimenté dans l'intégration de LLMs (Gemini, Claude, OpenAI) et l'automatisation des flux de travail à l'aide de n8n (auto-hébergé) et Zapier. Compétent en scraping web (Playwright), orchestration, APIs, et systèmes d'alerting (bots Telegram). Solide expérience dans les pratiques de code propre, les tests unitaires, DevOps (Docker, CI/CD), et méthodologies Agile/Scrum. Capacité à concevoir et livrer des solutions robustes, autonomes, axées sur les données et l'IA.",
        experienceLabel: "Experience professionnelle",
        educationLabel: "Formation",
        skillsLabel: "Competences cles",
        languagesLabel: "Langues",
        footerNote: "Copyright (c) 2026 Anis Ghabi. Tous droits reserves.",
        linkedin: "linkedin.com/in/ghabi-anis"
    }
};

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

const RESUMES_TABLE = "resumes";
const COVER_LETTERS_TABLE = "cover_letters";

let currentLang = "en";
let currentResumeData = null;
let currentTemplateId = loadTemplateSelection();
let sectionVisibility = loadSectionVisibility();
let sortableInstance = null;
let customSectionCounter = loadCustomSectionCounter();
let currentUser = null;
let authMode = "login";
let supabaseClient = null;
let authReady = false;
let currentResumeId = null;
let currentResumeTitle = "My Resume";
let currentResumeUpdatedAt = null;
let resumeLibrary = [];
let autosaveTimer = null;
let isDirty = false;
let isSaving = false;
let currentAtsMode = false;

// Cover Letter Variables
let currentWorkspace = "resume";
let currentCoverLetterId = null;
let currentCoverLetterData = null;
let coverLetters = {};
let coverLetterLibrary = [];
let coverLetterAutosaveTimer = null;
let coverLetterIsDirty = false;
let coverLetterIsSaving = false;
let showAllCoverLetters = false;

const dom = {};

function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
}

function getSeedResumeData(lang) {
    return {
        ...translations[lang],
        experience: deepClone(defaultResumeCollections.experience),
        education: deepClone(defaultResumeCollections.education),
        skills: [...defaultResumeCollections.skills],
        languages: deepClone(defaultResumeCollections.languages),
        customSections: [],
        photoUrl: "",
        showPhoto: false
    };
}

function cloneResumeData(data, lang = currentLang) {
    const seed = getSeedResumeData(lang);
    const source = data || {};

    return {
        ...seed,
        ...source,
        experience: deepClone(source.experience || seed.experience),
        education: deepClone(source.education || seed.education),
        skills: [...(source.skills || seed.skills)],
        languages: deepClone(source.languages || seed.languages),
        customSections: deepClone(source.customSections || seed.customSections || []),
        photoUrl: source.photoUrl || seed.photoUrl || "",
        showPhoto: typeof source.showPhoto === "boolean" ? source.showPhoto : seed.showPhoto || false
    };
}

function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>]/g, (match) => {
        if (match === "&") return "&amp;";
        if (match === "<") return "&lt;";
        if (match === ">") return "&gt;";
        return match;
    });
}

function escapeAttribute(str) {
    return escapeHtml(str).replace(/"/g, "&quot;");
}

function formatRelativeUpdatedAt(value) {
    if (!value) return "Not saved yet";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Saved";

    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.round(diffMs / 60000);
    if (diffMinutes <= 0) return "Saved just now";
    if (diffMinutes === 1) return "Saved 1 minute ago";
    if (diffMinutes < 60) return `Saved ${diffMinutes} minutes ago`;

    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours === 1) return "Saved 1 hour ago";
    if (diffHours < 24) return `Saved ${diffHours} hours ago`;

    return `Saved ${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

function showToast(message, tone = "") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast${tone ? ` ${tone}` : ""}`;
    toast.textContent = message;
    container.appendChild(toast);

    window.setTimeout(() => {
        toast.remove();
    }, 3200);
}

function getTemplateById(templateId) {
    return templates.find((template) => template.id === templateId) || templates[0];
}

function loadTemplateSelection() {
    const stored = localStorage.getItem(STORAGE_KEYS.template);
    return templates.some((template) => template.id === stored) ? stored : "classic";
}

function saveTemplateSelection(templateId) {
    localStorage.setItem(STORAGE_KEYS.template, templateId);
}

function loadCustomSectionCounter() {
    const stored = localStorage.getItem(STORAGE_KEYS.customSectionCount);
    const parsed = parseInt(stored || "0", 10);
    return Number.isFinite(parsed) ? parsed : 0;
}

function saveCustomSectionCounter() {
    localStorage.setItem(STORAGE_KEYS.customSectionCount, String(customSectionCounter));
}

function loadSectionVisibility() {
    const stored = localStorage.getItem(STORAGE_KEYS.visibility);
    if (!stored) return { ...defaultSectionVisibility };

    try {
        return { ...defaultSectionVisibility, ...JSON.parse(stored) };
    } catch (error) {
        return { ...defaultSectionVisibility };
    }
}

function saveSectionVisibility() {
    localStorage.setItem(STORAGE_KEYS.visibility, JSON.stringify(sectionVisibility));
}

function getAllSectionMeta() {
    const customSections = currentResumeData?.customSections || [];
    customSections.forEach((section) => {
        if (typeof sectionVisibility[section.id] === "undefined") {
            sectionVisibility[section.id] = true;
        }
    });

    return [
        ...baseSectionMeta,
        ...customSections.map((section) => ({
            id: section.id,
            label: section.title || "Custom Section"
        }))
    ];
}

function getSupabaseConfig() {
    const config = window.SUPABASE_CONFIG || {};
    const url = typeof config.url === "string" ? config.url.trim() : "";
    const anonKey = typeof config.anonKey === "string" ? config.anonKey.trim() : "";
    const redirectTo = typeof config.redirectTo === "string" && config.redirectTo.trim()
        ? config.redirectTo.trim()
        : window.location.origin === "null"
            ? ""
            : `${window.location.origin}${window.location.pathname}`;

    return {
        url,
        anonKey,
        redirectTo
    };
}

async function loadRuntimeSupabaseConfig() {
    try {
        const response = await fetch("/api/config", { cache: "no-store" });
        if (!response.ok) return;

        const runtimeConfig = await response.json();
        const currentConfig = window.SUPABASE_CONFIG || {};
        window.SUPABASE_CONFIG = {
            ...currentConfig,
            ...(runtimeConfig || {})
        };
    } catch (_error) {
        // Ignore runtime config fetch failures and fall back to local config.
    }
}

function hasSupabaseCredentials() {
    const config = getSupabaseConfig();
    return Boolean(config.url && config.anonKey);
}

function isHttpOrigin() {
    return window.location.protocol === "http:" || window.location.protocol === "https:";
}

function initSupabase() {
    if (!window.supabase || typeof window.supabase.createClient !== "function") return null;
    if (!hasSupabaseCredentials()) return null;

    const config = getSupabaseConfig();
    return window.supabase.createClient(config.url, config.anonKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    });
}

function getCurrentThemeSettings() {
    const settings = {};
    [
        "globalFontSelect",
        "baseFontSize",
        "sectionTitleColor",
        "textColor",
        "nameColor",
        "headlineColor",
        "expTitleColor",
        "companyColor",
        "dateColor",
        "sectionTitleSize",
        "skillsColumnsSelect"
    ].forEach((controlId) => {
        const control = document.getElementById(controlId);
        if (control) settings[controlId] = control.value;
    });
    return settings;
}

function applyThemeSettings(settings = {}) {
    Object.entries(settings).forEach(([controlId, value]) => {
        const control = document.getElementById(controlId);
        if (control && value) control.value = value;
    });
}

function getCurrentResumeTitleValue() {
    return dom.resumeTitleInput?.value?.trim() || currentResumeTitle || "Untitled Resume";
}

function updateSaveStatus(message) {
    if (dom.saveStatusText) {
        dom.saveStatusText.textContent = message;
    }
}

function buildResumeRecordPayload(overrides = {}) {
    const resumeData = cloneResumeData(extractResumeData(), currentLang);
    const updatedAt = new Date().toISOString();

    return {
        title: getCurrentResumeTitleValue(),
        template_id: currentTemplateId,
        lang: currentLang,
        data: resumeData,
        section_visibility: { ...sectionVisibility },
        theme_settings: getCurrentThemeSettings(),
        ats_mode: currentAtsMode,
        updated_at: updatedAt,
        ...overrides
    };
}

function normalizeResumeRecord(record) {
    return {
        id: record.id,
        title: record.title || "Untitled Resume",
        template_id: record.template_id || "classic",
        lang: record.lang || "en",
        data: cloneResumeData(record.data || getSeedResumeData(record.lang || "en"), record.lang || "en"),
        section_visibility: { ...defaultSectionVisibility, ...(record.section_visibility || {}) },
        theme_settings: record.theme_settings || {},
        ats_mode: Boolean(record.ats_mode),
        updated_at: record.updated_at || record.created_at || null
    };
}

function extractResumeData() {
    const fallback = cloneResumeData(currentResumeData || getSeedResumeData(currentLang), currentLang);
    if (!document.getElementById("resumeContainer")) return fallback;

    const getText = (id, defaultValue = "") => {
        const element = document.getElementById(id);
        return element ? element.innerText.trim() : defaultValue;
    };

    const experienceElements = document.querySelectorAll(".exp-item");
    const educationElements = document.querySelectorAll(".edu-item");
    const skillElements = document.querySelectorAll(".skill-item");
    const languageElements = document.querySelectorAll("#languagesContainer .language-item");
    const customSectionElements = document.querySelectorAll(".custom-section");

    const experience = experienceElements.length
        ? Array.from(experienceElements).map((element) => ({
            position: element.querySelector(".exp-position")?.innerText.trim() || "",
            company: element.querySelector(".exp-company")?.innerText.replace(/^, \s*/, "").trim() || "",
            date: element.querySelector(".exp-date")?.innerText.trim() || "",
            description: element.querySelector(".exp-desc")?.innerText.trim() || ""
        }))
        : fallback.experience;

    const education = educationElements.length
        ? Array.from(educationElements).map((element) => ({
            degree: element.querySelector(".edu-degree")?.innerText.trim() || "",
            date: element.querySelector(".edu-date")?.innerText.trim() || ""
        }))
        : fallback.education;

    const skills = skillElements.length
        ? Array.from(skillElements)
            .map((element) => element.innerText.replace(/^[\-\u2022]\s*/, "").trim())
            .filter(Boolean)
        : fallback.skills;

    const languages = languageElements.length
        ? Array.from(languageElements).map((element) => ({
            name: element.querySelector(".language-name")?.innerText.trim() || "",
            level: element.querySelector(".language-level")?.innerText.trim() || ""
        }))
        : fallback.languages;

    const customSections = customSectionElements.length
        ? Array.from(customSectionElements).map((element) => ({
            id: element.getAttribute("data-custom-section-id") || "",
            title: element.querySelector(".custom-section-title-editable")?.innerText.trim() || "Custom Section",
            content: element.querySelector(".custom-section-content")?.innerText.trim() || ""
        }))
        : fallback.customSections;

    return {
        fullName: getText("fullNameEditable", fallback.fullName),
        title: getText("titleEditable", fallback.title),
        phone: getText("contactPhone", fallback.phone),
        email: getText("contactEmail", fallback.email),
        address: getText("contactAddress", fallback.address),
        linkedin: getText("contactLinkedin", fallback.linkedin),
        summaryText: getText("summaryText", fallback.summaryText),
        experience,
        education,
        skills,
        languages,
        customSections,
        photoUrl: fallback.photoUrl,
        showPhoto: fallback.showPhoto
    };
}

function renderSkillsMultiColumn(skillsArray, columns) {
    const skillList = skillsArray && skillsArray.length ? skillsArray : defaultResumeCollections.skills;
    const columnCount = parseInt(columns, 10) || 3;
    const itemsPerColumn = Math.ceil(skillList.length / columnCount);
    const columnsData = [];

    for (let index = 0; index < columnCount; index += 1) {
        columnsData.push(skillList.slice(index * itemsPerColumn, (index + 1) * itemsPerColumn));
    }

    return `
        <div class="skills-multicolumn" id="skillsContainer" style="grid-template-columns: repeat(${columnCount}, 1fr);">
            ${columnsData.map((column) => `
                <div class="skills-column">
                    ${column.map((skill) => `<div class="skill-item" contenteditable="true"><span class="skill-bullet">-</span> ${escapeHtml(skill)}</div>`).join("")}
                </div>
            `).join("")}
        </div>
    `;
}

function buildSectionMarkup(sectionType, title, contentHtml, actionHtml) {
    if (!sectionVisibility[sectionType]) return "";

    return `
        <div class="draggable-section" data-section-type="${sectionType}">
            <div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>
            <div class="section-title" style="color: var(--section-title-color, #0f172a); font-size: var(--section-title-size, 0.9rem);">${title}</div>
            ${contentHtml}
            ${actionHtml || ""}
        </div>
    `;
}

function buildResumeHTML(lang, customData) {
    const template = getTemplateById(currentTemplateId);
    const data = cloneResumeData(customData || currentResumeData || getSeedResumeData(lang), lang);
    (data.customSections || []).forEach((section) => {
        if (typeof sectionVisibility[section.id] === "undefined") {
            sectionVisibility[section.id] = true;
        }
    });
    const skillsColumns = document.getElementById("skillsColumnsSelect")?.value || template.controls.skillsColumnsSelect || "3";
    const skillsHtml = renderSkillsMultiColumn(data.skills, skillsColumns);

    const summarySection = buildSectionMarkup(
        "summary",
        translations[lang].summaryLabel,
        `<div id="summaryText" contenteditable="true" class="summary-copy">${escapeHtml(data.summaryText)}</div>`
    );

    const experienceSection = buildSectionMarkup(
        "experience",
        translations[lang].experienceLabel,
        `<div id="experiencesContainer">${data.experience.map((exp) => `
            <div class="exp-item">
                <div class="exp-header">
                    <div class="exp-heading-group">
                        <span class="exp-position" contenteditable="true" style="color: var(--exp-title-color, #0f172a);">${escapeHtml(exp.position)}</span>
                        <span class="exp-company" contenteditable="true" style="color: var(--company-color, #475569);">${escapeHtml(exp.company)}</span>
                    </div>
                    <div class="exp-date" contenteditable="true" style="color: var(--date-color, #64748b);">${escapeHtml(exp.date)}</div>
                </div>
                <div class="exp-desc" contenteditable="true">${escapeHtml(exp.description || "")}</div>
            </div>
        `).join("")}</div>`,
        `<button class="btn-add" id="addExpBtn"><i class="fas fa-plus"></i> Add Experience</button>`
    );

    const educationSection = buildSectionMarkup(
        "education",
        translations[lang].educationLabel,
        `<div id="educationContainer">${data.education.map((edu) => `
            <div class="edu-item">
                <div class="edu-degree" contenteditable="true" style="color: var(--exp-title-color, #0f172a);">${escapeHtml(edu.degree)}</div>
                <div class="edu-date" contenteditable="true" style="color: var(--date-color, #64748b);">${escapeHtml(edu.date)}</div>
            </div>
        `).join("")}</div>`,
        `<button class="btn-add" id="addEduBtn"><i class="fas fa-plus"></i> Add Education</button>`
    );

    const skillsSection = buildSectionMarkup(
        "skills",
        translations[lang].skillsLabel,
        skillsHtml,
        `<button class="btn-add" id="addSkillBtn"><i class="fas fa-plus"></i> Add Skill</button>`
    );

    const languagesSection = buildSectionMarkup(
        "languages",
        translations[lang].languagesLabel,
        `<div id="languagesContainer">${data.languages.map((language) => `
            <div class="language-item">
                <span class="language-name" contenteditable="true">${escapeHtml(language.name)}</span>
                <span class="language-level" contenteditable="true" style="color: var(--date-color, #64748b);">${escapeHtml(language.level)}</span>
            </div>
        `).join("")}</div>`,
        `<button class="btn-add" id="addLangBtn"><i class="fas fa-plus"></i> Add Language</button>`
    );

    const customSectionsMarkup = (data.customSections || []).map((section) => buildSectionMarkup(
        section.id,
        `<span class="custom-section-title-editable" contenteditable="true">${escapeHtml(section.title || "Custom Section")}</span>`,
        `
            <div class="custom-section" data-custom-section-id="${escapeHtml(section.id)}">
                <div class="custom-section-content" contenteditable="true">${escapeHtml(section.content || "Add your custom content here.")}</div>
            </div>
        `,
        `<button class="btn-add btn-remove-section" data-remove-custom-section="${section.id}"><i class="fas fa-trash"></i> Remove Section</button>`
    )).join("");

    const profilePhotoHtml = data.showPhoto && data.photoUrl
        ? `
            <div class="profile-photo-wrap">
                <img class="profile-photo" src="${escapeAttribute(data.photoUrl)}" alt="Profile photo">
            </div>
        `
        : "";

    return `
        <div class="resume-shell template-${template.id}">
            <div class="resume-header" style="border-bottom-color: var(--section-title-color, #0f172a);">
                <div class="resume-header-inner">
                    ${profilePhotoHtml}
                    <div class="name-title">
                        <h1 id="fullNameEditable" contenteditable="true" style="color: var(--name-color, #0f172a);">${escapeHtml(data.fullName)}</h1>
                        <p id="titleEditable" contenteditable="true" style="color: var(--headline-color, #334155);">${escapeHtml(data.title)}</p>
                    </div>
                </div>
                <div class="contact-info">
                    <span><span id="contactPhone" contenteditable="true">${escapeHtml(data.phone)}</span></span>
                    <span>&nbsp; &bull; &nbsp;<span id="contactEmail" contenteditable="true">${escapeHtml(data.email)}</span></span>
                    <span>&nbsp; &bull; &nbsp;<span id="contactAddress" contenteditable="true">${escapeHtml(data.address)}</span></span>
                    <span>&nbsp; &bull; &nbsp;<span id="contactLinkedin" contenteditable="true">${escapeHtml(data.linkedin || "linkedin.com/in/username")}</span></span>
                </div>
            </div>
            <div class="sections-container" id="sectionsContainer">
                ${summarySection}
                ${experienceSection}
                ${educationSection}
                ${skillsSection}
                ${languagesSection}
                ${customSectionsMarkup}
            </div>
            <footer>${translations[lang].footerNote}</footer>
        </div>
    `;
}

function initSortable() {
    const container = document.getElementById("sectionsContainer");
    if (!container) return;

    if (sortableInstance) sortableInstance.destroy();
    sortableInstance = new Sortable(container, {
        handle: ".drag-handle",
        animation: 300,
        ghostClass: "dragging",
        onEnd() {
            saveSectionOrder();
        }
    });
}

function saveSectionOrder() {
    const container = document.getElementById("sectionsContainer");
    if (!container) return;

    const order = Array.from(container.querySelectorAll(".draggable-section")).map((section) => section.getAttribute("data-section-type"));
    localStorage.setItem(STORAGE_KEYS.sectionOrder, JSON.stringify(order));
}

function loadSectionOrder() {
    const savedOrder = localStorage.getItem(STORAGE_KEYS.sectionOrder);
    if (!savedOrder) return null;

    try {
        return JSON.parse(savedOrder);
    } catch (error) {
        return null;
    }
}

function applySectionOrder() {
    const container = document.getElementById("sectionsContainer");
    const savedOrder = loadSectionOrder();
    if (!container || !savedOrder || !savedOrder.length) return;

    const sectionMap = new Map();
    Array.from(container.querySelectorAll(".draggable-section")).forEach((section) => {
        sectionMap.set(section.getAttribute("data-section-type"), section);
    });

    savedOrder.forEach((sectionType) => {
        const section = sectionMap.get(sectionType);
        if (section) container.appendChild(section);
    });
}

function attachDynamicButtons() {
    const addExp = document.getElementById("addExpBtn");
    if (addExp) {
        addExp.onclick = () => {
            const container = document.getElementById("experiencesContainer");
            const item = document.createElement("div");
            item.className = "exp-item";
            item.innerHTML = `
                <div class="exp-header">
                    <div class="exp-heading-group">
                        <span class="exp-position" contenteditable="true">New Role</span>
                        <span class="exp-company" contenteditable="true">Company</span>
                    </div>
                    <div class="exp-date" contenteditable="true">Date</div>
                </div>
                <div class="exp-desc" contenteditable="true">Describe your impact and measurable results.</div>
            `;
            container.appendChild(item);
        };
    }

    const addEdu = document.getElementById("addEduBtn");
    if (addEdu) {
        addEdu.onclick = () => {
            const container = document.getElementById("educationContainer");
            const item = document.createElement("div");
            item.className = "edu-item";
            item.innerHTML = `
                <div class="edu-degree" contenteditable="true">New Degree</div>
                <div class="edu-date" contenteditable="true">Year | Institution</div>
            `;
            container.appendChild(item);
        };
    }

    const addSkill = document.getElementById("addSkillBtn");
    if (addSkill) {
        addSkill.onclick = () => {
            const container = document.getElementById("skillsContainer");
            const firstColumn = container?.querySelector(".skills-column");
            const targetColumn = firstColumn || container;
            if (!targetColumn) return;

            const item = document.createElement("div");
            item.className = "skill-item";
            item.setAttribute("contenteditable", "true");
            item.innerHTML = `<span class="skill-bullet">-</span> New Skill`;
            targetColumn.appendChild(item);
        };
    }

    const addLang = document.getElementById("addLangBtn");
    if (addLang) {
        addLang.onclick = () => {
            const container = document.getElementById("languagesContainer");
            const item = document.createElement("div");
            item.className = "language-item";
            item.innerHTML = `
                <span class="language-name" contenteditable="true">Language</span>
                <span class="language-level" contenteditable="true">Level</span>
            `;
            container.appendChild(item);
        };
    }

    document.querySelectorAll("[data-remove-custom-section]").forEach((button) => {
        button.onclick = () => {
            removeCustomSection(button.getAttribute("data-remove-custom-section"));
        };
    });
}

function applyTemplateState() {
    const resumeCard = document.getElementById("resumeCard");
    const resumeContainer = document.getElementById("resumeContainer");
    if (!resumeCard || !resumeContainer) return;

    resumeCard.dataset.template = currentTemplateId;
    resumeCard.dataset.atsMode = currentAtsMode ? "true" : "false";
    resumeContainer.dataset.template = currentTemplateId;
}

function applyGlobalStyles() {
    const resumeDiv = document.getElementById("resumeContainer");
    if (!resumeDiv) return;

    const font = document.getElementById("globalFontSelect").value;
    const baseSize = document.getElementById("baseFontSize").value;
    const sectionTitleColor = document.getElementById("sectionTitleColor").value;
    const textColor = document.getElementById("textColor").value;
    const nameColor = document.getElementById("nameColor").value;
    const headlineColor = document.getElementById("headlineColor").value;
    const expTitleColor = document.getElementById("expTitleColor").value;
    const companyColor = document.getElementById("companyColor").value;
    const dateColor = document.getElementById("dateColor").value;
    const sectionTitleSize = document.getElementById("sectionTitleSize").value;

    resumeDiv.style.setProperty("font-family", font);
    resumeDiv.style.setProperty("font-size", baseSize);
    resumeDiv.style.setProperty("color", textColor);
    resumeDiv.style.setProperty("--section-title-color", sectionTitleColor);
    resumeDiv.style.setProperty("--name-color", nameColor);
    resumeDiv.style.setProperty("--headline-color", headlineColor);
    resumeDiv.style.setProperty("--exp-title-color", expTitleColor);
    resumeDiv.style.setProperty("--company-color", companyColor);
    resumeDiv.style.setProperty("--date-color", dateColor);
    resumeDiv.style.setProperty("--section-title-size", sectionTitleSize);

    resumeDiv.querySelectorAll(".section-title").forEach((element) => {
        element.style.color = sectionTitleColor;
        element.style.fontSize = sectionTitleSize;
    });

    const nameElement = document.getElementById("fullNameEditable");
    const titleElement = document.getElementById("titleEditable");
    if (nameElement) nameElement.style.color = nameColor;
    if (titleElement) titleElement.style.color = headlineColor;

    resumeDiv.querySelectorAll(".exp-position, .edu-degree").forEach((element) => {
        element.style.color = expTitleColor;
    });
    resumeDiv.querySelectorAll(".exp-company").forEach((element) => {
        element.style.color = companyColor;
    });
    resumeDiv.querySelectorAll(".exp-date, .edu-date, .language-level").forEach((element) => {
        element.style.color = dateColor;
    });

    applyTemplateState();
}

function applyTemplateDefaults(templateId) {
    const template = getTemplateById(templateId);
    Object.entries(template.controls).forEach(([controlId, value]) => {
        const control = document.getElementById(controlId);
        if (control) control.value = value;
    });
}

function setTemplate(templateId) {
    currentResumeData = extractResumeData();
    currentTemplateId = templateId;
    saveTemplateSelection(templateId);
    applyTemplateDefaults(templateId);
    renderResume(currentLang, false);
    renderTemplateList();
    markResumeDirty("Template changed");
}

function setSectionVisible(sectionType, isVisible) {
    currentResumeData = extractResumeData();
    sectionVisibility[sectionType] = isVisible;
    saveSectionVisibility();
    renderResume(currentLang, false);
    renderSectionVisibilityControls();
    markResumeDirty("Section visibility updated");
}

function addCustomSection() {
    currentResumeData = extractResumeData();
    customSectionCounter += 1;
    saveCustomSectionCounter();

    const newSection = {
        id: `custom-${customSectionCounter}`,
        title: `Custom Section ${customSectionCounter}`,
        content: "Add your custom content here."
    };

    currentResumeData.customSections.push(newSection);
    sectionVisibility[newSection.id] = true;
    saveSectionVisibility();
    renderResume(currentLang, false);
    saveSectionOrder();
    renderSectionVisibilityControls();
    markResumeDirty("Custom section added");
}

function removeCustomSection(sectionId) {
    if (!sectionId) return;

    currentResumeData = extractResumeData();
    currentResumeData.customSections = (currentResumeData.customSections || []).filter((section) => section.id !== sectionId);
    delete sectionVisibility[sectionId];
    saveSectionVisibility();

    const savedOrder = loadSectionOrder();
    if (savedOrder?.length) {
        const nextOrder = savedOrder.filter((item) => item !== sectionId);
        localStorage.setItem(STORAGE_KEYS.sectionOrder, JSON.stringify(nextOrder));
    }

    renderResume(currentLang, false);
    renderSectionVisibilityControls();
    markResumeDirty("Section removed");
}

function applyThemePreset(presetId) {
    const preset = themePresets.find((item) => item.id === presetId);
    if (!preset) return;

    Object.entries(preset.colors).forEach(([controlId, value]) => {
        const control = document.getElementById(controlId);
        if (control) control.value = value;
    });

    applyGlobalStyles();
    renderThemePresetList(presetId);
    markResumeDirty("Theme updated");
}

function renderResumeLibrary() {
    if (!dom.resumeLibraryList || !dom.resumeLibraryEmpty) return;

    dom.resumeLibraryEmpty.classList.toggle("hidden", resumeLibrary.length > 0);
    dom.resumeLibraryList.innerHTML = resumeLibrary.map((record) => `
        <article class="resume-library-card ${record.id === currentResumeId ? "active" : ""}" data-resume-id="${record.id}">
            <div class="resume-library-head">
                <div>
                    <div class="resume-library-title">${escapeHtml(record.title)}</div>
                    <div class="resume-library-meta">${escapeHtml(record.template_id || "classic")} · ${escapeHtml((record.lang || "en").toUpperCase())}</div>
                </div>
                <div class="resume-library-meta">${escapeHtml(formatRelativeUpdatedAt(record.updated_at).replace(/^Saved /, ""))}</div>
            </div>
            <div class="resume-library-actions">
                <button class="library-action-btn" data-resume-open="${record.id}" type="button">Open</button>
                <button class="library-action-btn" data-resume-duplicate="${record.id}" type="button">Duplicate</button>
                <button class="library-action-btn danger" data-resume-delete="${record.id}" type="button">Delete</button>
            </div>
        </article>
    `).join("");
}

function syncCurrentRecordInLibrary(patch = {}) {
    if (!currentResumeId) return;
    resumeLibrary = resumeLibrary.map((record) => record.id === currentResumeId ? { ...record, ...patch } : record);
    renderResumeLibrary();
}

function applyResumeRecord(record) {
    const normalized = normalizeResumeRecord(record);
    currentResumeId = normalized.id;
    currentResumeTitle = normalized.title;
    currentResumeUpdatedAt = normalized.updated_at;
    currentTemplateId = normalized.template_id;
    currentLang = normalized.lang;
    currentResumeData = cloneResumeData(normalized.data, normalized.lang);
    sectionVisibility = { ...defaultSectionVisibility, ...(normalized.section_visibility || {}) };
    currentAtsMode = Boolean(normalized.ats_mode);

    if (dom.resumeTitleInput) {
        dom.resumeTitleInput.value = currentResumeTitle;
    }
    if (dom.atsModeToggle) {
        dom.atsModeToggle.checked = currentAtsMode;
    }
    if (dom.showPhotoToggle) {
        dom.showPhotoToggle.checked = Boolean(currentResumeData.showPhoto);
    }

    applyTemplateDefaults(currentTemplateId);
    applyThemeSettings(normalized.theme_settings || {});
    renderStudioChrome({ skipTemplateDefaults: true });

    document.querySelectorAll(".lang-btn").forEach((button) => {
        button.classList.toggle("active", button.dataset.lang === currentLang);
    });

    updateSaveStatus(formatRelativeUpdatedAt(currentResumeUpdatedAt));
    isDirty = false;
    renderResumeLibrary();
}

async function loadResumeLibrary() {
    if (!supabaseClient || !currentUser) return;

    const { data, error } = await supabaseClient
        .from(RESUMES_TABLE)
        .select("id,title,template_id,lang,data,section_visibility,theme_settings,ats_mode,updated_at,created_at")
        .order("updated_at", { ascending: false });

    if (error) {
        showToast(error.message || "Unable to load resumes.", "error");
        return;
    }

    resumeLibrary = (data || []).map(normalizeResumeRecord);
    renderResumeLibrary();

    if (!resumeLibrary.length) {
        updateSaveStatus("No cloud resumes yet");
        return;
    }

    const active = resumeLibrary.find((record) => record.id === currentResumeId) || resumeLibrary[0];
    applyResumeRecord(active);
}

async function saveCurrentResumeToCloud(options = {}) {
    if (!supabaseClient || !currentUser || !currentResumeId) {
        if (!options.silent) {
            showToast("Create a resume first before saving to the cloud.", "error");
        }
        return;
    }
    if (isSaving && !options.force) return;

    isSaving = true;
    updateSaveStatus("Saving to cloud...");

    try {
        const payload = buildResumeRecordPayload();
        const { data, error } = await supabaseClient
            .from(RESUMES_TABLE)
            .update(payload)
            .eq("id", currentResumeId)
            .select("id,title,template_id,lang,data,section_visibility,theme_settings,ats_mode,updated_at,created_at")
            .single();

        if (error) throw error;

        const normalized = normalizeResumeRecord(data);
        currentResumeUpdatedAt = normalized.updated_at;
        currentResumeTitle = normalized.title;
        currentResumeData = cloneResumeData(normalized.data, normalized.lang);
        syncCurrentRecordInLibrary(normalized);
        updateSaveStatus(formatRelativeUpdatedAt(currentResumeUpdatedAt));
        isDirty = false;

        if (!options.silent) {
            showToast("Resume saved to cloud.", "success");
        }
    } catch (error) {
        updateSaveStatus("Save failed");
        showToast(error.message || "Cloud save failed.", "error");
    } finally {
        isSaving = false;
    }
}

function scheduleAutosave() {
    if (!currentUser || !currentResumeId) return;
    window.clearTimeout(autosaveTimer);
    autosaveTimer = window.setTimeout(() => {
        saveCurrentResumeToCloud({ silent: true });
    }, 1400);
}

function markResumeDirty(statusMessage = "Unsaved changes") {
    isDirty = true;
    updateSaveStatus(statusMessage);
    scheduleAutosave();
}

async function createResumeRecord(mode = "blank") {
    if (!supabaseClient || !currentUser) {
        showToast("Sign in first to create cloud resumes.", "error");
        return;
    }

    const seedData = mode === "sample" ? getSeedResumeData(currentLang) : cloneResumeData({
        ...getSeedResumeData(currentLang),
        fullName: "",
        title: "",
        phone: "",
        email: "",
        address: "",
        linkedin: "",
        summaryText: "",
        experience: [],
        education: [],
        skills: [],
        languages: [],
        customSections: [],
        photoUrl: "",
        showPhoto: false
    }, currentLang);

    const payload = {
        user_id: currentUser.id,
        title: mode === "sample" ? "Sample Resume" : "Untitled Resume",
        template_id: "classic",
        lang: currentLang,
        data: seedData,
        section_visibility: { ...defaultSectionVisibility },
        theme_settings: templates[0].controls,
        ats_mode: false
    };

    const { data, error } = await supabaseClient
        .from(RESUMES_TABLE)
        .insert(payload)
        .select("id,title,template_id,lang,data,section_visibility,theme_settings,ats_mode,updated_at,created_at")
        .single();

    if (error) {
        showToast(error.message || "Unable to create resume.", "error");
        return;
    }

    const normalized = normalizeResumeRecord(data);
    resumeLibrary = [normalized, ...resumeLibrary];
    applyResumeRecord(normalized);
    showToast(mode === "sample" ? "Sample resume created." : "Blank resume created.", "success");
}

async function openResumeRecord(resumeId) {
    if (!resumeId || resumeId === currentResumeId) return;
    if (isDirty) {
        await saveCurrentResumeToCloud({ silent: true, force: true });
    }

    const record = resumeLibrary.find((item) => item.id === resumeId);
    if (record) {
        applyResumeRecord(record);
    }
}

async function duplicateResumeRecord(resumeId) {
    const source = resumeLibrary.find((item) => item.id === resumeId);
    if (!source || !supabaseClient || !currentUser) return;

    const payload = {
        user_id: currentUser.id,
        title: `${source.title} Copy`,
        template_id: source.template_id,
        lang: source.lang,
        data: source.data,
        section_visibility: source.section_visibility,
        theme_settings: source.theme_settings,
        ats_mode: source.ats_mode
    };

    const { data, error } = await supabaseClient
        .from(RESUMES_TABLE)
        .insert(payload)
        .select("id,title,template_id,lang,data,section_visibility,theme_settings,ats_mode,updated_at,created_at")
        .single();

    if (error) {
        showToast(error.message || "Unable to duplicate resume.", "error");
        return;
    }

    const normalized = normalizeResumeRecord(data);
    resumeLibrary = [normalized, ...resumeLibrary];
    renderResumeLibrary();
    showToast("Resume duplicated.", "success");
}

async function deleteResumeRecord(resumeId) {
    if (!resumeId || !supabaseClient || !currentUser) return;

    const target = resumeLibrary.find((item) => item.id === resumeId);
    const confirmed = window.confirm(`Delete "${target?.title || "this resume"}"?`);
    if (!confirmed) return;

    const { error } = await supabaseClient.from(RESUMES_TABLE).delete().eq("id", resumeId);
    if (error) {
        showToast(error.message || "Unable to delete resume.", "error");
        return;
    }

    resumeLibrary = resumeLibrary.filter((item) => item.id !== resumeId);
    renderResumeLibrary();
    showToast("Resume deleted.", "success");

    if (resumeId === currentResumeId) {
        currentResumeId = null;
        if (resumeLibrary.length) {
            applyResumeRecord(resumeLibrary[0]);
        } else {
            currentResumeTitle = "Untitled Resume";
            currentResumeUpdatedAt = null;
            currentTemplateId = "classic";
            sectionVisibility = { ...defaultSectionVisibility };
            currentResumeData = getSeedResumeData(currentLang);
            if (dom.resumeTitleInput) dom.resumeTitleInput.value = currentResumeTitle;
            renderStudioChrome();
            updateSaveStatus("No cloud resumes yet");
        }
    }
}

function addPresetSection(sectionKey) {
    const preset = presetSectionTemplates[sectionKey];
    if (!preset) return;

    currentResumeData = extractResumeData();
    customSectionCounter += 1;
    saveCustomSectionCounter();

    const newSection = {
        id: `custom-${customSectionCounter}`,
        title: preset.title,
        content: preset.content
    };

    currentResumeData.customSections.push(newSection);
    sectionVisibility[newSection.id] = true;
    saveSectionVisibility();
    renderResume(currentLang, false);
    saveSectionOrder();
    renderSectionVisibilityControls();
    markResumeDirty(`${preset.title} added`);
}

function renderTemplateList() {
    const container = document.getElementById("templateList");
    if (!container) return;

    container.innerHTML = templates.map((template) => `
        <button class="template-card ${template.id === currentTemplateId ? "active" : ""}" data-template-id="${template.id}">
            <span class="template-preview template-preview-${template.id}">
                <span></span>
                <span></span>
                <span></span>
            </span>
            <span class="template-copy">
                <strong>${template.name}</strong>
                <small>${template.description}</small>
                <em>${template.preview.join(" * ")}</em>
            </span>
        </button>
    `).join("");
}

function renderThemePresetList(activePresetId) {
    const container = document.getElementById("themePresetList");
    if (!container) return;

    container.innerHTML = themePresets.map((preset) => `
        <button class="theme-preset-btn ${preset.id === activePresetId ? "active" : ""}" data-theme-id="${preset.id}">
            <span class="theme-swatch">
                <i style="background:${preset.colors.sectionTitleColor}"></i>
                <i style="background:${preset.colors.headlineColor}"></i>
                <i style="background:${preset.colors.dateColor}"></i>
            </span>
            <span>${preset.name}</span>
        </button>
    `).join("");
}

function renderSectionVisibilityControls() {
    const container = document.getElementById("sectionVisibilityControls");
    if (!container) return;

    container.innerHTML = getAllSectionMeta().map((section) => `
        <label class="section-toggle">
            <input type="checkbox" data-section-toggle="${section.id}" ${sectionVisibility[section.id] ? "checked" : ""}>
            <span>${escapeHtml(section.label)}</span>
        </label>
    `).join("");
}

function renderResume(lang, keepData = true) {
    const extracted = keepData ? extractResumeData() : null;
    const finalData = extracted || currentResumeData || getSeedResumeData(lang);

    document.getElementById("resumeContainer").innerHTML = buildResumeHTML(lang, finalData);
    attachDynamicButtons();
    initSortable();
    applySectionOrder();

    currentResumeData = cloneResumeData(finalData, lang);
    applyGlobalStyles();
}

async function generateCleanPDF() {
    const resumeCard = document.getElementById("resumeCard");
    if (!resumeCard) return;

    const pdfBtn = document.getElementById("savePdfBtn");
    const originalHtml = pdfBtn.innerHTML;
    const allAddButtons = document.querySelectorAll(".btn-add");
    const footer = document.querySelector(".resume-content footer");
    const originalButtonDisplays = [];
    const originalFooterDisplay = footer ? footer.style.display : null;

    pdfBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    pdfBtn.disabled = true;

    allAddButtons.forEach((btn, i) => {
        originalButtonDisplays[i] = btn.style.display;
        btn.style.display = "none";
    });
    if (footer) footer.style.display = "none";

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });

        const clone = resumeCard.cloneNode(true);

        // Remove unwanted elements
        clone.querySelectorAll(".btn-add, .drag-handle, footer, button").forEach(el => el.remove());

        // Fix icons — remove first, replace rest with |
        clone.querySelectorAll("i.fas, i.far, i.fab, i.fa, i[class*='fa-']").forEach((el, i) => {
            i === 0 ? el.remove() : el.replaceWith(" | ");
        });

        // Base styles
        clone.style.cssText = "margin:0;padding:0;box-shadow:none;border-radius:0;width:750px;";

        // ✅ Fix all flex elements with exact class targeting
        const flexFixes = {
            "resume-header-inner": { parent: "block", children: "block" },
            "contact-info": { parent: "block", children: "inline" },
            "sections-container": { parent: "block", children: "block" },
            "section-title": { parent: "block", children: "inline-block" },
            "language-item": { parent: "block overflow-hidden", children: "float" },
            // ❌ exp-header, exp-heading-group, edu-item removed — handled explicitly
        };

        clone.querySelectorAll(".exp-header").forEach(header => {
            header.style.cssText = "display:table;width:100%;margin-bottom:4px;";

            const group = header.querySelector(".exp-heading-group");
            const date = header.querySelector(".exp-date");

            if (group) group.style.cssText = "display:table-cell;width:65%;vertical-align:middle;white-space:normal;";
            if (date) date.style.cssText = "display:table-cell;width:35%;text-align:right;vertical-align:middle;white-space:nowrap;color:rgb(107,114,128);font-size:11px;";
        });


        clone.querySelectorAll(".exp-heading-group").forEach(group => {
            group.style.cssText = "display:block;";
            const position = group.querySelector(".exp-position");
            const company = group.querySelector(".exp-company");
            if (position) position.style.cssText = "display:inline;font-weight:bold;margin-right:6px;";
            if (company) company.style.cssText = "display:inline;color:rgb(75,85,99);font-size:11px;";
        });

        clone.querySelectorAll(Object.keys(flexFixes).map(c => `.${c}`).join(", ")).forEach(el => {
            const cls = [...el.classList].find(c => flexFixes[c]);
            if (!cls) return;
            const fix = flexFixes[cls];

            el.style.display = "block";
            if (fix.parent.includes("overflow-hidden")) el.style.overflow = "hidden";

            [...el.children].forEach((child, i, arr) => {
                if (fix.children === "float") {
                    child.style.display = "inline-block";
                    child.style.verticalAlign = "middle";
                    if (i === arr.length - 1 && arr.length > 1) {
                        child.style.float = "right";
                        child.style.textAlign = "right";
                        child.style.whiteSpace = "nowrap";
                    } else {
                        child.style.float = "left";
                    }
                } else {
                    child.style.display = fix.children;
                    child.style.verticalAlign = "middle";
                }
            });
        });

        clone.querySelectorAll(".exp-company, .edu-school").forEach(el => {
            el.innerHTML = el.innerHTML.replace(/^@\s*@\s*/, "").replace(/^\s*@\s*/, "");
            el.innerText = el.innerText.replace(/^@\s*@\s*/, "").replace(/^\s*@\s*/, "");
        });


        clone.querySelectorAll(".edu-item").forEach(el => {
            el.style.cssText = "display:block;overflow:hidden;width:100%;margin-bottom:6px;";

            const degree = el.querySelector(".edu-degree");
            const date = el.querySelector(".edu-date");

            if (degree) degree.style.cssText = "display:inline-block;float:left;width:45%;font-weight:bold;font-size:11px;vertical-align:top;";
            if (date) date.style.cssText = "display:inline-block;float:right;width:54%;text-align:right;font-size:10px;color:rgb(107,114,128);white-space:normal;vertical-align:top;";
        });

        clone.querySelectorAll(".exp-type, .exp-position, span").forEach(el => {
            if (el.innerText) el.innerText = el.innerText.replace(/\(\s*(\w+)\s*\)/, "($1)");
        });

        clone.querySelectorAll(".section-title").forEach(el => {
            el.style.cssText = "display:block;font-weight:bold;font-size:13px;letter-spacing:1px;padding-bottom:4px;margin-bottom:8px;border-bottom:1.5px solid #0f172a;width:100%;border-radius:0;";
        });

        const wrapper = document.createElement("div");
        wrapper.style.cssText = "position:fixed;left:-99999px;top:0;background:#fff;";
        wrapper.appendChild(clone);
        document.body.appendChild(wrapper);

        await new Promise((resolve) => {
            doc.html(clone, {
                callback: function (doc) {
                    const totalPages = doc.internal.getNumberOfPages();
                    const pageWidth = doc.internal.pageSize.getWidth();
                    const pageHeight = doc.internal.pageSize.getHeight();
                    for (let i = 1; i <= totalPages; i++) {
                        doc.setPage(i);
                        doc.setFontSize(8);
                        doc.setTextColor(150, 150, 150);
                        doc.text(
                            `Page ${i} of ${totalPages}`,
                            pageWidth / 2,
                            pageHeight - 10,
                            { align: "center" }
                        );
                    }
                    doc.save(`Resume_${currentLang.toUpperCase()}_${new Date().toISOString().slice(0, 10)}.pdf`);
                    resolve();
                },
                x: 0,
                y: 0,
                width: 555,
                windowWidth: 750,
                autoPaging: "text",
                margin: [20, 20, 30, 20],
                html2canvas: null,
            });
        });

        document.body.removeChild(wrapper);
        showToast("Resume exported as text PDF.", "success");

    } catch (error) {
        console.error("PDF Error:", error);
        showToast("PDF generation failed. Please try again.", "error");
    } finally {
        allAddButtons.forEach((btn, i) => { btn.style.display = originalButtonDisplays[i] || ""; });
        if (footer) footer.style.display = originalFooterDisplay || "";
        pdfBtn.innerHTML = originalHtml;
        pdfBtn.disabled = false;
    }
}

function importResumeFromJSON(jsonStr) {
    try {
        const imported = JSON.parse(jsonStr);
        currentResumeData = cloneResumeData({ ...getSeedResumeData(currentLang), ...imported }, currentLang);
        renderResume(currentLang, false);
        renderSectionVisibilityControls();
        markResumeDirty("Imported JSON changes");
        showToast("Resume JSON imported.", "success");
    } catch (error) {
        showToast("Invalid JSON file format.", "error");
    }
}

function exportCurrentJSON() {
    const data = extractResumeData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = `resume_${currentLang}_${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
    showToast("Resume JSON exported.", "success");
}

function resetToDefault() {
    currentLang = "en";
    currentTemplateId = "classic";
    sectionVisibility = { ...defaultSectionVisibility };
    currentResumeData = getSeedResumeData("en");

    localStorage.removeItem(STORAGE_KEYS.sectionOrder);
    localStorage.removeItem(STORAGE_KEYS.customSectionCount);
    customSectionCounter = 0;
    saveTemplateSelection(currentTemplateId);
    saveSectionVisibility();

    applyTemplateDefaults(currentTemplateId);
    renderResume(currentLang, false);
    renderTemplateList();
    renderThemePresetList();
    renderSectionVisibilityControls();

    document.querySelectorAll(".lang-btn").forEach((button) => {
        button.classList.toggle("active", button.dataset.lang === currentLang);
    });
    markResumeDirty("Reset to defaults");
}

function setLanguage(lang) {
    currentResumeData = extractResumeData();
    currentLang = lang;
    renderResume(lang, false);

    document.querySelectorAll(".lang-btn").forEach((button) => {
        button.classList.toggle("active", button.dataset.lang === lang);
    });
    markResumeDirty("Language changed");
}

function renderStudioChrome(options = {}) {
    renderTemplateList();
    renderThemePresetList();
    renderSectionVisibilityControls();
    if (!options.skipTemplateDefaults) {
        applyTemplateDefaults(currentTemplateId);
    }
    renderResume(currentLang, false);
}

function setAuthStatus(message = "", tone = "") {
    if (!dom.authStatus) return;
    dom.authStatus.textContent = message;
    dom.authStatus.className = "auth-status";
    if (tone) dom.authStatus.classList.add(tone);
}

function setAuthMode(mode) {
    authMode = mode === "signup" ? "signup" : "login";
    const isSignup = authMode === "signup";

    dom.authTitle.textContent = isSignup ? "Create your account" : "Welcome back";
    dom.authSubtitle.textContent = isSignup
        ? "Sign up to unlock the full resume studio and keep your sessions connected."
        : "Sign in to continue building and managing your resume.";
    dom.authSubmitBtn.textContent = isSignup ? "Create Account" : "Log In";
    dom.authNameField.classList.toggle("hidden", !isSignup);
    dom.authPassword.setAttribute("autocomplete", isSignup ? "new-password" : "current-password");
    dom.authSwitchLabel.textContent = isSignup ? "Already have an account?" : "Need an account?";
    dom.authSwitchBtn.textContent = isSignup ? "Log in instead" : "Create one";
    setAuthStatus("");
}

function openAuthModal(mode = "login") {
    setAuthMode(mode);
    dom.authModal.classList.remove("hidden");
    dom.authModal.setAttribute("aria-hidden", "false");
}

function closeAuthModal() {
    dom.authModal.classList.add("hidden");
    dom.authModal.setAttribute("aria-hidden", "true");
    setAuthStatus("");
}

function getUserDisplayName(user) {
    const metadata = user?.user_metadata || {};
    return metadata.full_name || metadata.name || user?.email?.split("@")[0] || "Resume Builder";
}

function getUserInitials(name) {
    const normalized = (name || "RB").trim();
    const parts = normalized.split(/\s+/).filter(Boolean);
    if (!parts.length) return "RB";
    return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function updateUserUI(user) {
    const name = user ? getUserDisplayName(user) : "Guest";
    const email = user?.email || "Connect Supabase to enable cloud sessions";
    dom.userDisplayName.textContent = name;
    dom.userDisplayEmail.textContent = email;
    dom.userInitials.textContent = getUserInitials(name);
}

function showLandingState() {
    dom.landingView.classList.remove("hidden");
    dom.appView.classList.add("hidden");
}

function showStudioState() {
    dom.landingView.classList.add("hidden");
    dom.appView.classList.remove("hidden");
}

function applySessionState(user) {
    currentUser = user || null;
    updateUserUI(currentUser);

    if (currentUser) {
        showStudioState();
        closeAuthModal();
        renderStudioChrome();
        loadResumeLibrary();
    } else {
        resumeLibrary = [];
        currentResumeId = null;
        currentResumeUpdatedAt = null;
        updateSaveStatus("Sign in to sync your resumes");
        renderResumeLibrary();
        showLandingState();
    }
}

async function handleAuthSubmit(event) {
    event.preventDefault();

    if (!supabaseClient) {
        setAuthStatus("Add your Supabase project URL and anon key in supabase-config.js first.", "error");
        return;
    }

    const email = dom.authEmail.value.trim();
    const password = dom.authPassword.value;
    const fullName = dom.authFullName.value.trim();

    if (!email || !password) {
        setAuthStatus("Email and password are required.", "error");
        return;
    }

    setAuthStatus("Working on it...");
    dom.authSubmitBtn.disabled = true;

    try {
        if (authMode === "signup") {
            const { error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: getSupabaseConfig().redirectTo || undefined,
                    data: {
                        full_name: fullName
                    }
                }
            });

            if (error) throw error;
            setAuthStatus("Account created. Check your email if confirmation is enabled, then sign in.", "success");
        } else {
            const { error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            setAuthStatus("Signed in successfully.", "success");
        }
    } catch (error) {
        setAuthStatus(error.message || "Authentication failed.", "error");
    } finally {
        dom.authSubmitBtn.disabled = false;
    }
}

async function handleOAuthSignIn(provider) {
    if (!isHttpOrigin()) {
        setAuthStatus("Social login requires running the app from http://localhost or http://127.0.0.1, not directly from a file.", "error");
        openAuthModal(authMode);
        return;
    }

    if (!supabaseClient) {
        setAuthStatus("Add your Supabase project URL and anon key in supabase-config.js first.", "error");
        openAuthModal(authMode);
        return;
    }

    const redirectTo = getSupabaseConfig().redirectTo || undefined;
    setAuthStatus(`Redirecting to ${provider === "google" ? "Google" : "LinkedIn"}...`);

    const { error } = await supabaseClient.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo
        }
    });

    if (error) {
        setAuthStatus(error.message || "Unable to start social sign-in.", "error");
    }
}

async function handleSignOut() {
    if (!supabaseClient) {
        applySessionState(null);
        return;
    }

    const { error } = await supabaseClient.auth.signOut();
    if (error) {
        showToast(error.message || "Unable to sign out.", "error");
    }
}

function bindSidebarEvents() {
    document.getElementById("templateList")?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-template-id]");
        if (!button) return;
        setTemplate(button.dataset.templateId);
    });

    document.getElementById("themePresetList")?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-theme-id]");
        if (!button) return;
        applyThemePreset(button.dataset.themeId);
    });

    document.getElementById("sectionVisibilityControls")?.addEventListener("change", (event) => {
        const toggle = event.target.closest("[data-section-toggle]");
        if (!toggle) return;
        setSectionVisible(toggle.dataset.sectionToggle, toggle.checked);
    });

    dom.resumeLibraryList?.addEventListener("click", (event) => {
        const openBtn = event.target.closest("[data-resume-open]");
        if (openBtn) {
            openResumeRecord(openBtn.getAttribute("data-resume-open"));
            return;
        }

        const duplicateBtn = event.target.closest("[data-resume-duplicate]");
        if (duplicateBtn) {
            duplicateResumeRecord(duplicateBtn.getAttribute("data-resume-duplicate"));
            return;
        }

        const deleteBtn = event.target.closest("[data-resume-delete]");
        if (deleteBtn) {
            deleteResumeRecord(deleteBtn.getAttribute("data-resume-delete"));
            return;
        }

        const card = event.target.closest("[data-resume-id]");
        if (card) {
            openResumeRecord(card.getAttribute("data-resume-id"));
        }
    });

    document.querySelectorAll("[data-preset-section]").forEach((button) => {
        button.addEventListener("click", () => addPresetSection(button.getAttribute("data-preset-section")));
    });
}

function bindStyleControls() {
    const styleIds = [
        "globalFontSelect",
        "baseFontSize",
        "sectionTitleColor",
        "textColor",
        "nameColor",
        "headlineColor",
        "expTitleColor",
        "companyColor",
        "dateColor",
        "sectionTitleSize",
        "skillsColumnsSelect"
    ];

    styleIds.forEach((controlId) => {
        const control = document.getElementById(controlId);
        if (!control) return;

        control.addEventListener("change", () => {
            if (controlId === "skillsColumnsSelect") {
                currentResumeData = extractResumeData();
                renderResume(currentLang, false);
                markResumeDirty("Skills layout updated");
                return;
            }
            applyGlobalStyles();
            markResumeDirty("Theme controls updated");
        });

        control.addEventListener("input", () => {
            if (controlId !== "skillsColumnsSelect") {
                applyGlobalStyles();
                markResumeDirty("Theme controls updated");
            }
        });
    });
}

function cacheDom() {
    dom.landingView = document.getElementById("landingView");
    dom.appView = document.getElementById("appView");
    dom.authModal = document.getElementById("authModal");
    dom.authTitle = document.getElementById("authTitle");
    dom.authSubtitle = document.getElementById("authSubtitle");
    dom.authForm = document.getElementById("authForm");
    dom.authEmail = document.getElementById("authEmail");
    dom.authPassword = document.getElementById("authPassword");
    dom.authFullName = document.getElementById("authFullName");
    dom.authNameField = document.getElementById("authNameField");
    dom.authSubmitBtn = document.getElementById("authSubmitBtn");
    dom.authStatus = document.getElementById("authStatus");
    dom.authSwitchLabel = document.getElementById("authSwitchLabel");
    dom.authSwitchBtn = document.getElementById("authSwitchBtn");
    dom.closeAuthModalBtn = document.getElementById("closeAuthModalBtn");
    dom.googleAuthBtn = document.getElementById("googleAuthBtn");
    dom.linkedinAuthBtn = document.getElementById("linkedinAuthBtn");
    dom.userDisplayName = document.getElementById("userDisplayName");
    dom.userDisplayEmail = document.getElementById("userDisplayEmail");
    dom.userInitials = document.getElementById("userInitials");
    dom.signOutBtn = document.getElementById("signOutBtn");
    dom.resumeLibraryList = document.getElementById("resumeLibraryList");
    dom.resumeLibraryEmpty = document.getElementById("resumeLibraryEmpty");
    dom.resumeTitleInput = document.getElementById("resumeTitleInput");
    dom.saveStatusText = document.getElementById("saveStatusText");
    dom.saveResumeNowBtn = document.getElementById("saveResumeNowBtn");
    dom.createBlankResumeBtn = document.getElementById("createBlankResumeBtn");
    dom.createSampleResumeBtn = document.getElementById("createSampleResumeBtn");
    dom.atsModeToggle = document.getElementById("atsModeToggle");
    dom.showPhotoToggle = document.getElementById("showPhotoToggle");
    dom.photoUploadInput = document.getElementById("photoUploadInput");
    dom.removePhotoBtn = document.getElementById("removePhotoBtn");
}

function bindAuthUI() {
    document.querySelectorAll("[data-open-auth]").forEach((button) => {
        button.addEventListener("click", () => openAuthModal(button.getAttribute("data-open-auth")));
    });

    document.querySelectorAll("[data-close-auth]").forEach((button) => {
        button.addEventListener("click", closeAuthModal);
    });

    dom.closeAuthModalBtn?.addEventListener("click", closeAuthModal);
    dom.authSwitchBtn?.addEventListener("click", () => {
        setAuthMode(authMode === "login" ? "signup" : "login");
    });
    dom.authForm?.addEventListener("submit", handleAuthSubmit);
    dom.googleAuthBtn?.addEventListener("click", () => handleOAuthSignIn("google"));
    dom.linkedinAuthBtn?.addEventListener("click", () => handleOAuthSignIn("linkedin_oidc"));
    dom.signOutBtn?.addEventListener("click", handleSignOut);
}

// Cover Letter Supabase Functions
async function loadCoverLetterLibrary() {
    if (!supabaseClient || !currentUser) return;

    const { data, error } = await supabaseClient
        .from(COVER_LETTERS_TABLE)
        .select("id,title,job_description,content,updated_at,created_at")
        .order("updated_at", { ascending: false });

    if (error) {
        console.log("Unable to load cover letters:", error.message);
        return;
    }

    coverLetterLibrary = (data || []).map(record => ({
        id: record.id,
        title: record.title || "Untitled Cover Letter",
        jobDescription: record.job_description || "",
        content: record.content || "",
        updatedAt: record.updated_at || record.created_at || null,
        createdAt: record.created_at || null
    }));

    renderCoverLetterList();
}

async function saveCurrentCoverLetterToCloud(options = {}) {
    if (!supabaseClient || !currentUser || !currentCoverLetterId) {
        if (!options.silent) {
            showToast("Create a cover letter first before saving.", "error");
        }
        return;
    }

    if (coverLetterIsSaving && !options.force) return;
    coverLetterIsSaving = true;

    try {
        const payload = {
            title: document.getElementById("coverLetterTitleInput")?.value || "Untitled Cover Letter",
            job_description: document.getElementById("jobDescriptionInput")?.value || "",
            content: document.getElementById("coverLetterContainer")?.textContent || "",
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabaseClient
            .from(COVER_LETTERS_TABLE)
            .update(payload)
            .eq("id", currentCoverLetterId)
            .select("id,title,job_description,content,updated_at,created_at")
            .single();

        if (error) throw error;

        currentCoverLetterData = {
            id: data.id,
            title: data.title,
            jobDescription: data.job_description,
            content: data.content,
            updatedAt: data.updated_at,
            createdAt: data.created_at
        };

        syncCurrentCoverLetterInLibrary(currentCoverLetterData);
        coverLetterIsDirty = false;

        if (!options.silent) {
            showToast("Cover letter saved to cloud.", "success");
        }
    } catch (error) {
        showToast(error.message || "Cloud save failed.", "error");
    } finally {
        coverLetterIsSaving = false;
    }
}

function scheduleCoverLetterAutosave() {
    if (!currentUser || !currentCoverLetterId) return;
    window.clearTimeout(coverLetterAutosaveTimer);
    coverLetterAutosaveTimer = window.setTimeout(() => {
        saveCurrentCoverLetterToCloud({ silent: true });
    }, 1400);
}

function markCoverLetterDirty(statusMessage = "Unsaved changes") {
    coverLetterIsDirty = true;
    scheduleCoverLetterAutosave();
}

async function createCoverLetterRecord() {
    if (!supabaseClient || !currentUser) {
        showToast("Sign in first to create cover letters.", "error");
        return;
    }

    const payload = {
        title: "New Cover Letter",
        job_description: "",
        content: "Fill in the job description and click \"Generate Cover Letter\" to get started.",
        user_id: currentUser.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    const { data, error } = await supabaseClient
        .from(COVER_LETTERS_TABLE)
        .insert(payload)
        .select("id,title,job_description,content,updated_at,created_at")
        .single();

    if (error) {
        showToast(error.message || "Unable to create cover letter.", "error");
        return;
    }

    currentCoverLetterId = data.id;
    currentCoverLetterData = {
        id: data.id,
        title: data.title,
        jobDescription: data.job_description,
        content: data.content,
        updatedAt: data.updated_at,
        createdAt: data.created_at
    };

    document.getElementById("coverLetterTitleInput").value = data.title;
    document.getElementById("jobDescriptionInput").value = "";
    document.getElementById("coverLetterContainer").innerHTML = `<p style="color: #94a3b8; text-align: center; padding: 40px;">Fill in the job description and click "Generate Cover Letter" to get started.</p>`;

    await loadCoverLetterLibrary();
    showToast("New cover letter created.", "success");
}

function syncCurrentCoverLetterInLibrary(coverLetter) {
    const index = coverLetterLibrary.findIndex(cl => cl.id === coverLetter.id);
    if (index >= 0) {
        coverLetterLibrary[index] = coverLetter;
    } else {
        coverLetterLibrary.unshift(coverLetter);
    }
    renderCoverLetterList();
}

function switchWorkspace(workspace) {
    currentWorkspace = workspace;

    // Update tabs
    document.querySelectorAll(".workspace-tab").forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.workspace === workspace);
    });

    // Update panels
    const resumePanel = document.getElementById("resumeWorkspacePanel");
    const coverLetterPanel = document.getElementById("coverLetterWorkspacePanel");
    const resumeStage = document.getElementById("resumeStage");
    const coverLetterStage = document.getElementById("coverLetterStage");
    const designPanel = document.querySelector(".design-panel");
    if (workspace === "resume") {
        if (resumePanel) resumePanel.hidden = false;
        if (coverLetterPanel) coverLetterPanel.hidden = true;
        if (resumeStage) resumeStage.classList.remove("hidden");
        if (coverLetterStage) coverLetterStage.classList.add("hidden");
        if (designPanel) designPanel.classList.remove("hidden")
    } else {
        if (resumePanel) resumePanel.hidden = true;
        if (coverLetterPanel) coverLetterPanel.hidden = false;
        if (resumeStage) resumeStage.classList.add("hidden");
        if (coverLetterStage) coverLetterStage.classList.remove("hidden");
        if (designPanel) designPanel.classList.add("hidden")
        if (currentUser) {
            loadCoverLetterLibrary();
        } else {
            renderCoverLetterList();
        }
    }
}

function generateCoverLetterContent() {
    const jobDescription = document.getElementById("jobDescriptionInput")?.value || "";

    if (!jobDescription.trim()) {
        showToast("Please enter a job description to generate a cover letter.", "error");
        return;
    }

    const generateBtn = document.getElementById("generateCoverLetterBtn");
    if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.textContent = "Generating...";
    }

    // Extract relevant resume data
    const resumeText = extractResumeForCoverLetter();

    // Generate cover letter using template-based approach
    const coverLetterText = createCoverLetterTemplate(resumeText, jobDescription);

    // Display the generated cover letter as editable HTML
    const container = document.getElementById("coverLetterContainer");
    if (container) {
        container.innerHTML = formatCoverLetterHTML(coverLetterText);
        // Make content editable
        container.contentEditable = "true";
        container.setAttribute("data-editable", "true");
        container.addEventListener("blur", saveCoverLetterOnEdit);
    }

    // Save to current cover letter data
    currentCoverLetterData = {
        id: currentCoverLetterData?.id || Date.now().toString(),
        title: document.getElementById("coverLetterTitleInput")?.value || "Untitled Cover Letter",
        jobDescription: jobDescription,
        content: coverLetterText,
        updatedAt: new Date().toISOString(),
        createdAt: currentCoverLetterData?.createdAt || new Date().toISOString()
    };

    // Save to cloud if logged in
    if (currentUser && currentCoverLetterId) {
        saveCurrentCoverLetterToCloud({ silent: true });
    }

    if (generateBtn) {
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate Cover Letter";
    }

    showToast("Cover letter generated successfully! You can now edit it directly.", "success");
}

function extractResumeForCoverLetter() {
    const data = currentResumeData || {};
    const lines = [];

    lines.push(`Name: ${data.fullName || "Professional"}`);
    lines.push(`Title: ${data.title || "Professional"}`);
    lines.push(`Email: ${data.email || ""}`);
    lines.push(`Phone: ${data.phone || ""}`);

    if (data.summaryText) {
        lines.push(`\nSummary: ${data.summaryText}`);
    }

    if (data.skills && data.skills.length > 0) {
        lines.push(`\nKey Skills: ${data.skills.slice(0, 10).join(", ")}`);
    }

    if (data.experience && data.experience.length > 0) {
        lines.push(`\nRecent Experience:`);
        data.experience.slice(0, 3).forEach((exp) => {
            lines.push(`- ${exp.position} at ${exp.company} (${exp.date})`);
        });
    }

    return lines.join("\n");
}

function createCoverLetterTemplate(resumeText, jobDescription) {
    const date = new Date();
    const dateStr = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const fullName = currentResumeData?.fullName || "Professional";
    const email = currentResumeData?.email || "email@example.com";
    const phone = currentResumeData?.phone || "+1 (555) 000-0000";

    // Extract key skills and experience from job description
    const keySkills = extractKeySkills(jobDescription, currentResumeData?.skills || []);
    const recentRole = currentResumeData?.experience?.[0];

    return `${dateStr}\n

Dear Hiring Manager,

I am writing to express my strong interest in the position outlined in your job description. With my background in ${keySkills.slice(0, 2).join(" and ")} combined with proven experience in building scalable solutions, I am confident in my ability to contribute meaningfully to your team.

${recentRole ? `In my role as ${recentRole.position} at ${recentRole.company}, I have developed expertise in delivering high-quality solutions that align with the core competencies you are seeking. ${recentRole.description?.split("-")[0] || ""}` : "Throughout my professional career, I have consistently demonstrated strong technical abilities and a commitment to excellence."}

Your job description particularly resonates with me, as it emphasizes ${extractMainRequirements(jobDescription)}. I am excited about the opportunity to apply my skills and experience to help your organization achieve its goals. I bring not only technical expertise but also a collaborative approach and a proven track record of solving complex problems efficiently.

I would welcome the opportunity to discuss how my background, skills, and enthusiasm can contribute to your team's success. Thank you for considering my application. I look forward to the possibility of speaking with you soon.

Sincerely,

${fullName}
${email}
${phone}`;
}

function formatCoverLetterHTML(text) {
    // Convert plain text to formatted HTML with proper spacing
    const paragraphs = text.split('\n\n');
    return paragraphs.map(para => {
        if (!para.trim()) return '';
        return `<p>${escapeHtml(para.trim())}</p>`;
    }).join('');
}

function saveCoverLetterOnEdit() {
    const container = document.getElementById("coverLetterContainer");
    if (!container || !currentCoverLetterData) return;

    // Extract text content from edited HTML
    currentCoverLetterData.content = container.innerText || container.textContent || "";

    if (currentUser && currentCoverLetterId) {
        markCoverLetterDirty("Cover letter edited");
        saveCurrentCoverLetterToCloud({ silent: true });
    }
}

function extractKeySkills(jobDescription, availableSkills) {
    const descLower = jobDescription.toLowerCase();
    return availableSkills.filter(skill =>
        descLower.includes(skill.toLowerCase())
    ).slice(0, 5);
}

function extractMainRequirements(jobDescription) {
    const sentences = jobDescription.split(/[.!?]/);
    const requirements = sentences.filter(s =>
        s.toLowerCase().includes("require") ||
        s.toLowerCase().includes("must") ||
        s.toLowerCase().includes("should")
    ).slice(0, 1);

    return requirements.length > 0 ? requirements[0].trim() : "key responsibilities and growth opportunities";
}

function saveCoverLetterToStorage() {
    if (!currentCoverLetterData) return;

    coverLetters[currentCoverLetterData.id] = currentCoverLetterData;
    currentCoverLetterId = currentCoverLetterData.id;

    try {
        localStorage.setItem(STORAGE_KEYS.coverLetters, JSON.stringify(coverLetters));
        localStorage.setItem(STORAGE_KEYS.currentCoverLetterId, currentCoverLetterId);
    } catch (error) {
        console.error("Failed to save cover letter:", error);
    }
}

function loadCoverLettersFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.coverLetters);
        coverLetters = stored ? JSON.parse(stored) : {};
        currentCoverLetterId = localStorage.getItem(STORAGE_KEYS.currentCoverLetterId) || null;
    } catch (error) {
        console.error("Failed to load cover letters:", error);
        coverLetters = {};
    }
}

function renderCoverLetterList() {
    const list = document.getElementById("coverLetterList");
    if (!list) return;

    if (coverLetterLibrary.length === 0) {
        list.innerHTML = '<div class="dashboard-empty-state">No cover letters yet. Create one to get started.</div>';
        return;
    }

    // Determine how many items to show
    const itemsToShow = showAllCoverLetters ? coverLetterLibrary.length : Math.min(2, coverLetterLibrary.length);
    const visibleItems = coverLetterLibrary.slice(0, itemsToShow);
    const hasMore = coverLetterLibrary.length > 2;

    let html = visibleItems.map(cl => `
        <div class="cover-letter-item ${currentCoverLetterId === cl.id ? 'active' : ''}" onclick="loadCoverLetter('${escapeAttribute(cl.id)}')">
            <div class="cover-letter-item-title">${escapeHtml(cl.title)}</div>
            <div class="cover-letter-item-meta">Updated ${new Date(cl.updatedAt).toLocaleDateString()}</div>
        </div>
    `).join("");

    // Add show more button if applicable
    if (hasMore && !showAllCoverLetters) {
        html += `<button class="show-more-btn" onclick="toggleShowAllCoverLetters()">
            Show ${coverLetterLibrary.length - 2} more...
        </button>`;
    } else if (hasMore && showAllCoverLetters) {
        html += `<button class="show-more-btn" onclick="toggleShowAllCoverLetters()">
            Show less
        </button>`;
    }

    list.innerHTML = html;
}

function toggleShowAllCoverLetters() {
    showAllCoverLetters = !showAllCoverLetters;
    renderCoverLetterList();
}

function loadCoverLetter(id) {
    const coverLetter = coverLetterLibrary.find(cl => cl.id === id);
    if (!coverLetter) return;

    currentCoverLetterId = id;
    currentCoverLetterData = coverLetter;
    document.getElementById("coverLetterTitleInput").value = coverLetter.title;
    document.getElementById("jobDescriptionInput").value = coverLetter.jobDescription;

    const container = document.getElementById("coverLetterContainer");
    if (container) {
        // Format the content as HTML with proper paragraph breaks
        container.innerHTML = formatCoverLetterHTML(coverLetter.content);
        // Make it editable
        container.contentEditable = "true";
        container.setAttribute("data-editable", "true");
        container.addEventListener("blur", saveCoverLetterOnEdit);
    }

    renderCoverLetterList();
    showToast("Cover letter loaded.", "success");
}

function createNewCoverLetter() {
    if (currentUser) {
        createCoverLetterRecord();
    } else {
        // Offline mode
        currentCoverLetterData = {
            id: Date.now().toString(),
            title: "New Cover Letter",
            jobDescription: "",
            content: "Fill in the job description and click \"Generate Cover Letter\" to get started.",
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        };
        currentCoverLetterId = currentCoverLetterData.id;
        document.getElementById("coverLetterTitleInput").value = currentCoverLetterData.title;
        document.getElementById("jobDescriptionInput").value = "";
        document.getElementById("coverLetterContainer").innerHTML = `<p style="color: #94a3b8; text-align: center; padding: 40px;">Fill in the job description and click "Generate Cover Letter" to get started.</p>`;
        saveCoverLetterToStorage();
        loadCoverLetterList();
        showToast("New cover letter created.", "success");
    }
}

function saveCoverLetterPDF() {
    const container = document.getElementById("coverLetterContainer");
    const text = container?.innerText || "";

    if (!text || text.includes("Fill in the job description")) {
        showToast("Please generate a cover letter first.", "error");
        return;
    }

    currentCoverLetterData.title = document.getElementById("coverLetterTitleInput")?.value || "Cover Letter";
    if (currentUser && currentCoverLetterId) {
        saveCurrentCoverLetterToCloud({ silent: true });
    }

    const filename = document.getElementById("coverLetterTitleInput")?.value || "cover-letter";
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

    const marginLeft = 20;
    const marginTop = 20;
    const maxWidth = 170;
    const lineHeight = 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);

    let y = marginTop;

    text.split("\n").forEach(para => {
        if (para.trim() === "") {
            y += lineHeight * 0.5;
            return;
        }
        const lines = doc.splitTextToSize(para, maxWidth);
        lines.forEach(line => {
            if (y > 277) { doc.addPage(); y = marginTop; }
            doc.text(line, marginLeft, y);
            y += lineHeight;
        });
        y += lineHeight * 0.3;
    });

    doc.save(`${filename}.pdf`);
    showToast("Cover letter exported as PDF.", "success");
}


function debugPDFCapture() {
    const container = document.getElementById("coverLetterContainer");
    const text = container?.innerText || "";

    console.log("Text length:", text.length);
    console.log("Text preview:", text.substring(0, 100));

    const element = document.createElement("div");
    element.style.position = "fixed";
    element.style.top = "0";
    element.style.left = "0";
    element.style.width = "794px";
    element.style.padding = "60px 70px";
    element.style.boxSizing = "border-box";
    element.style.background = "#ffffff";
    element.style.fontFamily = "Arial, sans-serif"; // ✅ no custom font, removes font-loading as a variable
    element.style.fontSize = "13px";
    element.style.lineHeight = "1.7";
    element.style.color = "#000000";
    element.style.zIndex = "99999";  // ✅ on TOP this time so we can see it
    element.style.opacity = "1";
    element.textContent = text;
    document.body.appendChild(element);

    console.log("Element in DOM:", document.body.contains(element));
    console.log("Element offsetHeight:", element.offsetHeight);
    console.log("Element textContent length:", element.textContent.length);

    // Capture it with html2canvas directly
    html2canvas(element, {
        scale: 1,
        backgroundColor: "#ffffff",
        logging: true,  // ✅ enables html2canvas internal logs
    }).then(canvas => {
        console.log("Canvas size:", canvas.width, "x", canvas.height);
        // Show the canvas result in page so you can see what was captured
        canvas.style.border = "2px solid red";
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.right = "0";
        canvas.style.width = "200px";
        canvas.style.zIndex = "999999";
        document.body.appendChild(canvas);

        setTimeout(() => {
            document.body.removeChild(element);
            document.body.removeChild(canvas);
        }, 5000);
    });
}

function copyCoverLetterText() {
    const container = document.getElementById("coverLetterContainer");
    const content = container?.innerText || container?.textContent || "";

    if (!content || content.includes("Fill in the job description")) {
        showToast("Please generate a cover letter first.", "error");
        return;
    }

    navigator.clipboard.writeText(content).then(() => {
        showToast("Cover letter copied to clipboard!", "success");
    }).catch(() => {
        showToast("Failed to copy to clipboard.", "error");
    });
}

function resetCoverLetter() {
    if (confirm("Are you sure you want to reset the cover letter? This cannot be undone.")) {
        currentCoverLetterData = null;
        document.getElementById("coverLetterTitleInput").value = "";
        document.getElementById("jobDescriptionInput").value = "";
        const container = document.getElementById("coverLetterContainer");
        if (container) {
            container.contentEditable = "false";
            container.innerHTML = `<p style="color: #94a3b8; text-align: center; padding: 40px;">Fill in the job description and click "Generate Cover Letter" to get started.</p>`;
        }
        currentCoverLetterId = null;
        showToast("Cover letter reset.", "success");
    }
}

function bindStudioEvents() {
    bindSidebarEvents();
    bindStyleControls();

    // Workspace Tabs
    document.querySelectorAll(".workspace-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
            switchWorkspace(tab.dataset.workspace);

        });
    });


    document.getElementById("savePdfBtn")?.addEventListener("click", generateCleanPDF);
    document.getElementById("importResumeBtn")?.addEventListener("click", () => {
        document.getElementById("importFile")?.click();
    });
    document.getElementById("importFile")?.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => importResumeFromJSON(loadEvent.target.result);
            reader.readAsText(file);
        }
        event.target.value = "";
    });
    document.getElementById("exportDataBtn")?.addEventListener("click", exportCurrentJSON);
    document.getElementById("resetDemoBtn")?.addEventListener("click", resetToDefault);
    document.getElementById("addCustomSectionBtn")?.addEventListener("click", addCustomSection);
    dom.createBlankResumeBtn?.addEventListener("click", () => createResumeRecord("blank"));
    dom.createSampleResumeBtn?.addEventListener("click", () => createResumeRecord("sample"));
    dom.saveResumeNowBtn?.addEventListener("click", () => saveCurrentResumeToCloud({ force: true }));
    dom.resumeTitleInput?.addEventListener("input", () => {
        currentResumeTitle = getCurrentResumeTitleValue();
        syncCurrentRecordInLibrary({ title: currentResumeTitle });
        markResumeDirty("Resume title updated");
    });
    dom.atsModeToggle?.addEventListener("change", () => {
        currentAtsMode = dom.atsModeToggle.checked;
        applyTemplateState();
        markResumeDirty("ATS mode updated");
    });
    dom.showPhotoToggle?.addEventListener("change", () => {
        currentResumeData = extractResumeData();
        currentResumeData.showPhoto = dom.showPhotoToggle.checked;
        renderResume(currentLang, false);
        markResumeDirty("Photo visibility updated");
    });
    dom.photoUploadInput?.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            currentResumeData = extractResumeData();
            currentResumeData.photoUrl = typeof reader.result === "string" ? reader.result : "";
            currentResumeData.showPhoto = true;
            if (dom.showPhotoToggle) dom.showPhotoToggle.checked = true;
            renderResume(currentLang, false);
            markResumeDirty("Photo updated");
            showToast("Photo uploaded.", "success");
        };
        reader.readAsDataURL(file);
        event.target.value = "";
    });
    dom.removePhotoBtn?.addEventListener("click", () => {
        currentResumeData = extractResumeData();
        currentResumeData.photoUrl = "";
        currentResumeData.showPhoto = false;
        if (dom.showPhotoToggle) dom.showPhotoToggle.checked = false;
        renderResume(currentLang, false);
        markResumeDirty("Photo removed");
    });
    document.getElementById("resumeContainer")?.addEventListener("input", () => {
        currentResumeData = extractResumeData();
        markResumeDirty("Unsaved changes");
    });
    document.querySelectorAll(".lang-btn").forEach((button) => {
        button.addEventListener("click", (event) => setLanguage(event.currentTarget.dataset.lang));
    });

    // Cover Letter Events
    document.getElementById("generateCoverLetterBtn")?.addEventListener("click", generateCoverLetterContent);
    document.getElementById("saveCoverLetterPdfBtn")?.addEventListener("click", saveCoverLetterPDF);
    document.getElementById("copyCoverLetterBtn")?.addEventListener("click", copyCoverLetterText);
    document.getElementById("resetCoverLetterBtn")?.addEventListener("click", resetCoverLetter);
    document.getElementById("createNewCoverLetterBtn")?.addEventListener("click", createNewCoverLetter);

    // Cover Letter Title Change
    document.getElementById("coverLetterTitleInput")?.addEventListener("input", () => {
        if (currentCoverLetterData) {
            currentCoverLetterData.title = document.getElementById("coverLetterTitleInput").value;
            if (currentUser && currentCoverLetterId) {
                markCoverLetterDirty("Title updated");
                syncCurrentCoverLetterInLibrary(currentCoverLetterData);
            }
        }
    });

    // Job Description Change
    document.getElementById("jobDescriptionInput")?.addEventListener("input", () => {
        if (currentCoverLetterData) {
            currentCoverLetterData.jobDescription = document.getElementById("jobDescriptionInput").value;
            if (currentUser && currentCoverLetterId) {
                markCoverLetterDirty("Job description updated");
            }
        }
    });
}

async function hydrateAuthSession() {
    if (!supabaseClient) {
        applySessionState(null);
        authReady = true;
        return;
    }

    const { data, error } = await supabaseClient.auth.getSession();
    if (error) {
        setAuthStatus(error.message, "error");
    }
    applySessionState(data?.session?.user || null);
    authReady = true;

    supabaseClient.auth.onAuthStateChange((_event, session) => {
        applySessionState(session?.user || null);
    });
}

function maybeShowConfigHint() {
    if (hasSupabaseCredentials()) return;
    setAuthStatus("Supabase is not configured yet. Update supabase-config.js with your project URL and anon key.", "error");
}

document.addEventListener("DOMContentLoaded", async () => {
    cacheDom();
    setAuthMode("login");
    bindAuthUI();
    bindStudioEvents();

    currentResumeData = getSeedResumeData(currentLang);
    loadCoverLettersFromStorage();
    renderStudioChrome();
    updateUserUI(null);

    await loadRuntimeSupabaseConfig();
    supabaseClient = initSupabase();
    maybeShowConfigHint();
    await hydrateAuthSession();

    // Load cover letters if user is logged in
    if (currentUser) {
        await loadCoverLetterLibrary();
    }
});


// snow 
/** @license
 * DHTML Snowstorm! JavaScript-based snow for web pages
 * Making it snow on the internets since 2003. You're welcome.
 * -----------------------------------------------------------
 * Version 1.44.20131208 (Previous rev: 1.44.20131125)
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License
 * http://schillmania.com/projects/snowstorm/license.txt
 */

/*jslint nomen: true, plusplus: true, sloppy: true, vars: true, white: true */
/*global window, document, navigator, clearInterval, setInterval */

var snowStorm = (function(window, document) {

  // --- common properties ---

  this.autoStart = true;          // Whether the snow should start automatically or not.
  this.excludeMobile = true;      // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) Enable at your own risk.
  this.flakesMax = 128;           // Limit total amount of snow made (falling + sticking)
  this.flakesMaxActive = 64;      // Limit amount of snow falling at once (less = lower CPU use)
  this.animationInterval = 50;    // Theoretical "miliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower
  this.useGPU = true;             // Enable transform-based hardware acceleration, reduce CPU load.
  this.className = null;          // CSS class name for further customization on snow elements
  this.excludeMobile = true;      // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
  this.flakeBottom = null;        // Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
  this.followMouse = false;        // Snow movement can respond to the user's mouse
  this.snowColor = '#301934';        // Don't eat (or use?) yellow snow.
  this.snowCharacter = '&bull;';  // &bull; = bullet, &middot; is square on some systems etc.
  this.snowStick = true;          // Whether or not snow should "stick" at the bottom. When off, will never collect.
  this.targetElement = null;      // element which snow will be appended to (null = document.body) - can be an element ID eg. 'myDiv', or a DOM node reference
  this.useMeltEffect = true;      // When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
  this.useTwinkleEffect = false;  // Allow snow to randomly "flicker" in and out of view while falling
  this.usePositionFixed = false;  // true = snow does not shift vertically when scrolling. May increase CPU load, disabled by default - if enabled, used only where supported
  this.usePixelPosition = false;  // Whether to use pixel values for snow top/left vs. percentages. Auto-enabled if body is position:relative or targetElement is specified.

  // --- less-used bits ---

  this.freezeOnBlur = true;       // Only snow when the window is in focus (foreground.) Saves CPU.
  this.flakeLeftOffset = 0;       // Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars.
  this.flakeRightOffset = 0;      // Right margin/gutter space on edge of container
  this.flakeWidth = 8;            // Max pixel width reserved for snow element
  this.flakeHeight = 8;           // Max pixel height reserved for snow element
  this.vMaxX = 5;                 // Maximum X velocity range for snow
  this.vMaxY = 4;                 // Maximum Y velocity range for snow
  this.zIndex = 0;                // CSS stacking order applied to each snowflake

  // --- "No user-serviceable parts inside" past this point, yadda yadda ---

  var storm = this,
  features,
  // UA sniffing and backCompat rendering mode checks for fixed position, etc.
  isIE = navigator.userAgent.match(/msie/i),
  isIE6 = navigator.userAgent.match(/msie 6/i),
  isMobile = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
  isBackCompatIE = (isIE && document.compatMode === 'BackCompat'),
  noFixed = (isBackCompatIE || isIE6),
  screenX = null, screenX2 = null, screenY = null, scrollY = null, docHeight = null, vRndX = null, vRndY = null,
  windOffset = 1,
  windMultiplier = 2,
  flakeTypes = 6,
  fixedForEverything = false,
  targetElementIsRelative = false,
  opacitySupported = (function(){
    try {
      document.createElement('div').style.opacity = '0.5';
    } catch(e) {
      return false;
    }
    return true;
  }()),
  didInit = false,
  docFrag = document.createDocumentFragment();

  features = (function() {

    var getAnimationFrame;

    /**
     * hat tip: paul irish
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     * https://gist.github.com/838785
     */

    function timeoutShim(callback) {
      window.setTimeout(callback, 1000/(storm.animationInterval || 20));
    }

    var _animationFrame = (window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        timeoutShim);

    // apply to window, avoid "illegal invocation" errors in Chrome
    getAnimationFrame = _animationFrame ? function() {
      return _animationFrame.apply(window, arguments);
    } : null;

    var testDiv;

    testDiv = document.createElement('div');

    function has(prop) {

      // test for feature support
      var result = testDiv.style[prop];
      return (result !== undefined ? prop : null);

    }

    // note local scope.
    var localFeatures = {

      transform: {
        ie:  has('-ms-transform'),
        moz: has('MozTransform'),
        opera: has('OTransform'),
        webkit: has('webkitTransform'),
        w3: has('transform'),
        prop: null // the normalized property value
      },

      getAnimationFrame: getAnimationFrame

    };

    localFeatures.transform.prop = (
      localFeatures.transform.w3 || 
      localFeatures.transform.moz ||
      localFeatures.transform.webkit ||
      localFeatures.transform.ie ||
      localFeatures.transform.opera
    );

    testDiv = null;

    return localFeatures;

  }());

  this.timer = null;
  this.flakes = [];
  this.disabled = false;
  this.active = false;
  this.meltFrameCount = 20;
  this.meltFrames = [];

  this.setXY = function(o, x, y) {

    if (!o) {
      return false;
    }

    if (storm.usePixelPosition || targetElementIsRelative) {

      o.style.left = (x - storm.flakeWidth) + 'px';
      o.style.top = (y - storm.flakeHeight) + 'px';

    } else if (noFixed) {

      o.style.right = (100-(x/screenX*100)) + '%';
      // avoid creating vertical scrollbars
      o.style.top = (Math.min(y, docHeight-storm.flakeHeight)) + 'px';

    } else {

      if (!storm.flakeBottom) {

        // if not using a fixed bottom coordinate...
        o.style.right = (100-(x/screenX*100)) + '%';
        o.style.bottom = (100-(y/screenY*100)) + '%';

      } else {

        // absolute top.
        o.style.right = (100-(x/screenX*100)) + '%';
        o.style.top = (Math.min(y, docHeight-storm.flakeHeight)) + 'px';

      }

    }

  };

  this.events = (function() {

    var old = (!window.addEventListener && window.attachEvent), slice = Array.prototype.slice,
    evt = {
      add: (old?'attachEvent':'addEventListener'),
      remove: (old?'detachEvent':'removeEventListener')
    };

    function getArgs(oArgs) {
      var args = slice.call(oArgs), len = args.length;
      if (old) {
        args[1] = 'on' + args[1]; // prefix
        if (len > 3) {
          args.pop(); // no capture
        }
      } else if (len === 3) {
        args.push(false);
      }
      return args;
    }

    function apply(args, sType) {
      var element = args.shift(),
          method = [evt[sType]];
      if (old) {
        element[method](args[0], args[1]);
      } else {
        element[method].apply(element, args);
      }
    }

    function addEvent() {
      apply(getArgs(arguments), 'add');
    }

    function removeEvent() {
      apply(getArgs(arguments), 'remove');
    }

    return {
      add: addEvent,
      remove: removeEvent
    };

  }());

  function rnd(n,min) {
    if (isNaN(min)) {
      min = 0;
    }
    return (Math.random()*n)+min;
  }

  function plusMinus(n) {
    return (parseInt(rnd(2),10)===1?n*-1:n);
  }

  this.randomizeWind = function() {
    var i;
    vRndX = plusMinus(rnd(storm.vMaxX,0.2));
    vRndY = rnd(storm.vMaxY,0.2);
    if (this.flakes) {
      for (i=0; i<this.flakes.length; i++) {
        if (this.flakes[i].active) {
          this.flakes[i].setVelocities();
        }
      }
    }
  };

  this.scrollHandler = function() {
    var i;
    // "attach" snowflakes to bottom of window if no absolute bottom value was given
    scrollY = (storm.flakeBottom ? 0 : parseInt(window.scrollY || document.documentElement.scrollTop || (noFixed ? document.body.scrollTop : 0), 10));
    if (isNaN(scrollY)) {
      scrollY = 0; // Netscape 6 scroll fix
    }
    if (!fixedForEverything && !storm.flakeBottom && storm.flakes) {
      for (i=0; i<storm.flakes.length; i++) {
        if (storm.flakes[i].active === 0) {
          storm.flakes[i].stick();
        }
      }
    }
  };

  this.resizeHandler = function() {
    if (window.innerWidth || window.innerHeight) {
      screenX = window.innerWidth - 16 - storm.flakeRightOffset;
      screenY = (storm.flakeBottom || window.innerHeight);
    } else {
      screenX = (document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth) - (!isIE ? 8 : 0) - storm.flakeRightOffset;
      screenY = storm.flakeBottom || document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
    }
    docHeight = document.body.offsetHeight;
    screenX2 = parseInt(screenX/2,10);
  };

  this.resizeHandlerAlt = function() {
    screenX = storm.targetElement.offsetWidth - storm.flakeRightOffset;
    screenY = storm.flakeBottom || storm.targetElement.offsetHeight;
    screenX2 = parseInt(screenX/2,10);
    docHeight = document.body.offsetHeight;
  };

  this.freeze = function() {
    // pause animation
    if (!storm.disabled) {
      storm.disabled = 1;
    } else {
      return false;
    }
    storm.timer = null;
  };

  this.resume = function() {
    if (storm.disabled) {
       storm.disabled = 0;
    } else {
      return false;
    }
    storm.timerInit();
  };

  this.toggleSnow = function() {
    if (!storm.flakes.length) {
      // first run
      storm.start();
    } else {
      storm.active = !storm.active;
      if (storm.active) {
        storm.show();
        storm.resume();
      } else {
        storm.stop();
        storm.freeze();
      }
    }
  };

  this.stop = function() {
    var i;
    this.freeze();
    for (i=0; i<this.flakes.length; i++) {
      this.flakes[i].o.style.display = 'none';
    }
    storm.events.remove(window,'scroll',storm.scrollHandler);
    storm.events.remove(window,'resize',storm.resizeHandler);
    if (storm.freezeOnBlur) {
      if (isIE) {
        storm.events.remove(document,'focusout',storm.freeze);
        storm.events.remove(document,'focusin',storm.resume);
      } else {
        storm.events.remove(window,'blur',storm.freeze);
        storm.events.remove(window,'focus',storm.resume);
      }
    }
  };

  this.show = function() {
    var i;
    for (i=0; i<this.flakes.length; i++) {
      this.flakes[i].o.style.display = 'block';
    }
  };

  this.SnowFlake = function(type,x,y) {
    var s = this;
    this.type = type;
    this.x = x||parseInt(rnd(screenX-20),10);
    this.y = (!isNaN(y)?y:-rnd(screenY)-12);
    this.vX = null;
    this.vY = null;
    this.vAmpTypes = [1,1.2,1.4,1.6,1.8]; // "amplification" for vX/vY (based on flake size/type)
    this.vAmp = this.vAmpTypes[this.type] || 1;
    this.melting = false;
    this.meltFrameCount = storm.meltFrameCount;
    this.meltFrames = storm.meltFrames;
    this.meltFrame = 0;
    this.twinkleFrame = 0;
    this.active = 1;
    this.fontSize = (10+(this.type/5)*10);
    this.o = document.createElement('div');
    this.o.innerHTML = storm.snowCharacter;
    if (storm.className) {
      this.o.setAttribute('class', storm.className);
    }
    this.o.style.color = storm.snowColor;
    this.o.style.position = (fixedForEverything?'fixed':'absolute');
    if (storm.useGPU && features.transform.prop) {
      // GPU-accelerated snow.
      this.o.style[features.transform.prop] = 'translate3d(0px, 0px, 0px)';
    }
    this.o.style.width = storm.flakeWidth+'px';
    this.o.style.height = storm.flakeHeight+'px';
    this.o.style.fontFamily = 'arial,verdana';
    this.o.style.cursor = 'default';
    this.o.style.overflow = 'hidden';
    this.o.style.fontWeight = 'normal';
    this.o.style.zIndex = storm.zIndex;
    docFrag.appendChild(this.o);

    this.refresh = function() {
      if (isNaN(s.x) || isNaN(s.y)) {
        // safety check
        return false;
      }
      storm.setXY(s.o, s.x, s.y);
    };

    this.stick = function() {
      if (noFixed || (storm.targetElement !== document.documentElement && storm.targetElement !== document.body)) {
        s.o.style.top = (screenY+scrollY-storm.flakeHeight)+'px';
      } else if (storm.flakeBottom) {
        s.o.style.top = storm.flakeBottom+'px';
      } else {
        s.o.style.display = 'none';
        s.o.style.bottom = '0%';
        s.o.style.position = 'fixed';
        s.o.style.display = 'block';
      }
    };

    this.vCheck = function() {
      if (s.vX>=0 && s.vX<0.2) {
        s.vX = 0.2;
      } else if (s.vX<0 && s.vX>-0.2) {
        s.vX = -0.2;
      }
      if (s.vY>=0 && s.vY<0.2) {
        s.vY = 0.2;
      }
    };

    this.move = function() {
      var vX = s.vX*windOffset, yDiff;
      s.x += vX;
      s.y += (s.vY*s.vAmp);
      if (s.x >= screenX || screenX-s.x < storm.flakeWidth) { // X-axis scroll check
        s.x = 0;
      } else if (vX < 0 && s.x-storm.flakeLeftOffset < -storm.flakeWidth) {
        s.x = screenX-storm.flakeWidth-1; // flakeWidth;
      }
      s.refresh();
      yDiff = screenY+scrollY-s.y+storm.flakeHeight;
      if (yDiff<storm.flakeHeight) {
        s.active = 0;
        if (storm.snowStick) {
          s.stick();
        } else {
          s.recycle();
        }
      } else {
        if (storm.useMeltEffect && s.active && s.type < 3 && !s.melting && Math.random()>0.998) {
          // ~1/1000 chance of melting mid-air, with each frame
          s.melting = true;
          s.melt();
          // only incrementally melt one frame
          // s.melting = false;
        }
        if (storm.useTwinkleEffect) {
          if (s.twinkleFrame < 0) {
            if (Math.random() > 0.97) {
              s.twinkleFrame = parseInt(Math.random() * 8, 10);
            }
          } else {
            s.twinkleFrame--;
            if (!opacitySupported) {
              s.o.style.visibility = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 'hidden' : 'visible');
            } else {
              s.o.style.opacity = (s.twinkleFrame && s.twinkleFrame % 2 === 0 ? 0 : 1);
            }
          }
        }
      }
    };

    this.animate = function() {
      // main animation loop
      // move, check status, die etc.
      s.move();
    };

    this.setVelocities = function() {
      s.vX = vRndX+rnd(storm.vMaxX*0.12,0.1);
      s.vY = vRndY+rnd(storm.vMaxY*0.12,0.1);
    };

    this.setOpacity = function(o,opacity) {
      if (!opacitySupported) {
        return false;
      }
      o.style.opacity = opacity;
    };

    this.melt = function() {
      if (!storm.useMeltEffect || !s.melting) {
        s.recycle();
      } else {
        if (s.meltFrame < s.meltFrameCount) {
          s.setOpacity(s.o,s.meltFrames[s.meltFrame]);
          s.o.style.fontSize = s.fontSize-(s.fontSize*(s.meltFrame/s.meltFrameCount))+'px';
          s.o.style.lineHeight = storm.flakeHeight+2+(storm.flakeHeight*0.75*(s.meltFrame/s.meltFrameCount))+'px';
          s.meltFrame++;
        } else {
          s.recycle();
        }
      }
    };

    this.recycle = function() {
      s.o.style.display = 'none';
      s.o.style.position = (fixedForEverything?'fixed':'absolute');
      s.o.style.bottom = 'auto';
      s.setVelocities();
      s.vCheck();
      s.meltFrame = 0;
      s.melting = false;
      s.setOpacity(s.o,1);
      s.o.style.padding = '0px';
      s.o.style.margin = '0px';
      s.o.style.fontSize = s.fontSize+'px';
      s.o.style.lineHeight = (storm.flakeHeight+2)+'px';
      s.o.style.textAlign = 'center';
      s.o.style.verticalAlign = 'baseline';
      s.x = parseInt(rnd(screenX-storm.flakeWidth-20),10);
      s.y = parseInt(rnd(screenY)*-1,10)-storm.flakeHeight;
      s.refresh();
      s.o.style.display = 'block';
      s.active = 1;
    };

    this.recycle(); // set up x/y coords etc.
    this.refresh();

  };

  this.snow = function() {
    var active = 0, flake = null, i, j;
    for (i=0, j=storm.flakes.length; i<j; i++) {
      if (storm.flakes[i].active === 1) {
        storm.flakes[i].move();
        active++;
      }
      if (storm.flakes[i].melting) {
        storm.flakes[i].melt();
      }
    }
    if (active<storm.flakesMaxActive) {
      flake = storm.flakes[parseInt(rnd(storm.flakes.length),10)];
      if (flake.active === 0) {
        flake.melting = true;
      }
    }
    if (storm.timer) {
      features.getAnimationFrame(storm.snow);
    }
  };

  this.mouseMove = function(e) {
    if (!storm.followMouse) {
      return true;
    }
    var x = parseInt(e.clientX,10);
    if (x<screenX2) {
      windOffset = -windMultiplier+(x/screenX2*windMultiplier);
    } else {
      x -= screenX2;
      windOffset = (x/screenX2)*windMultiplier;
    }
  };

  this.createSnow = function(limit,allowInactive) {
    var i;
    for (i=0; i<limit; i++) {
      storm.flakes[storm.flakes.length] = new storm.SnowFlake(parseInt(rnd(flakeTypes),10));
      if (allowInactive || i>storm.flakesMaxActive) {
        storm.flakes[storm.flakes.length-1].active = -1;
      }
    }
    storm.targetElement.appendChild(docFrag);
  };

  this.timerInit = function() {
    storm.timer = true;
    storm.snow();
  };

  this.init = function() {
    var i;
    for (i=0; i<storm.meltFrameCount; i++) {
      storm.meltFrames.push(1-(i/storm.meltFrameCount));
    }
    storm.randomizeWind();
    storm.createSnow(storm.flakesMax); // create initial batch
    storm.events.add(window,'resize',storm.resizeHandler);
    storm.events.add(window,'scroll',storm.scrollHandler);
    if (storm.freezeOnBlur) {
      if (isIE) {
        storm.events.add(document,'focusout',storm.freeze);
        storm.events.add(document,'focusin',storm.resume);
      } else {
        storm.events.add(window,'blur',storm.freeze);
        storm.events.add(window,'focus',storm.resume);
      }
    }
    storm.resizeHandler();
    storm.scrollHandler();
    if (storm.followMouse) {
      storm.events.add(isIE?document:window,'mousemove',storm.mouseMove);
    }
    storm.animationInterval = Math.max(20,storm.animationInterval);
    storm.timerInit();
  };

  this.start = function(bFromOnLoad) {
    if (!didInit) {
      didInit = true;
    } else if (bFromOnLoad) {
      // already loaded and running
      return true;
    }
    if (typeof storm.targetElement === 'string') {
      var targetID = storm.targetElement;
      storm.targetElement = document.getElementById(targetID);
      if (!storm.targetElement) {
        throw new Error('Snowstorm: Unable to get targetElement "'+targetID+'"');
      }
    }
    if (!storm.targetElement) {
      storm.targetElement = (document.body || document.documentElement);
    }
    if (storm.targetElement !== document.documentElement && storm.targetElement !== document.body) {
      // re-map handler to get element instead of screen dimensions
      storm.resizeHandler = storm.resizeHandlerAlt;
      //and force-enable pixel positioning
      storm.usePixelPosition = true;
    }
    storm.resizeHandler(); // get bounding box elements
    storm.usePositionFixed = (storm.usePositionFixed && !noFixed && !storm.flakeBottom); // whether or not position:fixed is to be used
    if (window.getComputedStyle) {
      // attempt to determine if body or user-specified snow parent element is relatlively-positioned.
      try {
        targetElementIsRelative = (window.getComputedStyle(storm.targetElement, null).getPropertyValue('position') === 'relative');
      } catch(e) {
        // oh well
        targetElementIsRelative = false;
      }
    }
    fixedForEverything = storm.usePositionFixed;
    if (screenX && screenY && !storm.disabled) {
      storm.init();
      storm.active = true;
    }
  };

  function doDelayedStart() {
    window.setTimeout(function() {
      storm.start(true);
    }, 20);
    // event cleanup
    storm.events.remove(isIE?document:window,'mousemove',doDelayedStart);
  }

  function doStart() {
    if (!storm.excludeMobile || !isMobile) {
      doDelayedStart();
    }
    // event cleanup
    storm.events.remove(window, 'load', doStart);
  }

  // hooks for starting the snow
  if (storm.autoStart) {
    storm.events.add(window, 'load', doStart, false);
  }

  return this;

}(window, document));

