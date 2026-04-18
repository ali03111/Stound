# Stound - Real Estate Property Listing Mobile Application

## 💼 Skills for LinkedIn

### Programming Languages & Frameworks

- React Native
- React.js
- JavaScript (ES6+)
- TypeScript

### State Management

- Redux Toolkit
- Redux Saga
- Redux Persist

### Mobile Development

- Cross-platform Mobile Development
- iOS Development
- Android Development
- Mobile UI/UX Design

### Backend & API Integration

- RESTful APIs
- Axios
- Socket.io (Real-time Communication)
- Firebase Integration

### Authentication & Security

- Firebase Authentication
- Social Authentication (Google, Facebook, Apple)
- Token-based Authentication
- JWT (JSON Web Tokens)

### Database

- Firebase Firestore
- AsyncStorage

### UI/UX Design

- Material Design
- React Native Paper
- Custom UI Components
- Responsive Design
- Mobile Animations (React Native Reanimated)
- Gesture Handling

### Location Services

- Google Maps API
- Geolocation Services
- Google Places Autocomplete

### Third-Party Integrations

- In-App Purchases (IAP)
- Push Notifications (FCM)
- Image Processing
- Social Media SDKs

### Development Tools

- Git Version Control
- ESLint
- Prettier
- Babel
- Metro Bundler
- CocoaPods
- Gradle

### Testing & Quality Assurance

- Jest
- React Native Testing

### Project Management

- Agile Development
- Code Review
- CI/CD Concepts

---

## 📱 Project Overview

**Stound** is a comprehensive cross-platform mobile application built with React Native that revolutionizes the real estate experience. The app provides a seamless platform for users to discover, list, and manage properties for rent and sale with an intuitive card-swipe interface, real-time messaging, and advanced filtering capabilities.

## 🎯 Purpose

Stound aims to simplify property discovery and management by providing:

- **Property Discovery**: Browse properties with an engaging card-swipe interface
- **Advanced Search**: Filter properties by location, price, amenities, and more
- **Real-time Communication**: Chat directly with property owners and interested buyers
- **Secure Transactions**: In-app purchases for premium features and visibility
- **User Management**: Complete profile management with social authentication

## 📋 Description

Stound is a full-featured real estate marketplace application that connects property seekers with property owners. The app features a modern, intuitive interface with the following core functionalities:

### Core Features

#### 🔐 Authentication & User Management

- Email/password registration and login
- Social authentication (Google, Facebook, Apple Sign-In)
- Profile management with image uploads
- Password reset functionality
- Device-based authentication

#### 🏠 Property Management

- Create, edit, and delete property listings
- Upload multiple property photos
- Property details (rooms, bathrooms, square footage, amenities)
- Categorization (rent/sale, property type)
- Location-based property discovery
- Favorites/bookmarking system

#### 🔍 Search & Discovery

- Advanced property filtering (price range, location, amenities)
- Search functionality with autocomplete
- Trending properties feature
- Card-swipe interface for property discovery
- Location-based recommendations

#### 💬 Real-time Communication

- In-app messaging system
- Real-time chat with Socket.io
- Buyer-seller communication
- Message notifications

#### 🔔 Notifications

- Push notifications via Firebase Cloud Messaging
- Notification center for all alerts
- Real-time updates on property interactions

#### 💰 Monetization

- In-app purchases (coins)
- Subscription packages
- Premium listing features
- Payment integration

#### 📍 Location Services

- GPS-based location tracking
- Google Places Autocomplete
- Location-based property recommendations
- Distance calculations

## 🛠️ Technical Stack

### Frontend Framework

- **React Native** (0.71.4) - Cross-platform mobile development
- **React** (18.2.0) - UI library
- **TypeScript** (4.8.4) - Type safety

### State Management

- **Redux Toolkit** (1.9.3) - State management
- **Redux Saga** (1.2.3) - Side effects management
- **Redux Persist** (6.0.0) - State persistence

### Navigation

- **React Navigation** (6.x) - Navigation library
  - Native Stack Navigator
  - Bottom Tabs Navigator
  - Material Bottom Tabs

### Backend Integration

- **Axios** (1.5.0) - HTTP client
- **Apisauce** (3.0.0) - API abstraction layer
- **Socket.io Client** (4.6.2) - Real-time communication

### Firebase Services

- **@react-native-firebase/app** (17.5.0) - Firebase core
- **@react-native-firebase/auth** (17.4.1) - Authentication
- **@react-native-firebase/firestore** (17.5.0) - Database
- **@react-native-firebase/messaging** (17.5.0) - Push notifications

### Social Authentication

- **@react-native-google-signin/google-signin** (9.0.2) - Google Sign-In
- **react-native-fbsdk-next** (11.2.0) - Facebook SDK
- **@invertase/react-native-apple-authentication** (2.2.2) - Apple Sign-In

### UI Components & Libraries

