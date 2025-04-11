function setThemeIcon(isDark) {
    const iconSpan = document.getElementById('theme-icon');
    // Animated SVGs for sun and moon
    if (isDark) {
        iconSpan.innerHTML = `
            <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="10" fill="#f4f4f4"/>
                <path d="M26 16a10 10 0 0 1-10 10c-2.5 0-4.8-1-6.6-2.7A10 10 0 1 0 26 16Z" fill="#232946"/>
            </svg>
        `;
    } else {
        iconSpan.innerHTML = `
            <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="10" fill="#FFD600"/>
                <g>
                    <circle cx="16" cy="4" r="2" fill="#FFD600"/>
                    <circle cx="16" cy="28" r="2" fill="#FFD600"/>
                    <circle cx="4" cy="16" r="2" fill="#FFD600"/>
                    <circle cx="28" cy="16" r="2" fill="#FFD600"/>
                    <circle cx="7.8" cy="7.8" r="1.5" fill="#FFD600"/>
                    <circle cx="24.2" cy="7.8" r="1.5" fill="#FFD600"/>
                    <circle cx="7.8" cy="24.2" r="1.5" fill="#FFD600"/>
                    <circle cx="24.2" cy="24.2" r="1.5" fill="#FFD600"/>
                </g>
            </svg>
        `;
    }
}

function setTheme(isDark, animate = true) {
    document.body.classList.toggle('dark-mode', isDark);
    setThemeIcon(isDark);
    if (animate) {
        const icon = document.getElementById('theme-icon');
        icon.style.transform = 'scale(1.3) rotate(30deg)';
        setTimeout(() => {
            icon.style.transform = '';
        }, 350);
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function toggleTheme() {
    const isDark = !document.body.classList.contains('dark-mode');
    setTheme(isDark);
}

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle setup
    const themeBtn = document.getElementById('theme-toggle');
    // Set initial theme from localStorage or system preference
    let isDark = false;
    if (localStorage.getItem('theme')) {
        isDark = localStorage.getItem('theme') === 'dark';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDark = true;
    }
    setTheme(isDark, false);

    themeBtn.addEventListener('click', toggleTheme);

    // Resume builder logic
    document.getElementById('resume-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const form = event.target;
        // Personal Info
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const address = form.address.value.trim();
        const linkedin = form.linkedin.value.trim();
        const summary = form.summary.value.trim();

        // Education
        const education_school = form.education_school.value.trim();
        const education_degree = form.education_degree.value.trim();
        const education_years = form.education_years.value.trim();

        // Work Experience
        const work_company = form.work_company.value.trim();
        const work_title = form.work_title.value.trim();
        const work_years = form.work_years.value.trim();
        const work_desc = form.work_desc.value.trim();

        // Other Sections
        const certifications = form.certifications.value.split(',').map(s => s.trim()).filter(Boolean);
        const languages = form.languages.value.split(',').map(s => s.trim()).filter(Boolean);
        const skills = form.skills.value.split(',').map(s => s.trim()).filter(Boolean);
        const hobbies = form.hobbies.value.split(',').map(s => s.trim()).filter(Boolean);

        // Build Resume HTML
        let resumeHTML = `
            <h2>${name}</h2>
            <p>
                ${address ? `<span>${address}</span><br>` : ''}
                <span>${email}</span> | <span>${phone}</span>
                ${linkedin ? `<br><a href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : ''}
            </p>
            ${summary ? `<h3>Professional Summary</h3><p>${summary.replace(/\n/g, '<br>')}</p>` : ''}
            <h3>Education</h3>
            <p>
                ${education_school ? `<strong>${education_school}</strong>` : ''}
                ${education_degree ? `, ${education_degree}` : ''}
                ${education_years ? ` (${education_years})` : ''}
            </p>
            <h3>Work Experience</h3>
            <p>
                ${work_company ? `<strong>${work_company}</strong>` : ''}
                ${work_title ? `, ${work_title}` : ''}
                ${work_years ? ` (${work_years})` : ''}
                ${work_desc ? `<br>${work_desc.replace(/\n/g, '<br>')}` : ''}
            </p>
            ${certifications.length ? `
                <h3>Certifications</h3>
                <ul>${certifications.map(c => `<li>${c}</li>`).join('')}</ul>
            ` : ''}
            ${languages.length ? `
                <h3>Languages</h3>
                <ul>${languages.map(l => `<li>${l}</li>`).join('')}</ul>
            ` : ''}
            <h3>Skills</h3>
            <ul>
                ${skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
            ${hobbies.length ? `
                <h3>Hobbies & Interests</h3>
                <ul>${hobbies.map(h => `<li>${h}</li>`).join('')}</ul>
            ` : ''}
        `;

        document.getElementById('resume-content').innerHTML = resumeHTML;
        document.getElementById('resume-output').style.display = 'block';
        form.style.display = 'none';
    });

    // PDF Download logic
    const pdfBtn = document.getElementById('download-pdf-btn');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', function() {
            const element = document.getElementById('resume-content');
            // Save current theme state
            const wasDark = document.body.classList.contains('dark-mode');
            document.body.classList.remove('dark-mode');
            document.body.classList.add('pdf-export');
            element.scrollIntoView({ behavior: "instant", block: "start" });
            setTimeout(() => {
                const opt = {
                    margin:       0,
                    filename:     'QuickCV-Resume.pdf',
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale: 2, useCORS: true, backgroundColor: "#fff" },
                    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
                    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
                };
                html2pdf().set(opt).from(element).save().then(() => {
                    // Restore theme state
                    document.body.classList.remove('pdf-export');
                    if (wasDark) document.body.classList.add('dark-mode');
                });
            }, 200); // 200ms delay to ensure rendering
        });
    }
});