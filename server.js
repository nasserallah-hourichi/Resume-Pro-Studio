const translations = {
    en: {
        fullName: "LIAM O'CONNOR",
        title: "Senior Project Manager | Digital Transformation",
        phone: "+1 (604) 789-3456",
        email: "liam.oconnor@resume.ca",
        address: "Calgary, AB, Canada",
        summaryLabel: "Professional Summary",
        summaryText: "Accomplished project manager with 9+ years of experience leading agile transformations and high-stakes IT initiatives. PMP certified, bilingual English/French, and focused on stakeholder alignment.",
        experienceLabel: "Work Experience",
        educationLabel: "Education",
        skillsLabel: "Core Competencies",
        languagesLabel: "Languages",
        footerNote: "Copyright (c) 2026 Anis Ghabi. All rights reserved.",
        linkedin: "linkedin.com/in/ghabi-anis"
    },
    fr: {
        fullName: "LIAM O'CONNOR",
        title: "Chef de Projet Senior | Transformation numerique",
        phone: "+1 (604) 789-3456",
        email: "liam.oconnor@resume.ca",
        address: "Calgary, AB, Canada",
        summaryLabel: "Sommaire professionnel",
        summaryText: "Chef de projet accompli avec plus de 9 ans d'experience dans les transformations agiles et les initiatives TI de grande envergure. Certifie PMP, bilingue anglais/francais, avec un fort sens de l'alignement des parties prenantes.",
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
    customSectionCount: "resumeCustomSectionCount"
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
            position: "Lead Project Manager",
            company: "Nexus Digital Inc.",
            date: "2021 - Present",
            description: "Directed an enterprise cloud migration, delivered $4M in annual savings, and improved delivery timelines by 28%."
        },
        {
            position: "Agile Coordinator",
            company: "BrightWave Solutions",
            date: "2018 - 2021",
            description: "Facilitated scrum ceremonies and cross-functional collaboration across 6 teams and boosted delivery velocity by 35%."
        }
    ],
    education: [
        { degree: "MBA, Technology Management", date: "2016 - 2018 | University of Alberta" },
        { degree: "B.Eng. Software Engineering", date: "2012 - 2016 | University of Calgary" }
    ],
    skills: [
        "Project Management (PMP)",
        "Agile / Scrum",
        "Risk Management",
        "Stakeholder Relations",
        "Data-Driven Strategy",
        "English and French",
        "Budget Planning",
        "Team Leadership",
        "Quality Assurance",
        "Client Relations",
        "Change Management",
        "Strategic Planning"
    ],
    languages: [
        { name: "English", level: "Native / Fluent" },
        { name: "French", level: "Professional working proficiency (C1)" }
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
        id: "modern",
        name: "Modern Accent",
        description: "High-contrast header with a polished studio feel.",
        preview: ["Accent header", "Sharper visual rhythm"],
        controls: {
            globalFontSelect: "'Montserrat', sans-serif",
            baseFontSize: "14px",
            sectionTitleColor: "#0b3b66",
            textColor: "#243647",
            nameColor: "#f8fafc",
            headlineColor: "#dbe7f3",
            expTitleColor: "#0b3b66",
            companyColor: "#4f6980",
            dateColor: "#6b7f93",
            sectionTitleSize: "0.9rem",
            skillsColumnsSelect: "3"
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

const sectionMeta = [
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "languages", label: "Languages" }
];

let currentLang = "en";
let currentResumeData = null;
let currentTemplateId = loadTemplateSelection();
let sectionVisibility = loadSectionVisibility();
let sortableInstance = null;
let customSectionCounter = loadCustomSectionCounter();

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
        customSections: []
    };
}

function cloneResumeData(data) {
    const seed = getSeedResumeData(currentLang);
    const source = data || {};

    return {
        ...seed,
        ...source,
        experience: deepClone(source.experience || seed.experience),
        education: deepClone(source.education || seed.education),
        skills: [...(source.skills || seed.skills)],
        languages: deepClone(source.languages || seed.languages),
        customSections: deepClone(source.customSections || seed.customSections || [])
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
        ...sectionMeta,
        ...customSections.map((section) => ({
            id: section.id,
            label: section.title || "Custom Section"
        }))
    ];
}

