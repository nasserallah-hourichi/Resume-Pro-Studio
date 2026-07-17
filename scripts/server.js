import { translations } from "../helpers/translations.js";
import {
    STORAGE_KEYS,
    defaultSectionVisibility,
    defaultResumeCollections,
    templates,
    themePresets,
    baseSectionMeta,
    presetSectionTemplates
} from "../helpers/models.js";
import { RESUMES_TABLE, COVER_LETTERS_TABLE, STORAGE_KEYS_WORKSPACE } from "../helpers/constants.js";


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
let showAllResumes = false;

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


function saveWorkspacePreference(workspace) {
    localStorage.setItem(STORAGE_KEYS_WORKSPACE, workspace);
}

function loadWorkspacePreference() {
    const saved = localStorage.getItem(STORAGE_KEYS_WORKSPACE);
    return saved === "coverLetter" ? "coverLetter" : "resume"; // Default to resume
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

/* MODIFIED: Safely extracts zero-item / empty states and strips empty rows out of the file payload */
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

    // Extract lists and filter out rows where all inputs are completely blank
    const experience = Array.from(experienceElements).map((element) => ({
        position: element.querySelector(".exp-position")?.innerText.trim() || "",
        company: element.querySelector(".exp-company")?.innerText.replace(/^, \s*/, "").trim() || "",
        date: element.querySelector(".exp-date")?.innerText.trim() || "",
        description: element.querySelector(".exp-desc")?.innerText.trim() || ""
    })).filter((exp) => exp.position || exp.company || exp.date || exp.description);

    const education = Array.from(educationElements).map((element) => ({
        degree: element.querySelector(".edu-degree")?.innerText.trim() || "",
        date: element.querySelector(".edu-date")?.innerText.trim() || ""
    })).filter((edu) => edu.degree || edu.date);

    const skills = Array.from(skillElements)
        .map((element) => element.innerText.replace(/^[\-\u2022]\s*/, "").trim())
        .filter(Boolean);

    const languages = Array.from(languageElements).map((element) => ({
        name: element.querySelector(".language-name")?.innerText.trim() || "",
        level: element.querySelector(".language-level")?.innerText.trim() || ""
    })).filter((lang) => lang.name || lang.level);

    const customSections = Array.from(customSectionElements).map((element) => ({
        id: element.getAttribute("data-custom-section-id") || "",
        title: element.closest(".draggable-section")?.querySelector(".custom-section-title-editable")?.innerText.trim() || "Custom Section",
        content: element.querySelector(".custom-section-content")?.innerText.trim() || ""
    })).filter((sec) => sec.content.trim() !== "");

    return {
        fullName: getText("fullNameEditable", fallback.fullName),
        title: getText("titleEditable", fallback.title),
        phone: getText("contactPhone", fallback.phone),
        email: getText("contactEmail", fallback.email),
        address: getText("contactAddress", fallback.address),
        linkedin: getText("contactLinkedin", fallback.linkedin),
        summaryText: getText("summaryText", ""), // Default to blank string if deleted
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
    const skillList = skillsArray && skillsArray.length ? skillsArray : [];
    if (skillList.length === 0) return "";
    
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

/* MODIFIED: Added `isEmpty` check. Returns empty string entirely to let the layout collapse and shift up naturally */
function buildSectionMarkup(sectionType, title, contentHtml, actionHtml, isEmpty = false) {
    if (!sectionVisibility[sectionType] || isEmpty) return "";

    return `
        <div class="draggable-section" data-section-type="${sectionType}">
            <div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>
            <div class="section-title" style="color: var(--section-title-color, #0f172a); font-size: var(--section-title-size, 0.9rem);">${title}</div>
            ${contentHtml}
            ${actionHtml || ""}
        </div>
    `;
}

/* MODIFIED: Passes conditional empty checks to `buildSectionMarkup` */
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
        `<div id="summaryText" contenteditable="true" class="summary-copy">${escapeHtml(data.summaryText)}</div>`,
        null,
        (!data.summaryText || !data.summaryText.trim())
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
        `<button class="btn-add" id="addExpBtn"><i class="fas fa-plus"></i> Add Experience</button>`,
        (!data.experience || data.experience.length === 0)
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
        `<button class="btn-add" id="addEduBtn"><i class="fas fa-plus"></i> Add Education</button>`,
        (!data.education || data.education.length === 0)
    );

    const skillsSection = buildSectionMarkup(
        "skills",
        translations[lang].skillsLabel,
        skillsHtml,
        `<button class="btn-add" id="addSkillBtn"><i class="fas fa-plus"></i> Add Skill</button>`,
        (!data.skills || data.skills.length === 0)
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
        `<button class="btn-add" id="addLangBtn"><i class="fas fa-plus"></i> Add Language</button>`,
        (!data.languages || data.languages.length === 0)
    );

    const customSectionsMarkup = (data.customSections || []).map((section) => buildSectionMarkup(
        section.id,
        `<span class="custom-section-title-editable" contenteditable="true">${escapeHtml(section.title || "Custom Section")}</span>`,
        `
            <div class="custom-section" data-custom-section-id="${escapeHtml(section.id)}">
                <div class="custom-section-content" contenteditable="true">${escapeHtml(section.content || "")}</div>
            </div>
        `,
        `<button class="btn-add btn-remove-section" data-remove-custom-section="${section.id}"><i class="fas fa-trash"></i> Remove Section</button>`,
        (!section.content || !section.content.trim())
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

    const itemsToShow = showAllResumes ? resumeLibrary.length : Math.min(2, resumeLibrary.length);
    const visibleItems = resumeLibrary.slice(0, itemsToShow);
    const hasMore = resumeLibrary.length > 2;

    let html = visibleItems.map((record) => `
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

    if (hasMore && !showAllResumes) {
        html += `<button class="library-action-btn" id="showAllResumesBtn" type="button">Show All</button>`;
    }
    dom.resumeLibraryList.innerHTML = html;
}