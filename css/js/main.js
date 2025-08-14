// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Efeito de scroll no header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('header-scrolled', window.scrollY > 50);
    });
    
    // Carrossel de depoimentos
    const carrosselItems = document.querySelectorAll('.carrossel-item');
    const prevBtn = document.querySelector('.carrossel-prev');
    const nextBtn = document.querySelector('.carrossel-next');
    let currentIndex = 0;
    
    function showSlide(index) {
        carrosselItems.forEach(item => item.classList.remove('active'));
        carrosselItems[index].classList.add('active');
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carrosselItems.length;
        showSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + carrosselItems.length) % carrosselItems.length;
        showSlide(currentIndex);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-avanço do carrossel
    let carrosselInterval = setInterval(nextSlide, 5000);
    
    // Pausar carrossel quando o mouse estiver sobre ele
    const carrossel = document.querySelector('.carrossel');
    carrossel.addEventListener('mouseenter', () => {
        clearInterval(carrosselInterval);
    });
    
    carrossel.addEventListener('mouseleave', () => {
        carrosselInterval = setInterval(nextSlide, 5000);
    });
    
    // Animação de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lazy loading para imagens
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Ativar menu ativo conforme a página
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-menu a');
    
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (currentPage === itemHref) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});
