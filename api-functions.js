// Enhanced API Functions for Sikkim Tourism Backend

// Mock Weather Data Service
async function getMockWeatherData(location) {
    const baseWeather = {
        'Gangtok': {
            current: { temp: 22, condition: 'Partly Cloudy', humidity: 65, windSpeed: 12 },
            forecast: [
                { day: 'Mon', temp: 24, condition: 'Sunny', icon: 'sun' },
                { day: 'Tue', temp: 20, condition: 'Rainy', icon: 'rain' },
                { day: 'Wed', temp: 18, condition: 'Cloudy', icon: 'cloud' },
                { day: 'Thu', temp: 23, condition: 'Partly Cloudy', icon: 'partly-cloudy' },
                { day: 'Fri', temp: 25, condition: 'Sunny', icon: 'sun' }
            ]
        },
        'Pelling': {
            current: { temp: 18, condition: 'Rainy', humidity: 80, windSpeed: 8 },
            forecast: [
                { day: 'Mon', temp: 19, condition: 'Rainy', icon: 'rain' },
                { day: 'Tue', temp: 17, condition: 'Stormy', icon: 'storm' },
                { day: 'Wed', temp: 16, condition: 'Cloudy', icon: 'cloud' },
                { day: 'Thu', temp: 20, condition: 'Partly Cloudy', icon: 'partly-cloudy' },
                { day: 'Fri', temp: 22, condition: 'Sunny', icon: 'sun' }
            ]
        },
        'Lachung': {
            current: { temp: 5, condition: 'Snow', humidity: 70, windSpeed: 15 },
            forecast: [
                { day: 'Mon', temp: 3, condition: 'Snow', icon: 'snow' },
                { day: 'Tue', temp: 1, condition: 'Heavy Snow', icon: 'heavy-snow' },
                { day: 'Wed', temp: 4, condition: 'Cloudy', icon: 'cloud' },
                { day: 'Thu', temp: 6, condition: 'Partly Cloudy', icon: 'partly-cloudy' },
                { day: 'Fri', temp: 8, condition: 'Sunny', icon: 'sun' }
            ]
        }
    };

    const weather = baseWeather[location] || baseWeather['Gangtok'];
    
    return {
        success: true,
        location: location,
        current: weather.current,
        forecast: weather.forecast,
        alerts: generateWeatherAlerts(location, weather.current),
        lastUpdated: new Date().toISOString()
    };
}

function generateWeatherAlerts(location, currentWeather) {
    const alerts = [];
    
    if (currentWeather.temp < 10) {
        alerts.push({
            type: 'cold',
            severity: 'high',
            message: 'Very cold temperatures. Carry warm clothing and check road conditions.'
        });
    }
    
    if (currentWeather.condition.includes('Rain') || currentWeather.condition.includes('Storm')) {
        alerts.push({
            type: 'rain',
            severity: 'medium',
            message: 'Heavy rainfall expected. Landslide risk on mountain roads.'
        });
    }
    
    if (currentWeather.condition.includes('Snow')) {
        alerts.push({
            type: 'snow',
            severity: 'high',
            message: 'Snowfall conditions. Roads may be closed. Check with authorities.'
        });
    }
    
    return alerts;
}

// Distance and Duration Calculations
function calculateDistance(from, to) {
    const distances = {
        'Gangtok-Pelling': { distance: '115 km', driving: '4.5 hours' },
        'Gangtok-Lachung': { distance: '125 km', driving: '5 hours' },
        'Gangtok-Ravangla': { distance: '65 km', driving: '2.5 hours' },
        'Gangtok-Namchi': { distance: '78 km', driving: '3 hours' },
        'Pelling-Ravangla': { distance: '75 km', driving: '3 hours' },
        'Pelling-Namchi': { distance: '95 km', driving: '3.5 hours' }
    };
    
    const routeKey = `${from}-${to}`;
    return distances[routeKey] || distances[`${to}-${from}`] || { distance: '50 km', driving: '2 hours' };
}

