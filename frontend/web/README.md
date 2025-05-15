# VaulFi Web App

A Next.js web application for VaulFi, featuring a secure and user-friendly authentication system.

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

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend/web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Running the App

### Development
```bash
npm run dev
# or
yarn dev
```

### Production
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
frontend/web/
├── api/              # API integration and endpoints
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── pages/           # Next.js pages
├── public/          # Static assets
├── services/        # Business logic and services
├── styles/          # Global styles
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Authentication Flow

1. **Initial Signup**
   - Email and password collection
   - Basic form validation

2. **Phone Number Collection**
   - Phone number input
   - Format validation

3. **Phone Verification**
   - OTP sent to user's phone
   - 6-digit code verification
   - Resend OTP functionality

4. **Success Screen**
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

## Dependencies

- Next.js
- React
- Material-UI
- React Hook Form
- TypeScript
- Yup

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[Add your license information here]
