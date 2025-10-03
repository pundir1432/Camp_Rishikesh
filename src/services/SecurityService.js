class SecurityService {
    // Input sanitization
    static sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<[^>]*>?/gm, '')
            .trim();
    }

    // Email validation
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation
    static validatePhone(phone) {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone);
    }

    // Password strength validation
    static validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
            strength: this.calculatePasswordStrength(password),
            requirements: {
                minLength: password.length >= minLength,
                hasUpperCase,
                hasLowerCase,
                hasNumbers,
                hasSpecialChar
            }
        };
    }

    static calculatePasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

        const strengths = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        return strengths[score] || 'Very Weak';
    }

    // Rate limiting
    static rateLimiter = new Map();

    static checkRateLimit(identifier, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
        const now = Date.now();
        const userAttempts = this.rateLimiter.get(identifier) || { count: 0, resetTime: now + windowMs };

        if (now > userAttempts.resetTime) {
            userAttempts.count = 0;
            userAttempts.resetTime = now + windowMs;
        }

        if (userAttempts.count >= maxAttempts) {
            return {
                allowed: false,
                resetTime: userAttempts.resetTime,
                remainingTime: Math.ceil((userAttempts.resetTime - now) / 1000)
            };
        }

        userAttempts.count++;
        this.rateLimiter.set(identifier, userAttempts);

        return {
            allowed: true,
            attemptsLeft: maxAttempts - userAttempts.count
        };
    }

    // CSRF token generation
    static generateCSRFToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    // Session management
    static setSecureSession(key, value, expiryHours = 24) {
        const expiryTime = new Date().getTime() + (expiryHours * 60 * 60 * 1000);
        const sessionData = {
            value: this.encryptData(JSON.stringify(value)),
            expiry: expiryTime
        };
        
        localStorage.setItem(key, JSON.stringify(sessionData));
    }

    static getSecureSession(key) {
        try {
            const sessionData = JSON.parse(localStorage.getItem(key));
            if (!sessionData) return null;

            if (new Date().getTime() > sessionData.expiry) {
                localStorage.removeItem(key);
                return null;
            }

            return JSON.parse(this.decryptData(sessionData.value));
        } catch (error) {
            console.error('Session retrieval error:', error);
            localStorage.removeItem(key);
            return null;
        }
    }

    static clearSecureSession(key) {
        localStorage.removeItem(key);
    }

    // Simple encryption (for demo - use proper encryption in production)
    static encryptData(data) {
        return btoa(data);
    }

    static decryptData(encryptedData) {
        return atob(encryptedData);
    }

    // Content Security Policy headers
    static getCSPHeaders() {
        return {
            'Content-Security-Policy': [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' https://checkout.razorpay.com",
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                "font-src 'self' https://fonts.gstatic.com",
                "img-src 'self' data: https:",
                "connect-src 'self' https://api.razorpay.com",
                "frame-src https://api.razorpay.com"
            ].join('; ')
        };
    }

    // XSS protection
    static escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Secure API request
    static async secureApiRequest(url, options = {}) {
        const csrfToken = this.generateCSRFToken();
        
        const secureOptions = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
                'X-Requested-With': 'XMLHttpRequest',
                ...options.headers
            },
            credentials: 'same-origin'
        };

        try {
            const response = await fetch(url, secureOptions);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Secure API request failed:', error);
            throw error;
        }
    }

    // File upload validation
    static validateFileUpload(file, allowedTypes = ['image/jpeg', 'image/png', 'image/gif'], maxSize = 5 * 1024 * 1024) {
        const errors = [];

        if (!allowedTypes.includes(file.type)) {
            errors.push('Invalid file type. Only JPEG, PNG, and GIF files are allowed.');
        }

        if (file.size > maxSize) {
            errors.push(`File size too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
        }

        // Check for malicious file names
        const dangerousPatterns = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com'];
        if (dangerousPatterns.some(pattern => file.name.toLowerCase().includes(pattern))) {
            errors.push('Potentially dangerous file detected.');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Privacy compliance
    static getCookieConsent() {
        return localStorage.getItem('cookieConsent') === 'accepted';
    }

    static setCookieConsent(accepted) {
        localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
    }

    // Data anonymization
    static anonymizeData(data) {
        const anonymized = { ...data };
        
        // Mask email
        if (anonymized.email) {
            const [username, domain] = anonymized.email.split('@');
            anonymized.email = username.substring(0, 2) + '***@' + domain;
        }

        // Mask phone
        if (anonymized.phone) {
            anonymized.phone = anonymized.phone.substring(0, 3) + '***' + anonymized.phone.substring(7);
        }

        // Remove sensitive fields
        delete anonymized.password;
        delete anonymized.paymentDetails;
        delete anonymized.emergencyContact;

        return anonymized;
    }

    // Security audit log
    static logSecurityEvent(event, details = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            event,
            details: this.anonymizeData(details),
            userAgent: navigator.userAgent,
            ip: 'client-side', // Would be populated server-side
            sessionId: this.getSecureSession('sessionId')
        };

        console.log('Security Event:', logEntry);
        
        // In production, send to security monitoring service
        // this.sendToSecurityService(logEntry);
    }
}

export default SecurityService;