function calculateDuration(from, to, routeType) {
    const baseTime = calculateDistance(from, to).driving;
    const multipliers = {
        'fastest': 1.0,
        'safe': 1.2,
        'scenic': 1.5,
        'eco': 1.3
    };
    
    return `${parseFloat(baseTime) * (multipliers[routeType] || 1.0)} hours`;
}

// Route Generation
function generateWaypoints(from, to, routeType) {
    const waypoints = {
        'Gangtok-Pelling': {
            'safe': ['Singtam', 'Jorethang', 'Legship'],
            'scenic': ['Rumtek Monastery', 'Temi Tea Garden', 'Khecheopalri Lake'],
            'eco': ['Organic Villages', 'Eco Parks', 'Sustainable Communities']
        },
        'Gangtok-Lachung': {
            'safe': ['Mangan', 'Chungthang'],
            'scenic': ['Seven Sisters Waterfall', 'Naga Waterfall', 'Yumthang Valley'],
            'eco': ['Rhododendron Sanctuary', 'Alpine Meadows']
        }
    };
    
    const routeKey = `${from}-${to}`;
    const route = waypoints[routeKey] || waypoints[`${to}-${from}`];
    return route ? route[routeType] || route['safe'] : [];
}

function getRouteWarnings(from, to) {
    const warnings = [
        {
            type: 'landslide',
            severity: 'medium',
            location: 'Near Singtam',
            message: 'Landslide prone area during monsoon season'
        },
        {
            type: 'altitude',
            severity: 'high',
            location: 'Above 3000m',
            message: 'High altitude area. Take precautions for altitude sickness'
        },
        {
            type: 'weather',
            severity: 'low',
            location: 'Mountain passes',
            message: 'Weather conditions can change rapidly'
        }
    ];
    
    return warnings;
}

// Eco Impact Calculation
function calculateEcoImpact(from, to, routeType) {
    const baseImpact = {
        carbonEmission: '15 kg CO2',
        fuelConsumption: '8 liters',
        ecoScore: 6
    };
    
    const ecoMultipliers = {
        'eco': 0.7,
        'safe': 0.9,
        'scenic': 1.1,
        'fastest': 1.2
    };
    
    const multiplier = ecoMultipliers[routeType] || 1.0;
    
    return {
        carbonEmission: `${Math.round(15 * multiplier)} kg CO2`,
        fuelConsumption: `${Math.round(8 * multiplier)} liters`,
        ecoScore: Math.round(10 - (baseImpact.ecoScore * multiplier)),
        tips: generateEcoTips(routeType)
    };
}

function generateEcoTips(routeType) {
    const tips = {
        'eco': [
            'Use shared transportation when possible',
            'Choose eco-friendly accommodations',
            'Support local communities'
        ],
        'safe': [
            'Follow designated trails',
            'Respect wildlife habitats',
            'Dispose waste properly'
        ],
        'scenic': [
            'Take only photographs, leave only footprints',
            'Stay on marked paths',
            'Avoid disturbing natural environments'
        ]
    };
    
    return tips[routeType] || tips['safe'];
}

