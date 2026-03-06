/* ========================================
   PROFILO — Application Logic
   ======================================== */

// ============ DEFAULT DATA ============
const DEFAULT_DATA = {
    personal: {
        name: "Umesh",
        titles: ["Software Developer", "Problem Solver", "Tech Enthusiast"],
        about: "I'm a passionate and dedicated individual with a strong foundation in technology and a drive to create impactful solutions. My journey in the world of technology has been fueled by curiosity and a constant desire to learn and grow.",
        heroDescription: "Passionate software developer crafting digital experiences. Ready to bring innovation and dedication to your team.",
        dob: "—",
        location: "India",
        email: "your.email@example.com",
        phone: "+91 XXXXX XXXXX",
        languages: "English, Hindi",
        statProjects: 5,
        statExperience: 1,
        statCertificates: 3,
        linkedIn: "",
        gitHub: "",
        profilePicture: ""
    },
    education: [
        {
            degree: "Bachelor of Technology (B.Tech)",
            institution: "Your University Name",
            date: "2020 – 2024",
            description: "Completed a four-year undergraduate program focused on Computer Science and Engineering with strong academic performance.",
            grade: "CGPA: 8.5 / 10"
        },
        {
            degree: "Higher Secondary (12th Standard)",
            institution: "Your School Name",
            date: "2018 – 2020",
            description: "Completed higher secondary education with a specialization in Science (PCM) and Computer Science.",
            grade: "Percentage: 85%"
        },
        {
            degree: "Secondary School (10th Standard)",
            institution: "Your School Name",
            date: "2018",
            description: "Completed secondary education with excellent grades across all subjects.",
            grade: "Percentage: 90%"
        }
    ],
    skills: [
        { name: "JavaScript", icon: "fab fa-js-square", level: 85 },
        { name: "React", icon: "fab fa-react", level: 80 },
        { name: "HTML5", icon: "fab fa-html5", level: 90 },
        { name: "CSS3", icon: "fab fa-css3-alt", level: 85 },
        { name: "Node.js", icon: "fab fa-node-js", level: 75 },
        { name: "Python", icon: "fab fa-python", level: 70 },
        { name: "Java", icon: "fab fa-java", level: 75 },
        { name: "Git", icon: "fab fa-git-alt", level: 80 },
        { name: "MongoDB", icon: "fas fa-database", level: 70 },
        { name: "SQL", icon: "fas fa-table", level: 75 },
        { name: "Docker", icon: "fab fa-docker", level: 60 },
        { name: "AWS", icon: "fab fa-aws", level: 55 }
    ],
    experience: [
        {
            title: "Software Developer Intern",
            company: "Your Company Name",
            date: "2024 – Present",
            description: "Working on building scalable web applications using modern frameworks and best practices. Collaborating with cross-functional teams to deliver high-quality software solutions."
        }
    ],
    projects: [
        {
            title: "Portfolio Website",
            description: "A stunning personal portfolio website built with HTML, CSS, and JavaScript to showcase skills, education, and projects.",
            tags: ["HTML", "CSS", "JavaScript"],
            icon: "fas fa-globe",
            liveUrl: "#",
            repoUrl: "#"
        },
        {
            title: "Task Management App",
            description: "A full-stack task management application with user authentication, CRUD operations, and real-time updates.",
            tags: ["React", "Node.js", "MongoDB"],
            icon: "fas fa-tasks",
            liveUrl: "#",
            repoUrl: "#"
        }
    ]
};

// ============ STATE MANAGEMENT ============
let profileData = {};

