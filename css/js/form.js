document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formContato');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const assunto = document.getElementById('assunto');
            const mensagem = document.getElementById('mensagem');
            
            let isValid = true;
            
            if (nome.value.trim() === '') {
                alert('Por favor, preencha seu nome.');
                isValid = false;
                nome.focus();
                return;
            }
            
            if (email.value.trim() === '' || !email.value.includes('@')) {
                alert('Por favor, insira um e-mail válido.');
                isValid = false;
                email.focus();
                return;
            }
            
            if (assunto.value === '') {
                alert('Por favor, selecione um assunto.');
                isValid = false;
                assunto.focus();
                return;
            }
            
            if (mensagem.value.trim() === '') {
                alert('Por favor, escreva sua mensagem.');
                isValid = false;
                mensagem.focus();
                return;
            }
            
            if (isValid) {
                // Enviar formulário via FormSubmit
                const formData = new FormData(form);
                
                fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                        form.reset();
                    } else {
                        throw new Error('Erro ao enviar mensagem');
                    }
                })
                .catch(error => {
                    alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
                    console.error('Error:', error);
                });
            }
        });
    }
    
    // Máscara para telefone
    const telefone = document.getElementById('telefone');
    if (telefone) {
        telefone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '(' + value;
            }
            
            if (value.length > 3) {
                value = value.substring(0, 3) + ') ' + value.substring(3);
            }
            
            if (value.length > 10) {
                value = value.substring(0, 10) + '-' + value.substring(10);
            }
            
            if (value.length > 15) {
                value = value.substring(0, 15);
            }
            
            e.target.value = value;
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]');
            
            if (email.value.trim() === '' || !email.value.includes('@')) {
                alert('Por favor, insira um e-mail válido.');
                email.focus();
                return;
            }
            
            // Simular envio (em um projeto real, seria uma requisição AJAX)
            alert('Obrigado por assinar nossa newsletter!');
            newsletterForm.reset();
        });
    }
});
