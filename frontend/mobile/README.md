# VaulFi Mobile App

A React Native mobile application for VaulFi, featuring a secure and user-friendly authentication system.

## Features

- Multi-step signup process with email and phone verification
- Secure authentication flow with OTP verification
- Form validation and error handling
- Progress tracking across signup steps
- Modern and responsive UI design
- TypeScript support for better type safety

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native development environment setup
- iOS Simulator (for Mac) or Android Emulator

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend/mobile
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (iOS only):
```bash
cd ios
pod install
cd ..
```

## Running the App

### iOS
```bash
npm run ios
# or
yarn ios
```

### Android
```bash
npm run android
# or
yarn android
```

## Project Structure

```
frontend/mobile/
├── api/              # API integration and endpoints
├── components/       # Reusable UI components
├── contexts/         # React Context providers
├── hooks/           # Custom React hooks
├── navigation/      # Navigation configuration
├── screens/         # Screen components
├── services/        # Business logic and services
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Authentication Flow

1. **Initial Signup**
   - Email and password collection
   - Basic form validation

2. **Email Verification**
   - OTP sent to user's email
   - 6-digit code verification
   - Resend OTP functionality

3. **Phone Number Collection**
   - Phone number and country code input
   - Format validation

4. **Phone Verification**
   - OTP sent to user's phone
   - 6-digit code verification
   - Resend OTP functionality

5. **Success Screen**
   - Confirmation of successful signup
   - Navigation to main app

## Development

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Maintain consistent code formatting

### Testing

```bash
# Run tests
npm test
# or
yarn test
```

### Building for Production

```bash
# iOS
npm run build:ios
# or
yarn build:ios

# Android
npm run build:android
# or
yarn build:android
```

## Dependencies

- React Native
- React Navigation
- React Hook Form
- TypeScript
- Expo Vector Icons
- AsyncStorage

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[Add your license information here] 