function loadProfile() {
    const saved = localStorage.getItem("profilo_data");
    if (saved) {
        try {
            profileData = JSON.parse(saved);
        } catch (e) {
            profileData = JSON.parse(JSON.stringify(DEFAULT_DATA));
        }
    } else {
        profileData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
}

function saveProfile() {
    localStorage.setItem("profilo_data", JSON.stringify(profileData));
}

// ============ RENDER FUNCTIONS ============

function renderHero() {
    const d = profileData.personal;
    document.getElementById("heroName").textContent = d.name || "Your Name";
    document.getElementById("heroDescription").textContent = d.heroDescription || "";
    startTypingEffect(d.titles || []);
    renderAvatar();
}

function renderAvatar() {
    const d = profileData.personal;
    const icon = document.getElementById("heroAvatarIcon");
    const img = document.getElementById("heroAvatarImg");
    if (d.profilePicture) {
        icon.style.display = "none";
        img.src = d.profilePicture;
        img.style.display = "block";
    } else {
        icon.style.display = "";
        img.style.display = "none";
        img.src = "";
    }
}

function renderAbout() {
    const d = profileData.personal;
    document.getElementById("aboutText").textContent = d.about || "";
    document.getElementById("fullName").textContent = d.name || "—";
    document.getElementById("dob").textContent = d.dob || "—";
    document.getElementById("location").textContent = d.location || "—";
    document.getElementById("email").textContent = d.email || "—";
    document.getElementById("phone").textContent = d.phone || "—";
    document.getElementById("languages").textContent = d.languages || "—";

    // Contact section
    document.getElementById("contactEmail").textContent = d.email || "—";
    document.getElementById("contactPhone").textContent = d.phone || "—";
    document.getElementById("contactLocation").textContent = d.location || "—";

    // Animate stats
    animateCounter("statProjects", d.statProjects || 0);
    animateCounter("statExperience", d.statExperience || 0);
    animateCounter("statCertificates", d.statCertificates || 0);
}

function renderEducation() {
    const container = document.getElementById("educationTimeline");
    container.innerHTML = "";

    if (!profileData.education || profileData.education.length === 0) {
        container.innerHTML = `
            <div class="timeline-item" style="opacity:1;transform:none;">
                <div class="timeline-dot"></div>
                <div class="timeline-card" style="text-align:center;color:var(--text-muted);padding:40px;">
                    <i class="fas fa-graduation-cap" style="font-size:2rem;margin-bottom:12px;display:block;"></i>
                    <p>No education added yet. Click the <i class="fas fa-pen"></i> button to add your qualifications.</p>
                </div>
            </div>`;
        return;
    }

    profileData.education.forEach((edu, i) => {
        container.innerHTML += `
            <div class="timeline-item" style="animation-delay: ${i * 0.15}s">
                <div class="timeline-dot"></div>
                <div class="timeline-card">
                    <span class="timeline-date"><i class="fas fa-calendar-alt"></i> ${edu.date}</span>
                    <h3 class="timeline-title">${edu.degree}</h3>
                    <p class="timeline-subtitle"><i class="fas fa-university"></i> ${edu.institution}</p>
                    <p class="timeline-description">${edu.description}</p>
                    ${edu.grade ? `<span class="timeline-grade"><i class="fas fa-award"></i> ${edu.grade}</span>` : ""}
                </div>
            </div>`;
    });
}

function renderSkills() {
    const container = document.getElementById("skillsGrid");
    container.innerHTML = "";

    if (!profileData.skills || profileData.skills.length === 0) {
        container.innerHTML = `<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:40px;">No skills added yet.</p>`;
        return;
    }

    profileData.skills.forEach((skill, i) => {
        container.innerHTML += `
            <div class="skill-card" style="animation-delay: ${i * 0.05}s">
                <div class="skill-icon"><i class="${skill.icon || 'fas fa-code'}"></i></div>
                <div class="skill-name">${skill.name}</div>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="${skill.level}%" style="width: 0;"></div>
                </div>
                <div class="skill-level">${skill.level}%</div>
            </div>`;
    });

    // Animate skill bars after a short delay
    setTimeout(() => {
        document.querySelectorAll(".skill-progress").forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
    }, 300);
}

function renderExperience() {
    const container = document.getElementById("experienceTimeline");
    container.innerHTML = "";

    if (!profileData.experience || profileData.experience.length === 0) {
        container.innerHTML = `
            <div class="timeline-item" style="opacity:1;transform:none;">
                <div class="timeline-dot"></div>
                <div class="timeline-card" style="text-align:center;color:var(--text-muted);padding:40px;">
                    <i class="fas fa-briefcase" style="font-size:2rem;margin-bottom:12px;display:block;"></i>
                    <p>No experience added yet. Click the <i class="fas fa-pen"></i> button to add your work history.</p>
                </div>
            </div>`;
        return;
    }

    profileData.experience.forEach((exp, i) => {
        container.innerHTML += `
            <div class="timeline-item" style="animation-delay: ${i * 0.15}s">
                <div class="timeline-dot"></div>
                <div class="timeline-card">
                    <span class="timeline-date"><i class="fas fa-calendar-alt"></i> ${exp.date}</span>
                    <h3 class="timeline-title">${exp.title}</h3>
                    <p class="timeline-subtitle"><i class="fas fa-building"></i> ${exp.company}</p>
                    <p class="timeline-description">${exp.description}</p>
                </div>
            </div>`;
    });
}

function renderProjects() {
    const container = document.getElementById("projectsGrid");
    container.innerHTML = "";

    if (!profileData.projects || profileData.projects.length === 0) {
        container.innerHTML = `<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:40px;">No projects added yet.</p>`;
        return;
    }

    profileData.projects.forEach(proj => {
        const tags = (proj.tags || []).map(t => `<span class="project-tag">${t}</span>`).join("");
        container.innerHTML += `
            <div class="project-card">
                <div class="project-image">
                    <i class="${proj.icon || 'fas fa-rocket'}"></i>
                </div>
                <div class="project-body">
                    <h3 class="project-title">${proj.title}</h3>
                    <p class="project-description">${proj.description}</p>
                    <div class="project-tags">${tags}</div>
                    <div class="project-links">
                        ${proj.liveUrl ? `<a href="${proj.liveUrl}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ""}
                        ${proj.repoUrl ? `<a href="${proj.repoUrl}" target="_blank"><i class="fab fa-github"></i> Source Code</a>` : ""}
                    </div>
                </div>
            </div>`;
    });
}

function renderAll() {
    renderHero();
    renderAbout();
    renderEducation();
    renderSkills();
    renderExperience();
    renderProjects();
}

// ============ TYPING EFFECT ============
let typingTimeout;
function startTypingEffect(titles) {
    if (!titles || titles.length === 0) return;

    const el = document.getElementById("heroTitle");
    let titleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
        const current = titles[titleIdx];
        if (isDeleting) {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
        } else {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIdx === current.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            titleIdx = (titleIdx + 1) % titles.length;
            speed = 500;
        }

        typingTimeout = setTimeout(type, speed);
    }

    clearTimeout(typingTimeout);
    type();
}

// ============ COUNTER ANIMATION ============
function animateCounter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    let current = 0;
    const increment = Math.ceil(target / 40);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = current;
    }, 30);
}

// ============ NAVBAR ============
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");

    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        links.classList.toggle("active");
    });

    // Close mobile menu on link click
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            toggle.classList.remove("active");
            links.classList.remove("active");
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");
            const link = document.querySelector(`.nav-link[data-section="${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
                    link.classList.add("active");
                }
            }
        });
    });
}

