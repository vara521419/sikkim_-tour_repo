const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname)));

// Configuration
const GEMINI_API_KEY = 'AIzaSyAE0f-M8FU0IRXLVFcLNgNRTN7R8558P5o';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// In-memory storage (replace with database in production)
let users = [];
let bookings = [];
let itineraries = [];
let emergencyContacts = [];
let weatherCache = new Map();
let attractionsData = [];
let feedbackData = [];
let newsletterSubscribers = [];

// File upload configuration
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Enhanced Gemini AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, userLocation, context } = req.body;

        // Enhanced context building
        const enhancedContext = {
            location: userLocation || 'Sikkim',
            timestamp: new Date().toISOString(),
            userPreferences: context?.preferences || {},
            conversationHistory: context?.history || [],
            currentWeather: await getCurrentWeather(userLocation?.region || 'Gangtok'),
            nearbyAttractions: getNearbyAttractions(userLocation?.region || 'Gangtok'),
            emergencyServices: getEmergencyServices(userLocation?.region || 'Gangtok'),
            localSpecialties: getLocalSpecialties(userLocation?.region || 'Gangtok')
        };

        const systemPrompt = `You are SikkimBot, an advanced AI tourism assistant for Sikkim, India. You provide expert guidance with professional customer service.

CURRENT CONTEXT:
- User Location: ${enhancedContext.location}
- Weather: ${enhancedContext.currentWeather.condition}, ${enhancedContext.currentWeather.temperature}
- Nearby Attractions: ${enhancedContext.nearbyAttractions.join(', ')}
- Local Specialties: ${enhancedContext.localSpecialties.food.join(', ')}

CUSTOMER SERVICE CONTACTS:
- Booking Support: +91-1800-102-1414 (9 AM - 6 PM IST)
- Emergency Tourism Helpline: +91-3592-202033 (24/7)
- General Support: +91-3592-280311 (8 AM - 8 PM IST)
- Permits Office: +91-3592-280214 (10 AM - 4 PM Mon-Fri)

CAPABILITIES:
- Trip planning and personalized itineraries
- Real-time weather and safety information  
- Local culture, food, and tradition guidance
- Adventure activity recommendations
- Accommodation and transport booking assistance
- Emergency support and safety alerts
- Permit requirements and documentation help
- Eco-tourism and sustainability advice
- Accessibility information and special assistance

GUIDELINES:
- Be professional, empathetic, and helpful
- Provide accurate, actionable information
- Include relevant contact details when needed
- Offer step-by-step solutions
- Use emojis appropriately for engagement
- Prioritize user safety and satisfaction

User Message: ${message}`;

        const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            contents: [{
                parts: [{ text: systemPrompt }]
            }]
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        const aiResponse = response.data.candidates[0].content.parts[0].text;

        // Log conversation for analytics
        logConversation(message, aiResponse, enhancedContext);

        res.json({
            success: true,
            response: aiResponse,
            context: enhancedContext,
            suggestions: generateSuggestions(message, enhancedContext)
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Sorry, I\'m experiencing technical difficulties. Please contact our support team at +91-3592-280311 for immediate assistance.',
            fallback: {
                bookingSupport: '+91-1800-102-1414',
                emergencyHelp: '+91-3592-202033',
                generalSupport: '+91-3592-280311'
            }
        });
    }
});

// AI Trip Planner Endpoint
app.post('/api/trip-planner', async (req, res) => {
    try {
        const { days, interests, budget, travelers, startDate } = req.body;

        const plannerPrompt = `Create a detailed ${days}-day Sikkim travel itinerary for ${travelers} travelers with ${budget} budget, interested in: ${interests.join(', ')}.

Include:
- Daily schedules with specific attractions
- Accommodation recommendations
- Transportation details
- Meal suggestions
- Activity costs
- Safety tips
- Best photo spots
- Local experiences

Format as structured JSON with days array containing: day, activities, meals, accommodation, transport, costs, tips.`;

        const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            contents: [{
                parts: [{ text: plannerPrompt }]
            }]
        });

        const itinerary = {
            id: uuidv4(),
            userId: req.body.userId || 'anonymous',
            details: req.body,
            content: response.data.candidates[0].content.parts[0].text,
            createdAt: new Date().toISOString(),
            status: 'active'
        };

        itineraries.push(itinerary);

        res.json({
            success: true,
            itinerary: itinerary,
            downloadUrl: `/api/itinerary/${itinerary.id}/download`
        });

    } catch (error) {
        console.error('Trip Planner Error:', error);
        res.status(500).json({
            success: false,
            error: 'Unable to generate itinerary. Please try again or contact support.'
        });
    }
});

// Weather API Integration
app.get('/api/weather/:location', async (req, res) => {
    try {
        const { location } = req.params;
        const cacheKey = `weather_${location}`;
        
        // Check cache (5-minute expiry)
        if (weatherCache.has(cacheKey)) {
            const cached = weatherCache.get(cacheKey);
            if (Date.now() - cached.timestamp < 5 * 60 * 1000) {
                return res.json(cached.data);
            }
        }

        // Mock weather data (replace with real API like OpenWeatherMap)
        const weatherData = await getMockWeatherData(location);
        
        weatherCache.set(cacheKey, {
            data: weatherData,
            timestamp: Date.now()
        });

        res.json(weatherData);

    } catch (error) {
        console.error('Weather API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Unable to fetch weather data'
        });
    }
});

