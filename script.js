document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroNavBtns = document.querySelectorAll('.hero-nav-btn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        heroNavBtns.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Initialize hero slider
    if (heroSlides.length > 0) {
        showSlide(0);
        startSlideShow();

        // Hero navigation event listeners
        heroNavBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                stopSlideShow();
                currentSlide = index;
                showSlide(currentSlide);
                setTimeout(startSlideShow, 3000);
            });
        });

        // Pause on hover
        document.querySelector('.hero').addEventListener('mouseenter', stopSlideShow);
        document.querySelector('.hero').addEventListener('mouseleave', startSlideShow);
    }

    // Enhanced Navigation
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Enhanced scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate section titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title, 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
        
        // Animate feature cards
        gsap.utils.toArray('.feature-card').forEach((card, index) => {
            gsap.fromTo(card,
                { y: 100, opacity: 0, scale: 0.8 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
        
        // Floating animation for buttons
        gsap.utils.toArray('.btn-animated').forEach(btn => {
            gsap.to(btn, {
                y: -5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut'
            });
        });
    }

    // Enhanced Form Interactions
    const generatePlanBtn = document.getElementById('generate-plan');
    const aiResult = document.getElementById('ai-result');
    
    if (generatePlanBtn) {
        generatePlanBtn.addEventListener('click', function() {
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            
            // Simulate AI processing
            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = '<i class="fas fa-magic"></i> Generate Itinerary';
                
                if (aiResult) {
                    aiResult.classList.remove('hidden');
                    aiResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 3000);
        });
    }

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Enhanced checkbox interactions
    const checkboxItems = document.querySelectorAll('.checkbox-item');
    checkboxItems.forEach(item => {
        item.addEventListener('click', function() {
            const checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            
            if (checkbox.checked) {
                this.style.background = 'linear-gradient(135deg, rgba(46, 139, 87, 0.1), rgba(70, 130, 180, 0.1))';
                this.style.borderColor = 'var(--primary-color)';
            } else {
                this.style.background = 'white';
                this.style.borderColor = '#e9ecef';
            }
        });
    });

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn, .btn-small');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Initialize Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .section-header, .ai-form').forEach(el => {
        observer.observe(el);
    });

    // Location and weather data
    let userLocation = null;
    let weatherData = null;
    let nearbyAttractions = {
        'Gangtok': ['Nathula Pass', 'Tsomgo Lake', 'Rumtek Monastery', 'MG Marg', 'Ganesh Tok'],
        'Pelling': ['Kanchenjunga Falls', 'Pemayangtse Monastery', 'Rabdentse Ruins', 'Khecheopalri Lake'],
        'Lachung': ['Yumthang Valley', 'Zero Point', 'Lachung Monastery', 'Shingba Rhododendron Sanctuary'],
        'Ravangla': ['Buddha Park', 'Temi Tea Garden', 'Ralang Monastery', 'Maenam Wildlife Sanctuary'],
        'Namchi': ['Char Dham', 'Samdruptse', 'Tendong Hill', 'Ngadak Monastery']
    };
    
    // Local specialties by region
    let localSpecialties = {
        'Gangtok': {
            'drinks': ['Chang (millet beer)', 'Tongba (fermented millet)', 'Butter Tea', 'Rhododendron Tea'],
            'food': ['Momos', 'Thukpa', 'Gundruk', 'Phagshapa', 'Sel Roti']
        },
        'Pelling': {
            'drinks': ['Chaang', 'Raksi (rice wine)', 'Butter Tea'],
            'food': ['Sha Phaley', 'Sael Roti', 'Ningro with Churpi']
        },
        'Lachung': {
            'drinks': ['Butter Tea', 'Hot Rhododendron Tea'],
            'food': ['Thukpa', 'Momos', 'Kinema', 'Gundruk Soup']
        },
        'Ravangla': {
            'drinks': ['Chaang', 'Butter Tea', 'Temi Tea'],
            'food': ['Momos', 'Thukpa', 'Chhurpi', 'Sinki']
        },
        'Namchi': {
            'drinks': ['Chaang', 'Temi Tea', 'Butter Tea'],
            'food': ['Momos', 'Thukpa', 'Kinema Curry', 'Gundruk']
        }
    };
    
    // Safety alerts by region
    let safetyAlerts = {
        'Gangtok': ['Slippery roads during monsoon', 'High altitude sickness at Nathula Pass', 'Wildlife encounters in forest areas'],
        'Pelling': ['Landslide prone areas during rainy season', 'Fog reducing visibility on mountain roads', 'Steep hiking trails requiring proper gear'],
        'Lachung': ['Extreme cold temperatures', 'Snow blockades in winter', 'High altitude sickness', 'Limited medical facilities'],
        'Ravangla': ['Isolated hiking trails', 'Wildlife encounters', 'Weather changes rapidly'],
        'Namchi': ['Steep driving roads', 'Limited transportation after sunset', 'Monsoon related hazards']
    };
    
    // Emergency services data
    const emergencyServices = {
        'Gangtok': [
            { name: 'STNM Hospital', type: 'hospital', distance: '2.3 km', contact: '03592-201152' },
            { name: 'Gangtok Police Station', type: 'police', distance: '1.5 km', contact: '03592-202033' },
            { name: 'Fire & Emergency Services', type: 'fire', distance: '3.1 km', contact: '03592-202222' }
        ],
        'Pelling': [
            { name: 'Pelling Primary Health Center', type: 'hospital', distance: '1.2 km', contact: '03595-258206' },
            { name: 'Pelling Police Outpost', type: 'police', distance: '0.8 km', contact: '03595-258222' },
            { name: 'West District Fire Station', type: 'fire', distance: '12.5 km', contact: '03595-250222' }
        ],
        'Lachung': [
            { name: 'Lachung Primary Health Center', type: 'hospital', distance: '0.9 km', contact: '03592-670221' },
            { name: 'Lachung Police Outpost', type: 'police', distance: '1.1 km', contact: '03592-670222' },
            { name: 'North District Fire Services', type: 'fire', distance: '23.7 km', contact: '03592-234101' }
        ],
        'Ravangla': [
            { name: 'Ravangla Community Health Center', type: 'hospital', distance: '1.5 km', contact: '03595-263256' },
            { name: 'Ravangla Police Station', type: 'police', distance: '0.7 km', contact: '03595-263222' },
            { name: 'South District Fire Station', type: 'fire', distance: '18.3 km', contact: '03592-226461' }
        ],
        'Namchi': [
            { name: 'Namchi District Hospital', type: 'hospital', distance: '1.8 km', contact: '03592-264111' },
            { name: 'Namchi Police Station', type: 'police', distance: '0.5 km', contact: '03592-264222' },
            { name: 'South District Fire Station', type: 'fire', distance: '2.1 km', contact: '03592-226461' }
        ]
    };
    
    // Local food and drinks data
    const localCuisine = {
        'Gangtok': [
            { name: 'Momos', description: 'Steamed dumplings filled with vegetables or meat', where: 'MG Marg food stalls' },
            { name: 'Thukpa', description: 'Noodle soup with vegetables and meat', where: 'Roll House, MG Marg' },
            { name: 'Sha Phaley', description: 'Bread stuffed with seasoned beef and cabbage', where: 'Taste of Tibet, Tibet Road' }
        ],
        'Pelling': [
            { name: 'Gundruk', description: 'Fermented leafy green vegetable soup', where: 'Hotel Horizon, Pelling' },
            { name: 'Sel Roti', description: 'Ring-shaped rice bread/doughnut', where: 'Local bakeries' },
            { name: 'Phagshapa', description: 'Pork fat stew with radishes and dried chilies', where: 'Mountain View Restaurant' }
        ],
        'Lachung': [
            { name: 'Sishnu', description: 'Nettle soup', where: 'Yarlam Resort' },
            { name: 'Chhurpi', description: 'Traditional cheese preparation', where: 'Local homestays' },
            { name: 'Kinema', description: 'Fermented soybean dish', where: 'Apple Orchard Resort' }
        ],
        'Ravangla': [
            { name: 'Ningro', description: 'Fiddlehead fern curry', where: 'Ravangla Residency' },
            { name: 'Sinki', description: 'Fermented radish tapas', where: 'Buddha Park Restaurant' },
            { name: 'Tama', description: 'Bamboo shoot curry', where: 'Local homestays' }
        ],
        'Namchi': [
            { name: 'Shaphaley', description: 'Tibetan bread stuffed with meat', where: 'Char Dham Restaurant' },
            { name: 'Wachipa', description: 'Buckwheat pancakes', where: 'Namchi Bazaar' },
            { name: 'Saelroti', description: 'Sweet rice bread rings', where: 'Local bakeries' }
        ]
    };
    
    const localDrinks = {
        'Gangtok': [
            { name: 'Chaang', description: 'Millet-based alcoholic beverage', where: 'Taste of Sikkim, MG Marg' },
            { name: 'Tongba', description: 'Hot millet beer served in bamboo container', where: 'Mayfair Resort' },
            { name: 'Butter Tea', description: 'Tea churned with yak butter and salt', where: 'Café Tibet' }
        ],
        'Pelling': [
            { name: 'Raksi', description: 'Traditional distilled alcoholic beverage', where: 'Local homestays' },
            { name: 'Chee', description: 'Local beer made from millet', where: 'Newa Chen Restaurant' },
            { name: 'Sikkimese Tea', description: 'Local tea with cardamom and spices', where: 'Pelling Café' }
        ],
        'Lachung': [
            { name: 'Thomba', description: 'Fermented millet drink served hot', where: 'Yarlam Resort' },
            { name: 'Chaang', description: 'Local beer served in bamboo mugs', where: 'Apple Orchard Resort' },
            { name: 'Rhododendron Wine', description: 'Sweet wine made from rhododendron flowers', where: 'Local shops' }
        ],
        'Ravangla': [
            { name: 'Chhang', description: 'Fermented millet beer', where: 'Buddha Park Restaurant' },
            { name: 'Rhododendron Juice', description: 'Fresh juice from rhododendron flowers', where: 'Ravangla Bazaar' },
            { name: 'Sikkimese Coffee', description: 'Locally grown coffee with cardamom', where: 'Ravangla Residency' }
        ],
        'Namchi': [
            { name: 'Marcha', description: 'Fermented rice beer starter', where: 'Local homestays' },
            { name: 'Herbal Tea', description: 'Tea made from local Himalayan herbs', where: 'Namchi Bazaar' },
            { name: 'Temi Tea', description: 'Premium tea from Sikkim's only tea garden', where: 'Char Dham Complex' }
        ]
    };
    
    // Eco-friendly transportation options
    const ecoTransport = {
        'Gangtok': [
            { type: 'Walking Tour', impact: 'Zero carbon footprint', route: 'MG Marg - Ridge Park - Flower Exhibition' },
            { type: 'Shared Taxi', impact: 'Low carbon footprint', route: 'Gangtok - Rumtek - Ranka' },
            { type: 'Electric Vehicle', impact: 'Zero emissions', route: 'City sightseeing circuit' }
        ],
        'Pelling': [
            { type: 'Bicycle Rental', impact: 'Zero carbon footprint', route: 'Pelling - Rimbi Waterfall - Khecheopalri Lake' },
            { type: 'Shared Jeep', impact: 'Reduced emissions per person', route: 'Pelling - Yuksom - Tashiding' },
            { type: 'Trekking', impact: 'Zero carbon footprint', route: 'Pelling - Sangachoeling Monastery' }
        ],
        'Lachung': [
            { type: 'Group Tour', impact: 'Reduced emissions per person', route: 'Lachung - Yumthang Valley - Zero Point' },
            { type: 'Local Bus', impact: 'Low carbon footprint', route: 'Lachung - Lachen' },
            { type: 'Carpool', impact: 'Reduced emissions', route: 'Lachung village tour' }
        ],
        'Ravangla': [
            { type: 'Electric Scooter', impact: 'Zero emissions', route: 'Ravangla - Buddha Park - Ralong Monastery' },
            { type: 'Hiking', impact: 'Zero carbon footprint', route: 'Ravangla - Maenam Hill' },
            { type: 'Shared Taxi', impact: 'Reduced emissions per person', route: 'Ravangla - Temi Tea Garden' }
        ],
        'Namchi': [
            { type: 'Trekking', impact: 'Zero carbon footprint', route: 'Namchi - Tendong Hill' },
            { type: 'Local Guide Walk', impact: 'Zero carbon footprint', route: 'Namchi historical sites' },
            { type: 'Shared Jeep', impact: 'Reduced emissions per person', route: 'Namchi - Char Dham - Ravangla' }
        ]
    };
    
    // Accessibility information for differently-abled tourists
    const accessibilityInfo = {
        'Gangtok': {
            wheelchairFriendly: [
                { place: 'MG Marg', features: 'Flat pedestrian zone, ramps available' },
                { place: 'Gangtok Ropeway', features: 'Accessible cabins, staff assistance' },
                { place: 'Flower Exhibition Center', features: 'Wheelchair ramps, accessible toilets' }
            ],
            visuallyImpaired: [
                { place: 'Ridge Park', features: 'Audio guides available' },
                { place: 'Namgyal Institute', features: 'Tactile exhibits, braille information' }
            ],
            hearingImpaired: [
                { place: 'Enchey Monastery', features: 'Visual information panels' },
                { place: 'Sikkim Science Center', features: 'Text displays for all audio content' }
            ]
        },
        'Pelling': {
            wheelchairFriendly: [
                { place: 'Pelling Viewpoint', features: 'Paved pathway, accessible viewing area' },
                { place: 'Pemayangtse Monastery Ground Floor', features: 'Ramp access' }
            ],
            visuallyImpaired: [
                { place: 'Rabdentse Ruins', features: 'Audio descriptions available' }
            ],
            hearingImpaired: [
                { place: 'Helipad Ground', features: 'Visual information boards' }
            ]
        },
        'Ravangla': {
            wheelchairFriendly: [
                { place: 'Buddha Park', features: 'Smooth pathways, ramps to main statue' },
                { place: 'Ravangla Market', features: 'Some shops with level entry' }
            ],
            visuallyImpaired: [
                { place: 'Ralong Monastery', features: 'Touch tours by arrangement' }
            ],
            hearingImpaired: [
                { place: 'Temi Tea Garden Visitor Center', features: 'Visual displays' }
            ]
        },
        'Namchi': {
            wheelchairFriendly: [
                { place: 'Char Dham Complex', features: 'Ramps and elevators available' },
                { place: 'Samdruptse', features: 'Accessible viewing areas' }
            ],
            visuallyImpaired: [
                { place: 'Namchi Rock Garden', features: 'Sensory garden elements' }
            ],
            hearingImpaired: [
                { place: 'Ngadak Monastery', features: 'Visual information displays' }
            ]
        },
        'Lachung': {
            wheelchairFriendly: [
                { place: 'Lachung Monastery', features: 'Limited accessibility, ground floor only' }
            ],
            visuallyImpaired: [
                { place: 'Yumthang Valley Entrance', features: 'Staff assistance available on request' }
            ],
            hearingImpaired: [
                { place: 'Shingba Rhododendron Sanctuary', features: 'Pictorial guides available' }
            ]
        }
    };
    
    // Tourism insights data
    const tourismInsights = {
        visitorStats: [
            { year: 2018, domestic: 1355260, foreign: 133388, total: 1488648 },
            { year: 2019, domestic: 1420342, foreign: 142250, total: 1562592 },
            { year: 2020, domestic: 520372, foreign: 23323, total: 543695 },
            { year: 2021, domestic: 620560, foreign: 5438, total: 625998 },
            { year: 2022, domestic: 1135280, foreign: 98752, total: 1234032 }
        ],
        sustainabilityMetrics: [
            { metric: 'Plastic waste reduction', value: '45%', year: 2022 },
            { metric: 'Renewable energy usage', value: '38%', year: 2022 },
            { metric: 'Water conservation', value: '28%', year: 2022 },
            { metric: 'Carbon offset initiatives', value: '15000 trees', year: 2022 },
            { metric: 'Eco-friendly accommodations', value: '62%', year: 2022 }
        ],
        popularDestinations: [
            { place: 'Tsomgo Lake', visitors: 325000, year: 2022 },
            { place: 'Nathula Pass', visitors: 280000, year: 2022 },
            { place: 'MG Marg', visitors: 450000, year: 2022 },
            { place: 'Pelling', visitors: 210000, year: 2022 },
            { place: 'Yumthang Valley', visitors: 185000, year: 2022 }
        ]
    };
    
    // Navigation menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smart Features functionality
    function initSmartFeatures() {
        // Initialize feature cards
        setupFeatureCards();
        
        // Initialize SOS button
        setupSOSButton();
        
        // Initialize Smart Navigation
        setupSmartNavigation();
        
        // Initialize Weather Alerts
        setupWeatherAlerts();
        
        // Initialize Eco-Sustainability Meter
        setupEcoMeter();
        
        // Initialize Accessibility Tools
        setupAccessibilityTools();
    }
    
    function setupFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('click', function() {
                const featureType = this.getAttribute('data-feature');
                activateFeature(featureType);
            });
        });
    }
    
    function activateFeature(featureType) {
        console.log(`Activating feature: ${featureType}`);
        
        switch(featureType) {
            case 'navigation':
                showSmartNavigation();
                break;
            case 'weather':
                showWeatherAlerts();
                break;
            case 'emergency':
                showEmergencyServices();
                break;
            case 'food':
                showLocalFood();
                break;
            case 'eco':
                showEcoMeter();
                break;
            case 'voice':
                activateVoiceRecognition();
                break;
            case 'ar':
                showARExperience();
                break;
            case 'transport':
                showTransportOptions();
                break;
            case 'accessibility':
                showAccessibilityOptions();
                break;
            case 'insights':
                showTourismInsights();
                break;
            default:
                console.log('Feature not implemented yet');
        }
    }
    
    function setupSOSButton() {
        const sosButton = document.querySelector('.sos-button');
        if (sosButton) {
            sosButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showEmergencyServices();
            });
        }
    }
    
    function showEmergencyServices() {
        // Get current region or default to Gangtok
        const region = userLocation?.region || 'Gangtok';
        const services = emergencyServices[region] || emergencyServices['Gangtok'];
        
        // Create modal for emergency services
        const modal = document.createElement('div');
        modal.className = 'emergency-modal';
        
        let modalContent = `
            <div class="emergency-modal-content">
                <span class="close-modal">&times;</span>
                <h2><i class="fas fa-ambulance"></i> Emergency Services in ${region}</h2>
                <div class="emergency-services-list">
        `;
        
        services.forEach(service => {
            modalContent += `
                <div class="emergency-service ${service.type}">
                    <h3>${service.name}</h3>
                    <p><strong>Type:</strong> ${service.type.charAt(0).toUpperCase() + service.type.slice(1)}</p>
                    <p><strong>Distance:</strong> ${service.distance}</p>
                    <p><strong>Contact:</strong> ${service.contact}</p>
                    <button class="call-button" data-number="${service.contact}">Call Now</button>
                </div>
            `;
        });
        
        modalContent += `
                </div>
                <div class="sos-actions">
                    <button class="sos-action-button" id="emergency-call"><i class="fas fa-phone"></i> Emergency Call</button>
                    <button class="sos-action-button" id="share-location"><i class="fas fa-map-marker-alt"></i> Share Location</button>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Add event listeners
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        const callButtons = modal.querySelectorAll('.call-button');
        callButtons.forEach(button => {
            button.addEventListener('click', function() {
                const number = this.getAttribute('data-number');
                window.location.href = `tel:${number}`;
            });
        });
        
        const emergencyCallButton = document.getElementById('emergency-call');
        if (emergencyCallButton) {
            emergencyCallButton.addEventListener('click', function() {
                window.location.href = 'tel:112'; // India's emergency number
            });
        }
        
        const shareLocationButton = document.getElementById('share-location');
        if (shareLocationButton) {
            shareLocationButton.addEventListener('click', function() {
                // Create shareable location link
                if (userLocation?.latitude && userLocation?.longitude) {
                    const locationURL = `https://maps.google.com/?q=${userLocation.latitude},${userLocation.longitude}`;
                    navigator.clipboard.writeText(locationURL).then(() => {
                        alert('Location link copied to clipboard!');
                    });
                } else {
                    alert('Location not available. Please enable location services.');
                }
            });
        }
    }
    
    function showLocalFood() {
        // Get current region or default to Gangtok
        const region = userLocation?.region || 'Gangtok';
        const foods = localCuisine[region] || localCuisine['Gangtok'];
        const drinks = localDrinks[region] || localDrinks['Gangtok'];
        
        // Create modal for local food and drinks
        const modal = document.createElement('div');
        modal.className = 'food-modal';
        
        let modalContent = `
            <div class="food-modal-content">
                <span class="close-modal">&times;</span>
                <h2><i class="fas fa-utensils"></i> Local Cuisine in ${region}</h2>
                <div class="food-drinks-container">
                    <div class="food-section">
                        <h3>Local Dishes</h3>
                        <div class="food-list">
        `;
        
        foods.forEach(food => {
            modalContent += `
                <div class="food-item">
                    <h4>${food.name}</h4>
                    <p>${food.description}</p>
                    <p class="where-to-find"><i class="fas fa-map-marker-alt"></i> ${food.where}</p>
                </div>
            `;
        });
        
        modalContent += `
                        </div>
                    </div>
                    <div class="drinks-section">
                        <h3>Local Beverages</h3>
                        <div class="drinks-list">
        `;
        
        drinks.forEach(drink => {
            modalContent += `
                <div class="drink-item">
                    <h4>${drink.name}</h4>
                    <p>${drink.description}</p>
                    <p class="where-to-find"><i class="fas fa-map-marker-alt"></i> ${drink.where}</p>
                </div>
            `;
        });
        
        modalContent += `
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Add event listener to close button
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    }
    
    function showSmartNavigation() {
        // Get current region or default to Gangtok
        const region = userLocation?.region || 'Gangtok';
        
        // Create modal for smart navigation
        const modal = document.createElement('div');
        modal.className = 'navigation-modal';
        
        let modalContent = `
            <div class="navigation-modal-content">
                <span class="close-modal">&times;</span>
                <h2><i class="fas fa-route"></i> Smart Navigation for ${region}</h2>
                <div class="navigation-options">
                    <div class="route-types">
                        <button class="route-type active" data-type="safe">Safest Routes</button>
                        <button class="route-type" data-type="eco">Eco-Friendly</button>
                        <button class="route-type" data-type="scenic">Scenic Routes</button>
                    </div>
                    
                    <div class="route-map">
                        <div class="map-placeholder">
                            <i class="fas fa-map-marked-alt"></i>
                            <p>Interactive map will load here</p>
                        </div>
                    </div>
                    
                    <div class="route-warnings">
                        <h3><i class="fas fa-exclamation-triangle"></i> Caution Areas</h3>
                        <ul class="warning-list">
                            <li><span class="warning-dot high"></span> Landslide prone area on NH10 near Rangpo</li>
                            <li><span class="warning-dot medium"></span> Steep road with sharp turns near Tashi viewpoint</li>
                            <li><span class="warning-dot low"></span> Wildlife crossing area near Fambong Lho</li>
                        </ul>
                    </div>
                    
                    <div class="eco-transport-options">
                        <h3><i class="fas fa-leaf"></i> Eco-Friendly Transport</h3>
                        <div class="eco-options">
        `;
        
        const ecoOptions = ecoTransport[region] || ecoTransport['Gangtok'];
        ecoOptions.forEach(option => {
            modalContent += `
                <div class="eco-option">
                    <h4>${option.type}</h4>
                    <p><strong>Impact:</strong> ${option.impact}</p>
                    <p><strong>Route:</strong> ${option.route}</p>
                </div>
            `;
        });
        
        modalContent += `
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Add event listeners
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        const routeTypeButtons = modal.querySelectorAll('.route-type');
        routeTypeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                routeTypeButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // In a real app, this would update the map with the selected route type
                console.log(`Selected route type: ${this.getAttribute('data-type')}`);
            });
        });
    }
    
    function showWeatherAlerts() {
        // Get current region or default to Gangtok
        const region = userLocation?.region || 'Gangtok';
        const alerts = safetyAlerts[region] || safetyAlerts['Gangtok'];
        
        // Create modal for weather alerts
        const modal = document.createElement('div');
        modal.className = 'weather-modal';
        
        let modalContent = `
            <div class="weather-modal-content">
                <span class="close-modal">&times;</span>
                <h2><i class="fas fa-cloud-sun-rain"></i> Weather & Alerts for ${region}</h2>
                
                <div class="current-weather">
                    <div class="weather-icon">
                        <i class="fas fa-${weatherData?.icon || 'cloud'}"></i>
                    </div>
                    <div class="weather-details">
                        <h3>${weatherData?.temperature || '22'}°C</h3>
                        <p>${weatherData?.description || 'Partly Cloudy'}</p>
                        <p>Humidity: ${weatherData?.humidity || '65'}%</p>
                        <p>Wind: ${weatherData?.windSpeed || '10'} km/h</p>
                    </div>
                </div>
                
                <div class="weather-forecast">
                    <h3>5-Day Forecast</h3>
                    <div class="forecast-days">
                        <div class="forecast-day">
                            <p>Mon</p>
                            <i class="fas fa-cloud-sun"></i>
                            <p>24°C</p>
                        </div>
                        <div class="forecast-day">
                            <p>Tue</p>
                            <i class="fas fa-cloud-rain"></i>
                            <p>22°C</p>
                        </div>
                        <div class="forecast-day">
                            <p>Wed</p>
                            <i class="fas fa-cloud-showers-heavy"></i>
                            <p>20°C</p>
                        </div>
                        <div class="forecast-day">
                            <p>Thu</p>
                            <i class="fas fa-cloud-sun"></i>
                            <p>23°C</p>
                        </div>
                        <div class="forecast-day">
                            <p>Fri</p>
                            <i class="fas fa-sun"></i>
                            <p>25°C</p>
                        </div>
                    </div>
                </div>
                
                <div class="safety-alerts">
                    <h3><i class="fas fa-exclamation-circle"></i> Safety Alerts</h3>
                    <ul class="alert-list">
        `;
        
        alerts.forEach(alert => {
            modalContent += `
                <li class="alert-item">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>${alert}</p>
                </li>
            `;
        });
        
        modalContent += `
                    </ul>
                </div>
                
                <div class="best-time-info">
                    <h3><i class="fas fa-calendar-alt"></i> Best Time to Visit</h3>
                    <div class="season-info">
                        <div class="season best">
                            <h4>March-May</h4>
                            <p>Spring season with pleasant weather and blooming rhododendrons</p>
                        </div>
                        <div class="season good">
                            <h4>September-November</h4>
                            <p>Clear skies with excellent mountain views</p>
                        </div>
                        <div class="season avoid">
                            <h4>June-August</h4>
                            <p>Monsoon season with heavy rainfall and landslides</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Add event listener to close button
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    }
    
    function showEcoSustainability() {
        // Create modal for eco-sustainability meter
        const modal = document.createElement('div');
        modal.className = 'eco-modal';
        
        // Mock user data - in a real app this would be tracked based on user activities
        const userEcoData = {
            carbonFootprint: 35, // percentage (lower is better)
            transportChoices: {
                walking: 45,
                publicTransport: 30,
                privateVehicle: 25
            },
            localPurchases: 70, // percentage of local vs imported items
            wasteGenerated: 20 // percentage compared to average tourist
        };
        
        let modalContent = `
            <div class="eco-modal-content">
                <span class="close-modal">&times;</span>
                <h2><i class="fas fa-leaf"></i> Your Eco-Sustainability Meter</h2>
                
                <div class="eco-score-container">
                    <div class="eco-score">
                        <div class="eco-meter">
                            <div class="eco-meter-fill" style="width: ${100 - userEcoData.carbonFootprint}%"></div>
                        </div>
                        <p>Your tourism footprint is <strong>${userEcoData.carbonFootprint}%</strong> lower than the average visitor</p>
                    </div>
                </div>
                
                <div class="eco-breakdown">
                    <h3>Your Eco Choices</h3>
                    
                    <div class="eco-category">
                        <h4><i class="fas fa-walking"></i> Transport Choices</h4>
                        <div class="eco-chart">
                            <div class="chart-bar">
                                <div class="bar-fill walking" style="width: ${userEcoData.transportChoices.walking}%"></div>
                                <span>Walking/Cycling (${userEcoData.transportChoices.walking}%)</span>
                            </div>
                            <div class="chart-bar">
                                <div class="bar-fill public" style="width: ${userEcoData.transportChoices.publicTransport}%"></div>
                                <span>Public Transport (${userEcoData.transportChoices.publicTransport}%)</span>
                            </div>
                            <div class="chart-bar">
                                <div class="bar-fill private" style="width: ${userEcoData.transportChoices.privateVehicle}%"></div>
                                <span>Private Vehicle (${userEcoData.transportChoices.privateVehicle}%)</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="eco-category">
                        <h4><i class="fas fa-shopping-bag"></i> Local Purchases</h4>
                        <div class="eco-chart">
                            <div class="chart-bar">
                                <div class="bar-fill local" style="width: ${userEcoData.localPurchases}%"></div>
                                <span>Local Products (${userEcoData.localPurchases}%)</span>
                            </div>
                            <div class="chart-bar">
                                <div class="bar-fill imported" style="width: ${100 - userEcoData.localPurchases}%"></div>
                                <span>Imported Products (${100 - userEcoData.localPurchases}%)</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="eco-category">
                        <h4><i class="fas fa-trash"></i> Waste Generated</h4>
                        <div class="eco-meter waste-meter">
                            <div class="eco-meter-fill" style="width: ${100 - userEcoData.wasteGenerated}%"></div>
                        </div>
                        <p>You generate <strong>${userEcoData.wasteGenerated}%</strong> less waste than the average visitor</p>
                    </div>
                </div>
                
                <div class="eco-recommendations">
                    <h3><i class="fas fa-lightbulb"></i> Eco-Friendly Recommendations</h3>
                    <ul class="recommendation-list">
                        <li>
                            <i class="fas fa-bus"></i>
                            <div class="recommendation-content">
                                <h4>Use shared transport</h4>
                                <p>Try the local shuttle service between major attractions to reduce your carbon footprint</p>
                            </div>
                        </li>
                        <li>
                            <i class="fas fa-utensils"></i>
                            <div class="recommendation-content">
                                <h4>Choose local cuisine</h4>
                                <p>Eating locally-sourced food reduces transportation emissions and supports local farmers</p>
                            </div>
                        </li>
                        <li>
                            <i class="fas fa-water"></i>
                            <div class="recommendation-content">
                                <h4>Refill water bottles</h4>
                                <p>Use the filtered water stations available at major tourist spots instead of buying plastic bottles</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Add event listener to close button
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    }
    
    function showAccessibilityTools() {
        // Create modal for accessibility tools
        const modal = document.createElement('div');
        modal.className = 'accessibility-modal';
        
        // Get current region or default to Gangtok
        const region = userLocation?.region || 'Gangtok';
        const accessInfo = accessibilityInfo[region] || accessibilityInfo['Gangtok'];
        
        let modalContent = `
            <div class="accessibility-modal-content">
                <span class="close-modal">&times;</span>
                <h2><i class="fas fa-universal-access"></i> Accessibility Tools for ${region}</h2>
                
                <div class="accessibility-options">
                    <div class="accessibility-controls">
                        <h3>Customize Your Experience</h3>
                        <div class="control-options">
                            <button class="accessibility-control" data-feature="text-size">
                                <i class="fas fa-text-height"></i> Larger Text
                            </button>
                            <button class="accessibility-control" data-feature="high-contrast">
                                <i class="fas fa-adjust"></i> High Contrast
                            </button>
                            <button class="accessibility-control" data-feature="screen-reader">
                                <i class="fas fa-volume-up"></i> Screen Reader
                            </button>
                            <button class="accessibility-control" data-feature="motion-reduce">
                                <i class="fas fa-running"></i> Reduce Motion
                            </button>
                        </div>
                    </div>
                    
                    <div class="wheelchair-routes">
                        <h3><i class="fas fa-wheelchair"></i> Wheelchair-Friendly Routes</h3>
                        <div class="route-list">
        `;
        
        accessInfo.wheelchairRoutes.forEach(route => {
            modalContent += `
                <div class="accessible-route">
                    <h4>${route.name}</h4>
                    <p>${route.description}</p>
                    <div class="route-details">
                        <span><i class="fas fa-road"></i> ${route.distance}</span>
                        <span><i class="fas fa-mountain"></i> ${route.difficulty}</span>
                    </div>
                </div>
            `;
        });
        
        modalContent += `
                        </div>
                    </div>
                    
                    <div class="audio-guides">
                        <h3><i class="fas fa-headphones"></i> Audio Guides</h3>
                        <div class="guide-list">
        `;
        
        accessInfo.audioGuides.forEach(guide => {
            modalContent += `
                <div class="audio-guide">
                    <div class="guide-icon">
                        <i class="fas fa-${guide.icon}"></i>
                    </div>
                    <div class="guide-details">
                        <h4>${guide.title}</h4>
                        <p>${guide.description}</p>
                        <button class="play-audio-btn" data-audio="${guide.audioFile}">
                            <i class="fas fa-play"></i> Play Guide
                        </button>
                    </div>
                </div>
            `;
        });
        
        modalContent += `
                        </div>
                    </div>
                    
                    <div class="assistance-services">
                        <h3><i class="fas fa-hands-helping"></i> Assistance Services</h3>
                        <ul class="service-list">
        `;
        
        accessInfo.assistanceServices.forEach(service => {
            modalContent += `
                <li class="service-item">
                    <i class="fas fa-${service.icon}"></i>
                    <div class="service-details">
                        <h4>${service.name}</h4>
                        <p>${service.description}</p>
                        <p class="contact-info"><i class="fas fa-phone"></i> ${service.contact}</p>
                    </div>
                </li>
            `;
        });
        
        modalContent += `
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Add event listener to close button
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Add event listeners for accessibility controls
        const accessibilityControls = modal.querySelectorAll('.accessibility-control');
        accessibilityControls.forEach(control => {
            control.addEventListener('click', function() {
                const feature = this.getAttribute('data-feature');
                this.classList.toggle('active');
                
                // In a real app, this would apply the accessibility feature
                console.log(`Toggled accessibility feature: ${feature}`);
                
                // Example implementation for text size
                if (feature === 'text-size' && this.classList.contains('active')) {
                    document.body.style.fontSize = '120%';
                } else if (feature === 'text-size') {
                    document.body.style.fontSize = '100%';
                }
                
                // Example implementation for high contrast
                if (feature === 'high-contrast' && this.classList.contains('active')) {
                    document.body.classList.add('high-contrast');
                } else if (feature === 'high-contrast') {
                    document.body.classList.remove('high-contrast');
                }
            });
        });
        
        // Add event listeners for audio guide buttons
        const audioButtons = modal.querySelectorAll('.play-audio-btn');
        audioButtons.forEach(button => {
            button.addEventListener('click', function() {
                const audioFile = this.getAttribute('data-audio');
                // In a real app, this would play the audio file
                console.log(`Playing audio guide: ${audioFile}`);
                
                // Toggle button text and icon
                if (this.innerHTML.includes('Play')) {
                    this.innerHTML = '<i class="fas fa-pause"></i> Pause Guide';
                } else {
                    this.innerHTML = '<i class="fas fa-play"></i> Play Guide';
                }
            });
        });
    }
    
    function showARVRExploration() {
        // Create modal for AR/VR exploration
        const modal = document.createElement('div');
        modal.className = 'arvr-modal';
        
        // Get current region or default to Gangtok
        const region = userLocation?.region || 'Gangtok';
        
        let modalContent = `
            <div class="arvr-modal-content">
                <span class="close-modal">&times;</span>
                <h2><i class="fas fa-vr-cardboard"></i> AR/VR Exploration</h2>
                
                <div class="arvr-options">
                    <div class="mode-selector">
                        <button class="mode-btn active" data-mode="ar">Augmented Reality</button>
                        <button class="mode-btn" data-mode="vr">Virtual Reality</button>
                    </div>
                    
                    <div class="experience-container ar-mode">
                        <div class="ar-intro">
                            <h3>Explore Sikkim with Augmented Reality</h3>
                            <p>Point your camera at landmarks to reveal historical information, cultural stories, and hidden facts.</p>
                            
                            <div class="ar-features">
                                <div class="ar-feature">
                                    <i class="fas fa-landmark"></i>
                                    <h4>Historical Overlays</h4>
                                    <p>See how monuments and locations looked throughout history</p>
                                </div>
                                <div class="ar-feature">
                                    <i class="fas fa-mountain"></i>
                                    <h4>Trail Guides</h4>
                                    <p>Follow virtual paths and markers on hiking trails</p>
                                </div>
                                <div class="ar-feature">
                                    <i class="fas fa-volume-up"></i>
                                    <h4>Audio Narration</h4>
                                    <p>Listen to stories and facts about what you're seeing</p>
                                </div>
                            </div>
                            
                            <button class="launch-ar-btn">
                                <i class="fas fa-camera"></i> Launch AR Experience
                            </button>
                        </div>
                        
                        <div class="ar-landmarks">
                            <h3>Available AR Landmarks</h3>
                            <div class="landmark-list">
                                <div class="landmark-item">
                                    <img src="images/rumtek-monastery.jpg" alt="Rumtek Monastery" class="landmark-img">
                                    <div class="landmark-info">
                                        <h4>Rumtek Monastery</h4>
                                        <p>Explore the sacred artifacts and Buddhist history</p>
                                        <span class="distance">2.5 km away</span>
                                    </div>
                                </div>
                                <div class="landmark-item">
                                    <img src="images/nathula-pass.jpg" alt="Nathula Pass" class="landmark-img">
                                    <div class="landmark-info">
                                        <h4>Nathula Pass</h4>
                                        <p>Discover the historical significance of this Silk Route passage</p>
                                        <span class="distance">54 km away</span>
                                    </div>
                                </div>
                                <div class="landmark-item">
                                    <img src="images/tsomgo-lake.jpg" alt="Tsomgo Lake" class="landmark-img">
                                    <div class="landmark-info">
                                        <h4>Tsomgo Lake</h4>
                                        <p>Learn about the sacred lake's changing colors and legends</p>
                                        <span class="distance">38 km away</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="experience-container vr-mode hidden">
                        <div class="vr-intro">
                            <h3>Immersive Virtual Reality Experiences</h3>
                            <p>Transport yourself to Sikkim's most breathtaking locations without leaving your room.</p>
                            
                            <div class="vr-experiences">
                                <div class="vr-experience">
                                    <div class="vr-thumbnail" style="background-image: url('images/kanchenjunga-vr.jpg')">
                                        <div class="play-overlay">
                                            <i class="fas fa-play-circle"></i>
                                        </div>
                                    </div>
                                    <h4>Kanchenjunga Base Camp</h4>
                                    <p>Experience the world's third highest peak up close</p>
                                    <button class="start-vr-btn" data-experience="kanchenjunga">
                                        <i class="fas fa-vr-cardboard"></i> Start Experience
                                    </button>
                                </div>
                                <div class="vr-experience">
                                    <div class="vr-thumbnail" style="background-image: url('images/yumthang-vr.jpg')">
                                        <div class="play-overlay">
                                            <i class="fas fa-play-circle"></i>
                                        </div>
                                    </div>
                                    <h4>Yumthang Valley of Flowers</h4>
                                    <p>Walk through the vibrant valley during full bloom</p>
                                    <button class="start-vr-btn" data-experience="yumthang">
                                        <i class="fas fa-vr-cardboard"></i> Start Experience
                                    </button>
                                </div>
                                <div class="vr-experience">
                                    <div class="vr-thumbnail" style="background-image: url('images/pelling-vr.jpg')">
                                        <div class="play-overlay">
                                            <i class="fas fa-play-circle"></i>
                                        </div>
                                    </div>
                                    <h4>Pelling Skywalk</h4>
                                    <p>Experience the thrill of the glass skywalk with mountain views</p>
                                    <button class="start-vr-btn" data-experience="pelling">
                                        <i class="fas fa-vr-cardboard"></i> Start Experience
                                    </button>
                                </div>
                            </div>
                            
                            <div class="vr-requirements">
                                <h4><i class="fas fa-info-circle"></i> VR Requirements</h4>
                                <ul>
                                    <li>Compatible VR headset or Google Cardboard</li>
                                    <li>Stable internet connection</li>
                                    <li>Headphones recommended for immersive audio</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Add event listener to close button
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Add event listeners for mode buttons
        const modeButtons = modal.querySelectorAll('.mode-btn');
        modeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                modeButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const mode = this.getAttribute('data-mode');
                const arContainer = modal.querySelector('.ar-mode');
                const vrContainer = modal.querySelector('.vr-mode');
                
                if (mode === 'ar') {
                    arContainer.classList.remove('hidden');
                    vrContainer.classList.add('hidden');
                } else {
                    arContainer.classList.add('hidden');
                    vrContainer.classList.remove('hidden');
                }
            });
        });
        
        // Add event listener for AR launch button
        const launchARButton = modal.querySelector('.launch-ar-btn');
        launchARButton.addEventListener('click', function() {
            // In a real app, this would launch the AR experience
            console.log('Launching AR experience');
            alert('AR camera would launch here. This is a demo.');
        });
        
        // Add event listeners for VR experience buttons
        const startVRButtons = modal.querySelectorAll('.start-vr-btn');
        startVRButtons.forEach(button => {
            button.addEventListener('click', function() {
                const experience = this.getAttribute('data-experience');
                // In a real app, this would launch the VR experience
                console.log(`Starting VR experience: ${experience}`);
                alert(`VR experience '${experience}' would launch here. This is a demo.`);
            });
        });
    }
    
    function showTransportBooking() {
        // Create modal for transport and booking
        const modal = document.createElement('div');
        modal.className = 'transport-modal';
        
        // Get current region or default to Gangtok
        const region = userLocation?.region || 'Gangtok';
        
        let modalContent = `
            <div class="transport-modal-content">
                <span class="close-modal">&times;</span>
                <h2><i class="fas fa-shuttle-van"></i> Transport & Booking</h2>
                
                <div class="booking-tabs">
                    <button class="tab-btn active" data-tab="transport">Transport</button>
                    <button class="tab-btn" data-tab="accommodation">Accommodation</button>
                    <button class="tab-btn" data-tab="activities">Activities</button>
                </div>
                
                <div class="tab-content transport-tab active">
                    <div class="search-filters">
                        <div class="filter-group">
                            <label>From:</label>
                            <select class="location-select">
                                <option value="gangtok" ${region === 'Gangtok' ? 'selected' : ''}>Gangtok</option>
                                <option value="pelling" ${region === 'Pelling' ? 'selected' : ''}>Pelling</option>
                                <option value="lachung" ${region === 'Lachung' ? 'selected' : ''}>Lachung</option>
                                <option value="ravangla" ${region === 'Ravangla' ? 'selected' : ''}>Ravangla</option>
                                <option value="namchi" ${region === 'Namchi' ? 'selected' : ''}>Namchi</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>To:</label>
                            <select class="destination-select">
                                <option value="gangtok" ${region !== 'Gangtok' ? 'selected' : ''}>Gangtok</option>
                                <option value="pelling" ${region === 'Gangtok' ? 'selected' : ''}>Pelling</option>
                                <option value="lachung">Lachung</option>
                                <option value="ravangla">Ravangla</option>
                                <option value="namchi">Namchi</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>Date:</label>
                            <input type="date" class="date-select" value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="filter-group">
                            <label>Transport Type:</label>
                            <select class="transport-type-select">
                                <option value="all">All Types</option>
                                <option value="bus">Bus</option>
                                <option value="shared-taxi">Shared Taxi</option>
                                <option value="private-taxi">Private Taxi</option>
                                <option value="eco-shuttle">Eco Shuttle</option>
                            </select>
                        </div>
                        <button class="search-btn"><i class="fas fa-search"></i> Search</button>
                    </div>
                    
                    <div class="search-results">
                        <h3>Available Transport Options</h3>
                        <div class="transport-list">
                            <div class="transport-item eco-friendly">
                                <div class="transport-icon">
                                    <i class="fas fa-bus"></i>
                                </div>
                                <div class="transport-details">
                                    <div class="transport-main">
                                        <h4>SNT Eco Shuttle</h4>
                                        <div class="eco-badge"><i class="fas fa-leaf"></i> Eco-Friendly</div>
                                    </div>
                                    <div class="transport-time">
                                        <span class="departure">9:00 AM</span>
                                        <span class="duration"><i class="fas fa-clock"></i> 2h 30m</span>
                                        <span class="arrival">11:30 AM</span>
                                    </div>
                                    <div class="transport-info">
                                        <span><i class="fas fa-map-marker-alt"></i> Departs from SNT Bus Stand</span>
                                        <span><i class="fas fa-users"></i> 18 seats available</span>
                                    </div>
                                </div>
                                <div class="transport-price">
                                    <span class="price">₹250</span>
                                    <button class="book-btn">Book Now</button>
                                </div>
                            </div>
                            
                            <div class="transport-item">
                                <div class="transport-icon">
                                    <i class="fas fa-taxi"></i>
                                </div>
                                <div class="transport-details">
                                    <div class="transport-main">
                                        <h4>Shared Taxi</h4>
                                    </div>
                                    <div class="transport-time">
                                        <span class="departure">10:30 AM</span>
                                        <span class="duration"><i class="fas fa-clock"></i> 2h</span>
                                        <span class="arrival">12:30 PM</span>
                                    </div>
                                    <div class="transport-info">
                                        <span><i class="fas fa-map-marker-alt"></i> Departs from Taxi Stand</span>
                                        <span><i class="fas fa-users"></i> 3 seats available</span>
                                    </div>
                                </div>
                                <div class="transport-price">
                                    <span class="price">₹350</span>
                                    <button class="book-btn">Book Now</button>
                                </div>
                            </div>
                            
                            <div class="transport-item">
                                <div class="transport-icon">
                                    <i class="fas fa-car"></i>
                                </div>
                                <div class="transport-details">
                                    <div class="transport-main">
                                        <h4>Private Taxi</h4>
                                    </div>
                                    <div class="transport-time">
                                        <span class="departure">Your choice</span>
                                        <span class="duration"><i class="fas fa-clock"></i> 1h 45m</span>
                                    </div>
                                    <div class="transport-info">
                                        <span><i class="fas fa-map-marker-alt"></i> Pickup from your location</span>
                                        <span><i class="fas fa-car"></i> Entire vehicle</span>
                                    </div>
                                </div>
                                <div class="transport-price">
                                    <span class="price">₹1200</span>
                                    <button class="book-btn">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-content accommodation-tab">
                    <div class="search-filters">
                        <div class="filter-group">
                            <label>Location:</label>
                            <select class="location-select">
                                <option value="gangtok" ${region === 'Gangtok' ? 'selected' : ''}>Gangtok</option>
                                <option value="pelling" ${region === 'Pelling' ? 'selected' : ''}>Pelling</option>
                                <option value="lachung" ${region === 'Lachung' ? 'selected' : ''}>Lachung</option>
                                <option value="ravangla" ${region === 'Ravangla' ? 'selected' : ''}>Ravangla</option>
                                <option value="namchi" ${region === 'Namchi' ? 'selected' : ''}>Namchi</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>Check-in:</label>
                            <input type="date" class="checkin-date" value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="filter-group">
                            <label>Check-out:</label>
                            <input type="date" class="checkout-date" value="${new Date(Date.now() + 86400000).toISOString().split('T')[0]}">
                        </div>
                        <div class="filter-group">
                            <label>Type:</label>
                            <select class="accommodation-type">
                                <option value="all">All Types</option>
                                <option value="hotel">Hotel</option>
                                <option value="homestay">Homestay</option>
                                <option value="eco-lodge">Eco Lodge</option>
                            </select>
                        </div>
                        <button class="search-btn"><i class="fas fa-search"></i> Search</button>
                    </div>
                    
                    <div class="search-results">
                        <h3>Available Accommodations</h3>
                        <p class="results-message">Select the accommodation tab and click search to see available options.</p>
                    </div>
                </div>
                
                <div class="tab-content activities-tab">
                    <div class="search-filters">
                        <div class="filter-group">
                            <label>Location:</label>
                            <select class="location-select">
                                <option value="gangtok" ${region === 'Gangtok' ? 'selected' : ''}>Gangtok</option>
                                <option value="pelling" ${region === 'Pelling' ? 'selected' : ''}>Pelling</option>
                                <option value="lachung" ${region === 'Lachung' ? 'selected' : ''}>Lachung</option>
                                <option value="ravangla" ${region === 'Ravangla' ? 'selected' : ''}>Ravangla</option>
                                <option value="namchi" ${region === 'Namchi' ? 'selected' : ''}>Namchi</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>Date:</label>
                            <input type="date" class="activity-date" value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="filter-group">
                            <label>Category:</label>
                            <select class="activity-category">
                                <option value="all">All Categories</option>
                                <option value="adventure">Adventure</option>
                                <option value="cultural">Cultural</option>
                                <option value="nature">Nature</option>
                                <option value="wellness">Wellness</option>
                            </select>
                        </div>
                        <button class="search-btn"><i class="fas fa-search"></i> Search</button>
                    </div>
                    
                    <div class="search-results">
                        <h3>Available Activities</h3>
                        <p class="results-message">Select the activities tab and click search to see available options.</p>
                    </div>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Add event listener to close button
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Add event listeners for tab buttons
        const tabButtons = modal.querySelectorAll('.tab-btn');
        const tabContents = modal.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked button and corresponding tab
                this.classList.add('active');
                const tabName = this.getAttribute('data-tab');
                modal.querySelector(`.${tabName}-tab`).classList.add('active');
            });
        });
        
        // Add event listeners for search buttons
        const searchButtons = modal.querySelectorAll('.search-btn');
        searchButtons.forEach(button => {
            button.addEventListener('click', function() {
                const activeTab = modal.querySelector('.tab-content.active');
                const resultsContainer = activeTab.querySelector('.search-results');
                
                // In a real app, this would fetch real search results
                if (activeTab.classList.contains('accommodation-tab')) {
                    resultsContainer.innerHTML = `
                        <h3>Available Accommodations</h3>
                        <div class="accommodation-list">
                            <div class="accommodation-item eco-friendly">
                                <div class="accommodation-image" style="background-image: url('images/eco-lodge.jpg')"></div>
                                <div class="accommodation-details">
                                    <div class="accommodation-main">
                                        <h4>Himalayan Eco Lodge</h4>
                                        <div class="eco-badge"><i class="fas fa-leaf"></i> Eco-Friendly</div>
                                        <div class="rating">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="far fa-star"></i>
                                            <span>(42 reviews)</span>
                                        </div>
                                    </div>
                                    <div class="accommodation-info">
                                        <span><i class="fas fa-map-marker-alt"></i> 3.2 km from city center</span>
                                        <span><i class="fas fa-wifi"></i> Free WiFi</span>
                                        <span><i class="fas fa-utensils"></i> Organic breakfast included</span>
                                    </div>
                                </div>
                                <div class="accommodation-price">
                                    <span class="price">₹2,800</span>
                                    <span class="per-night">per night</span>
                                    <button class="book-btn">Book Now</button>
                                </div>
                            </div>
                            
                            <div class="accommodation-item">
                                <div class="accommodation-image" style="background-image: url('images/homestay.jpg')"></div>
                                <div class="accommodation-details">
                                    <div class="accommodation-main">
                                        <h4>Traditional Sikkimese Homestay</h4>
                                        <div class="rating">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star-half-alt"></i>
                                            <span>(28 reviews)</span>
                                        </div>
                                    </div>
                                    <div class="accommodation-info">
                                        <span><i class="fas fa-map-marker-alt"></i> 5 km from city center</span>
                                        <span><i class="fas fa-wifi"></i> Free WiFi</span>
                                        <span><i class="fas fa-utensils"></i> Home-cooked meals</span>
                                    </div>
                                </div>
                                <div class="accommodation-price">
                                    <span class="price">₹1,500</span>
                                    <span class="per-night">per night</span>
                                    <button class="book-btn">Book Now</button>
                                </div>
                            </div>
                        </div>
                    `;
                } else if (activeTab.classList.contains('activities-tab')) {
                    resultsContainer.innerHTML = `
                        <h3>Available Activities</h3>
                        <div class="activity-list">
                            <div class="activity-item">
                                <div class="activity-image" style="background-image: url('images/paragliding.jpg')"></div>
                                <div class="activity-details">
                                    <div class="activity-main">
                                        <h4>Paragliding Experience</h4>
                                        <div class="activity-category adventure">Adventure</div>
                                        <div class="rating">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <span>(56 reviews)</span>
                                        </div>
                                    </div>
                                    <div class="activity-info">
                                        <span><i class="fas fa-clock"></i> 2 hours</span>
                                        <span><i class="fas fa-map-marker-alt"></i> Gangtok</span>
                                        <span><i class="fas fa-user-friends"></i> Max 8 people</span>
                                    </div>
                                </div>
                                <div class="activity-price">
                                    <span class="price">₹2,500</span>
                                    <span class="per-person">per person</span>
                                    <button class="book-btn">Book Now</button>
                                </div>
                            </div>
                            
                            <div class="activity-item">
                                <div class="activity-image" style="background-image: url('images/monastery-tour.jpg')"></div>
                                <div class="activity-details">
                                    <div class="activity-main">
                                        <h4>Monastery Tour with Local Guide</h4>
                                        <div class="activity-category cultural">Cultural</div>
                                        <div class="rating">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="far fa-star"></i>
                                            <span>(34 reviews)</span>
                                        </div>
                                    </div>
                                    <div class="activity-info">
                                        <span><i class="fas fa-clock"></i> 4 hours</span>
                                        <span><i class="fas fa-map-marker-alt"></i> Gangtok</span>
                                        <span><i class="fas fa-user-friends"></i> Max 12 people</span>
                                    </div>
                                </div>
                                <div class="activity-price">
                                    <span class="price">₹1,200</span>
                                    <span class="per-person">per person</span>
                                    <button class="book-btn">Book Now</button>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                // Add event listeners for book buttons
                const bookButtons = resultsContainer.querySelectorAll('.book-btn');
                bookButtons.forEach(btn => {
                    btn.addEventListener('click', function() {
                        // In a real app, this would open a booking form
                        alert('Booking form would open here. This is a demo.');
                    });
                });
            });
        });
        
        // Add event listeners for book buttons in transport tab
        const transportBookButtons = modal.querySelectorAll('.transport-tab .book-btn');
        transportBookButtons.forEach(button => {
            button.addEventListener('click', function() {
                // In a real app, this would open a booking form
                alert('Booking form would open here. This is a demo.');
            });
        });
    }
    
    function showTourismInsights() {
        // Create modal for tourism insights
        const modal = document.createElement('div');
        modal.className = 'insights-modal';
        
        // Get current region or default to Gangtok
        const region = userLocation?.region || 'Gangtok';
        
        let modalContent = `
            <div class="insights-modal-content">
                <span class="close-modal">&times;</span>
                <h2><i class="fas fa-chart-line"></i> Tourism Insights</h2>
                
                <div class="insights-tabs">
                    <button class="tab-btn active" data-tab="visitor">Visitor Stats</button>
                    <button class="tab-btn" data-tab="sustainability">Sustainability</button>
                    <button class="tab-btn" data-tab="trends">Travel Trends</button>
                </div>
                
                <div class="tab-content visitor-tab active">
                    <div class="chart-container">
                        <h3>Monthly Visitors to ${region}</h3>
                        <div class="chart visitor-chart" id="visitorChart">
                            <canvas id="visitorStatsCanvas"></canvas>
                        </div>
                        <div class="chart-insights">
                            <div class="insight-item">
                                <div class="insight-icon">
                                    <i class="fas fa-users"></i>
                                </div>
                                <div class="insight-data">
                                    <h4>Peak Season</h4>
                                    <p>April-June & September-November</p>
                                </div>
                            </div>
                            <div class="insight-item">
                                <div class="insight-icon">
                                    <i class="fas fa-globe-asia"></i>
                                </div>
                                <div class="insight-data">
                                    <h4>Top Visitor Origins</h4>
                                    <p>Delhi, Kolkata, Bangalore</p>
                                </div>
                            </div>
                            <div class="insight-item">
                                <div class="insight-icon">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <div class="insight-data">
                                    <h4>Average Stay</h4>
                                    <p>4.2 days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-content sustainability-tab">
                    <div class="chart-container">
                        <h3>Sustainability Metrics</h3>
                        <div class="chart sustainability-chart" id="sustainabilityChart">
                            <canvas id="sustainabilityCanvas"></canvas>
                        </div>
                        <div class="sustainability-metrics">
                            <div class="metric-item">
                                <div class="metric-icon eco-positive">
                                    <i class="fas fa-tree"></i>
                                </div>
                                <div class="metric-data">
                                    <h4>Carbon Offset Programs</h4>
                                    <p>12,500 trees planted in 2023</p>
                                </div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-icon eco-negative">
                                    <i class="fas fa-trash"></i>
                                </div>
                                <div class="metric-data">
                                    <h4>Waste Generated</h4>
                                    <p>2.3 kg per tourist per day</p>
                                </div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-icon eco-positive">
                                    <i class="fas fa-water"></i>
                                </div>
                                <div class="metric-data">
                                    <h4>Water Conservation</h4>
                                    <p>15% reduction in tourism-related usage</p>
                                </div>
                            </div>
                        </div>
                        <div class="eco-tips">
                            <h4><i class="fas fa-lightbulb"></i> How You Can Help</h4>
                            <ul>
                                <li>Use refillable water bottles instead of buying plastic bottles</li>
                                <li>Choose eco-friendly accommodations and transport options</li>
                                <li>Participate in local conservation activities during your stay</li>
                                <li>Respect wildlife and natural habitats by staying on designated paths</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="tab-content trends-tab">
                    <div class="chart-container">
                        <h3>Emerging Travel Trends</h3>
                        <div class="chart trends-chart" id="trendsChart">
                            <canvas id="trendsCanvas"></canvas>
                        </div>
                        <div class="trends-insights">
                            <div class="trend-item">
                                <div class="trend-icon">
                                    <i class="fas fa-hiking"></i>
                                </div>
                                <div class="trend-data">
                                    <h4>Adventure Tourism</h4>
                                    <p><i class="fas fa-arrow-up"></i> 28% increase in adventure activities</p>
                                </div>
                            </div>
                            <div class="trend-item">
                                <div class="trend-icon">
                                    <i class="fas fa-utensils"></i>
                                </div>
                                <div class="trend-data">
                                    <h4>Culinary Tourism</h4>
                                    <p><i class="fas fa-arrow-up"></i> 42% more interest in local food experiences</p>
                                </div>
                            </div>
                            <div class="trend-item">
                                <div class="trend-icon">
                                    <i class="fas fa-home"></i>
                                </div>
                                <div class="trend-data">
                                    <h4>Homestays</h4>
                                    <p><i class="fas fa-arrow-up"></i> 35% growth in homestay bookings</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Add event listener to close button
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Add event listeners for tab buttons
        const tabButtons = modal.querySelectorAll('.tab-btn');
        const tabContents = modal.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked button and corresponding tab
                this.classList.add('active');
                const tabName = this.getAttribute('data-tab');
                modal.querySelector(`.${tabName}-tab`).classList.add('active');
                
                // Render the appropriate chart when tab is clicked
                if (tabName === 'visitor') {
                    renderVisitorChart();
                } else if (tabName === 'sustainability') {
                    renderSustainabilityChart();
                } else if (tabName === 'trends') {
                    renderTrendsChart();
                }
            });
        });
        
        // Function to render visitor stats chart
        function renderVisitorChart() {
            // In a real app, this would use a charting library like Chart.js
            const canvas = document.getElementById('visitorStatsCanvas');
            if (!canvas) return;
            
            // Mock implementation - in a real app, this would create an actual chart
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw mock chart (just a visual representation)
                ctx.beginPath();
                ctx.moveTo(50, 150);
                ctx.lineTo(100, 100);
                ctx.lineTo(150, 120);
                ctx.lineTo(200, 80);
                ctx.lineTo(250, 40);
                ctx.lineTo(300, 60);
                ctx.lineTo(350, 90);
                ctx.lineTo(400, 130);
                ctx.lineTo(450, 110);
                ctx.lineTo(500, 70);
                ctx.lineTo(550, 90);
                ctx.lineTo(600, 120);
                ctx.strokeStyle = '#4CAF50';
                ctx.lineWidth = 3;
                ctx.stroke();
                
                // Add labels
                ctx.font = '14px Arial';
                ctx.fillStyle = '#333';
                ctx.fillText('Jan', 50, 180);
                ctx.fillText('Feb', 100, 180);
                ctx.fillText('Mar', 150, 180);
                ctx.fillText('Apr', 200, 180);
                ctx.fillText('May', 250, 180);
                ctx.fillText('Jun', 300, 180);
                ctx.fillText('Jul', 350, 180);
                ctx.fillText('Aug', 400, 180);
                ctx.fillText('Sep', 450, 180);
                ctx.fillText('Oct', 500, 180);
                ctx.fillText('Nov', 550, 180);
                ctx.fillText('Dec', 600, 180);
            }
        }
        
        // Function to render sustainability chart
        function renderSustainabilityChart() {
            // In a real app, this would use a charting library like Chart.js
            const canvas = document.getElementById('sustainabilityCanvas');
            if (!canvas) return;
            
            // Mock implementation - in a real app, this would create an actual chart
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw mock pie chart
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const radius = Math.min(centerX, centerY) - 20;
                
                // Draw segments
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 0.6, false);
                ctx.fillStyle = '#4CAF50';
                ctx.fill();
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, Math.PI * 0.6, Math.PI * 1.2, false);
                ctx.fillStyle = '#FFC107';
                ctx.fill();
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, Math.PI * 1.2, Math.PI * 2, false);
                ctx.fillStyle = '#F44336';
                ctx.fill();
                
                // Add legend
                ctx.font = '14px Arial';
                ctx.fillStyle = '#333';
                
                ctx.fillStyle = '#4CAF50';
                ctx.fillRect(centerX - 120, centerY + radius + 20, 15, 15);
                ctx.fillStyle = '#333';
                ctx.fillText('Eco-friendly transport (30%)', centerX - 100, centerY + radius + 33);
                
                ctx.fillStyle = '#FFC107';
                ctx.fillRect(centerX - 120, centerY + radius + 45, 15, 15);
                ctx.fillStyle = '#333';
                ctx.fillText('Waste reduction (30%)', centerX - 100, centerY + radius + 58);
                
                ctx.fillStyle = '#F44336';
                ctx.fillRect(centerX - 120, centerY + radius + 70, 15, 15);
                ctx.fillStyle = '#333';
                ctx.fillText('Carbon footprint (40%)', centerX - 100, centerY + radius + 83);
            }
        }
        
        // Function to render trends chart
        function renderTrendsChart() {
            // In a real app, this would use a charting library like Chart.js
            const canvas = document.getElementById('trendsCanvas');
            if (!canvas) return;
            
            // Mock implementation - in a real app, this would create an actual chart
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw mock bar chart
                const barWidth = 60;
                const spacing = 40;
                const baseY = 180;
                
                // Adventure Tourism
                ctx.fillStyle = '#3F51B5';
                ctx.fillRect(100, baseY - 120, barWidth, 120);
                
                // Culinary Tourism
                ctx.fillStyle = '#FF9800';
                ctx.fillRect(100 + barWidth + spacing, baseY - 140, barWidth, 140);
                
                // Homestays
                ctx.fillStyle = '#009688';
                ctx.fillRect(100 + (barWidth + spacing) * 2, baseY - 110, barWidth, 110);
                
                // Wellness Tourism
                ctx.fillStyle = '#9C27B0';
                ctx.fillRect(100 + (barWidth + spacing) * 3, baseY - 90, barWidth, 90);
                
                // Cultural Tourism
                ctx.fillStyle = '#E91E63';
                ctx.fillRect(100 + (barWidth + spacing) * 4, baseY - 130, barWidth, 130);
                
                // Add labels
                ctx.font = '14px Arial';
                ctx.fillStyle = '#333';
                ctx.fillText('Adventure', 100, baseY + 20);
                ctx.fillText('Culinary', 100 + barWidth + spacing, baseY + 20);
                ctx.fillText('Homestays', 100 + (barWidth + spacing) * 2, baseY + 20);
                ctx.fillText('Wellness', 100 + (barWidth + spacing) * 3, baseY + 20);
                ctx.fillText('Cultural', 100 + (barWidth + spacing) * 4, baseY + 20);
            }
        }
        
        // Render the initial visitor chart
        setTimeout(renderVisitorChart, 100);
    }
    
    // Chatbot functionality
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbot = document.getElementById('close-chatbot');
    const openChatbot = document.getElementById('open-chatbot');
    const sendMessage = document.getElementById('send-message');
    const userInput = document.getElementById('user-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    
    // Voice recognition functionality
    let recognition;
    let isListening = false;
    
    function setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                console.log('Voice input:', transcript);
                
                // Add the transcript to the input field
                const userInput = document.getElementById('user-input');
                if (userInput) {
                    userInput.value = transcript;
                    // Trigger send button click to process the voice input
                    document.getElementById('send-message').click();
                }
            };
            
            recognition.onerror = function(event) {
                console.error('Speech recognition error:', event.error);
                isListening = false;
                updateVoiceButton();
            };
            
            recognition.onend = function() {
                isListening = false;
                updateVoiceButton();
            };
            
            // Add voice button to the chatbot input
            addVoiceButton();
        } else {
            console.log('Speech recognition not supported in this browser');
        }
    }
    
    function addVoiceButton() {
        const chatbotInput = document.querySelector('.chatbot-input');
        if (chatbotInput) {
            const voiceButton = document.createElement('button');
            voiceButton.id = 'voice-input-button';
            voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceButton.title = 'Voice Input';
            chatbotInput.insertBefore(voiceButton, document.getElementById('send-message'));
            
            voiceButton.addEventListener('click', toggleVoiceInput);
        }
    }
    
    function toggleVoiceInput() {
        if (!recognition) return;
        
        if (isListening) {
            recognition.stop();
            isListening = false;
        } else {
            recognition.start();
            isListening = true;
        }
        
        updateVoiceButton();
    }
    
    function updateVoiceButton() {
        const voiceButton = document.getElementById('voice-input-button');
        if (voiceButton) {
            if (isListening) {
                voiceButton.classList.add('listening');
                voiceButton.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            } else {
                voiceButton.classList.remove('listening');
                voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
            }
        }
    }
    
    // Get user's location
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    userLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    // Once we have location, get weather data
                    getWeatherData(userLocation.latitude, userLocation.longitude);
                    // Determine closest Sikkim region based on predefined coordinates
                    determineClosestRegion(userLocation.latitude, userLocation.longitude);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    // Default to Gangtok if location access is denied
                    userLocation = {
                        region: 'Gangtok',
                        latitude: 27.3389,
                        longitude: 88.6065
                    };
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            // Default to Gangtok
            userLocation = {
                region: 'Gangtok',
                latitude: 27.3389,
                longitude: 88.6065
            };
        }
    }
    
    // Get weather data using OpenWeatherMap API
    async function getWeatherData(latitude, longitude) {
        try {
            // Note: In a production environment, you would use your own API key
            // This is a placeholder for demonstration purposes
            const apiKey = 'placeholder_api_key';
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
            
            if (!response.ok) {
                throw new Error(`Weather API request failed with status ${response.status}`);
            }
            
            weatherData = await response.json();
            console.log('Weather data:', weatherData);
            
            // Update UI with location and weather information
            updateLocationUI(userLocation.region, {
                temp: weatherData.main.temp,
                description: weatherData.weather[0].description
            });
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Use mock weather data as fallback
            weatherData = {
                main: { temp: 22, humidity: 65 },
                weather: [{ main: 'Clouds', description: 'scattered clouds' }],
                wind: { speed: 2.1 }
            };
            
            // Update UI with location and weather information even when using fallback data
            if (userLocation && userLocation.region) {
                updateLocationUI(userLocation.region, {
                    temp: weatherData.main.temp,
                    description: weatherData.weather[0].description
                });
            }
        }
    }
    
    // Determine closest Sikkim region based on coordinates
    function determineClosestRegion(latitude, longitude) {
        // Predefined coordinates for main regions in Sikkim
        const regions = {
            'Gangtok': { lat: 27.3389, lng: 88.6065 },
            'Pelling': { lat: 27.3000, lng: 88.2333 },
            'Lachung': { lat: 27.6909, lng: 88.7463 },
            'Ravangla': { lat: 27.3000, lng: 88.3667 },
            'Namchi': { lat: 27.1667, lng: 88.3667 }
        };
        
        let closestRegion = 'Gangtok';
        let minDistance = Number.MAX_VALUE;
        
        for (const [region, coords] of Object.entries(regions)) {
            const distance = calculateDistance(
                latitude, longitude,
                coords.lat, coords.lng
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                closestRegion = region;
            }
        }
        
        userLocation.region = closestRegion;
        console.log(`Closest region: ${closestRegion}`);
    }
    
    // Calculate distance between two coordinates using Haversine formula
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const distance = R * c; // Distance in km
        return distance;
    }
    
    function deg2rad(deg) {
        return deg * (Math.PI/180);
    }
    
    // Initialize location services
    getUserLocation();
    
    // Initialize voice recognition
    setupVoiceRecognition();
    
    // Update UI with location and weather information
    function updateLocationUI(region, weather) {
        const regionDisplay = document.getElementById('region-display');
        const weatherDisplay = document.getElementById('weather-display');
        
        if (regionDisplay && region) {
            regionDisplay.textContent = region;
        }
        
        if (weatherDisplay && weather) {
            weatherDisplay.textContent = `${weather.temp}°C, ${weather.description}`;
        }
    }
    
    // Function to check and display safety alerts
    function checkSafetyAlerts() {
        if (!userLocation || !userLocation.region) return;
        
        const alerts = safetyAlerts[userLocation.region];
        if (!alerts || alerts.length === 0) return;
        
        // Display safety alert in chatbot if it's open
        if (chatbotContainer.classList.contains('active')) {
            const alertMessage = `⚠️ SAFETY ALERT for ${userLocation.region}: ${alerts[Math.floor(Math.random() * alerts.length)]}`;
            addMessage(alertMessage);
        }
    }
    
    // Check for safety alerts periodically (simulating movement detection)
    setInterval(checkSafetyAlerts, 300000); // Check every 5 minutes
    
    // Enhanced Customer Care Services Data
    const customerCareServices = {
        booking: {
            phone: '+91-1800-102-1414',
            email: 'bookings@sikkimtourism.gov.in',
            hours: '9:00 AM - 6:00 PM (IST)',
            whatsapp: '+91-98765-43210'
        },
        emergency: {
            police: '100',
            ambulance: '108',
            fire: '101',
            tourism: '+91-3592-202033',
            hours: '24/7'
        },
        support: {
            phone: '+91-3592-280311',
            email: 'support@sikkimtourism.gov.in',
            hours: '8:00 AM - 8:00 PM (IST)',
            chat: 'Live chat available on website'
        },
        permits: {
            phone: '+91-3592-280214',
            email: 'permits@sikkim.gov.in',
            online: 'https://sikkim.gov.in/permit',
            hours: '10:00 AM - 4:00 PM (Mon-Fri)'
        }
    };
    
    // FAQ Knowledge Base
    const faqDatabase = {
        'permit': {
            question: 'Do I need permits to visit Sikkim?',
            answer: 'For Indian citizens, no permit is needed for Gangtok and most tourist areas. However, you need Inner Line Permits (ILP) for restricted areas like Nathula Pass, Gurudongmar Lake, and Yumthang Valley. Foreign nationals need Restricted Area Permits (RAP).'
        },
        'best time': {
            question: 'What is the best time to visit Sikkim?',
            answer: 'March to May (spring) and September to November (autumn) are ideal for clear mountain views. December to February is perfect for snow lovers but roads may be closed. Avoid June to August due to monsoons.'
        },
        'altitude': {
            question: 'How to prevent altitude sickness?',
            answer: 'Ascend gradually, stay hydrated, avoid alcohol, get adequate rest, eat light meals, and consult a doctor if symptoms persist. Consider carrying medication like Diamox after medical consultation.'
        },
        'currency': {
            question: 'What currency is used in Sikkim?',
            answer: 'Indian Rupee (INR). ATMs are available in major towns. Credit cards are accepted in hotels and restaurants in Gangtok, but carry cash for remote areas.'
        },
        'transport': {
            question: 'How to reach and travel within Sikkim?',
            answer: 'Nearest airport: Bagdogra (124km). Railway: New Jalpaiguri (148km). Shared taxis and buses available. Book vehicles in advance during peak season.'
        },
        'food': {
            question: 'What food is available in Sikkim?',
            answer: 'Sikkim offers diverse cuisine including Tibetan, Nepali, and Indian food. Must-try: Momos, Thukpa, Gundruk, Chang, and local organic vegetables. Vegetarian options widely available.'
        },
        'accommodation': {
            question: 'What accommodation options are available?',
            answer: 'From budget homestays to luxury resorts. Government-approved homestays offer authentic experiences. Book in advance during peak seasons (March-May, October-November).'
        },
        'internet': {
            question: 'Is internet available in Sikkim?',
            answer: 'Good connectivity in Gangtok, Pelling, Namchi. Limited in remote areas like Lachung, Lachen. Mobile networks: Airtel, BSNL, Jio work well in most tourist areas.'
        }
    };
    
    // Quick Response Templates
    const quickResponses = [
        { text: '🗺️ Trip Planning', action: 'trip_planning' },
        { text: '📞 Customer Support', action: 'customer_support' },
        { text: '🍽️ Local Food Guide', action: 'local_food' },
        { text: '🚨 Emergency Help', action: 'emergency' },
        { text: '📋 Permits & Docs', action: 'permits' },
        { text: '🌤️ Weather Info', action: 'weather' },
        { text: '💰 Booking Help', action: 'booking' },
        { text: '❓ Common FAQs', action: 'faqs' }
    ];

    // Gemini API key
    const GEMINI_API_KEY = 'AIzaSyAE0f-M8FU0IRXLVFcLNgNRTN7R8558P5o';
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    // Toggle chatbot visibility
    function toggleChatbot() {
        chatbotContainer.classList.toggle('active');
        
        // Add welcome message and quick responses when first opened
        if (chatbotContainer.classList.contains('active') && chatbotMessages.children.length <= 1) {
            setTimeout(() => {
                addMessage(`🙏 Welcome to Sikkim Tourism AI Assistant! I'm here to help you with:\n\n• Trip planning & personalized recommendations\n• Customer support & booking assistance\n• Local information & cultural guidance\n• Safety alerts & emergency help\n• Weather updates & travel conditions\n\nChoose a quick option below or ask me anything!`, false);
                setTimeout(() => addQuickResponses(), 500);
            }, 800);
        }
    }
    
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', toggleChatbot);
    }
    
    if (closeChatbot) {
        closeChatbot.addEventListener('click', toggleChatbot);
    }
    
    if (openChatbot) {
        openChatbot.addEventListener('click', function(e) {
            e.preventDefault();
            chatbotContainer.classList.add('active');
        });
    }
    
    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        const messagePara = document.createElement('p');
        messagePara.innerHTML = message.replace(/\n/g, '<br>'); // Support line breaks
        
        messageContent.appendChild(messagePara);
        messageDiv.appendChild(messageContent);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Function to add quick response buttons
    function addQuickResponses() {
        const quickResponseDiv = document.createElement('div');
        quickResponseDiv.className = 'quick-responses';
        
        const headerP = document.createElement('p');
        headerP.innerHTML = '<strong>🚀 Quick Help Options:</strong>';
        quickResponseDiv.appendChild(headerP);
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'quick-response-buttons';
        
        quickResponses.forEach(response => {
            const button = document.createElement('button');
            button.className = 'quick-response-btn';
            button.textContent = response.text;
            button.onclick = () => handleQuickResponse(response.action);
            buttonContainer.appendChild(button);
        });
        
        quickResponseDiv.appendChild(buttonContainer);
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.appendChild(quickResponseDiv);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Function to handle quick responses
    function handleQuickResponse(action) {
        let response = '';
        
        switch(action) {
            case 'trip_planning':
                response = `🏔️ **Let me help plan your perfect Sikkim trip!**

Please tell me:
• How many days will you be visiting?
• What interests you most? (Nature, Culture, Adventure, Wellness)
• What's your budget range?
• Are you traveling solo, with family, or in a group?
• Any specific places you want to visit?

I'll create a personalized itinerary based on your current location: **${userLocation?.region || 'Sikkim'}**`;
                break;
            case 'customer_support':
                response = `📞 **Customer Support Contacts:**

🏢 **Booking Support:**
📞 Phone: ${customerCareServices.booking.phone}
📧 Email: ${customerCareServices.booking.email}
⏰ Hours: ${customerCareServices.booking.hours}

🆘 **General Support:**
📞 Phone: ${customerCareServices.support.phone}
📧 Email: ${customerCareServices.support.email}
⏰ Hours: ${customerCareServices.support.hours}

🚨 **Emergency Helpline:** ${customerCareServices.emergency.tourism}

How can I assist you right now?`;
                break;
            case 'local_food':
                const currentRegion = userLocation?.region || 'Gangtok';
                const foods = localCuisine[currentRegion] || localCuisine['Gangtok'];
                const drinks = localDrinks[currentRegion] || localDrinks['Gangtok'];
                response = `🍽️ **Local Cuisine in ${currentRegion}:**

**Must-try dishes:**
${foods.slice(0, 3).map(food => `• **${food.name}**: ${food.description}`).join('
')}

**Traditional drinks:**
${drinks.slice(0, 3).map(drink => `• **${drink.name}**: ${drink.description}`).join('
')}

📍 Would you like specific restaurant recommendations or cooking classes?`;
                break;
            case 'emergency':
                response = `🚨 **EMERGENCY CONTACTS:**

⚡ **Immediate Emergency:** 112
👮 Police: ${customerCareServices.emergency.police}
🏥 Ambulance: ${customerCareServices.emergency.ambulance}
🔥 Fire: ${customerCareServices.emergency.fire}
🏝️ Tourism Helpline: ${customerCareServices.emergency.tourism}

📍 **Your current area:** ${userLocation?.region || 'Unknown'}

⚠️ **Are you facing an emergency right now?** Please call the appropriate number immediately. I can also help you share your location with emergency services.`;
                break;
            case 'permits':
                response = `📄 **Permit Information:**

🇮🇳 **For Indian Citizens:**
• No permit needed for Gangtok and most tourist areas
• Inner Line Permit (ILP) required for: Nathula Pass, Gurudongmar Lake, Yumthang Valley

🌍 **For Foreign Nationals:**
• Restricted Area Permit (RAP) required
• Apply through registered tour operators

📞 **Permits Office:** ${customerCareServices.permits.phone}
🌐 **Online Applications:** ${customerCareServices.permits.online}
⏰ **Office Hours:** ${customerCareServices.permits.hours}

Need help with specific permit requirements?`;
                break;
            case 'weather':
                const weather = weatherData || { temp: '22°C', condition: 'Pleasant' };
                response = `🌦️ **Weather Update for ${userLocation?.region || 'Sikkim'}:**

🌡️ **Current:** ${weather.temp || '22°C'}
☁️ **Condition:** ${weather.condition || 'Pleasant'}

🌱 **Best Visiting Seasons:**
• **Spring (Mar-May):** Perfect for rhododendrons & clear views
• **Autumn (Sep-Nov):** Ideal weather & mountain visibility
• **Winter (Dec-Feb):** Snow experience but cold
• **Monsoon (Jun-Aug):** Avoid due to heavy rainfall

Would you like a detailed 5-day forecast?`;
                break;
            case 'booking':
                response = `💰 **Booking Assistance:**

🏨 **Accommodations:**
• Luxury hotels & resorts
• Government-approved homestays
• Budget guesthouses & hostels

🚗 **Transportation:**
• Shared taxis & buses
• Private vehicle rentals
• Adventure tour packages

📞 **Booking Support:** ${customerCareServices.booking.phone}
📧 **Email:** ${customerCareServices.booking.email}
📱 **WhatsApp:** ${customerCareServices.booking.whatsapp}

**What would you like to book today?**`;
                break;
            case 'faqs':
                response = `❓ **Frequently Asked Questions:**

🔁 **Quick Answers Available For:**
• Permit requirements & documentation
• Best time to visit different regions
• Altitude sickness prevention
• Currency & payment methods
• Transportation options
• Local food & dietary options
• Accommodation types
• Internet & connectivity

**Just ask me about any of these topics, or type your specific question!**`;
                break;
            default:
                response = '🚀 How can I help you with your Sikkim adventure today?';
        }
        
        addMessage(response, false);
    }
    
    // Function to check FAQ database
    function checkFAQDatabase(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [key, faq] of Object.entries(faqDatabase)) {
            if (lowerMessage.includes(key)) {
                return `❓ **${faq.question}**\n\n${faq.answer}`;
            }
        }
        
        // Check for customer service keywords
        if (lowerMessage.includes('booking') || lowerMessage.includes('reservation') || lowerMessage.includes('book')) {
            return `💰 **Booking Services:**

📞 **Call:** ${customerCareServices.booking.phone}
📧 **Email:** ${customerCareServices.booking.email}
📱 **WhatsApp:** ${customerCareServices.booking.whatsapp}
⏰ **Hours:** ${customerCareServices.booking.hours}

**Online Booking:** Available on our website
**Payment:** Cash, Card, UPI accepted

What would you like to book?`;
        }
        
        if (lowerMessage.includes('complaint') || lowerMessage.includes('problem') || lowerMessage.includes('issue') || lowerMessage.includes('help')) {
            return `🙏 **We're here to help resolve your concern!**\n\n📞 **Support Team:** ${customerCareServices.support.phone}\n📧 **Email:** ${customerCareServices.support.email}\n⏰ **Available:** ${customerCareServices.support.hours}\n\n**For urgent issues:** ${customerCareServices.emergency.tourism}\n\nPlease describe your issue, and I'll do my best to assist you right now!`;
        }
        
        if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
            return `🔄 **Cancellation & Refund Policy:**

✅ **More than 48 hours:** Full refund
🟡 **24-48 hours before:** 50% refund
❌ **Less than 24 hours:** No refund (except emergencies)

📞 **For cancellations:** ${customerCareServices.booking.phone}
📧 **Email:** ${customerCareServices.booking.email}

**Please have your booking reference ready**

Special circumstances? Contact our support team!`;
        }
        
        return null;
    }
    
    // Backend API URL
    const BACKEND_API_URL = 'http://localhost:3000/api';
    
    // Function to send message to Backend API
    async function sendToGemini(userMessage) {
        try {
            // Prepare context data
            const context = {
                preferences: {},
                history: [],
                timestamp: new Date().toISOString()
            };
            
            // Send to our enhanced backend API
            const response = await fetch(`${BACKEND_API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMessage,
                    userLocation: userLocation,
                    context: context
                })
            });
            
            if (!response.ok) {
                console.error(`Backend API request failed with status ${response.status}`);
                throw new Error(`API request failed with status ${response.status}. Please check the backend server.`);
            }
            
            const data = await response.json();
            
            if (data.success && data.response) {
                return data.response;
            } else {
                throw new Error(data.error || 'Unexpected API response format');
            }
        } catch (error) {
            console.error('Error calling Backend API:', error);
            if (error.message.includes('Failed to fetch')) {
                return `🔌 **Backend Connection Issue**

I'm having trouble connecting to our backend services. This might be because:

• The backend server isn't running
• There's a network connectivity issue

**For immediate assistance:**
📞 Call: ${customerCareServices.support.phone}
📧 Email: ${customerCareServices.support.email}

To start the backend server, run: \`npm start\``;
            } else if (error.message.includes('500')) {
                return 'Sorry, there\'s a temporary server issue. Our technical team has been notified. Please try again in a few moments.';
            } else {
                return `Sorry, I encountered an error while processing your request. Please try again or contact our support team:\n\n📞 ${customerCareServices.support.phone}\n📧 ${customerCareServices.support.email}`;
            }
        }
    }
    
    // Handle send button click
    if (sendMessage) {
        sendMessage.addEventListener('click', async function() {
            const message = userInput.value.trim();
            if (message) {
                // Add user message to chat
                addMessage(message, true);
                
                // Clear input
                userInput.value = '';
                
                // Check FAQ first for quick responses
                const faqResponse = checkFAQDatabase(message);
                if (faqResponse) {
                    addMessage(faqResponse, false);
                    return;
                }
                
                // Show typing indicator
                const typingDiv = document.createElement('div');
                typingDiv.classList.add('message', 'bot-message', 'typing');
                typingDiv.innerHTML = '<div class="message-content"><p>🤖 Gemini is thinking...</p></div>';
                chatbotMessages.appendChild(typingDiv);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                
                try {
                    // Get response from Gemini API
                    const response = await sendToGemini(message);
                    
                    // Remove typing indicator
                    chatbotMessages.removeChild(typingDiv);
                    
                    // Add bot response
                    addMessage(response, false);
                } catch (error) {
                    // Remove typing indicator
                    if (chatbotMessages.contains(typingDiv)) {
                        chatbotMessages.removeChild(typingDiv);
                    }
                    
                    // Add error message with customer service fallback
                    const errorMessage = `I apologize, but I'm experiencing technical difficulties. For immediate assistance:\n\n📞 **Call:** ${customerCareServices.support.phone}\n📧 **Email:** ${customerCareServices.support.email}\n🚨 **Emergency:** ${customerCareServices.emergency.tourism}\n\nPlease try again in a moment.`;
                    addMessage(errorMessage, false);
                }
            }
        });
    }
    
    // Handle enter key press in input field
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage.click();
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle')) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    function showSlide(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
        
        testimonialSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
    }
    
    // Auto-advance testimonials
    let testimonialInterval = setInterval(() => {
        if (testimonialSlides.length > 0) {
            showSlide(currentSlide + 1);
        }
    }, 5000);
    
    // Pause auto-advance on hover
    const testimonialSection = document.querySelector('.testimonial-section');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSection.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        });
    }
    
    // AI Trip Planner
    const generatePlanBtn = document.getElementById('generate-plan');
    const aiResult = document.getElementById('ai-result');
    const itineraryContent = document.getElementById('itinerary-content');
    
    if (generatePlanBtn) {
        generatePlanBtn.addEventListener('click', function() {
            // Show loading state
            generatePlanBtn.textContent = 'Generating...';
            generatePlanBtn.disabled = true;
            
            // Simulate AI processing
            setTimeout(() => {
                // Get form values
                const days = document.getElementById('days').value;
                const budget = document.getElementById('budget').value;
                const interests = [];
                document.querySelectorAll('.checkbox-group input:checked').forEach(checkbox => {
                    interests.push(checkbox.value);
                });
                
                // Generate itinerary based on selections
                const itinerary = generateItinerary(days, interests, budget);
                
                // Display result
                itineraryContent.innerHTML = itinerary;
                aiResult.classList.remove('hidden');
                
                // Reset button
                generatePlanBtn.textContent = 'Generate Itinerary';
                generatePlanBtn.disabled = false;
                
                // Scroll to result
                aiResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 1500);
        });
    }
    
    // Save itinerary functionality
    const saveItineraryBtn = document.getElementById('save-itinerary');
    if (saveItineraryBtn) {
        saveItineraryBtn.addEventListener('click', function() {
            alert('Itinerary saved! You can access it from your account or we can email it to you.');
        });
    }
    
    // AR Experience button
    const launchArBtn = document.getElementById('launch-ar');
    if (launchArBtn) {
        launchArBtn.addEventListener('click', function() {
            simulateARExperience();
        });
    }
    
    // Initialize charts for sustainability section
    initCharts();
});