// ============ MODAL / EDIT SYSTEM ============
function initModal() {
    const modal = document.getElementById("editModal");
    const fab = document.getElementById("fabEdit");
    const closeBtn = document.getElementById("modalClose");
    const cancelBtn = document.getElementById("modalCancel");
    const saveBtn = document.getElementById("modalSave");

    fab.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);
    saveBtn.addEventListener("click", saveFromModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Tabs
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
        });
    });

    // Add buttons
    document.getElementById("addEducation").addEventListener("click", () => addEducationItem());
    document.getElementById("addSkill").addEventListener("click", () => addSkillItem());
    document.getElementById("addExperience").addEventListener("click", () => addExperienceItem());
    document.getElementById("addProject").addEventListener("click", () => addProjectItem());

    // Avatar upload
    initAvatarUpload();
}

function openModal() {
    const modal = document.getElementById("editModal");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    populateModalFields();
}

function closeModal() {
    const modal = document.getElementById("editModal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

function populateModalFields() {
    const d = profileData.personal;
    document.getElementById("editName").value = d.name || "";
    document.getElementById("editTitles").value = (d.titles || []).join(", ");
    document.getElementById("editAbout").value = d.about || "";
    document.getElementById("editDob").value = d.dob || "";
    document.getElementById("editLocation").value = d.location || "";
    document.getElementById("editEmail").value = d.email || "";
    document.getElementById("editPhone").value = d.phone || "";
    document.getElementById("editLanguages").value = d.languages || "";
    document.getElementById("editHeroDesc").value = d.heroDescription || "";
    document.getElementById("editStatProjects").value = d.statProjects || 0;
    document.getElementById("editStatExperience").value = d.statExperience || 0;
    document.getElementById("editStatCertificates").value = d.statCertificates || 0;
    document.getElementById("editLinkedIn").value = d.linkedIn || "";
    document.getElementById("editGitHub").value = d.gitHub || "";

    // Avatar preview in modal
    populateAvatarPreview();

    // Populate dynamic sections
    populateEducationForms();
    populateSkillForms();
    populateExperienceForms();
    populateProjectForms();
}

// --- Avatar Upload ---
let pendingAvatarData = null;

function initAvatarUpload() {
    const uploadArea = document.getElementById("avatarUploadArea");
    const preview = document.getElementById("avatarPreview");
    const fileInput = document.getElementById("avatarFileInput");
    const chooseBtn = document.getElementById("avatarChooseBtn");
    const removeBtn = document.getElementById("avatarRemoveBtn");

    // Click to upload
    preview.addEventListener("click", () => fileInput.click());
    chooseBtn.addEventListener("click", () => fileInput.click());

    // File input change
    fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
            handleAvatarFile(e.target.files[0]);
        }
    });

    // Drag and drop
    uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.classList.add("drag-over");
    });
    uploadArea.addEventListener("dragleave", () => {
        uploadArea.classList.remove("drag-over");
    });
    uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.classList.remove("drag-over");
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleAvatarFile(e.dataTransfer.files[0]);
        }
    });

    // Remove button
    removeBtn.addEventListener("click", () => {
        pendingAvatarData = "__remove__";
        showAvatarPreview("");
    });
}

