/*
 * FACIAL EXPRESSION DETECTOR APPLICATION
 * 
 * This application uses face-api.js to detect facial expressions in real-time
 * and display corresponding content. Below are the main customization points:
 * 
 * CUSTOMIZATION POINTS OVERVIEW:
 * 1. IMAGE_MAP: Replace placeholder emojis with your own images/content
 * 2. CONFIDENCE_THRESHOLD: Adjust sensitivity of expression detection
 * 3. MODEL_URLS: Change if you want to host models locally
 * 4. DETECTION_OPTIONS: Fine-tune face detection parameters
 * 5. UPDATE_INTERVAL: Control how often detection runs
 * 6. EXPRESSION_SMOOTHING: Add smoothing to reduce jittery changes
 */

// ============================================================================
// CUSTOMIZATION POINT 1: EXPRESSION TO CONTENT MAPPING
// ============================================================================
/**
 * Replace these emoji placeholders with your own images, videos, or HTML content
 * You can use:
 * - Image URLs: 'https://example.com/happy.jpg'
 * - Local images: './images/happy.png'
 * - HTML content: '<img src="happy.jpg" alt="Happy face">'
 * - Video elements: '<video autoplay loop><source src="happy.mp4"></video>'
 */
const IMAGE_MAP = {
    neutral: '😐',
    happy: '😊',
    sad: '😢',
    angry: '😠',
    fearful: '😨',
    disgusted: '🤢',
    surprised: '😲'
};

// ============================================================================
// CUSTOMIZATION POINT 2: DETECTION SENSITIVITY AND TIMING
// ============================================================================
/**
 * Adjust these values to fine-tune the detection behavior:
 * - CONFIDENCE_THRESHOLD: Higher = more confident detections (0.1 to 0.9)
 * - UPDATE_INTERVAL: How often to check for expressions in milliseconds
 * - EXPRESSION_HOLD_TIME: Minimum time to hold an expression before changing
 */
const CONFIDENCE_THRESHOLD = 0.5;
const UPDATE_INTERVAL = 100; // milliseconds between detection checks
const EXPRESSION_HOLD_TIME = 500; // milliseconds to hold expression

// ============================================================================
// CUSTOMIZATION POINT 3: MODEL CONFIGURATION
// ============================================================================
/**
 * face-api.js model URLs - you can host these locally for better performance
 * Download from: https://github.com/justadudewhohacks/face-api.js/tree/master/weights
 */
const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights';

/**
 * Detection options - adjust for performance vs accuracy
 * - inputSize: 128, 160, 224, 320, 416, 512, 608 (higher = more accurate, slower)
 * - scoreThreshold: minimum confidence for face detection (0.1 to 0.9)
 */
let DETECTION_OPTIONS;

// ============================================================================
// APPLICATION STATE AND ELEMENTS
// ============================================================================
let video, canvas, displayTimeDimensions;
let isDetecting = false;
let detectionInterval = null;
let lastExpressionChange = 0;
let currentExpression = 'neutral';
let modelsLoaded = false;

// DOM elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoElement = document.getElementById('video');
const overlayCanvas = document.getElementById('overlay');
const expressionImage = document.getElementById('expressionImage');
const expressionName = document.getElementById('expressionName');
const currentExpressionSpan = document.getElementById('currentExpression');
const confidenceSpan = document.getElementById('confidence');
const cameraStatusSpan = document.getElementById('cameraStatus');
const errorModal = document.getElementById('errorModal');
const loadingModal = document.getElementById('loadingModal');
const closeErrorModalBtn = document.getElementById('closeErrorModal');

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎬 Initializing Facial Expression Detector...');
    
    // Set up event listeners
    startBtn.addEventListener('click', startCamera);
    stopBtn.addEventListener('click', stopCamera);
    closeErrorModalBtn.addEventListener('click', closeErrorModal);
    
    // Wait for face-api.js to be available
    if (typeof faceapi === 'undefined') {
        console.log('⏳ Waiting for face-api.js to load...');
        
        // Add timeout for loading
        setTimeout(() => {
            if (typeof faceapi === 'undefined') {
                console.error('❌ face-api.js failed to load');
                hideLoadingModal();
                showError('Failed to load face-api.js library. Please check your internet connection and refresh the page.');
                return;
            }
        }, 10000);
        
        // Poll for face-api availability
        const checkInterval = setInterval(() => {
            if (typeof faceapi !== 'undefined') {
                clearInterval(checkInterval);
                loadModels();
            }
        }, 100);
    } else {
        // Load face-api.js models
        await loadModels();
    }
});

