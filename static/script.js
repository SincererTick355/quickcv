function setThemeIcon(isDark) {
    const iconSpan = document.getElementById('theme-icon');
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

// Escape HTML special characters to prevent XSS
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '"')
        .replace(/'/g, '&#39;');
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
        // Escape all user input
        const name = escapeHTML(form.name.value.trim());
        const email = escapeHTML(form.email.value.trim());
        const phone = escapeHTML(form.phone.value.trim());
        const address = escapeHTML(form.address.value.trim());
        const linkedin = escapeHTML(form.linkedin.value.trim());
        const summary = escapeHTML(form.summary.value.trim()).replace(/\n/g, '<br>');

        const education_school = escapeHTML(form.education_school.value.trim());
        const education_degree = escapeHTML(form.education_degree.value.trim());
        const education_years = escapeHTML(form.education_years.value.trim());

        const work_company = escapeHTML(form.work_company.value.trim());
        const work_title = escapeHTML(form.work_title.value.trim());
        const work_years = escapeHTML(form.work_years.value.trim());
        const work_desc = escapeHTML(form.work_desc.value.trim()).replace(/\n/g, '<br>');

        const certifications = form.certifications.value.split(',').map(s => escapeHTML(s.trim())).filter(Boolean);
        const languages = form.languages.value.split(',').map(s => escapeHTML(s.trim())).filter(Boolean);
        const skills = form.skills.value.split(',').map(s => escapeHTML(s.trim())).filter(Boolean);
        const hobbies = form.hobbies.value.split(',').map(s => escapeHTML(s.trim())).filter(Boolean);

        let resumeHTML = `
            <h2>${name}</h2>
            <p>
                ${address ? `<span>${address}</span><br>` : ''}
                <span>${email}</span> | <span>${phone}</span>
                ${linkedin ? `<br><a href="${linkedin}" target="_blank" rel="noopener">${linkedin}</a>` : ''}
            </p>
            ${summary ? `<h3>Professional Summary</h3><p>${summary}</p>` : ''}
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
                ${work_desc ? `<br>${work_desc}` : ''}
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
            const wasDark = document.body.classList.contains('dark-mode');

            // Create a visible, absolutely positioned clone at the top of the page for PDF export
            const clone = element.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.right = '0';
            clone.style.margin = '0 auto';
            clone.style.width = '210mm';
            clone.style.minHeight = '297mm';
            clone.style.zIndex = '9999';
            clone.style.background = '#fff';
            clone.style.color = '#22223b';
            clone.style.boxShadow = 'none';
            clone.style.borderColor = '#4f8cff';
            clone.classList.add('resume-card');
            clone.id = 'pdf-resume-clone';
            document.body.appendChild(clone);

            document.body.classList.remove('dark-mode');
            document.body.classList.add('pdf-export');

            window.scrollTo(0, 0); // Scroll to top

            setTimeout(() => {
                const opt = {
                    margin:       0,
                    filename:     'QuickCV-Resume.pdf',
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale: 2, useCORS: true, backgroundColor: "#fff" },
                    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
                    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
                };
                html2pdf().set(opt).from(clone).save().then(() => {
                    document.body.classList.remove('pdf-export');
                    if (wasDark) document.body.classList.add('dark-mode');
                    document.body.removeChild(clone);
                });
            }, 500); // Increased delay to ensure rendering
        });
    }
});