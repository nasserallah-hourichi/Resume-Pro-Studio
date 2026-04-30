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
        html += `<button class="show-more-btn" onclick="toggleShowAllResumes()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            ${resumeLibrary.length - 2} more resume${resumeLibrary.length - 2 > 1 ? "s" : ""}
        </button>`;
    } else if (hasMore && showAllResumes) {
        html += `<button class="show-more-btn" onclick="toggleShowAllResumes()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            Show less
        </button>`;
    }

    dom.resumeLibraryList.innerHTML = html;
}

function toggleShowAllResumes() {
    showAllResumes = !showAllResumes;
    renderResumeLibrary();
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

function updateCoverLetterSaveStatus(coverLetterId, message, type = "info") {
    console.log("Updating save status for:", coverLetterId, message, type); // Debug log

    const statusEl = document.getElementById(`save-status-${coverLetterId}`);
    if (statusEl) {
        console.log("Found status element:", statusEl); // Debug log

        statusEl.textContent = message;
        statusEl.style.display = "inline-flex";

        // Remove previous type classes
        statusEl.classList.remove("saving", "saved", "error", "info");

        // Add type class for styling
        if (type === "saving") {
            statusEl.classList.add("saving");
        } else if (type === "saved") {
            statusEl.classList.add("saved");
            // Clear saved message after 2 seconds
            setTimeout(() => {
                if (statusEl.textContent === message) {
                    statusEl.style.display = "none";
                }
            }, 2000);
        } else if (type === "error") {
            statusEl.classList.add("error");
            // Keep error visible longer
            setTimeout(() => {
                statusEl.style.display = "none";
            }, 4000);
        } else if (type === "info") {
            statusEl.classList.add("info");
            // Clear info messages after 3 seconds
            setTimeout(() => {
                if (statusEl.textContent === message) {
                    statusEl.style.display = "none";
                }
            }, 3000);
        }
    } else {
        console.error("Status element not found for ID:", `save-status-${coverLetterId}`);
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


async function deleteCoverLetter(coverLetterId) {
    if (!coverLetterId) return;

    // Find the cover letter to delete
    const target = coverLetterLibrary.find(cl => cl.id === coverLetterId);
    const confirmed = window.confirm(`Delete "${target?.title || 'this cover letter'}"? This action cannot be undone.`);
    if (!confirmed) return;

    // If user is logged in, delete from Supabase
    if (supabaseClient && currentUser) {
        const { error } = await supabaseClient
            .from(COVER_LETTERS_TABLE)
            .delete()
            .eq("id", coverLetterId);

        if (error) {
            showToast(error.message || "Unable to delete cover letter.", "error");
            return;
        }
    } else {
        // Offline mode: delete from localStorage
        delete coverLetters[coverLetterId];
        saveCoverLetterToStorage();
    }

    // Remove from library array
    coverLetterLibrary = coverLetterLibrary.filter(cl => cl.id !== coverLetterId);

    // If we're deleting the currently open cover letter, clear it
    if (coverLetterId === currentCoverLetterId) {
        currentCoverLetterId = null;
        currentCoverLetterData = null;

        // Clear the UI
        const titleInput = document.getElementById("coverLetterTitleInput");
        const jobDescInput = document.getElementById("jobDescriptionInput");
        const container = document.getElementById("coverLetterContainer");

        if (titleInput) titleInput.value = "";
        if (jobDescInput) jobDescInput.value = "";
        if (container) {
            container.contentEditable = "false";
            container.innerHTML = `<p style="color: #94a3b8; text-align: center; padding: 40px;">Select a cover letter from the list or create a new one to get started.</p>`;
        }

        updateSaveStatus("Cover letter deleted");
    }

    renderCoverLetterList();
    showToast("Cover letter deleted.", "success");
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
    console.log("saveCurrentCoverLetterToCloud called", {
        hasClient: !!supabaseClient,
        hasUser: !!currentUser,
        hasId: !!currentCoverLetterId
    });

    if (!supabaseClient || !currentUser || !currentCoverLetterId) {
        if (!options.silent) {
            showToast(!currentUser ? "Sign in to save cover letters to cloud." : "Create a cover letter first before saving.", "error");
        }
        return;
    }

    if (coverLetterIsSaving && !options.force) return;
    coverLetterIsSaving = true;

    // Show saving indicator on the specific cover letter card
    console.log("Showing saving status for:", currentCoverLetterId);
    updateCoverLetterSaveStatus(currentCoverLetterId, "Saving...", "saving");

    try {
        const payload = {
            title: document.getElementById("coverLetterTitleInput")?.value || "Untitled Cover Letter",
            job_description: document.getElementById("jobDescriptionInput")?.value || "",
            content: document.getElementById("coverLetterContainer")?.innerText || document.getElementById("coverLetterContainer")?.textContent || "",
            updated_at: new Date().toISOString()
        };

        console.log("Saving payload:", payload);

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

        // Show saved successfully on the card
        if (options.silent) {
            updateCoverLetterSaveStatus(currentCoverLetterId, "Saved", "saved");
        } else {
            updateCoverLetterSaveStatus(currentCoverLetterId, "Saved!", "saved");
            showToast("Cover letter saved to cloud.", "success");
        }
    } catch (error) {
        console.error("Save error:", error);
        updateCoverLetterSaveStatus(currentCoverLetterId, "⚠️ Save failed", "error");
        if (!options.silent) {
            showToast(error.message || "Cloud save failed.", "error");
        }
    } finally {
        coverLetterIsSaving = false;
    }
}

function scheduleCoverLetterAutosave() {
    if (!currentUser || !currentCoverLetterId) return;

    // Clear existing timer
    if (coverLetterAutosaveTimer) {
        window.clearTimeout(coverLetterAutosaveTimer);
    }

    // Show pending auto-save indicator on the card
    updateCoverLetterSaveStatus(currentCoverLetterId, "Saving...", "info");

    // Set new timer - save after 1.5 seconds of no typing
    coverLetterAutosaveTimer = window.setTimeout(() => {
        if (coverLetterIsDirty && currentCoverLetterId) {
            saveCurrentCoverLetterToCloud({ silent: true });
        }
        coverLetterAutosaveTimer = null;
    }, 1500);
}

function markCoverLetterDirty(statusMessage = "Unsaved changes") {
    if (!coverLetterIsDirty) {
        // Only show this when it becomes dirty
        updateCoverLetterSaveStatus("Unsaved changes", "info");
    }
    coverLetterIsDirty = true;
    scheduleCoverLetterAutosave();

    // Optional: Change the tab title or add an indicator
    const titleInput = document.getElementById("coverLetterTitleInput");
    if (titleInput && titleInput.value && !titleInput.value.includes("•")) {
        // Don't modify the actual title, just show indicator in UI elsewhere
        document.title = "• " + document.title.replace(/^•\s*/, "");
    }
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
    console.log("Switching workspace to:", workspace);
    currentWorkspace = workspace;

    // Save to localStorage
    saveWorkspacePreference(workspace);

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
        if (designPanel) designPanel.classList.remove("hidden");
    } else {
        if (resumePanel) resumePanel.hidden = true;
        if (coverLetterPanel) coverLetterPanel.hidden = false;
        if (resumeStage) resumeStage.classList.add("hidden");
        if (coverLetterStage) coverLetterStage.classList.remove("hidden");
        if (designPanel) designPanel.classList.add("hidden");
        
        // Only load cover letters if needed and user is logged in
        if (currentUser && coverLetterLibrary.length === 0) {
            loadCoverLetterLibrary();
        } else if (!currentUser) {
            renderCoverLetterList();
        }
    }
}

function debugWorkspaceState() {
    console.log("Current workspace:", currentWorkspace);
    console.log("Saved workspace:", localStorage.getItem(STORAGE_KEYS_WORKSPACE));
    console.log("Resume panel hidden:", document.getElementById("resumeWorkspacePanel")?.hidden);
    console.log("Cover letter panel hidden:", document.getElementById("coverLetterWorkspacePanel")?.hidden);
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
        <div class="cover-letter-item ${currentCoverLetterId === cl.id ? 'active' : ''}" data-cover-letter-id="${escapeAttribute(cl.id)}" id="cover-letter-${escapeAttribute(cl.id)}">
            <div class="cover-letter-item-content" onclick="loadCoverLetter('${escapeAttribute(cl.id)}')">
                <div class="cover-letter-item-title">${escapeHtml(cl.title)}</div>
                <div class="cover-letter-item-meta">Updated ${new Date(cl.updatedAt).toLocaleDateString()}</div>
            </div>
            <div class="cover-letter-item-actions">
                <span class="cover-letter-save-status" id="save-status-${escapeAttribute(cl.id)}" style="display: none;"></span>
                <button class="cover-letter-delete-btn" data-delete-cover-letter="${escapeAttribute(cl.id)}" title="Delete cover letter">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
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

    // Attach delete event listeners
    list.querySelectorAll("[data-delete-cover-letter]").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent triggering the parent click
            const id = button.getAttribute("data-delete-cover-letter");
            if (id) deleteCoverLetter(id);
        });
    });
}
function toggleShowAllCoverLetters() {
    showAllCoverLetters = !showAllCoverLetters;
    renderCoverLetterList();
}