// Local Attractions Data
function getLocalAttractions(location, category, radius) {
    const attractions = {
        'Gangtok': [
            {
                id: 1,
                name: 'MG Marg',
                category: 'cultural',
                description: 'The heart of Gangtok with shops, restaurants, and pedestrian-friendly streets',
                rating: 4.5,
                distance: '0 km',
                openHours: '24/7',
                entryFee: 'Free',
                coordinates: { lat: 27.3389, lng: 88.6065 }
            },
            {
                id: 2,
                name: 'Rumtek Monastery',
                category: 'religious',
                description: 'One of the most important Buddhist monasteries in Sikkim',
                rating: 4.8,
                distance: '23 km',
                openHours: '6:00 AM - 6:00 PM',
                entryFee: 'Free',
                coordinates: { lat: 27.3089, lng: 88.7414 }
            },
            {
                id: 3,
                name: 'Tsomgo Lake',
                category: 'nature',
                description: 'Sacred glacial lake at 12,400 ft altitude',
                rating: 4.7,
                distance: '40 km',
                openHours: '9:00 AM - 4:00 PM',
                entryFee: 'Permit required',
                coordinates: { lat: 27.4015, lng: 88.7507 }
            }
        ],
        'Pelling': [
            {
                id: 4,
                name: 'Kanchenjunga Falls',
                category: 'nature',
                description: 'Spectacular waterfall with rainbow formations',
                rating: 4.6,
                distance: '2 km',
                openHours: '6:00 AM - 6:00 PM',
                entryFee: '₹20',
                coordinates: { lat: 27.3178, lng: 88.2398 }
            },
            {
                id: 5,
                name: 'Pemayangtse Monastery',
                category: 'religious',
                description: 'Ancient monastery with stunning architecture',
                rating: 4.7,
                distance: '1 km',
                openHours: '7:00 AM - 5:00 PM',
                entryFee: 'Free',
                coordinates: { lat: 27.3245, lng: 88.2467 }
            }
        ]
    };
    
    let locationAttractions = attractions[location] || [];
    
    if (category && category !== 'all') {
        locationAttractions = locationAttractions.filter(attraction => 
            attraction.category === category
        );
    }
    
    return locationAttractions;
}

// Cultural Data Functions
function getLocalFestivals(location) {
    return [
        {
            name: 'Losar Festival',
            date: 'February-March',
            description: 'Tibetan New Year celebration with traditional dances',
            duration: '15 days',
            significance: 'Religious and Cultural'
        },
        {
            name: 'Saga Dawa',
            date: 'May-June',
            description: 'Buddha\'s birth, enlightenment, and death commemoration',
            duration: '1 month',
            significance: 'Religious'
        },
        {
            name: 'Pang Lhabsol',
            date: 'August-September',
            description: 'Worship of Mount Kanchenjunga',
            duration: '3 days',
            significance: 'Cultural and Religious'
        }
    ];
}

function getLocalTraditions(location) {
    return [
        {
            name: 'Traditional Architecture',
            description: 'Distinctive Sikkimese architectural style with wooden structures',
            examples: ['Monasteries', 'Traditional houses', 'Prayer wheels']
        },
        {
            name: 'Handicrafts',
            description: 'Traditional crafts passed down through generations',
            examples: ['Thangka paintings', 'Wood carving', 'Carpet weaving']
        },
        {
            name: 'Music and Dance',
            description: 'Rich tradition of folk music and ceremonial dances',
            examples: ['Chaam dance', 'Folk songs', 'Traditional instruments']
        }
    ];
}

function getLocalLanguages(location) {
    return [
        { name: 'Nepali', speakers: '65%', status: 'Official' },
        { name: 'Sikkimese', speakers: '10%', status: 'Official' },
        { name: 'Lepcha', speakers: '8%', status: 'Official' },
        { name: 'Hindi', speakers: '15%', status: 'Widely spoken' },
        { name: 'English', speakers: '40%', status: 'Official' }
    ];
}

function getLocalCrafts(location) {
    return [
        {
            name: 'Thangka Painting',
            description: 'Traditional Buddhist scroll paintings',
            materials: ['Canvas', 'Natural pigments', 'Gold leaf'],
            workshops: ['Gangtok Institute', 'Rumtek Monastery']
        },
        {
            name: 'Wood Carving',
            description: 'Intricate wooden sculptures and furniture',
            materials: ['Local wood', 'Traditional tools'],
            workshops: ['Local artisan centers']
        },
        {
            name: 'Carpet Weaving',
            description: 'Traditional Tibetan-style carpets',
            materials: ['Yak wool', 'Sheep wool'],
            workshops: ['Carpet weaving centers']
        }
    ];
}