// Generate AI itinerary based on user preferences
function generateItinerary(days, interests, budget) {
    let itinerary = `<div class="itinerary-header">
        <h4>${days} Day Sikkim Adventure</h4>
        <p>Budget: ${getBudgetText(budget)} | Interests: ${interests.join(', ') || 'General'}</p>
    </div>`;
    
    // Sample attractions based on interests
    const attractions = {
        nature: ['Kanchenjunga National Park', 'Tsomgo Lake', 'Yumthang Valley', 'Seven Sisters Waterfall', 'Khecheopalri Lake'],
        culture: ['Rumtek Monastery', 'Enchey Monastery', 'Namgyal Institute of Tibetology', 'Do-Drul Chorten', 'Pemayangtse Monastery'],
        adventure: ['Goecha La Trek', 'River Rafting in Teesta', 'Mountain Biking', 'Paragliding', 'Rock Climbing'],
        wellness: ['Hot Springs at Yumthang', 'Sikkim Tea House Retreat', 'Himalayan Yoga Center', 'Ayurvedic Spa', 'Forest Bathing'],
        eco: ['Organic Farm Stay', 'Kanchenjunga Conservation Area', 'Maenam Wildlife Sanctuary', 'Green Village Tour', 'Sustainable Crafts Workshop']
    };
    
    // Accommodation options based on budget
    const accommodations = {
        budget: ['Backpacker Hostel', 'Budget Guesthouse', 'Homestay', 'Trekking Lodge'],
        mid: ['3-Star Hotel', 'Boutique Guesthouse', 'Mountain Resort', 'Eco Lodge'],
        luxury: ['Luxury Mountain Resort', 'Heritage Hotel', 'Spa Retreat', 'Premium Eco Resort']
    };
    
    // Generate daily itinerary
    itinerary += '<div class="daily-itinerary">';
    
    for (let day = 1; day <= days; day++) {
        // Select interests for this day (rotate through selected interests)
        let dayInterests = interests.length > 0 ? interests : ['nature', 'culture', 'adventure', 'wellness', 'eco'];
        let dayInterest = dayInterests[day % dayInterests.length];
        
        // Select attractions for this day
        let dayAttractions = [];
        if (attractions[dayInterest]) {
            // Pick 2-3 attractions from the selected interest
            const numAttractions = Math.min(Math.floor(Math.random() * 2) + 2, attractions[dayInterest].length);
            for (let i = 0; i < numAttractions; i++) {
                const randomIndex = Math.floor(Math.random() * attractions[dayInterest].length);
                dayAttractions.push(attractions[dayInterest][randomIndex]);
                attractions[dayInterest].splice(randomIndex, 1); // Remove to avoid duplicates
                
                // If we've used all attractions for this interest, reset the array
                if (attractions[dayInterest].length === 0) {
                    attractions[dayInterest] = ['Kanchenjunga National Park', 'Tsomgo Lake', 'Yumthang Valley', 'Seven Sisters Waterfall', 'Khecheopalri Lake'];
                }
            }
        }
        
        // Select accommodation
        const accommodation = accommodations[budget][Math.floor(Math.random() * accommodations[budget].length)];
        
        // Create day card
        itinerary += `
            <div class="day-card">
                <div class="day-header">
                    <h5>Day ${day}</h5>
                    <span class="day-theme">${capitalizeFirstLetter(dayInterest)} Focus</span>
                </div>
                <div class="day-content">
                    <p><strong>Morning:</strong> ${dayAttractions[0] || 'Free time to explore'}</p>
                    <p><strong>Afternoon:</strong> ${dayAttractions[1] || 'Local cuisine experience'}</p>
                    <p><strong>Evening:</strong> ${dayAttractions[2] || 'Relaxation at accommodation'}</p>
                    <p><strong>Stay:</strong> ${accommodation}</p>
                </div>
            </div>
        `;
    }
    
    itinerary += '</div>';
    
    // Add recommendations
    itinerary += `
        <div class="itinerary-recommendations">
            <h4>Personalized Recommendations</h4>
            <ul>
                <li>Best time to visit: ${getRecommendedSeason(interests)}</li>
                <li>Don't forget to pack: ${getPackingTips(interests)}</li>
                <li>Local specialty to try: ${getLocalSpecialty()}</li>
            </ul>
        </div>
    `;
    
    return itinerary;
}

