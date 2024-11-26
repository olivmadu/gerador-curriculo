document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm');
    const resumePreview = document.getElementById('resumePreview');
    const downloadBtn = document.getElementById('downloadBtn');

    // Atualizar pré-visualização ao digitar no formulário
    resumeForm.addEventListener('input', updatePreview);

    // Atualizar pré-visualização ao enviar o formulário
    resumeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updatePreview();
    });

    function updatePreview() {
        const name = document.getElementById('name').value || 'Seu nome';
        const email = document.getElementById('email').value || 'seuemail@exemplo.com';
        const phone = document.getElementById('phone').value || '(00) 00000-0000';
        const city = document.getElementById('city').value || 'Sua cidade, Estado';
        const linkedin = document.getElementById('linkedin').value || 'https://linkedin.com/in/seulinkedin';

        const summary = document.getElementById('summary').value.replace(/\n/g, '<br>') || '';
        const objective = document.getElementById('objective').value.replace(/\n/g, '<br>') || '';
        const experience = document.getElementById('experience').value.split('\n').filter(item => item.trim());
        const education = document.getElementById('education').value.split('\n').filter(item => item.trim());
        const skills = document.getElementById('skills').value.replace(/\n/g, '<br>') || '';
        const relevantCourses = document.getElementById('relevantCourses').value.replace(/\n/g, '<br>') || '';
        const leadership = document.getElementById('leadership').value.replace(/\n/g, '<br>') || '';

        // Cabeçalho do currículo
        const headerHTML = `
            <div class="resume-header">
                <h2>${name}</h2>
                <p><strong>Email:</strong> ${email} | <strong>Telefone:</strong> ${phone}</p>
                <p><strong>Cidade e Estado:</strong> ${city}</p>
                <p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>
            </div>
        `;

        // Monta o corpo do currículo dinamicamente
        let resumeHTML = headerHTML;

        if (objective) {
            resumeHTML += `
                <h3>Objetivo</h3>
                <p>${objective}</p>
            `;
        }

        if (summary) {
            resumeHTML += `
                <h3>Resumo Profissional</h3>
                <p>${summary}</p>
            `;
        }

        if (experience.length > 0) {
            resumeHTML += `
                <h3>Experiência Profissional</h3>
                ${experience.map(item => `<p>${item}</p>`).join('')}
            `;
        }

        if (education.length > 0) {
            resumeHTML += `
                <h3>Formação Acadêmica</h3>
                ${education.map(item => `<p>${item}</p>`).join('')}
            `;
        }

        if (skills) {
            resumeHTML += `
                <h3>Habilidades</h3>
                <p>${skills}</p>
            `;
        }

        if (relevantCourses) {
            resumeHTML += `
                <h3>Cursos Relevantes</h3>
                <p>${relevantCourses}</p>
            `;
        }

        if (leadership) {
            resumeHTML += `
                <h3>Atividades de Liderança e Interesse</h3>
                <p>${leadership}</p>
            `;
        }

        // Atualiza o preview do currículo
        resumePreview.innerHTML = resumeHTML;
    }

    // Baixar o currículo como PDF
    downloadBtn.addEventListener('click', () => {
        const opt = {
            margin: 1,
            filename: 'curriculo.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Seleciona o conteúdo do currículo
        html2pdf().set(opt).from(resumePreview).save();
    });

    // Atualizar a pré-visualização inicial (caso o formulário tenha valores padrão)
    updatePreview();
});

