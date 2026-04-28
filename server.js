// BILINGUAL DATASETS
const translations = {
    en: {
        fullName: "LIAM O'CONNOR",
        title: "Senior Project Manager | Digital Transformation",
        phone: "+1 (604) 789-3456",
        email: "liam.oconnor@resume.ca",
        address: "Calgary, AB, Canada",
        summaryLabel: "Professional Summary",
        summaryText: "Accomplished project manager with 9+ years of experience leading agile transformations and high-stakes IT initiatives. PMP certified, bilingual English/French, expert in stakeholder alignment.",
        experienceLabel: "Work Experience",
        educationLabel: "Education",
        skillsLabel: "Core Competencies",
        languagesLabel: "Languages",
        footerNote: "Copyright © 2026 Anis Ghabi. All rights reserved.",
        linkedin: "linkedin.com/in/ghabi-anis"
    },
    fr: {
        fullName: "LIAM O'CONNOR",
        title: "Chef de Projet Senior | Transformation numérique",
        phone: "+1 (604) 789-3456",
        email: "liam.oconnor@resume.ca",
        address: "Calgary, AB, Canada",
        summaryLabel: "Sommaire professionnel",
        summaryText: "Chef de projet accompli avec plus de 9 ans d'expérience dans les transformations agiles et les initiatives TI de grande envergure. Certifié PMP, bilingue anglais/français.",
        experienceLabel: "Expérience professionnelle",
        educationLabel: "Formation",
        skillsLabel: "Compétences clés",
        languagesLabel: "Langues",
        footerNote: "Copyright © 2026 Anis Ghabi. All rights reserved.",
        linkedin: "linkedin.com/in/ghabi-anis"
    }
};

let currentLang = 'en';
let currentResumeData = null;
let sortableInstance = null;

function extractResumeData() {
    if (!document.getElementById('resumeContainer')) return null;
    const getText = (id) => document.getElementById(id)?.innerText || '';
    const experiences = [];
    document.querySelectorAll('.exp-item').forEach(el => {
        const pos = el.querySelector('.exp-position')?.innerText || '';
        const company = el.querySelector('.exp-company')?.innerText || '';
        const date = el.querySelector('.exp-date')?.innerText || '';
        const desc = el.querySelector('.exp-desc')?.innerText || '';
        experiences.push({ position: pos, company, date, description: desc });
    });
    const educations = [];
    document.querySelectorAll('.edu-item').forEach(el => {
        const degree = el.querySelector('.edu-degree')?.innerText || '';
        const date = el.querySelector('.edu-date')?.innerText || '';
        educations.push({ degree, date });
    });
    
    const skills = [];
    document.querySelectorAll('.skill-item').forEach(el => {
        let text = el.innerText.trim();
        text = text.replace(/^[•\-·]\s*/, '');
        if (text) skills.push(text);
    });
    
    const languages = Array.from(document.querySelectorAll('#languagesContainer .language-item')).map(lang => ({
        name: lang.querySelector('.language-name')?.innerText || '',
        level: lang.querySelector('.language-level')?.innerText || ''
    }));
    return {
        fullName: getText('fullNameEditable'),
        title: getText('titleEditable'),
        phone: getText('contactPhone'),
        email: getText('contactEmail'),
        address: getText('contactAddress'),
        linkedin: getText('contactLinkedin'),
        summaryText: getText('summaryText'),
        experience: experiences,
        education: educations,
        skills: skills,
        languages: languages
    };
}

function escapeHtml(str) { if(!str) return ''; return str.replace(/[&<>]/g, function(m){ if(m==='&') return '&amp;'; if(m==='<') return '&lt;'; if(m==='>') return '&gt;'; return m;}); }