// Booking System
app.post('/api/bookings', async (req, res) => {
    try {
        const {
            type, // accommodation, transport, activity, package
            details,
            userInfo,
            dates,
            preferences
        } = req.body;

        const booking = {
            id: uuidv4(),
            type,
            details,
            userInfo,
            dates,
            preferences,
            status: 'pending',
            createdAt: new Date().toISOString(),
            confirmationCode: generateConfirmationCode()
        };

        bookings.push(booking);

        // Send confirmation email (mock)
        await sendBookingConfirmation(booking);

        res.json({
            success: true,
            booking: booking,
            message: 'Booking request submitted successfully!',
            nextSteps: [
                'You will receive confirmation within 24 hours',
                'Payment instructions will be sent via email',
                'Keep your confirmation code safe: ' + booking.confirmationCode
            ]
        });

    } catch (error) {
        console.error('Booking Error:', error);
        res.status(500).json({
            success: false,
            error: 'Booking failed. Please try again or contact support.'
        });
    }
});

// Emergency Services API
app.get('/api/emergency/:location', (req, res) => {
    try {
        const { location } = req.params;
        const services = getEmergencyServices(location);

        res.json({
            success: true,
            location: location,
            services: services,
            nationalEmergency: '112',
            tourismHelpline: '+91-3592-202033'
        });

    } catch (error) {
        console.error('Emergency Services Error:', error);
        res.status(500).json({
            success: false,
            error: 'Unable to fetch emergency services'
        });
    }
});

// Smart Navigation API
app.post('/api/navigation/route', async (req, res) => {
    try {
        const { from, to, routeType, preferences } = req.body;

        const routeData = {
            id: uuidv4(),
            from,
            to,
            type: routeType, // safe, eco, scenic, fastest
            distance: calculateDistance(from, to),
            duration: calculateDuration(from, to, routeType),
            waypoints: generateWaypoints(from, to, routeType),
            warnings: getRouteWarnings(from, to),
            ecoImpact: calculateEcoImpact(from, to, routeType),
            alternatives: generateAlternativeRoutes(from, to)
        };

        res.json({
            success: true,
            route: routeData,
            mapUrl: generateMapUrl(routeData)
        });

    } catch (error) {
        console.error('Navigation Error:', error);
        res.status(500).json({
            success: false,
            error: 'Unable to generate route'
        });
    }
});

// Local Attractions API
app.get('/api/attractions/:location', (req, res) => {
    try {
        const { location } = req.params;
        const { category, radius } = req.query;

        const attractions = getLocalAttractions(location, category, radius);

        res.json({
            success: true,
            location: location,
            attractions: attractions,
            total: attractions.length
        });

    } catch (error) {
        console.error('Attractions Error:', error);
        res.status(500).json({
            success: false,
            error: 'Unable to fetch attractions'
        });
    }
});

// Food & Culture API
app.get('/api/culture/:location', (req, res) => {
    try {
        const { location } = req.params;
        const cultureData = {
            food: getLocalSpecialties(location),
            festivals: getLocalFestivals(location),
            traditions: getLocalTraditions(location),
            languages: getLocalLanguages(location),
            crafts: getLocalCrafts(location),
            music: getLocalMusic(location)
        };

        res.json({
            success: true,
            location: location,
            culture: cultureData
        });

    } catch (error) {
        console.error('Culture API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Unable to fetch culture data'
        });
    }
});

// Eco-Tourism Tracking
app.post('/api/eco-tracking', (req, res) => {
    try {
        const { userId, activities, transportChoices, consumption } = req.body;

        const ecoMetrics = calculateEcoMetrics(activities, transportChoices, consumption);
        
        res.json({
            success: true,
            metrics: ecoMetrics,
            recommendations: generateEcoRecommendations(ecoMetrics),
            achievements: checkEcoAchievements(ecoMetrics)
        });

    } catch (error) {
        console.error('Eco Tracking Error:', error);
        res.status(500).json({
            success: false,
            error: 'Unable to track eco metrics'
        });
    }
});

// Accessibility Services API
app.get('/api/accessibility/:location', (req, res) => {
    try {
        const { location } = req.params;
        const { needs } = req.query;

        const accessibilityData = {
            wheelchairAccessible: getWheelchairAccessiblePlaces(location),
            visuallyImpairedSupport: getVisualSupport(location),
            hearingImpairedSupport: getHearingSupport(location),
            assistiveServices: getAssistiveServices(location),
            accessibleTransport: getAccessibleTransport(location),
            specialAccommodations: getSpecialAccommodations(location)
        };

        res.json({
            success: true,
            location: location,
            accessibility: accessibilityData,
            contactSupport: '+91-3592-280311'
        });

    } catch (error) {
        console.error('Accessibility API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Unable to fetch accessibility data'
        });
    }
});