function extractResumeData() {
    const fallback = cloneResumeData(currentResumeData || getSeedResumeData(currentLang));
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
            company: element.querySelector(".exp-company")?.innerText.replace(/^@\s*/, "").trim() || "",
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
        customSections
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
    const data = cloneResumeData(customData || currentResumeData || getSeedResumeData(lang));
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
                        <span class="exp-company" contenteditable="true" style="color: var(--company-color, #475569);">@ ${escapeHtml(exp.company)}</span>
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

    return `
        <div class="resume-shell template-${template.id}">
            <div class="resume-header" style="border-bottom-color: var(--section-title-color, #0f172a);">
                <div class="name-title">
                    <h1 id="fullNameEditable" contenteditable="true" style="color: var(--name-color, #0f172a);">${escapeHtml(data.fullName)}</h1>
                    <p id="titleEditable" contenteditable="true" style="color: var(--headline-color, #334155);">${escapeHtml(data.title)}</p>
                </div>
                <div class="contact-info">
                    <span><i class="fas fa-phone-alt"></i> <span id="contactPhone" contenteditable="true">${escapeHtml(data.phone)}</span></span>
                    <span><i class="fas fa-envelope"></i> <span id="contactEmail" contenteditable="true">${escapeHtml(data.email)}</span></span>
                    <span><i class="fas fa-map-marker-alt"></i> <span id="contactAddress" contenteditable="true">${escapeHtml(data.address)}</span></span>
                    <span><i class="fab fa-linkedin"></i> <span id="contactLinkedin" contenteditable="true">${escapeHtml(data.linkedin || "linkedin.com/in/username")}</span></span>
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
                        <span class="exp-company" contenteditable="true">@ Company</span>
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
}

function setSectionVisible(sectionType, isVisible) {
    currentResumeData = extractResumeData();
    sectionVisibility[sectionType] = isVisible;
    saveSectionVisibility();
    renderResume(currentLang, false);
    renderSectionVisibilityControls();
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
                <em>${template.preview.join(" | ")}</em>
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
            <span>${section.label}</span>
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

    currentResumeData = cloneResumeData(finalData);
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
    let tempDiv = null;

    pdfBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    pdfBtn.disabled = true;

    allAddButtons.forEach((button, index) => {
        originalButtonDisplays[index] = button.style.display;
        button.style.display = "none";
    });

    if (footer) footer.style.display = "none";

    try {
        const cloneCard = resumeCard.cloneNode(true);
        cloneCard.classList.add("pdf-export");
        cloneCard.style.margin = "0";
        cloneCard.style.transform = "none";
        cloneCard.style.boxShadow = "none";
        cloneCard.style.borderRadius = "0";

        const cloneContent = cloneCard.querySelector(".resume-content");
        if (cloneContent) {
            cloneContent.style.padding = "0.15in 0.15in";
        }

        cloneCard.querySelectorAll(".btn-add, .drag-handle").forEach((element) => element.remove());
        cloneCard.querySelectorAll(".exp-item, .edu-item, .language-item").forEach((element) => {
            element.classList.add("pdf-avoid-break");
        });

        tempDiv = document.createElement("div");
        tempDiv.style.position = "fixed";
        tempDiv.style.left = "-99999px";
        tempDiv.style.top = "0";
        tempDiv.style.width = `${resumeCard.offsetWidth}px`;
        tempDiv.style.background = "#ffffff";
        tempDiv.appendChild(cloneCard);
        document.body.appendChild(tempDiv);

        const options = {
            margin: [0.15, 0.15, 0.15, 0.15],
            filename: `Resume_${currentLang.toUpperCase()}_${new Date().toISOString().slice(0, 10)}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2.8, letterRendering: true, useCORS: true, logging: false, backgroundColor: "#ffffff" },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
            pagebreak: {
                mode: ["css", "legacy"],
                avoid: [".pdf-avoid-break", ".exp-desc", ".exp-header", ".section-title"]
            }
        };

        await html2pdf().set(options).from(cloneCard).save();
    } catch (error) {
        console.error("PDF Error:", error);
        alert("PDF generation failed. Please try again.");
    } finally {
        if (tempDiv && tempDiv.parentNode) {
            tempDiv.parentNode.removeChild(tempDiv);
        }

        allAddButtons.forEach((button, index) => {
            button.style.display = originalButtonDisplays[index] || "";
        });

        if (footer) footer.style.display = originalFooterDisplay || "";
        pdfBtn.innerHTML = originalHtml;
        pdfBtn.disabled = false;
    }
}

function importResumeFromJSON(jsonStr) {
    try {
        const imported = JSON.parse(jsonStr);
        currentResumeData = cloneResumeData({ ...getSeedResumeData(currentLang), ...imported });
        renderResume(currentLang, false);
    } catch (error) {
        alert("Invalid JSON file format");
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
}

function setLanguage(lang) {
    currentResumeData = extractResumeData();
    currentLang = lang;
    renderResume(lang, false);

    document.querySelectorAll(".lang-btn").forEach((button) => {
        button.classList.toggle("active", button.dataset.lang === lang);
    });
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
                return;
            }
            applyGlobalStyles();
        });

        control.addEventListener("input", () => {
            if (controlId !== "skillsColumnsSelect") applyGlobalStyles();
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    currentResumeData = getSeedResumeData(currentLang);

    renderTemplateList();
    renderThemePresetList();
    renderSectionVisibilityControls();
    bindSidebarEvents();
    bindStyleControls();

    applyTemplateDefaults(currentTemplateId);
    renderResume(currentLang, false);

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
    document.querySelectorAll(".lang-btn").forEach((button) => {
        button.addEventListener("click", (event) => setLanguage(event.currentTarget.dataset.lang));
    });
});