function renderSkillsMultiColumn(skillsArray, columns = 3) {
    if (!skillsArray || skillsArray.length === 0) {
        skillsArray = [
            "Project Management (PMP)", "Agile/Scrum", "Risk Management", 
            "Stakeholder Relations", "Data-Driven Strategy", "English & French",
            "Budget Planning", "Team Leadership", "Quality Assurance",
            "Client Relations", "Change Management", "Strategic Planning"
        ];
    }
    
    const columnCount = parseInt(columns);
    const itemsPerColumn = Math.ceil(skillsArray.length / columnCount);
    const columnsData = [];
    for (let i = 0; i < columnCount; i++) {
        const startIdx = i * itemsPerColumn;
        const endIdx = Math.min(startIdx + itemsPerColumn, skillsArray.length);
        columnsData.push(skillsArray.slice(startIdx, endIdx));
    }
    
    let skillsHtml = `<div class="skills-multicolumn" id="skillsContainer" style="grid-template-columns: repeat(${columnCount}, 1fr);">`;
    
    for (let col = 0; col < columnCount; col++) {
        skillsHtml += `<div class="skills-column">`;
        columnsData[col].forEach(skill => {
            skillsHtml += `<div class="skill-item" contenteditable="true"><span class="skill-bullet">•</span> ${escapeHtml(skill)}</div>`;
        });
        skillsHtml += `</div>`;
    }
    skillsHtml += `</div>`;
    
    return skillsHtml;
}