// ============================================================================
// CUSTOMIZATION POINT 4: MODEL LOADING
// ============================================================================
/**
 * Load required face-api.js models
 * You can comment out models you don't need for better loading speed:
 * - faceDetection: Required for basic face detection
 * - faceLandmarks: Optional, for drawing face landmarks
 * - faceExpressions: Required for expression recognition
 * - ageGender: Optional, if you want age/gender detection
 */
async function loadModels() {
    console.log('📦 Loading face-api.js models...');
    updateCameraStatus('Loading models...');
    
    try {
        // Initialize detection options
        DETECTION_OPTIONS = new faceapi.SsdMobilenetv1Options({
            inputSize: 224,
            scoreThreshold: 0.5
        });

        // Add loading timeout
        const loadingTimeout = setTimeout(() => {
            console.error('❌ Model loading timeout');
            hideLoadingModal();
            showError('Model loading timed out. You can still try to use the camera, but face detection may not work properly.');
            updateCameraStatus('Model loading failed - Camera available');
        }, 15000);

        // REQUIRED: Face detection model
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        console.log('✅ Face detection model loaded');
        
        // REQUIRED: Face landmarks model (needed for expressions)
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        console.log('✅ Face landmarks model loaded');
        
        // REQUIRED: Face expression recognition model
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        console.log('✅ Face expression model loaded');
        
        // OPTIONAL: Uncomment if you want age and gender detection
        // await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
        // console.log('✅ Age/Gender model loaded');
        
        // Clear timeout if we got here successfully
        clearTimeout(loadingTimeout);
        
        console.log('🎉 All models loaded successfully!');
        updateCameraStatus('Models loaded - Ready to start');
        modelsLoaded = true;
        hideLoadingModal();
        
    } catch (error) {
        console.error('❌ Error loading models:', error);
        hideLoadingModal();
        
        // Allow camera to work without models (won't detect expressions but camera will work)
        updateCameraStatus('Models failed to load - Camera available without detection');
        showError('Face detection models failed to load. You can still use the camera, but expression detection will not work. This may be due to network issues.');
    }
}

// ============================================================================
// CAMERA MANAGEMENT
// ============================================================================
async function startCamera() {
    console.log('📹 Starting camera...');
    updateCameraStatus('Starting camera...');
    
    try {
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user' // Front-facing camera
            }
        });
        
        // Set up video element
        videoElement.srcObject = stream;
        updateCameraStatus('Camera active');
        
        // Wait for video to load
        await new Promise(resolve => {
            videoElement.onloadedmetadata = () => {
                resolve();
            };
        });
        
        // Set up canvas overlay
        setupCanvas();
        
        // Start detection only if models are loaded
        if (modelsLoaded) {
            startDetection();
            updateCameraStatus('Camera active - Detection running');
        } else {
            updateCameraStatus('Camera active - Detection unavailable (models not loaded)');
        }
        
        // Update UI
        startBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');
        
        console.log('✅ Camera started successfully');
        
    } catch (error) {
        console.error('❌ Camera error:', error);
        let errorMessage = 'Failed to access camera. ';
        
        if (error.name === 'NotAllowedError') {
            errorMessage += 'Please allow camera access and try again.';
        } else if (error.name === 'NotFoundError') {
            errorMessage += 'No camera found on this device.';
        } else {
            errorMessage += 'Please check your camera settings.';
        }
        
        showError(errorMessage);
        updateCameraStatus('Camera error');
    }
}

function stopCamera() {
    console.log('🛑 Stopping camera...');
    
    // Stop detection
    stopDetection();
    
    // Stop video stream
    const stream = videoElement.srcObject;
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
    }
    
    // Clear canvas
    if (overlayCanvas) {
        const ctx = overlayCanvas.getContext('2d');
        ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    }
    
    // Reset UI
    startBtn.classList.remove('hidden');
    stopBtn.classList.add('hidden');
    updateCameraStatus('Camera stopped');
    updateExpressionDisplay('neutral', 0);
    currentExpressionSpan.textContent = 'None detected';
    confidenceSpan.textContent = '0%';
    
    console.log('✅ Camera stopped');
}

function setupCanvas() {
    // Match canvas size to video
    displayTimeDimensions = {
        width: videoElement.videoWidth,
        height: videoElement.videoHeight
    };
    
    overlayCanvas.width = displayTimeDimensions.width;
    overlayCanvas.height = displayTimeDimensions.height;
    
    // Scale canvas to match video element size
    const videoRect = videoElement.getBoundingClientRect();
    overlayCanvas.style.width = videoRect.width + 'px';
    overlayCanvas.style.height = videoRect.height + 'px';
}