// Newsletter Subscription
app.post('/api/newsletter/subscribe', async (req, res) => {
    try {
        const { email, preferences, name } = req.body;

        const subscription = {
            id: uuidv4(),
            email,
            name,
            preferences,
            subscribedAt: new Date().toISOString(),
            status: 'active'
        };

        newsletterSubscribers.push(subscription);

        res.json({
            success: true,
            message: 'Successfully subscribed to newsletter!',
            subscription: subscription
        });

    } catch (error) {
        console.error('Newsletter Subscription Error:', error);
        res.status(500).json({
            success: false,
            error: 'Subscription failed. Please try again.'
        });
    }
});

// Feedback System
app.post('/api/feedback', async (req, res) => {
    try {
        const { rating, comment, category, userInfo } = req.body;

        const feedback = {
            id: uuidv4(),
            rating,
            comment,
            category,
            userInfo,
            createdAt: new Date().toISOString(),
            status: 'received'
        };

        feedbackData.push(feedback);

        res.json({
            success: true,
            message: 'Thank you for your feedback!',
            feedback: feedback
        });

    } catch (error) {
        console.error('Feedback Error:', error);
        res.status(500).json({
            success: false,
            error: 'Unable to submit feedback'
        });
    }
});

// Analytics Dashboard (Admin)
app.get('/api/admin/analytics', (req, res) => {
    try {
        const analytics = {
            totalBookings: bookings.length,
            totalItineraries: itineraries.length,
            totalSubscribers: newsletterSubscribers.length,
            totalFeedback: feedbackData.length,
            popularDestinations: getPopularDestinations(),
            revenueData: getRevenueData(),
            userEngagement: getUserEngagementData(),
            performanceMetrics: getPerformanceMetrics()
        };

        res.json({
            success: true,
            analytics: analytics,
            lastUpdated: new Date().toISOString()
        });

    } catch (error) {
        console.error('Analytics Error:', error);
        res.status(500).json({
            success: false,
            error: 'Unable to fetch analytics'
        });
    }
});

// Helper Functions
async function getCurrentWeather(location) {
    // Mock weather data
    const weatherOptions = {
        'Gangtok': { condition: 'Partly Cloudy', temperature: '22°C', humidity: '65%' },
        'Pelling': { condition: 'Rainy', temperature: '18°C', humidity: '80%' },
        'Lachung': { condition: 'Snow', temperature: '5°C', humidity: '70%' },
        'Ravangla': { condition: 'Sunny', temperature: '25°C', humidity: '60%' },
        'Namchi': { condition: 'Cloudy', temperature: '20°C', humidity: '68%' }
    };
    
    return weatherOptions[location] || weatherOptions['Gangtok'];
}

function getNearbyAttractions(location) {
    const attractions = {
        'Gangtok': ['MG Marg', 'Rumtek Monastery', 'Tsomgo Lake', 'Nathula Pass'],
        'Pelling': ['Kanchenjunga Falls', 'Pemayangtse Monastery', 'Rabdentse Ruins'],
        'Lachung': ['Yumthang Valley', 'Zero Point', 'Lachung Monastery'],
        'Ravangla': ['Buddha Park', 'Temi Tea Garden', 'Ralang Monastery'],
        'Namchi': ['Char Dham', 'Samdruptse', 'Tendong Hill']
    };
    
    return attractions[location] || attractions['Gangtok'];
}

function getEmergencyServices(location) {
    return [
        { name: 'Police', number: '100', type: 'emergency' },
        { name: 'Ambulance', number: '108', type: 'emergency' },
        { name: 'Fire Service', number: '101', type: 'emergency' },
        { name: 'Tourism Helpline', number: '+91-3592-202033', type: 'tourism' },
        { name: 'District Hospital', number: '+91-3592-264111', type: 'medical' }
    ];
}

function getLocalSpecialties(location) {
    const specialties = {
        'Gangtok': {
            food: ['Momos', 'Thukpa', 'Gundruk', 'Phagshapa'],
            drinks: ['Chang', 'Tongba', 'Butter Tea']
        },
        'Pelling': {
            food: ['Sha Phaley', 'Sael Roti', 'Ningro'],
            drinks: ['Chaang', 'Raksi', 'Butter Tea']
        }
    };
    
    return specialties[location] || specialties['Gangtok'];
}

function generateSuggestions(message, context) {
    const suggestions = [
        'Tell me about local food',
        'What\'s the weather like?',
        'Plan a 3-day trip',
        'Emergency contacts',
        'Nearby attractions',
        'Book accommodation'
    ];
    
    return suggestions.slice(0, 4);
}

function logConversation(userMessage, aiResponse, context) {
    // Log for analytics (implement proper logging in production)
    console.log(`[CHAT] ${new Date().toISOString()} - Location: ${context.location} - Message: ${userMessage.substring(0, 50)}...`);
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Sikkim Tourism Backend Server running on port ${PORT}`);
    console.log(`📱 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🌐 Website: http://localhost:${PORT}`);
    console.log(`🤖 Gemini AI: Connected and Ready`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Server shutting down gracefully...');
    process.exit(0);
});

module.exports = app;