function handleAvatarFile(file) {
    if (!file.type.startsWith("image/")) {
        showToast("Please select an image file.");
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        showToast("Image must be under 2MB.");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        pendingAvatarData = e.target.result;
        showAvatarPreview(e.target.result);
    };
    reader.readAsDataURL(file);
}

function showAvatarPreview(src) {
    const icon = document.getElementById("avatarUploadIcon");
    const text = document.getElementById("avatarUploadText");
    const img = document.getElementById("avatarPreviewImg");
    const removeBtn = document.getElementById("avatarRemoveBtn");

    if (src) {
        icon.style.display = "none";
        text.style.display = "none";
        img.src = src;
        img.style.display = "block";
        removeBtn.style.display = "";
    } else {
        icon.style.display = "";
        text.style.display = "";
        img.style.display = "none";
        img.src = "";
        removeBtn.style.display = "none";
    }
}

function populateAvatarPreview() {
    pendingAvatarData = null;
    const d = profileData.personal;
    showAvatarPreview(d.profilePicture || "");
}

// --- Education Form ---
function populateEducationForms() {
    const container = document.getElementById("educationItems");
    container.innerHTML = "";
    (profileData.education || []).forEach((edu, i) => addEducationItem(edu, i));
}

function addEducationItem(data = {}, index) {
    const container = document.getElementById("educationItems");
    const idx = index !== undefined ? index : container.children.length;
    const div = document.createElement("div");
    div.className = "form-card";
    div.innerHTML = `
        <div class="form-card-header">
            <span class="form-card-title"><i class="fas fa-graduation-cap"></i> Education #${idx + 1}</span>
            <button class="btn btn-outline btn-danger btn-sm" onclick="this.closest('.form-card').remove()">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
        <div class="form-group">
            <label>Degree / Qualification</label>
            <input type="text" class="edu-degree" value="${data.degree || ""}" placeholder="e.g. B.Tech in Computer Science">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="edu-institution" value="${data.institution || ""}" placeholder="University / School name">
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" class="edu-date" value="${data.date || ""}" placeholder="e.g. 2020 – 2024">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="edu-description" rows="2" placeholder="Key achievements, courses...">${data.description || ""}</textarea>
        </div>
        <div class="form-group">
            <label>Grade / Score</label>
            <input type="text" class="edu-grade" value="${data.grade || ""}" placeholder="e.g. CGPA: 8.5 / 10">
        </div>`;
    container.appendChild(div);
}