function getLocalMusic(location) {
    return [
        {
            name: 'Traditional Folk Songs',
            description: 'Ancient songs in local languages',
            occasions: ['Festivals', 'Ceremonies', 'Celebrations']
        },
        {
            name: 'Buddhist Chants',
            description: 'Sacred religious music',
            occasions: ['Monastery prayers', 'Religious festivals']
        },
        {
            name: 'Modern Fusion',
            description: 'Contemporary music blending traditional and modern styles',
            occasions: ['Cultural events', 'Performances']
        }
    ];
}

// Accessibility Support Functions
function getWheelchairAccessiblePlaces(location) {
    return [
        {
            name: 'MG Marg',
            accessibility: 'Fully accessible pedestrian zone',
            facilities: ['Ramps', 'Accessible toilets', 'Wide pathways']
        },
        {
            name: 'Gangtok Ropeway',
            accessibility: 'Accessible cabins available',
            facilities: ['Staff assistance', 'Special boarding']
        }
    ];
}

function getVisualSupport(location) {
    return [
        {
            service: 'Audio Guides',
            locations: ['Major attractions', 'Museums', 'Monasteries'],
            availability: 'Available on request'
        },
        {
            service: 'Braille Information',
            locations: ['Tourist centers', 'Hotels'],
            availability: 'Limited locations'
        }
    ];
}

function getHearingSupport(location) {
    return [
        {
            service: 'Sign Language Interpreters',
            availability: 'Available on advance booking',
            contact: '+91-3592-280311'
        },
        {
            service: 'Written Information',
            locations: ['All tourist spots', 'Hotels', 'Transport hubs'],
            availability: 'Widely available'
        }
    ];
}

function getAssistiveServices(location) {
    return [
        {
            service: 'Personal Assistance',
            description: 'Trained assistants for guided tours',
            booking: 'Advance booking required',
            contact: '+91-3592-280311'
        },
        {
            service: 'Special Equipment',
            description: 'Wheelchairs, walking aids available',
            locations: ['Major hotels', 'Tourist centers'],
            cost: 'Free rental'
        }
    ];
}

function getAccessibleTransport(location) {
    return [
        {
            type: 'Accessible Taxis',
            availability: 'Limited, advance booking required',
            contact: '+91-9876543210'
        },
        {
            type: 'Special Tourist Vehicles',
            availability: 'Available for group bookings',
            contact: '+91-3592-280311'
        }
    ];
}

function getSpecialAccommodations(location) {
    return [
        {
            type: 'Accessible Rooms',
            features: ['Roll-in showers', 'Grab bars', 'Accessible doorways'],
            availability: 'Limited, advance booking essential'
        },
        {
            type: 'Ground Floor Rooms',
            features: ['No stairs access', 'Wide doors', 'Accessible bathrooms'],
            availability: 'Available in most hotels'
        }
    ];
}

// Eco Tourism Functions
function calculateEcoMetrics(activities, transportChoices, consumption) {
    let carbonFootprint = 0;
    let wasteGenerated = 0;
    let localSupport = 0;
    
    // Calculate based on activities
    activities.forEach(activity => {
        carbonFootprint += activity.carbonImpact || 0;
        wasteGenerated += activity.wasteImpact || 0;
        localSupport += activity.localSupport || 0;
    });
    
    // Calculate transport impact
    transportChoices.forEach(transport => {
        carbonFootprint += transport.emissions || 0;
    });
    
    const ecoScore = Math.max(0, 100 - carbonFootprint - wasteGenerated + localSupport);
    
    return {
        carbonFootprint: carbonFootprint,
        wasteGenerated: wasteGenerated,
        localSupport: localSupport,
        ecoScore: ecoScore,
        rating: getEcoRating(ecoScore)
    };
}

function getEcoRating(score) {
    if (score >= 80) return { level: 'Excellent', color: 'green', message: 'Outstanding eco-friendly choices!' };
    if (score >= 60) return { level: 'Good', color: 'lightgreen', message: 'Good environmental practices' };
    if (score >= 40) return { level: 'Fair', color: 'yellow', message: 'Room for improvement' };
    return { level: 'Poor', color: 'red', message: 'Consider more eco-friendly options' };
}