// Helper functions for itinerary generation
function getBudgetText(budget) {
    switch(budget) {
        case 'budget': return 'Budget Friendly';
        case 'mid': return 'Mid Range';
        case 'luxury': return 'Luxury';
        default: return 'Mid Range';
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRecommendedSeason(interests) {
    if (interests.includes('adventure')) {
        return 'April-June for trekking, October-December for clear mountain views';
    } else if (interests.includes('nature')) {
        return 'March-May for rhododendron blooms, September-November for clear skies';
    } else {
        return 'October-December for pleasant weather and festivals';
    }
}

function getPackingTips(interests) {
    if (interests.includes('adventure')) {
        return 'Sturdy hiking boots, layers for variable temperatures, rain gear';
    } else if (interests.includes('wellness')) {
        return 'Comfortable yoga attire, swimwear for hot springs, meditation journal';
    } else {
        return 'Light layers, comfortable walking shoes, camera for stunning landscapes';
    }
}

function getLocalSpecialty() {
    const specialties = [
        'Momos (Tibetan dumplings)',
        'Thukpa (Noodle soup)',
        'Chhang (Millet beer)',
        'Gundruk (Fermented leafy greens)',
        'Sel Roti (Sweet rice bread)',
        'Sikkim tea'
    ];
    
    return specialties[Math.floor(Math.random() * specialties.length)];
}

// Simulate AR Experience
function simulateARExperience() {
    const arPlaceholder = document.querySelector('.ar-placeholder');
    
    if (arPlaceholder) {
        // Change placeholder to show "AR mode"
        arPlaceholder.innerHTML = `
            <div class="ar-simulation">
                <h3>AR Mode Active</h3>
                <p>Move your device to explore</p>
                <div class="ar-overlay">
                    <div class="ar-marker" style="top: 30%; left: 20%;">
                        <span class="ar-marker-dot"></span>
                        <div class="ar-marker-info">
                            <h4>Kanchenjunga Peak</h4>
                            <p>Elevation: 8,586 m (28,169 ft)</p>
                        </div>
                    </div>
                    <div class="ar-marker" style="top: 50%; left: 70%;">
                        <span class="ar-marker-dot"></span>
                        <div class="ar-marker-info">
                            <h4>Rumtek Monastery</h4>
                            <p>Buddhist learning center</p>
                        </div>
                    </div>
                    <div class="ar-marker" style="top: 70%; left: 40%;">
                        <span class="ar-marker-dot"></span>
                        <div class="ar-marker-info">
                            <h4>Teesta River</h4>
                            <p>Popular for river rafting</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add AR simulation styles
        const style = document.createElement('style');
        style.textContent = `
            .ar-simulation {
                width: 100%;
                height: 100%;
                background-image: url('https://source.unsplash.com/random/800x600/?sikkim,landscape');
                background-size: cover;
                background-position: center;
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: white;
                text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
            }
            
            .ar-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            
            .ar-marker {
                position: absolute;
                transform: translate(-50%, -50%);
                animation: pulse 2s infinite;
            }
            
            .ar-marker-dot {
                display: block;
                width: 20px;
                height: 20px;
                background-color: rgba(46, 139, 87, 0.8);
                border: 2px solid white;
                border-radius: 50%;
                cursor: pointer;
            }
            
            .ar-marker-info {
                position: absolute;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.7);
                padding: 10px 15px;
                border-radius: 5px;
                width: 200px;
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
            }
            
            .ar-marker:hover .ar-marker-info {
                opacity: 1;
            }
            
            .ar-marker-info h4 {
                margin-bottom: 5px;
                font-size: 16px;
            }
            
            .ar-marker-info p {
                margin: 0;
                font-size: 14px;
            }
            
            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(46, 139, 87, 0.4);
                }
                70% {
                    box-shadow: 0 0 0 10px rgba(46, 139, 87, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(46, 139, 87, 0);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Change button text
        const launchArBtn = document.getElementById('launch-ar');
        if (launchArBtn) {
            launchArBtn.textContent = 'Exit AR Experience';
            launchArBtn.addEventListener('click', function() {
                // Reset placeholder
                arPlaceholder.innerHTML = `
                    <i class="fas fa-vr-cardboard"></i>
                    <p>Point your camera at this area to activate AR experience</p>
                `;
                
                // Reset button
                launchArBtn.textContent = 'Launch AR Experience';
            }, { once: true });
        }
    }
}

// Initialize charts for sustainability section
function initCharts() {
    // Waste Reduction Chart
    const wasteReductionCtx = document.getElementById('waste-reduction-chart');
    if (wasteReductionCtx) {
        new Chart(wasteReductionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Reduced', 'Current'],
                datasets: [{
                    data: [30, 70],
                    backgroundColor: ['#2e8b57', '#e0e0e0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Local Economy Chart
    const localEconomyCtx = document.getElementById('local-economy-chart');
    if (localEconomyCtx) {
        new Chart(localEconomyCtx, {
            type: 'doughnut',
            data: {
                labels: ['Increase', 'Base'],
                datasets: [{
                    data: [45, 55],
                    backgroundColor: ['#ff7f50', '#e0e0e0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Carbon Footprint Chart
    const carbonFootprintCtx = document.getElementById('carbon-footprint-chart');
    if (carbonFootprintCtx) {
        new Chart(carbonFootprintCtx, {
            type: 'doughnut',
            data: {
                labels: ['Reduced', 'Current'],
                datasets: [{
                    data: [25, 75],
                    backgroundColor: ['#4682b4', '#e0e0e0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}