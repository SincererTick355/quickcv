document.getElementById('resume-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const education = form.education.value.trim();
    const experience = form.experience.value.trim();
    const skills = form.skills.value.split(',').map(s => s.trim()).filter(Boolean);

    // Generate resume HTML
    const resumeHTML = `
        <h2>${name}</h2>
        <p><strong>Email:</strong> ${email}<br>
        <strong>Phone:</strong> ${phone}</p>
        <h3>Education</h3>
        <p>${education.replace(/\n/g, '<br>')}</p>
        <h3>Work Experience</h3>
        <p>${experience.replace(/\n/g, '<br>')}</p>
        <h3>Skills</h3>
        <ul>
            ${skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
    `;

    // Show resume output
    document.getElementById('resume-content').innerHTML = resumeHTML;
    document.getElementById('resume-output').style.display = 'block';
    form.style.display = 'none';
});