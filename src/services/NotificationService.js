class NotificationService {
    // Email notification
    static sendBookingConfirmation(bookingData) {
        const emailData = {
            to: bookingData.email,
            subject: 'Booking Confirmation - Camp Rishikesh',
            template: 'booking-confirmation',
            data: {
                customerName: `${bookingData.firstName} ${bookingData.lastName}`,
                bookingId: bookingData.bookingId,
                groundName: bookingData.groundName,
                checkIn: bookingData.checkIn,
                checkOut: bookingData.checkOut,
                guests: bookingData.guests,
                totalAmount: bookingData.totalAmount,
                paymentStatus: bookingData.paymentStatus
            }
        };
        
        console.log('Sending email confirmation:', emailData);
        // Implement actual email service integration here
        return this.sendEmail(emailData);
    }

    // SMS notification
    static sendSMSConfirmation(bookingData) {
        const message = `🏕️ Camp Rishikesh Booking Confirmed!
Booking ID: ${bookingData.bookingId}
Package: ${bookingData.groundName}
Check-in: ${bookingData.checkIn}
Amount: ₹${bookingData.totalAmount}
Thank you for choosing us!`;

        console.log('Sending SMS to:', bookingData.phone, message);
        // Implement SMS service integration here
        return this.sendSMS(bookingData.phone, message);
    }

    // WhatsApp notification
    static sendWhatsAppConfirmation(bookingData) {
        const message = `🎉 *Booking Confirmed!*

📋 *Booking Details:*
• Booking ID: ${bookingData.bookingId}
• Package: ${bookingData.groundName}
• Check-in: ${bookingData.checkIn}
• Check-out: ${bookingData.checkOut}
• Guests: ${bookingData.guests}
• Amount: ₹${bookingData.totalAmount}

📍 *Location:* Camp Rishikesh, Uttarakhand

⏰ *Check-in Time:* 2:00 PM
⏰ *Check-out Time:* 11:00 AM

📞 *Contact:* +91 98765 43210

Thank you for choosing Camp Rishikesh! 🏕️`;

        // This would integrate with WhatsApp Business API
        console.log('WhatsApp confirmation prepared:', message);
        return Promise.resolve({ success: true, message: 'WhatsApp notification queued' });
    }

    // Reminder notifications
    static sendBookingReminder(bookingData) {
        const reminderDate = new Date(bookingData.checkIn);
        reminderDate.setDate(reminderDate.getDate() - 1); // 1 day before

        const message = `🏕️ *Reminder: Your Camp Rishikesh Adventure Tomorrow!*

Hi ${bookingData.firstName}! 👋

Your camping adventure starts tomorrow:
📅 Check-in: ${bookingData.checkIn} at 2:00 PM
🏕️ Package: ${bookingData.groundName}
👥 Guests: ${bookingData.guests}

📋 *What to bring:*
• Valid ID proof
• Comfortable clothes
• Personal toiletries
• Sunscreen & hat

📍 *Location:* [Google Maps Link]
📞 *Contact:* +91 98765 43210

See you soon! 🌟`;

        console.log('Booking reminder scheduled for:', reminderDate);
        return this.scheduleNotification(reminderDate, message, bookingData.phone);
    }

    // Push notifications (for PWA)
    static sendPushNotification(title, body, data = {}) {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, {
                    body,
                    icon: '/logo192.png',
                    badge: '/logo192.png',
                    data,
                    actions: [
                        {
                            action: 'view',
                            title: 'View Details'
                        },
                        {
                            action: 'close',
                            title: 'Close'
                        }
                    ]
                });
            });
        }
    }

    // Weather alerts
    static sendWeatherAlert(bookingData, weatherInfo) {
        if (weatherInfo.alert) {
            const message = `🌦️ *Weather Alert for Your Trip*

Hi ${bookingData.firstName}!

Weather update for ${bookingData.checkIn}:
${weatherInfo.alert}

💡 *Recommendations:*
${weatherInfo.recommendations}

Don't worry, we have indoor activities too! 🏠

Contact us: +91 98765 43210`;

            return this.sendWhatsAppMessage(bookingData.phone, message);
        }
    }

    // Generic email sender
    static async sendEmail(emailData) {
        try {
            // Implement with your email service (SendGrid, AWS SES, etc.)
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData)
            });
            return await response.json();
        } catch (error) {
            console.error('Email sending failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Generic SMS sender
    static async sendSMS(phone, message) {
        try {
            // Implement with SMS service (Twilio, AWS SNS, etc.)
            const response = await fetch('/api/send-sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, message })
            });
            return await response.json();
        } catch (error) {
            console.error('SMS sending failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Schedule notification
    static scheduleNotification(date, message, phone) {
        const now = new Date();
        const delay = date.getTime() - now.getTime();
        
        if (delay > 0) {
            setTimeout(() => {
                this.sendSMS(phone, message);
                this.sendPushNotification('Booking Reminder', message);
            }, delay);
            
            return { success: true, scheduledFor: date };
        }
        
        return { success: false, error: 'Invalid date' };
    }

    // Complete notification flow
    static async sendAllNotifications(bookingData) {
        try {
            const results = await Promise.allSettled([
                this.sendBookingConfirmation(bookingData),
                this.sendSMSConfirmation(bookingData),
                this.sendWhatsAppConfirmation(bookingData)
            ]);

            // Schedule reminder
            this.sendBookingReminder(bookingData);

            // Send push notification
            this.sendPushNotification(
                'Booking Confirmed!',
                `Your ${bookingData.groundName} booking is confirmed for ${bookingData.checkIn}`,
                { bookingId: bookingData.bookingId }
            );

            return {
                success: true,
                results: results.map(result => ({
                    status: result.status,
                    value: result.value || result.reason
                }))
            };
        } catch (error) {
            console.error('Notification sending failed:', error);
            return { success: false, error: error.message };
        }
    }
}

export default NotificationService;