function buildResumeHTML(lang, customData = null) {
    const t = translations[lang];
    let data = { ...t };
    const skillsColumns = document.getElementById('skillsColumnsSelect')?.value || '3';
    
    if(customData) {
        data = { ...t, ...customData };
        if(customData.experience) data.experience = customData.experience;
        if(customData.education) data.education = customData.education;
        if(customData.skills) data.skills = customData.skills;
        if(customData.languages) data.languages = customData.languages;
    }
    const experiences = data.experience || [
        { position: "Lead Project Manager", company: "Nexus Digital Inc.", date: "2021 – Present", description: "Directed enterprise cloud migration, delivered $4M in annual savings, improved delivery timelines by 28%." },
        { position: "Agile Coordinator", company: "BrightWave Solutions", date: "2018 – 2021", description: "Facilitated scrum ceremonies and cross-functional collaboration across 6 teams, boosted velocity by 35%." }
    ];
    const educations = data.education || [
        { degree: "MBA, Technology Management", date: "2016 – 2018 | University of Alberta" },
        { degree: "B.Eng. Software Engineering", date: "2012 – 2016 | University of Calgary" }
    ];
    const skills = data.skills || [
        "Project Management (PMP)", "Agile/Scrum", "Risk Management", 
        "Stakeholder Relations", "Data-Driven Strategy", "English & French",
        "Budget Planning", "Team Leadership", "Quality Assurance",
        "Client Relations", "Change Management", "Strategic Planning"
    ];
    const languagesArr = data.languages || [
        { name: "English", level: "Native / Fluent" },
        { name: "French", level: "Professional working proficiency (C1)" }
    ];
    
    const addExpBtnHtml = `<button class="btn-add" id="addExpBtn"><i class="fas fa-plus"></i> Add Experience</button>`;
    const addEduBtnHtml = `<button class="btn-add" id="addEduBtn"><i class="fas fa-plus"></i> Add Education</button>`;
    const addSkillBtnHtml = `<button class="btn-add" id="addSkillBtn"><i class="fas fa-plus"></i> Add Skill</button>`;
    const addLangBtnHtml = `<button class="btn-add" id="addLangBtn"><i class="fas fa-plus"></i> Add Language</button>`;
    
    const skillsHtml = renderSkillsMultiColumn(skills, skillsColumns);
    
    return `
        <div class="resume-header" style="border-bottom-color: var(--section-title-color, #0f172a);">
            <div class="name-title">
                <h1 id="fullNameEditable" contenteditable="true" style="color: var(--name-color, #0f172a);">${escapeHtml(data.fullName)}</h1>
                <p id="titleEditable" contenteditable="true" style="color: var(--headline-color, #334155);">${escapeHtml(data.title)}</p>
            </div>
            <div class="contact-info">
                <span><i class="fas fa-phone-alt"></i> <span id="contactPhone" contenteditable="true">${escapeHtml(data.phone)}</span></span>
                <span><i class="fas fa-envelope"></i> <span id="contactEmail" contenteditable="true">${escapeHtml(data.email)}</span></span>
                <span><i class="fas fa-map-marker-alt"></i> <span id="contactAddress" contenteditable="true">${escapeHtml(data.address)}</span></span>
                <span><i class="fab fa-linkedin"></i> <span id="contactLinkedin" contenteditable="true">${escapeHtml(data.linkedin || 'linkedin.com/in/username')}</span></span>
            </div>
        </div>
        <div class="sections-container" id="sectionsContainer">
            <div class="draggable-section" data-section-type="summary">
                <div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>
                <div class="section-title" style="color: var(--section-title-color, #0f172a); font-size: var(--section-title-size, 0.9rem);">${t.summaryLabel}</div>
                <div id="summaryText" contenteditable="true" style="line-height:1.4; font-size:0.8rem;">${escapeHtml(data.summaryText)}</div>
            </div>
            <div class="draggable-section" data-section-type="experience">
                <div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>
                <div class="section-title" style="color: var(--section-title-color, #0f172a); font-size: var(--section-title-size, 0.9rem);">${t.experienceLabel}</div>
                <div id="experiencesContainer">${experiences.map((exp, idx) => `<div class="exp-item"><div class="exp-header"><div><span class="exp-position" contenteditable="true" style="color: var(--exp-title-color, #0f172a);">${escapeHtml(exp.position)}</span> <span class="exp-company" contenteditable="true" style="color: var(--company-color, #475569);">@ ${escapeHtml(exp.company)}</span></div><div class="exp-date" contenteditable="true" style="color: var(--date-color, #64748b);">${escapeHtml(exp.date)}</div></div><div class="exp-desc" contenteditable="true" style="font-size:0.75rem;">${escapeHtml(exp.description || '')}</div></div>`).join('')}</div>
                ${addExpBtnHtml}
            </div>
            <div class="draggable-section" data-section-type="education">
                <div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>
                <div class="section-title" style="color: var(--section-title-color, #0f172a); font-size: var(--section-title-size, 0.9rem);">${t.educationLabel}</div>
                <div id="educationContainer">${educations.map((edu, idx) => `<div class="edu-item"><div class="edu-degree" contenteditable="true" style="color: var(--exp-title-color, #0f172a); font-size:0.72rem;">${escapeHtml(edu.degree)}</div><div class="edu-date" contenteditable="true" style="color: var(--date-color, #64748b); font-size:0.65rem;">${escapeHtml(edu.date)}</div></div>`).join('')}</div>
                ${addEduBtnHtml}
            </div>
            <div class="draggable-section" data-section-type="skills">
                <div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>
                <div class="section-title" style="color: var(--section-title-color, #0f172a); font-size: var(--section-title-size, 0.9rem);">${t.skillsLabel}</div>
                ${skillsHtml}
                ${addSkillBtnHtml}
            </div>
            <div class="draggable-section" data-section-type="languages">
                <div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>
                <div class="section-title" style="color: var(--section-title-color, #0f172a); font-size: var(--section-title-size, 0.9rem);">${t.languagesLabel}</div>
                <div id="languagesContainer">${languagesArr.map(l => `<div class="language-item"><span class="language-name" contenteditable="true" style="font-size:0.73rem;">${escapeHtml(l.name)}</span><span class="language-level" contenteditable="true" style="color: var(--date-color, #64748b); font-size:0.68rem;">${escapeHtml(l.level)}</span></div>`).join('')}</div>
                ${addLangBtnHtml}
            </div>
        </div>
        <footer style="color: #94a3b8; font-size:0.55rem;">${t.footerNote}</footer>
    `;
}

function initSortable() {
    const container = document.getElementById('sectionsContainer');
    if (!container) return;
    if (sortableInstance) sortableInstance.destroy();
    sortableInstance = new Sortable(container, {
        handle: '.drag-handle',
        animation: 300,
        ghostClass: 'dragging',
        onEnd: function() { saveSectionOrder(); }
    });
}

