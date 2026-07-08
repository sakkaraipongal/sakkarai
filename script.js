/* ==========================================================================
   PORTFOLIO INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // --------------------------------------------------------------------------
    // 1. PRELOADER
    // --------------------------------------------------------------------------
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.classList.add("fade-out");
        });
        // Safety timeout
        setTimeout(() => {
            preloader.classList.add("fade-out");
        }, 1500);
    }

    // --------------------------------------------------------------------------
    // 2. THEME SWITCHER (LIGHT / DARK MODE)
    // --------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById("themeToggle");
    const darkIcon = themeToggleBtn.querySelector(".dark-icon");
    const lightIcon = themeToggleBtn.querySelector(".light-icon");
    const body = document.body;

    // Load theme preference from localStorage or default to dark
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    body.setAttribute("data-theme", savedTheme);
    updateThemeIcons(savedTheme);

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("portfolio-theme", newTheme);
        updateThemeIcons(newTheme);
    });

    function updateThemeIcons(theme) {
        if (theme === "dark") {
            darkIcon.classList.add("d-none");
            lightIcon.classList.remove("d-none");
        } else {
            lightIcon.classList.add("d-none");
            darkIcon.classList.remove("d-none");
        }
    }

    // --------------------------------------------------------------------------
    // 3. STICKY NAVBAR & BACK-TO-TOP BUTTON
    // --------------------------------------------------------------------------
    const mainNavbar = document.getElementById("mainNavbar");
    const backToTopBtn = document.getElementById("backToTop");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;

        // Navbar Styling
        if (scrollPos > 50) {
            mainNavbar.classList.add("navbar-scrolled");
        } else {
            mainNavbar.classList.remove("navbar-scrolled");
        }

        // Back-to-Top Visibility
        if (scrollPos > 500) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }

        // Active Nav Link highlighting on scroll
        let currentSectionId = "";
        const sections = document.querySelectorAll("section");
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Auto-collapse mobile navbar when clicking links
    const navbarCollapse = document.querySelector(".navbar-collapse");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navbarCollapse.classList.contains("show")) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    // --------------------------------------------------------------------------
    // 4. TYPING ANIMATION (HERO)
    // --------------------------------------------------------------------------
    const typedTextSpan = document.getElementById("typed-text");
    const textArray = ["Student.", "Web Developer.", "Data Analyst."];
    const typingDelay = 100;
    const erasingDelay = 60;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 300);
        }
    }

    if (typedTextSpan) {
        setTimeout(type, newTextDelay - 1000);
    }

    // --------------------------------------------------------------------------
    // 5. VIEWPORT INTERSECTION OBSERVER FOR ANIMATIONS
    // --------------------------------------------------------------------------
    
    // A. Scroll Reveal Effect
    const revealItems = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    // B. Skills Progress Bar Animation
    const progressBars = document.querySelectorAll(".progress-bar-fill");
    const skillsSection = document.getElementById("skills");

    if (skillsSection && progressBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute("data-width");
                        bar.style.width = targetWidth;
                    });
                    observer.unobserve(skillsSection);
                }
            });
        }, { threshold: 0.2 });

        skillsObserver.observe(skillsSection);
    }

    // C. Statistics Counters Animation
    const counterNumbers = document.querySelectorAll(".stat-num");
    const aboutSection = document.getElementById("about");

    if (aboutSection && counterNumbers.length > 0) {
        let countersStarted = false;

        const startCounters = () => {
            counterNumbers.forEach(counter => {
                const target = +counter.getAttribute("data-target");
                const duration = 2000; // Animation duration in ms
                const increment = target / (duration / 16); // ~60fps frame duration

                let currentCount = 0;
                const updateCount = () => {
                    currentCount += increment;
                    if (currentCount < target) {
                        counter.textContent = Math.ceil(currentCount);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target + (target === 15 || target === 10 || target === 4 ? "+" : "");
                    }
                };
                updateCount();
            });
        };

        const aboutObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    startCounters();
                    observer.unobserve(aboutSection);
                }
            });
        }, { threshold: 0.2 });

        aboutObserver.observe(aboutSection);
    }

    // --------------------------------------------------------------------------
    // 6. PROJECTS CATEGORY FILTER
    // --------------------------------------------------------------------------
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from other buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            projectItems.forEach(item => {
                const category = item.getAttribute("data-category");
                
                if (filterValue === "all" || category === filterValue) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 7. CONTACT FORM VALIDATION & INTERACTIVE FEEDBACK
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");
    const feedbackClose = document.getElementById("feedbackClose");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            let isValid = true;
            const inputs = contactForm.querySelectorAll("input, textarea");

            inputs.forEach(input => {
                const parent = input.parentElement;
                
                // Reset styling
                parent.classList.remove("is-invalid");

                // Validation rules
                if (input.required && !input.value.trim()) {
                    isValid = false;
                    parent.classList.add("is-invalid");
                } else if (input.type === "email" && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        parent.classList.add("is-invalid");
                    }
                }
            });

            if (isValid) {
                // Mock form submission response
                const submitButton = contactForm.querySelector("button[type='submit']");
                const originalText = submitButton.innerHTML;
                
                submitButton.disabled = true;
                submitButton.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...`;

                setTimeout(() => {
                    // Reset form and UI
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                    
                    formFeedback.classList.remove("d-none");
                    formFeedback.scrollIntoView({ behavior: "smooth", block: "center" });

                    // Auto hide feedback after 6 seconds
                    setTimeout(() => {
                        formFeedback.classList.add("d-none");
                    }, 6000);
                }, 1500);
            }
        });
    }

    if (feedbackClose) {
        feedbackClose.addEventListener("click", () => {
            formFeedback.classList.add("d-none");
        });
    }
});
