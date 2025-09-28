// Dynamic Content Loader for Growthally Advisors Website

class DynamicLoader {
    constructor() {
        this.data = null;
        this.init();
    }

    async init() {
        try {
            console.log('Initializing DynamicLoader...');
            await this.loadData();
            console.log('Data loaded successfully:', this.data);
            this.hideLoader();
            this.renderContent();
            this.initializeEvents();
            this.initializeAnimations();
            console.log('DynamicLoader initialized successfully');
        } catch (error) {
            console.error('Failed to initialize:', error);
            this.hideLoader();
            this.showBasicContent();
        }
    }

    async loadData() {
        try {
            // Try different paths for GitHub Pages compatibility
            let response;
            try {
                response = await fetch('./assets.json');
            } catch (e) {
                response = await fetch('assets.json');
            }
            
            if (!response.ok) {
                throw new Error('Failed to load data');
            }
            this.data = await response.json();
        } catch (error) {
            console.error('Error loading data:', error);
            // Fallback: create basic data structure
            this.data = {
                services: [],
                team: [],
                testimonials: [],
                blogs: [],
                counters: [],
                team_events: []
            };
        }
    }

    hideLoader() {
        const loader = document.getElementById('loading-spinner');
        if (loader) {
            loader.classList.add('hide');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    }

    renderContent() {
        try {
            this.renderServicesEnhanced();
            this.renderTeam();
            this.renderTestimonials();
            this.renderBlogPosts();
            this.renderFooterServices();
            this.renderServicesDropdown();
            this.renderCounters();
            this.renderLeadership();
            this.renderTeamEvents();
        } catch (error) {
            console.error('Error rendering content:', error);
            // Ensure basic content is visible even if dynamic content fails
            this.showBasicContent();
        }
    }

    showBasicContent() {
        // Show basic content if dynamic loading fails
        const sections = document.querySelectorAll('.we-are-pinc, .services-section, .testimonials-section, .teams-section');
        sections.forEach(section => {
            if (section) {
                section.style.display = 'block';
            }
        });
    }

    renderServicesEnhanced() {
        const servicesGrid = document.getElementById('services-enhanced-grid');
        if (!servicesGrid || !this.data.services) return;

        const servicesHTML = this.data.services.map((service, index) => `
            <div class="service-row ${index % 2 === 1 ? 'reverse' : ''} fade-in">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6 ${index % 2 === 1 ? 'order-lg-2' : ''}">
                            <div class="service-image-container">
                                <img src="${service.image}" alt="${service.title}" class="service-image">
                            </div>
                        </div>
                        <div class="col-lg-6 ${index % 2 === 1 ? 'order-lg-1' : ''}">
                            <div class="service-content-enhanced">
                                <div class="service-number">${String(index + 1).padStart(2, '0')}</div>
                                <span class="service-category">Financial Advisory</span>
                                <h3 class="service-title-enhanced">${service.title}</h3>
                                <p class="service-description-enhanced">${service.detailed_description}</p>
                                <ul class="service-highlights">
                                    ${service.key_features.map(feature => `
                                        <li>${feature}</li>
                                    `).join('')}
                                </ul>
                                <a href="/services/${service.id}.html" class="service-cta">
                                    Explore Service <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        servicesGrid.innerHTML = servicesHTML;
    }

    renderTeam() {
        const teamGrid = document.getElementById('team-grid');
        if (!teamGrid || !this.data.team) return;

        const teamHTML = this.data.team.map(member => `
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="team-card fade-in">
                    <div class="team-image">
                        <img src="${member.image}" alt="${member.name}" class="img-fluid">
                    </div>
                    <h5 class="team-name">${member.name}</h5>
                    <p class="team-position">${member.position}</p>
                    <p class="team-bio">${member.bio}</p>
                    <div class="team-specialties">
                        ${member.specialties.map(specialty => `
                            <span class="specialty-tag">${specialty}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        teamGrid.innerHTML = teamHTML;
    }

    renderTestimonials() {
        const testimonialsContent = document.getElementById('testimonials-content');
        if (!testimonialsContent || !this.data.testimonials) return;

        const testimonialsHTML = this.data.testimonials.map((testimonial, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <div class="testimonial-card">
                    <div class="stars mb-3">
                        ${Array(testimonial.rating).fill('<i class="fas fa-star"></i>').join('')}
                    </div>
                    <p class="testimonial-text">"${testimonial.testimonial}"</p>
                    <h6 class="testimonial-author">${testimonial.client}</h6>
                    <p class="testimonial-company">${testimonial.position}, ${testimonial.company}</p>
                </div>
            </div>
        `).join('');

        testimonialsContent.innerHTML = testimonialsHTML;
    }

    renderBlogPosts() {
        const insightsCarousel = document.getElementById('insights-carousel-inner');
        const indicatorsContainer = document.querySelector('#insightsCarousel .carousel-indicators');
        if (!insightsCarousel || !this.data.blogs) return;

        const blogPosts = this.data.blogs;
        const slides = [];
        const indicators = [];
        
        // Create slides with 2 posts each
        for (let i = 0; i < blogPosts.length; i += 2) {
            const slidePosts = blogPosts.slice(i, i + 2);
            const slideIndex = Math.floor(i / 2);
            const isActive = slideIndex === 0 ? 'active' : '';
            
            const slideHTML = `
                <div class="carousel-item ${isActive}">
                    ${slidePosts.map((post, postIndex) => {
                        const isEven = postIndex % 2 === 0;
                        const imageOrder = isEven ? 'order-lg-1' : 'order-lg-2';
                        const textOrder = isEven ? 'order-lg-2' : 'order-lg-1';
                        const marginClass = isEven ? 'mb-4 mb-lg-0' : '';
                        
                        return `
                            <div class="row align-items-center ${slideIndex > 0 ? 'mb-5' : ''}">
                                <div class="col-12 col-lg-4 ${imageOrder} ${marginClass}">
                                    <div class="blog-image-container">
                                        <img src="${post.featured_image}" 
                                             alt="${post.title}" 
                                             class="img-fluid blog-image" 
                                             style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
                                    </div>
                                </div>
                                <div class="col-12 col-lg-8 ${textOrder}">
                                    <div class="blog-content" style="padding: 20px;">
                                        <h3 class="blog-title" style="color: #333333; font-family: Arial, Helvetica, sans-serif; font-weight: bold; text-transform: uppercase; font-size: 1.5rem; margin-bottom: 15px; letter-spacing: 1px;">${post.title}</h3>
                                        <p class="blog-excerpt" style="color: #333333; font-family: Arial, Helvetica, sans-serif; font-size: 1rem; line-height: 1.6; margin-bottom: 20px;">${post.excerpt}</p>
                                        <a href="blog/${post.slug}.html" class="blog-link" style="color: #333333; font-family: Arial, Helvetica, sans-serif; font-size: 0.875rem; font-weight: 500; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px;">Know More</a>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
            
            slides.push(slideHTML);
            indicators.push(`<li data-target="#insightsCarousel" data-slide-to="${slideIndex}" class="${isActive}" style="background-color: #333333; border-radius: 50%; width: 12px; height: 12px;"></li>`);
        }
        
        insightsCarousel.innerHTML = slides.join('');
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = indicators.join('');
        }
        
        // Initialize carousel with auto-scroll
        this.initializeInsightsCarousel();
    }

    initializeInsightsCarousel() {
        const carousel = document.getElementById('insightsCarousel');
        if (!carousel) return;

        // Initialize Bootstrap carousel
        $(carousel).carousel({
            interval: 4000,
            pause: false,
            wrap: true
        });

        // Ensure auto-scroll continues
        $(carousel).on('slide.bs.carousel', function () {
            // Auto-scroll continues after each slide
        });

        // Start auto-scroll if not already started
        if (!$(carousel).data('bs.carousel')) {
            $(carousel).carousel('cycle');
        }
    }

    renderFooterServices() {
        const footerServices = document.getElementById('footer-services');
        if (!footerServices || !this.data.services) return;

        const servicesHTML = this.data.services.map(service => `
            <li><a href="services/${service.id}.html">${service.title}</a></li>
        `).join('');

        footerServices.innerHTML = servicesHTML;
    }

    renderServicesDropdown() {
        const servicesDropdown = document.getElementById('services-dropdown');
        if (!servicesDropdown || !this.data.services) return;

        const dropdownHTML = this.data.services.map(service => `
            <a class="dropdown-item" href="/services/${service.id}.html">
                <i class="${service.icon} mr-2"></i>${service.title}
            </a>
        `).join('');

        servicesDropdown.innerHTML = dropdownHTML;
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    initializeEvents() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('.smooth-scroll').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                } else {
                    window.location.href = targetId;
                }
            });
        });

        // Standard navigation functionality

        // Navbar scroll effect with hide/show functionality
        let lastScrollTop = 0;
        let isScrolling = false;
        
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class for styling
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide navbar when scrolling down, show when scrolling up
            if (currentScroll > lastScrollTop && currentScroll > 100) {
                // Scrolling down
                if (!isScrolling) {
                    navbar.classList.add('hidden');
                    isScrolling = true;
                }
            } else {
                // Scrolling up
                navbar.classList.remove('hidden');
                isScrolling = false;
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });

        // Card hover effects
        document.querySelectorAll('.service-card, .team-card, .blog-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    initializeAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease';
            observer.observe(el);
        });

        // Counter animations
        this.animateCounters();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // Lower is faster

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || counter.innerText.replace(/[^\d]/g, ''));
            const increment = target / speed;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format the number based on original text
                const originalText = counter.innerText;
                if (originalText.includes('₹') && originalText.includes('Cr')) {
                    counter.innerText = `₹${Math.ceil(current)}Cr+`;
                } else if (originalText.includes('+')) {
                    counter.innerText = `${Math.ceil(current)}+`;
                } else {
                    counter.innerText = Math.ceil(current);
                }
            }, 10);
        });
    }

    // Utility method for creating service detail pages
    static createServicePage(serviceId) {
        // This would be used to generate individual service pages
        // Implementation would depend on the specific service details
        return {
            generateHTML: function(service) {
                return `
                    <!-- Service detail page HTML structure -->
                    <!-- This would be implemented for each service -->
                `;
            }
        };
    }

    // Render counters for We Are Growthally section
    renderCounters() {
        const counterContainer = document.getElementById('counter');
        if (!counterContainer || !this.data.counters) return;

        const countersHTML = this.data.counters.map(counter => `
            <div class="counter-item">
                <span class="counter-number">${counter.value}${counter.suffix}</span>
                <span class="counter-label">${counter.label}</span>
            </div>
        `).join('');

        counterContainer.innerHTML = countersHTML;
    }

    // Render leadership team for We Are Growthally section
    renderLeadership() {
        const leadershipGrid = document.getElementById('leadership-grid');
        if (!leadershipGrid || !this.data.team) return;

        const leadershipHTML = this.data.team.map(member => `
            <div class="leader-card" data-member='${JSON.stringify(member)}'>
                <img src="${member.image}" alt="${member.name}" class="leader-image">
                <div class="leader-name">${member.name}</div>
                <div class="leader-position">${member.position}</div>
            </div>
        `).join('');

        leadershipGrid.innerHTML = leadershipHTML;
        
        // Add hover event listeners
        this.initializeLeadershipHover();
        
        // Show first team member's details by default
        this.showDefaultLeadershipDetails();
    }

    // Initialize leadership hover functionality
    initializeLeadershipHover() {
        const leaderCards = document.querySelectorAll('.leader-card');
        const detailsPanel = document.getElementById('leadership-details');
        const detailsImg = document.getElementById('details-img');
        const detailsName = document.getElementById('details-name');
        const detailsPosition = document.getElementById('details-position');
        const detailsBio = document.getElementById('details-bio');
        const detailsSpecialties = document.getElementById('details-specialties');
        const leadershipTitle = document.querySelector('.leadership-title .section-title');

        const updateDetails = (memberData) => {
            // Show and update details panel
            detailsPanel.style.display = 'block';
            detailsPanel.classList.add('show');
            
            // Update details panel content
            detailsImg.src = memberData.image;
            detailsImg.alt = memberData.name;
            detailsName.textContent = memberData.name;
            detailsPosition.textContent = memberData.position;
            detailsBio.textContent = memberData.bio;
            
            // Update specialties
            detailsSpecialties.innerHTML = memberData.specialties.map(specialty => 
                `<span class="specialty-tag">${specialty}</span>`
            ).join('');
        };

        const hideDetails = () => {
            detailsPanel.classList.remove('show');
            setTimeout(() => {
                if (!detailsPanel.classList.contains('show')) {
                    detailsPanel.style.display = 'none';
                }
            }, 300);
        };

        leaderCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const memberData = JSON.parse(e.currentTarget.dataset.member);
                updateDetails(memberData);
            });
            
            card.addEventListener('mouseleave', () => {
                hideDetails();
            });
        });

        // Add scroll spy for title highlighting
        this.initializeLeadershipScrollSpy();
    }

    // Initialize leadership scroll spy for title highlighting
    initializeLeadershipScrollSpy() {
        const leadershipSection = document.getElementById('leadership-content');
        const leadershipTitle = document.querySelector('.leadership-title .section-title');
        
        if (!leadershipSection || !leadershipTitle) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    leadershipTitle.classList.add('highlighted');
                } else {
                    leadershipTitle.classList.remove('highlighted');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-50px 0px -50px 0px'
        });

        observer.observe(leadershipSection);
    }

    // Show first team member's details by default
    showDefaultLeadershipDetails() {
        if (!this.data.team || this.data.team.length === 0) return;
        
        const firstMember = this.data.team[0];
        const detailsPanel = document.getElementById('leadership-details');
        const detailsImg = document.getElementById('details-img');
        const detailsName = document.getElementById('details-name');
        const detailsPosition = document.getElementById('details-position');
        const detailsBio = document.getElementById('details-bio');
        const detailsSpecialties = document.getElementById('details-specialties');

        if (detailsPanel && detailsImg && detailsName && detailsPosition && detailsBio && detailsSpecialties) {
            // Show the details panel
            detailsPanel.style.display = 'block';
            detailsPanel.classList.add('show');
            
            // Update with first member's details
            detailsImg.src = firstMember.image;
            detailsImg.alt = firstMember.name;
            detailsName.textContent = firstMember.name;
            detailsPosition.textContent = firstMember.position;
            detailsBio.textContent = firstMember.bio;
            
            // Update specialties
            detailsSpecialties.innerHTML = firstMember.specialties.map(specialty => 
                `<span class="specialty-tag">${specialty}</span>`
            ).join('');
        }
    }


    // Render team events
    renderTeamEvents() {
        const teamsScroller = document.getElementById('teams-scroller');
        if (!teamsScroller || !this.data.team_events) return;

        const teamEventsHTML = this.data.team_events.map(event => {
            if (event.Type === 'video') {
                // Extract YouTube video ID from URL
                const youtubeId = this.extractYouTubeId(event.URL);
                return `
                    <div class="team-event-card">
                        <div class="team-event-video-container">
                            <iframe 
                                src="https://www.youtube.com/embed/${youtubeId}" 
                                title="${event.Title}"
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                                class="team-event-video">
                            </iframe>
                        </div>
                        <div class="team-event-content">
                            <h3 class="team-event-title">${event.Title}</h3>
                            <span class="team-event-type ${event.Type}">${event.Type}</span>
                        </div>
                    </div>
                `;
            } else {
                // For images, keep the original structure
                return `
                    <div class="team-event-card" onclick="window.open('${event.URL}', '_blank')">
                        <div class="team-event-image-container">
                            <img src="${event.URL}" alt="${event.Title}" class="team-event-image">
                        </div>
                        <div class="team-event-content">
                            <h3 class="team-event-title">${event.Title}</h3>
                            <span class="team-event-type ${event.Type}">${event.Type}</span>
                        </div>
                    </div>
                `;
            }
        }).join('');

        // Duplicate the content for seamless scrolling
        teamsScroller.innerHTML = teamEventsHTML + teamEventsHTML;
    }

    // Extract YouTube video ID from URL
    extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DynamicLoader();
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/smoothscroll.min.js';
    document.head.appendChild(script);
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance optimization: Debounced scroll handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };

}

// Add error handling for failed image loads
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://www.growthally.org/wp-content/uploads/2022/01/Growthally.png';
    }
}, true);