// --- Skill Form ---
function populateSkillForms() {
    const container = document.getElementById("skillItems");
    container.innerHTML = "";
    (profileData.skills || []).forEach((skill, i) => addSkillItem(skill, i));
}

function addSkillItem(data = {}, index) {
    const container = document.getElementById("skillItems");
    const idx = index !== undefined ? index : container.children.length;
    const div = document.createElement("div");
    div.className = "form-card";
    div.innerHTML = `
        <div class="form-card-header">
            <span class="form-card-title"><i class="fas fa-code"></i> Skill #${idx + 1}</span>
            <button class="btn btn-outline btn-danger btn-sm" onclick="this.closest('.form-card').remove()">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Skill Name</label>
                <input type="text" class="skill-name-input" value="${data.name || ""}" placeholder="e.g. JavaScript">
            </div>
            <div class="form-group">
                <label>FontAwesome Icon Class</label>
                <input type="text" class="skill-icon-input" value="${data.icon || ""}" placeholder="e.g. fab fa-js-square">
            </div>
        </div>
        <div class="form-group">
            <label>Proficiency Level (0-100)</label>
            <input type="number" class="skill-level-input" value="${data.level || 50}" min="0" max="100">
        </div>`;
    container.appendChild(div);
}

// --- Experience Form ---
function populateExperienceForms() {
    const container = document.getElementById("experienceItems");
    container.innerHTML = "";
    (profileData.experience || []).forEach((exp, i) => addExperienceItem(exp, i));
}

function addExperienceItem(data = {}, index) {
    const container = document.getElementById("experienceItems");
    const idx = index !== undefined ? index : container.children.length;
    const div = document.createElement("div");
    div.className = "form-card";
    div.innerHTML = `
        <div class="form-card-header">
            <span class="form-card-title"><i class="fas fa-briefcase"></i> Experience #${idx + 1}</span>
            <button class="btn btn-outline btn-danger btn-sm" onclick="this.closest('.form-card').remove()">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="exp-title" value="${data.title || ""}" placeholder="e.g. Software Developer Intern">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="exp-company" value="${data.company || ""}" placeholder="Company name">
            </div>
        </div>
        <div class="form-group">
            <label>Duration</label>
            <input type="text" class="exp-date" value="${data.date || ""}" placeholder="e.g. Jan 2024 – Present">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="exp-description" rows="3" placeholder="Key responsibilities and achievements...">${data.description || ""}</textarea>
        </div>`;
    container.appendChild(div);
}

// --- Project Form ---
function populateProjectForms() {
    const container = document.getElementById("projectItems");
    container.innerHTML = "";
    (profileData.projects || []).forEach((proj, i) => addProjectItem(proj, i));
}