function testSaveStatus(coverLetterId) {
    console.log("Testing save status for:", coverLetterId);
    updateCoverLetterSaveStatus(coverLetterId, "Test saving...", "saving");
    setTimeout(() => {
        updateCoverLetterSaveStatus(coverLetterId, "Test saved!", "saved");
    }, 2000);
}

function loadCoverLetter(id) {
    const coverLetter = coverLetterLibrary.find(cl => cl.id === id);
    if (!coverLetter) return;

    // Clear status for the previous cover letter
    if (currentCoverLetterId) {
        updateCoverLetterSaveStatus(currentCoverLetterId, "", "info");
    }

    currentCoverLetterId = id;
    currentCoverLetterData = coverLetter;
    document.getElementById("coverLetterTitleInput").value = coverLetter.title;
    document.getElementById("jobDescriptionInput").value = coverLetter.jobDescription;

    const container = document.getElementById("coverLetterContainer");
    if (container) {
        container.innerHTML = formatCoverLetterHTML(coverLetter.content);
        container.contentEditable = "true";
        container.setAttribute("data-editable", "true");
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

    // Cover Letter Content Editable - Autosave on input
    const coverLetterContainer = document.getElementById("coverLetterContainer");
    if (coverLetterContainer) {
        // Add input event listener for content changes
        coverLetterContainer.addEventListener("input", () => {
            if (currentCoverLetterData && currentCoverLetterId) {
                // Update content in currentCoverLetterData
                currentCoverLetterData.content = coverLetterContainer.innerText || coverLetterContainer.textContent || "";
                markCoverLetterDirty("Editing cover letter");
            }
        });

        // Also listen for blur events to ensure save
        coverLetterContainer.addEventListener("blur", () => {
            if (coverLetterIsDirty && currentCoverLetterId) {
                saveCurrentCoverLetterToCloud({ silent: true });
            }
        });
    }

    // Cover Letter Title Autosave
    const coverLetterTitleInput = document.getElementById("coverLetterTitleInput");
    if (coverLetterTitleInput) {
        coverLetterTitleInput.addEventListener("input", () => {
            if (currentCoverLetterData && currentCoverLetterId) {
                currentCoverLetterData.title = coverLetterTitleInput.value;
                markCoverLetterDirty("Title updated");
                syncCurrentCoverLetterInLibrary(currentCoverLetterData);
            }
        });
    }

    // Job Description Autosave
    const jobDescriptionInput = document.getElementById("jobDescriptionInput");
    if (jobDescriptionInput) {
        jobDescriptionInput.addEventListener("input", () => {
            if (currentCoverLetterData && currentCoverLetterId) {
                currentCoverLetterData.jobDescription = jobDescriptionInput.value;
                markCoverLetterDirty("Job description updated");
            }
        });
    }
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


window.loadCoverLetter = loadCoverLetter;
window.toggleShowAllCoverLetters = toggleShowAllCoverLetters;
window.createNewCoverLetter = createNewCoverLetter;
window.saveCoverLetterPDF = saveCoverLetterPDF;
window.generateCleanPDF = generateCleanPDF;
window.copyCoverLetterText = copyCoverLetterText;
window.resetCoverLetter = resetCoverLetter;
window.debugPDFCapture = debugPDFCapture;
window.toggleShowAllResumes = toggleShowAllResumes;

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

    // IMPORTANT: Restore workspace AFTER all loading is complete
    // Use setTimeout to ensure DOM is fully updated
    setTimeout(() => {
        const savedWorkspace = loadWorkspacePreference();
        console.log("Restoring workspace to:", savedWorkspace);
        switchWorkspace(savedWorkspace);
        debugWorkspaceState();
    }, 100);
});