// ============================================================================
// FACE DETECTION AND EXPRESSION RECOGNITION
// ============================================================================
function startDetection() {
    if (!modelsLoaded) {
        console.warn('⚠️ Cannot start detection - models not loaded');
        return;
    }
    
    isDetecting = true;
    
    detectionInterval = setInterval(async () => {
        if (!isDetecting) return;
        
        try {
            await detectExpressions();
        } catch (error) {
            console.error('Detection error:', error);
            // Don't stop detection on single errors
        }
    }, UPDATE_INTERVAL);
    
    console.log('🔍 Expression detection started');
}

function stopDetection() {
    isDetecting = false;
    if (detectionInterval) {
        clearInterval(detectionInterval);
        detectionInterval = null;
    }
    console.log('🔍 Expression detection stopped');
}

// ============================================================================
// CUSTOMIZATION POINT 5: DETECTION LOGIC
// ============================================================================
/**
 * Main detection function - customize this to change detection behavior
 * You can:
 * - Add face landmark drawing
 * - Implement expression smoothing/filtering
 * - Add multiple face support
 * - Log expressions to history
 * - Trigger custom actions based on expressions
 */
async function detectExpressions() {
    if (!modelsLoaded) return;
    
    try {
        // Get face detections with expressions
        const detections = await faceapi
            .detectAllFaces(videoElement, DETECTION_OPTIONS)
            .withFaceLandmarks()
            .withFaceExpressions();
        
        // Clear previous drawings
        const ctx = overlayCanvas.getContext('2d');
        ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        
        if (detections.length > 0) {
            // Use the first detected face
            const detection = detections[0];
            
            // CUSTOMIZATION: Draw face detection box (you can remove this)
            drawDetection(ctx, detection);
            
            // Get the dominant expression
            const expressions = detection.expressions;
            const dominantExpression = getDominantExpression(expressions);
            
            if (dominantExpression.confidence > CONFIDENCE_THRESHOLD) {
                // Only change if enough time has passed (reduces jitter)
                const now = Date.now();
                if (now - lastExpressionChange > EXPRESSION_HOLD_TIME || 
                    dominantExpression.expression !== currentExpression) {
                    
                    updateExpressionDisplay(dominantExpression.expression, dominantExpression.confidence);
                    currentExpression = dominantExpression.expression;
                    lastExpressionChange = now;
                    
                    // CUSTOMIZATION POINT: Add custom actions here
                    onExpressionDetected(dominantExpression.expression, dominantExpression.confidence);
                }
            }
            
            // Update status
            currentExpressionSpan.textContent = dominantExpression.expression;
            confidenceSpan.textContent = Math.round(dominantExpression.confidence * 100) + '%';
            
        } else {
            // No face detected
            currentExpressionSpan.textContent = 'No face detected';
            confidenceSpan.textContent = '0%';
        }
    } catch (error) {
        console.error('Detection error:', error);
        currentExpressionSpan.textContent = 'Detection error';
        confidenceSpan.textContent = '0%';
    }
}

// ============================================================================
// CUSTOMIZATION POINT 6: EXPRESSION PROCESSING
// ============================================================================
/**
 * Process raw expression data to find the dominant expression
 * You can customize this to:
 * - Apply smoothing filters
 * - Combine multiple expressions
 * - Add custom expression logic
 */
function getDominantExpression(expressions) {
    let maxConfidence = 0;
    let dominantExpression = 'neutral';
    
    // Find expression with highest confidence
    Object.keys(expressions).forEach(expression => {
        if (expressions[expression] > maxConfidence) {
            maxConfidence = expressions[expression];
            dominantExpression = expression;
        }
    });
    
    return {
        expression: dominantExpression,
        confidence: maxConfidence
    };
}

// ============================================================================
// CUSTOMIZATION POINT 7: EXPRESSION EVENT HANDLER
// ============================================================================
/**
 * Called whenever a new expression is detected with sufficient confidence
 * Add your custom logic here:
 * - Log expressions to database
 * - Trigger animations
 * - Send data to other services
 * - Play sounds
 * - Change page background
 * - Update social media status
 */
function onExpressionDetected(expression, confidence) {
    console.log(`😊 Expression detected: ${expression} (${Math.round(confidence * 100)}%)`);
    
    // EXAMPLE CUSTOMIZATIONS (uncomment and modify as needed):
    
    // 1. Log expression history
    // logExpressionHistory(expression, confidence);
    
    // 2. Play sound for certain expressions
    // if (expression === 'happy' && confidence > 0.8) {
    //     playSound('happy.mp3');
    // }
    
    // 3. Change page background based on expression
    // document.body.style.background = getExpressionColor(expression);
    
    // 4. Send data to analytics
    // sendAnalytics('expression_detected', { expression, confidence });
}