function addProjectItem(data = {}, index) {
    const container = document.getElementById("projectItems");
    const idx = index !== undefined ? index : container.children.length;
    const div = document.createElement("div");
    div.className = "form-card";
    div.innerHTML = `
        <div class="form-card-header">
            <span class="form-card-title"><i class="fas fa-rocket"></i> Project #${idx + 1}</span>
            <button class="btn btn-outline btn-danger btn-sm" onclick="this.closest('.form-card').remove()">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
        <div class="form-group">
            <label>Project Title</label>
            <input type="text" class="proj-title" value="${data.title || ""}" placeholder="Project name">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="proj-description" rows="2" placeholder="Brief project description...">${data.description || ""}</textarea>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Tags (comma-separated)</label>
                <input type="text" class="proj-tags" value="${(data.tags || []).join(", ")}" placeholder="React, Node.js, MongoDB">
            </div>
            <div class="form-group">
                <label>Icon Class</label>
                <input type="text" class="proj-icon" value="${data.icon || ""}" placeholder="fas fa-globe">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Live URL</label>
                <input type="url" class="proj-live" value="${data.liveUrl || ""}" placeholder="https://...">
            </div>
            <div class="form-group">
                <label>Repository URL</label>
                <input type="url" class="proj-repo" value="${data.repoUrl || ""}" placeholder="https://github.com/...">
            </div>
        </div>`;
    container.appendChild(div);
}

// ============ SAVE FROM MODAL ============
function saveFromModal() {
    const d = profileData.personal;

    d.name = document.getElementById("editName").value.trim();
    d.titles = document.getElementById("editTitles").value.split(",").map(t => t.trim()).filter(Boolean);
    d.about = document.getElementById("editAbout").value.trim();
    d.dob = document.getElementById("editDob").value.trim();
    d.location = document.getElementById("editLocation").value.trim();
    d.email = document.getElementById("editEmail").value.trim();
    d.phone = document.getElementById("editPhone").value.trim();
    d.languages = document.getElementById("editLanguages").value.trim();
    d.heroDescription = document.getElementById("editHeroDesc").value.trim();
    d.statProjects = parseInt(document.getElementById("editStatProjects").value) || 0;
    d.statExperience = parseInt(document.getElementById("editStatExperience").value) || 0;
    d.statCertificates = parseInt(document.getElementById("editStatCertificates").value) || 0;
    d.linkedIn = document.getElementById("editLinkedIn").value.trim();
    d.gitHub = document.getElementById("editGitHub").value.trim();

    // Profile picture
    if (pendingAvatarData === "__remove__") {
        d.profilePicture = "";
    } else if (pendingAvatarData) {
        d.profilePicture = pendingAvatarData;
    }
    pendingAvatarData = null;

    // Education
    profileData.education = [];
    document.querySelectorAll("#educationItems .form-card").forEach(card => {
        profileData.education.push({
            degree: card.querySelector(".edu-degree").value.trim(),
            institution: card.querySelector(".edu-institution").value.trim(),
            date: card.querySelector(".edu-date").value.trim(),
            description: card.querySelector(".edu-description").value.trim(),
            grade: card.querySelector(".edu-grade").value.trim()
        });
    });

    // Skills
    profileData.skills = [];
    document.querySelectorAll("#skillItems .form-card").forEach(card => {
        profileData.skills.push({
            name: card.querySelector(".skill-name-input").value.trim(),
            icon: card.querySelector(".skill-icon-input").value.trim(),
            level: parseInt(card.querySelector(".skill-level-input").value) || 50
        });
    });

    // Experience
    profileData.experience = [];
    document.querySelectorAll("#experienceItems .form-card").forEach(card => {
        profileData.experience.push({
            title: card.querySelector(".exp-title").value.trim(),
            company: card.querySelector(".exp-company").value.trim(),
            date: card.querySelector(".exp-date").value.trim(),
            description: card.querySelector(".exp-description").value.trim()
        });
    });

    // Projects
    profileData.projects = [];
    document.querySelectorAll("#projectItems .form-card").forEach(card => {
        profileData.projects.push({
            title: card.querySelector(".proj-title").value.trim(),
            description: card.querySelector(".proj-description").value.trim(),
            tags: card.querySelector(".proj-tags").value.split(",").map(t => t.trim()).filter(Boolean),
            icon: card.querySelector(".proj-icon").value.trim(),
            liveUrl: card.querySelector(".proj-live").value.trim(),
            repoUrl: card.querySelector(".proj-repo").value.trim()
        });
    });

    saveProfile();
    renderAll();
    closeModal();
    showToast("Profile saved successfully!");
}

