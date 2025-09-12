# Chat Support and Scheduling Integration

This document describes the integration of chat support and scheduling functionality in the Lyyli.ai application.

## Features Implemented

### 1. Chat Support Integration
- **Intercom Integration**: The application now includes Intercom chat widget integration
- **Fallback Support**: If Intercom is not available, users are redirected to the contact page
- **Multilingual Support**: Chat widget automatically detects and uses the appropriate language (Finnish/English)

### 2. Scheduling Integration
- **Calendly Integration**: "Book a Call" buttons now link to Calendly scheduling
- **Customizable Links**: Calendly links can be configured via environment variables
- **Security Consultation**: Default booking link is set for security consultations

## Configuration

### Environment Variables

Add the following variables to your `.env.local` file:

```bash
# Chat Service (Intercom)
NEXT_PUBLIC_INTERCOM_APP_ID="your-intercom-app-id"

# Scheduling Service (Calendly)
NEXT_PUBLIC_CALENDLY_LINK="https://calendly.com/lyyli-ai/security-consultation"
```

### Intercom Setup

1. Create an Intercom account at [intercom.com](https://intercom.com)
2. Create a new app in your Intercom workspace
3. Copy your App ID from the Intercom dashboard
4. Add the App ID to your environment variables

### Calendly Setup

1. Create a Calendly account at [calendly.com](https://calendly.com)
2. Create a new event type for security consultations
3. Copy the event link and add it to your environment variables

## Components Updated

### SecuritySupport.tsx
- Chat button now triggers Intercom widget or redirects to contact page
- Phone button now links to Calendly scheduling
- Both buttons are fully functional and localized

### ChatWidget.tsx
- New component that handles Intercom script loading
- Automatically configures language based on locale
- Provides fallback functionality

### Layout Integration
- ChatWidget is integrated into the main layout
- Available on all pages with locale support

## Usage

### For Users
- **Chat Support**: Click "Chat Support" button to open Intercom chat widget
- **Book a Call**: Click "Book a Call" button to open Calendly scheduling

### For Developers
- Chat functionality is automatically available on all pages
- Language detection is handled automatically
- Fallback mechanisms ensure functionality even if services are unavailable

## Fallback Behavior

### Chat Support
1. Primary: Opens Intercom chat widget
2. Fallback: Redirects to contact page if Intercom is unavailable

### Scheduling
1. Primary: Opens Calendly scheduling page
2. Fallback: Uses default Calendly link if environment variable is not set

## Security Considerations

- All external links open in new tabs with proper security attributes
- Intercom script is loaded securely with proper cleanup
- Environment variables are properly scoped for client-side use

## Testing

### Development
- Set `NEXT_PUBLIC_INTERCOM_APP_ID` to a test app ID
- Test chat functionality with Intercom test workspace
- Verify Calendly links work correctly

### Production
- Use production Intercom app ID
- Configure production Calendly event links
- Test both Finnish and English locales

## Troubleshooting

### Chat Not Working
1. Check if `NEXT_PUBLIC_INTERCOM_APP_ID` is set correctly
2. Verify Intercom app is active
3. Check browser console for JavaScript errors

### Scheduling Not Working
1. Verify `NEXT_PUBLIC_CALENDLY_LINK` is set correctly
2. Check if Calendly event is published and accessible
3. Test link manually in browser

### Language Issues
1. Ensure locale is properly passed to ChatWidget
2. Check Intercom language settings
3. Verify Finnish translations are complete

## Future Enhancements

- Add more chat service options (Zendesk, Freshdesk)
- Integrate with additional scheduling tools
- Add chat analytics and reporting
- Implement chat bot functionality
- Add video call integration options