- **React Native Paper** (5.3.1) - Material Design components
- **React Native Reanimated** (3.5.1) - Smooth animations
- **React Native Gesture Handler** (2.12.1) - Gesture recognition
- **React Native Vector Icons** (9.2.0) - Icon library
- **React Native Fast Image** (8.6.3) - Optimized image loading
- **React Native Blurhash** (1.1.10) - Image placeholders
- **Lottie iOS** (3.1.8) - Animation library

### Form Handling & Validation

- **React Hook Form** (7.43.5) - Form management
- **@hookform/resolvers** (2.9.11) - Form validation integration
- **Yup** (1.0.2) - Schema validation

### Location & Maps

- **React Native Geolocation Service** (5.3.1) - GPS services
- **@react-native-community/geolocation** (3.0.6) - Community geolocation
- **React Native Google Places Autocomplete** (2.5.1) - Places search

### In-App Purchases

- **React Native IAP** (11.0.0-rc.7) - In-app purchases

### Other Key Libraries

- **Moment.js** (2.29.4) - Date/time manipulation
- **React Native Image Picker** (5.3.1) - Image selection
- **React Native Permissions** (3.8.0) - Permission handling
- **React Native Gifted Chat** (2.3.0) - Chat UI components
- **React Native Deck Swiper** (2.0.13) - Card swipe interface
- **React Native Responsive Screen** (1.4.2) - Responsive design

## 📁 Project Structure

```
Stound/
├── android/                 # Android native code
├── ios/                     # iOS native code
├── src/
│   ├── Assets/             # Images, fonts, icons
│   ├── Components/         # Reusable UI components
│   ├── Config/             # Configuration files
│   ├── Hooks/              # Custom React hooks
│   ├── Navigation/         # Navigation configuration
│   ├── Redux/              # State management
│   │   ├── Action/         # Redux actions
│   │   ├── Reducers/       # Redux reducers
│   │   └── Sagas/          # Redux sagas
│   ├── Screens/            # Screen components
│   ├── Services/           # API and service layers
│   ├── Theme/              # Theme and styling
│   └── Utils/              # Utility functions
├── App.js                  # Main application entry
├── package.json            # Dependencies
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)
- CocoaPods (for iOS dependencies)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Stound
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **iOS Setup**

```bash
cd ios
pod install
cd ..
```

4. **Configure Firebase**

- Add your `GoogleService-Info.plist` to `ios/` directory
- Add your `google-services.json` to `android/app/` directory

5. **Configure Social Login**

- Update Facebook App ID in `App.js`
- Update Google Web Client ID in `App.js`

### Running the App

**Development Mode:**

```bash
# Android
npm run android:dev

# iOS
npm run ios:dev
```

**Staging Mode:**

```bash
# Android
npm run android:staging

# iOS
npm run ios:staging
```

**Production Mode:**

```bash
# Android
npm run android:prod

# iOS
npm run ios:prod
```

### Building for Release

**Android APK:**

```bash
npm run apk
```

**Android Bundle:**

```bash
npm run bundle
```

**iOS:**

```bash
npm run build-ios
```

## 🔧 Configuration

### Environment Variables

Update the API base URL in `src/Utils/Urls.js`:

```javascript
const getCredentials = () => {
  return {
    baseURL: 'https://stound.co/stound/api/',
    imageURL: 'https://stound.co/stound/',
  };
};
```

### Firebase Configuration

Ensure Firebase is properly configured for both platforms:

- iOS: Add `GoogleService-Info.plist`
- Android: Add `google-services.json`

## 📱 Key Screens

1. **Onboarding** - App introduction and walkthrough
2. **Authentication** - Login, Register, Social Login
3. **Home** - Property discovery with card swipe
4. **Property Details** - Detailed property information
5. **Add Post** - Create new property listing
6. **My Listings** - Manage user's properties
7. **Messages** - Real-time chat interface
8. **Notifications** - Notification center
9. **Profile** - User profile management
10. **Settings** - App preferences and account settings
11. **Subscriptions** - Purchase premium features
12. **Filter** - Advanced property filtering

## 🎨 UI/UX Features

- **Modern Design**: Clean, intuitive interface with Material Design
- **Smooth Animations**: React Native Reanimated for fluid transitions
- **Responsive Layout**: Adapts to different screen sizes
- **Dark Mode Support**: Theme customization
- **Gesture Controls**: Swipe, pinch, and tap interactions
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: User-friendly error messages

## 🔒 Security Features

- Secure authentication with Firebase
- Token-based API authentication
- Permission handling for sensitive features
- Input validation with Yup schemas
- Secure storage with AsyncStorage

## 📊 Performance Optimizations

- Code splitting and lazy loading
- Image optimization with Fast Image
- Memoization for expensive computations
- Virtualized lists for large datasets
- Efficient state management with Redux

## 🧪 Testing

```bash
npm test
```

## 📝 Code Style

The project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Run linter:

```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and confidential.

## 👥 Team

Developed by the Stound Development Team

## 📞 Support

For support and inquiries, contact the development team.

---

**Built with ❤️ using React Native**