function saveSectionOrder() {
    const container = document.getElementById('sectionsContainer');
    if (!container) return;
    const sections = container.querySelectorAll('.draggable-section');
    const order = Array.from(sections).map(section => section.getAttribute('data-section-type'));
    localStorage.setItem('resumeSectionOrder', JSON.stringify(order));
}

function loadSectionOrder() {
    const savedOrder = localStorage.getItem('resumeSectionOrder');
    if (!savedOrder) return null;
    try { return JSON.parse(savedOrder); } catch(e) { return null; }
}

function applySectionOrder() {
    const container = document.getElementById('sectionsContainer');
    if (!container) return;
    const savedOrder = loadSectionOrder();
    if (!savedOrder || savedOrder.length === 0) return;
    const sections = Array.from(container.querySelectorAll('.draggable-section'));
    const sectionMap = new Map();
    sections.forEach(section => { sectionMap.set(section.getAttribute('data-section-type'), section); });
    savedOrder.forEach(sectionType => {
        const section = sectionMap.get(sectionType);
        if (section) container.appendChild(section);
    });
}

function attachDynamicButtons() {
    const addExp = document.getElementById('addExpBtn');
    if(addExp) addExp.onclick = () => {
        const container = document.getElementById('experiencesContainer');
        const newDiv = document.createElement('div'); newDiv.className = 'exp-item';
        newDiv.innerHTML = `<div class="exp-header"><div><span class="exp-position" contenteditable="true">New Role</span> <span class="exp-company" contenteditable="true">@ Company</span></div><div class="exp-date" contenteditable="true">Date</div></div><div class="exp-desc" contenteditable="true">Description</div>`;
        container.appendChild(newDiv);
    };
    const addEdu = document.getElementById('addEduBtn');
    if(addEdu) addEdu.onclick = () => {
        const container = document.getElementById('educationContainer');
        const div = document.createElement('div'); div.className = 'edu-item';
        div.innerHTML = `<div class="edu-degree" contenteditable="true" style="font-size:0.72rem;">New Degree</div><div class="edu-date" contenteditable="true" style="font-size:0.65rem;">Year | Institution</div>`;
        container.appendChild(div);
    };
    const addSkill = document.getElementById('addSkillBtn');
    if(addSkill) addSkill.onclick = () => {
        const container = document.getElementById('skillsContainer');
        if (container) {
            const firstColumn = container.querySelector('.skills-column');
            if (firstColumn) {
                const newDiv = document.createElement('div'); 
                newDiv.className = 'skill-item'; 
                newDiv.setAttribute('contenteditable', 'true');
                newDiv.innerHTML = `<span class="skill-bullet">•</span> New Skill`;
                firstColumn.appendChild(newDiv);
            } else {
                const newDiv = document.createElement('div'); 
                newDiv.className = 'skill-item'; 
                newDiv.setAttribute('contenteditable', 'true');
                newDiv.innerHTML = `<span class="skill-bullet">•</span> New Skill`;
                container.appendChild(newDiv);
            }
        }
    };
    const addLang = document.getElementById('addLangBtn');
    if(addLang) addLang.onclick = () => {
        const container = document.getElementById('languagesContainer');
        const div = document.createElement('div'); div.className = 'language-item';
        div.innerHTML = `<span class="language-name" contenteditable="true" style="font-size:0.73rem;">Language</span><span class="language-level" contenteditable="true" style="font-size:0.68rem;">Level</span>`;
        container.appendChild(div);
    };
}