function generateEcoRecommendations(metrics) {
    const recommendations = [];
    
    if (metrics.carbonFootprint > 50) {
        recommendations.push({
            type: 'transport',
            suggestion: 'Use shared transportation or electric vehicles',
            impact: 'Reduce carbon footprint by 30%'
        });
    }
    
    if (metrics.wasteGenerated > 30) {
        recommendations.push({
            type: 'waste',
            suggestion: 'Carry reusable water bottles and bags',
            impact: 'Reduce waste by 40%'
        });
    }
    
    if (metrics.localSupport < 50) {
        recommendations.push({
            type: 'local',
            suggestion: 'Choose local homestays and eat at local restaurants',
            impact: 'Support local economy and reduce environmental impact'
        });
    }
    
    return recommendations;
}

function checkEcoAchievements(metrics) {
    const achievements = [];
    
    if (metrics.ecoScore >= 80) {
        achievements.push({
            name: 'Eco Warrior',
            description: 'Excellent environmental practices',
            badge: '🌟'
        });
    }
    
    if (metrics.localSupport >= 70) {
        achievements.push({
            name: 'Community Champion',
            description: 'Strong support for local communities',
            badge: '🤝'
        });
    }
    
    if (metrics.carbonFootprint <= 20) {
        achievements.push({
            name: 'Carbon Conscious',
            description: 'Low carbon footprint traveler',
            badge: '🌱'
        });
    }
    
    return achievements;
}

// Utility Functions
function generateConfirmationCode() {
    return 'SKM' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

async function sendBookingConfirmation(booking) {
    // Mock email sending
    console.log(`Sending confirmation email to ${booking.userInfo.email} for booking ${booking.confirmationCode}`);
    return true;
}

function generateMapUrl(routeData) {
    const baseUrl = 'https://maps.google.com/maps';
    const params = `?saddr=${routeData.from}&daddr=${routeData.to}&waypoints=${routeData.waypoints.join('|')}`;
    return baseUrl + params;
}

function generateAlternativeRoutes(from, to) {
    return [
        { type: 'Fastest Route', time: '3.5 hours', distance: '95 km', fuel: 'High' },
        { type: 'Scenic Route', time: '4.5 hours', distance: '110 km', fuel: 'Medium' },
        { type: 'Eco Route', time: '4 hours', distance: '100 km', fuel: 'Low' }
    ];
}

// Analytics Functions
function getPopularDestinations() {
    return [
        { name: 'Gangtok', visits: 15420, growth: '+12%' },
        { name: 'Pelling', visits: 9850, growth: '+8%' },
        { name: 'Lachung', visits: 7230, growth: '+15%' },
        { name: 'Ravangla', visits: 5640, growth: '+5%' },
        { name: 'Namchi', visits: 4580, growth: '+10%' }
    ];
}

function getRevenueData() {
    return {
        totalRevenue: '₹45,67,890',
        monthlyGrowth: '+18%',
        bookingRevenue: '₹32,45,000',
        tourRevenue: '₹13,22,890'
    };
}

function getUserEngagementData() {
    return {
        averageSessionTime: '8.5 minutes',
        bounceRate: '23%',
        pageViews: 156780,
        uniqueVisitors: 45230,
        chatbotInteractions: 8940
    };
}

function getPerformanceMetrics() {
    return {
        serverUptime: '99.8%',
        averageResponseTime: '245ms',
        errorRate: '0.1%',
        apiCalls: 234567
    };
}

module.exports = {
    getMockWeatherData,
    calculateDistance,
    calculateDuration,
    generateWaypoints,
    getRouteWarnings,
    calculateEcoImpact,
    getLocalAttractions,
    getLocalFestivals,
    getLocalTraditions,
    getWheelchairAccessiblePlaces,
    calculateEcoMetrics,
    generateEcoRecommendations,
    checkEcoAchievements,
    getPopularDestinations,
    getRevenueData,
    getUserEngagementData,
    getPerformanceMetrics
};