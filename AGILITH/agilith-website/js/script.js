document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
    }
    
    if (testimonials.length > 0) {
        showTestimonial(currentTestimonial);
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }
        
        // Auto-rotate testimonials
        setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            item.classList.toggle('active');
        });
    });
    
    // Rating System
    const ratingStars = document.querySelectorAll('.rating-input i');
    const ratingInput = document.getElementById('rating');
    
    if (ratingStars && ratingInput) {
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.getAttribute('data-value'));
                ratingInput.value = value;
                
                ratingStars.forEach((s, index) => {
                    if (index < value) {
                        s.classList.add('active');
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('active');
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
            
            star.addEventListener('mouseover', function() {
                const value = parseInt(this.getAttribute('data-value'));
                
                ratingStars.forEach((s, index) => {
                    if (index < value) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                const currentValue = parseInt(ratingInput.value);
                
                ratingStars.forEach((s, index) => {
                    if (index < currentValue) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Obrigado por sua mensagem! Entraremos em contato em breve.');
            this.reset();
        });
    }
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Obrigado pelo seu feedback! Valorizamos sua opinião.');
            this.reset();
            
            // Reset rating
            if (ratingInput) {
                ratingInput.value = '0';
                ratingStars.forEach(star => {
                    star.classList.remove('active');
                    star.classList.remove('fas');
                    star.classList.add('far');
                });
            }
        });
    }
    
    // Animate Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // Animation duration in ms
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const increment = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(increment);
                } else {
                    stat.textContent = target;
                }
            };
            
            increment();
        });
    }
    
    // Intersection Observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statNumbers.length > 0) {
        const statsSection = document.querySelector('.feedback-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    
    // Smooth scrolling for anchor links
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
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
                    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
                }
            }
        });
    });
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert('Obrigado por assinar nossa newsletter!');
                emailInput.value = '';
            }
        });
    }
});