function applyGlobalStyles() {
    const resumeDiv = document.getElementById('resumeContainer');
    if(!resumeDiv) return;
    const font = document.getElementById('globalFontSelect').value;
    const baseSize = document.getElementById('baseFontSize').value;
    const sectionTitleColor = document.getElementById('sectionTitleColor').value;
    const textColor = document.getElementById('textColor').value;
    const nameColor = document.getElementById('nameColor').value;
    const headlineColor = document.getElementById('headlineColor').value;
    const expTitleColor = document.getElementById('expTitleColor').value;
    const companyColor = document.getElementById('companyColor').value;
    const dateColor = document.getElementById('dateColor').value;
    const sectionTitleSize = document.getElementById('sectionTitleSize').value;
    resumeDiv.style.setProperty('font-family', font);
    resumeDiv.style.setProperty('font-size', baseSize);
    resumeDiv.style.setProperty('color', textColor);
    resumeDiv.style.setProperty('--section-title-color', sectionTitleColor);
    resumeDiv.style.setProperty('--name-color', nameColor);
    resumeDiv.style.setProperty('--headline-color', headlineColor);
    resumeDiv.style.setProperty('--exp-title-color', expTitleColor);
    resumeDiv.style.setProperty('--company-color', companyColor);
    resumeDiv.style.setProperty('--date-color', dateColor);
    resumeDiv.style.setProperty('--section-title-size', sectionTitleSize);
    const sectionTitles = resumeDiv.querySelectorAll('.section-title');
    sectionTitles.forEach(el => { el.style.color = sectionTitleColor; el.style.fontSize = sectionTitleSize; });
    const nameEl = document.getElementById('fullNameEditable'); if(nameEl) nameEl.style.color = nameColor;
    const headlineEl = document.getElementById('titleEditable'); if(headlineEl) headlineEl.style.color = headlineColor;
    const allExpTitles = resumeDiv.querySelectorAll('.exp-position'); allExpTitles.forEach(el => el.style.color = expTitleColor);
    const allCompany = resumeDiv.querySelectorAll('.exp-company'); allCompany.forEach(el => el.style.color = companyColor);
    const allDates = resumeDiv.querySelectorAll('.exp-date, .edu-date, .language-level'); allDates.forEach(el => el.style.color = dateColor);
}

function renderResume(lang, keepData = true) {
    let extracted = keepData ? extractResumeData() : null;
    let finalData = extracted || currentResumeData;
    const html = buildResumeHTML(lang, finalData);
    document.getElementById('resumeContainer').innerHTML = html;
    attachDynamicButtons();
    initSortable();
    applySectionOrder();
    if(extracted) currentResumeData = extracted;
    else if(finalData) currentResumeData = finalData;
    else currentResumeData = { ...translations[lang] };
    applyGlobalStyles();
}