// ============ TOAST ============
function showToast(message) {
    const toast = document.getElementById("toast");
    document.getElementById("toastMessage").textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

// ============ CONTACT FORM ============
function initContactForm() {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Message sent! (Demo — no backend connected)");
        form.reset();
    });
}

// ============ SCROLL REVEAL ============
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".timeline-item, .skill-card, .project-card, .stat-item, .contact-card").forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });
}

// ============ ADMIN AUTHENTICATION ============
// IMPORTANT: Change this hash to your own password's SHA-256 hash before deploying!
// Current default password is: umesh123
// To generate a new hash, open browser console and run:
//   crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_PASSWORD')).then(h => console.log(Array.from(new Uint8Array(h)).map(b=>b.toString(16).padStart(2,'0')).join('')))
const ADMIN_PASSWORD_HASH = "a]HASH_PLACEHOLDER[";
let isAdminAuthenticated = false;

// We'll compute the real hash at startup
let ADMIN_HASH = "";

async function computeHash(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Pre-compute the expected hash for "umesh123"
// We store the plain password here since it's client-side anyway,
// but it's better than showing the edit button to everyone.
const ADMIN_PASSWORD = "umesh123";

function initAdminAuth() {
    const logo = document.querySelector(".nav-logo");
    const loginModal = document.getElementById("adminLoginModal");
    const loginClose = document.getElementById("adminLoginClose");
    const loginCancel = document.getElementById("adminLoginCancel");
    const loginSubmit = document.getElementById("adminLoginSubmit");
    const passwordInput = document.getElementById("adminPassword");
    const errorMsg = document.getElementById("adminError");
    const fab = document.getElementById("fabEdit");

    // Check if already authenticated this session
    if (sessionStorage.getItem("profilo_admin") === "true") {
        isAdminAuthenticated = true;
        fab.style.display = "flex";
    }

    // Triple-click logo to open admin login
    let clickCount = 0;
    let clickTimer = null;

    logo.addEventListener("click", (e) => {
        e.preventDefault();

        if (isAdminAuthenticated) {
            // Already logged in, scroll to top
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        clickCount++;
        if (clickCount === 1) {
            clickTimer = setTimeout(() => { clickCount = 0; }, 800);
        }
        if (clickCount === 3) {
            clearTimeout(clickTimer);
            clickCount = 0;
            openAdminLogin();
        }
    });

    // Login modal controls
    loginClose.addEventListener("click", closeAdminLogin);
    loginCancel.addEventListener("click", closeAdminLogin);
    loginModal.addEventListener("click", (e) => {
        if (e.target === loginModal) closeAdminLogin();
    });

    loginSubmit.addEventListener("click", attemptLogin);
    passwordInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") attemptLogin();
        errorMsg.style.display = "none";
    });

    function openAdminLogin() {
        loginModal.classList.add("active");
        document.body.style.overflow = "hidden";
        passwordInput.value = "";
        errorMsg.style.display = "none";
        setTimeout(() => passwordInput.focus(), 300);
    }

    function closeAdminLogin() {
        loginModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    function attemptLogin() {
        const enteredPassword = passwordInput.value;
        if (enteredPassword === ADMIN_PASSWORD) {
            isAdminAuthenticated = true;
            sessionStorage.setItem("profilo_admin", "true");
            fab.style.display = "flex";
            closeAdminLogin();
            showToast("🔓 Edit mode unlocked! Click the ✏️ button to edit.");
        } else {
            errorMsg.style.display = "block";
            passwordInput.value = "";
            passwordInput.focus();
            // Shake animation
            loginModal.querySelector(".modal").style.animation = "shake 0.4s ease";
            setTimeout(() => {
                loginModal.querySelector(".modal").style.animation = "";
            }, 400);
        }
    }
}

// ============ INITIALIZE ============
document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
    renderAll();
    initNavbar();
    initModal();
    initContactForm();
    initAdminAuth();

    // Delay scroll reveal to let initial renders complete
    setTimeout(initScrollReveal, 500);
});