// ============================================================================
// UI UPDATES
// ============================================================================
function updateExpressionDisplay(expression, confidence) {
    // Add fade out effect
    expressionImage.classList.add('fade-out');
    
    setTimeout(() => {
        // Update content
        if (IMAGE_MAP[expression]) {
            if (IMAGE_MAP[expression].startsWith('http') || IMAGE_MAP[expression].startsWith('./')) {
                // It's an image URL
                expressionImage.innerHTML = `<img src="${IMAGE_MAP[expression]}" alt="${expression}" style="max-width: 100%; max-height: 200px; object-fit: contain;">`;
            } else if (IMAGE_MAP[expression].startsWith('<')) {
                // It's HTML content
                expressionImage.innerHTML = IMAGE_MAP[expression];
            } else {
                // It's text/emoji
                expressionImage.innerHTML = `<div style="font-size: 4rem;">${IMAGE_MAP[expression]}</div>`;
            }
        } else {
            expressionImage.innerHTML = `<div style="font-size: 4rem;">❓</div>`;
        }
        
        // Update expression name
        expressionName.textContent = `${expression.charAt(0).toUpperCase() + expression.slice(1)} (${Math.round(confidence * 100)}%)`;
        
        // Add fade in effect
        expressionImage.classList.remove('fade-out');
        expressionImage.classList.add('fade-in');
        
        setTimeout(() => {
            expressionImage.classList.remove('fade-in');
        }, 300);
        
    }, 150);
}

// ============================================================================
// CUSTOMIZATION POINT 8: FACE DETECTION VISUALIZATION
// ============================================================================
/**
 * Draw face detection results on canvas overlay
 * Customize this to change the visual feedback:
 * - Change colors, line thickness
 * - Add/remove face landmarks
 * - Add expression labels
 * - Draw confidence scores
 */
function drawDetection(ctx, detection) {
    // Draw face detection box
    const box = detection.detection.box;
    ctx.strokeStyle = '#32c896'; // Teal color from design system
    ctx.lineWidth = 2;
    ctx.strokeRect(box.x, box.y, box.width, box.height);
    
    // OPTIONAL: Draw face landmarks (uncomment to enable)
    // const landmarks = detection.landmarks;
    // ctx.fillStyle = '#32c896';
    // landmarks.positions.forEach(point => {
    //     ctx.fillRect(point.x - 2, point.y - 2, 4, 4);
    // });
    
    // OPTIONAL: Draw expression label (uncomment to enable)
    // const expressions = detection.expressions;
    // const dominant = getDominantExpression(expressions);
    // ctx.fillStyle = '#ffffff';
    // ctx.fillRect(box.x, box.y - 20, 120, 20);
    // ctx.fillStyle = '#000000';
    // ctx.font = '14px Arial';
    // ctx.fillText(`${dominant.expression} (${Math.round(dominant.confidence * 100)}%)`, box.x + 4, box.y - 6);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
function updateCameraStatus(status) {
    cameraStatusSpan.textContent = status;
}

function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    errorModal.classList.remove('hidden');
}

function closeErrorModal() {
    errorModal.classList.add('hidden');
}

function hideLoadingModal() {
    loadingModal.classList.add('hidden');
}

// ============================================================================
// CUSTOMIZATION POINT 9: ADDITIONAL HELPER FUNCTIONS
// ============================================================================
/**
 * Add your own utility functions here:
 * - Expression smoothing algorithms
 * - Data logging functions
 * - Animation helpers
 * - API integration functions
 */

// Example helper functions (uncomment and customize as needed):

/*
function logExpressionHistory(expression, confidence) {
    const historyElement = document.getElementById('expressionHistory');
    const timestamp = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.innerHTML = `${timestamp}: ${expression} (${Math.round(confidence * 100)}%)`;
    historyElement.appendChild(entry);
    
    // Keep only last 10 entries
    while (historyElement.children.length > 10) {
        historyElement.removeChild(historyElement.firstChild);
    }
}

function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play().catch(e => console.log('Could not play sound:', e));
}

function getExpressionColor(expression) {
    const colors = {
        happy: '#FFE135',
        sad: '#87CEEB',
        angry: '#FF6B6B',
        surprised: '#FF8C00',
        fearful: '#9370DB',
        disgusted: '#32CD32',
        neutral: '#F5F5F5'
    };
    return colors[expression] || '#F5F5F5';
}

function sendAnalytics(eventName, data) {
    // Example: Google Analytics
    // gtag('event', eventName, data);
    
    // Example: Custom API
    // fetch('/api/analytics', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ event: eventName, data })
    // });
}
*/

// ============================================================================
// ERROR HANDLING
// ============================================================================
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    hideLoadingModal();
    showError('An unexpected error occurred. Please refresh the page.');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    hideLoadingModal();
    // Don't show error for every promise rejection as some might be expected
});

console.log('🚀 Facial Expression Detector initialized - Ready to start!');