async function generateCleanPDF() {
    const resumeCard = document.getElementById('resumeCard');
    if(!resumeCard) return;
    const pdfBtn = document.getElementById('savePdfBtn');
    const originalHtml = pdfBtn.innerHTML;
    pdfBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    pdfBtn.disabled = true;
    try {
        // Hide add buttons and footer for PDF generation
        const allAddButtons = document.querySelectorAll('.btn-add');
        const footer = document.querySelector('.resume-content footer');
        
        allAddButtons.forEach(btn => btn.style.display = 'none');
        if (footer) footer.style.display = 'none';
        
        const cloneCard = resumeCard.cloneNode(true);
        cloneCard.style.margin = '0';
        cloneCard.style.padding = '0';
        cloneCard.style.boxShadow = 'none';
        cloneCard.style.borderRadius = '0';
        const cloneContent = cloneCard.querySelector('.resume-content');
        if(cloneContent) cloneContent.style.padding = '0.15in 0.15in';
        
        // Remove buttons and footer from clone
        const cloneButtons = cloneCard.querySelectorAll('.btn-add');
        cloneButtons.forEach(btn => btn.remove());
        const cloneFooter = cloneCard.querySelector('footer');
        if (cloneFooter) cloneFooter.remove();
        
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.top = '0';
        tempDiv.style.backgroundColor = 'white';
        tempDiv.appendChild(cloneCard);
        document.body.appendChild(tempDiv);
        const opt = {
            margin: [0.15, 0.15, 0.15, 0.15],
            filename: `Resume_${currentLang.toUpperCase()}_${new Date().toISOString().slice(0,10)}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2.8, letterRendering: true, useCORS: true, logging: false, backgroundColor: '#ffffff' },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        await html2pdf().set(opt).from(cloneCard).save();
        document.body.removeChild(tempDiv);
    } catch(error) {
        console.error('PDF Error:', error);
        alert('PDF generation failed. Please try again.');
    } finally {
        // Restore buttons and footer
        const allAddButtons = document.querySelectorAll('.btn-add');
        const footer = document.querySelector('.resume-content footer');
        
        allAddButtons.forEach(btn => btn.style.display = '');
        if (footer) footer.style.display = '';
        
        pdfBtn.innerHTML = originalHtml;
        pdfBtn.disabled = false;
    }
}

function importResumeFromJSON(jsonStr) {
    try {
        const imported = JSON.parse(jsonStr);
        currentResumeData = { ...translations[currentLang], ...imported };
        renderResume(currentLang, false);
    } catch(e) { alert('Invalid JSON file format'); }
}

function exportCurrentJSON() {
    const data = extractResumeData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
    const a = document.createElement('a'); 
    a.href = URL.createObjectURL(blob); 
    a.download = `resume_${currentLang}_${new Date().toISOString().slice(0,10)}.json`; 
    a.click(); 
    URL.revokeObjectURL(a.href);
}

function resetToDefault() {
    currentResumeData = { ...translations[currentLang] };
    renderResume(currentLang, false);
    localStorage.removeItem('resumeSectionOrder');
    document.getElementById('sectionTitleColor').value = '#0f172a';
    document.getElementById('textColor').value = '#1e293b';
    document.getElementById('nameColor').value = '#0f172a';
    document.getElementById('headlineColor').value = '#334155';
    document.getElementById('expTitleColor').value = '#0f172a';
    document.getElementById('companyColor').value = '#475569';
    document.getElementById('dateColor').value = '#64748b';
    document.getElementById('globalFontSelect').value = "'Inter', sans-serif";
    document.getElementById('baseFontSize').value = "14px";
    document.getElementById('sectionTitleSize').value = "0.9rem";
    document.getElementById('skillsColumnsSelect').value = "3";
    applyGlobalStyles();
}

function setLanguage(lang) {
    currentLang = lang;
    const fresh = extractResumeData();
    if(fresh && Object.keys(fresh).length) currentResumeData = fresh;
    else if(!currentResumeData) currentResumeData = { ...translations[lang] };
    renderResume(lang, false);
    document.querySelectorAll('.lang-btn').forEach(btn => { 
        if(btn.dataset.lang === lang) btn.classList.add('active'); 
        else btn.classList.remove('active'); 
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderResume('en', false);
    currentResumeData = { ...translations.en };
    const styleIds = ['globalFontSelect','baseFontSize','sectionTitleColor','textColor','nameColor','headlineColor','expTitleColor','companyColor','dateColor','sectionTitleSize','skillsColumnsSelect'];
    styleIds.forEach(id => { 
        document.getElementById(id)?.addEventListener('change', () => {
            if (id === 'skillsColumnsSelect') {
                const extracted = extractResumeData();
                if (extracted) currentResumeData = extracted;
                renderResume(currentLang, false);
            } else {
                applyGlobalStyles();
            }
        }); 
        document.getElementById(id)?.addEventListener('input', applyGlobalStyles); 
    });
    document.getElementById('savePdfBtn').addEventListener('click', generateCleanPDF);
    document.getElementById('importResumeBtn').addEventListener('click', () => document.getElementById('importFile').click());
    document.getElementById('importFile').addEventListener('change', e => { 
        if(e.target.files[0]) { 
            const reader = new FileReader(); 
            reader.onload = ev => importResumeFromJSON(ev.target.result); 
            reader.readAsText(e.target.files[0]); 
        } 
        e.target.value = ''; 
    });
    document.getElementById('exportDataBtn').addEventListener('click', exportCurrentJSON);
    document.getElementById('resetDemoBtn').addEventListener('click', resetToDefault);
    document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', e => setLanguage(e.currentTarget.dataset.lang)));
});