# Workshop Schedule Management System

A modern, responsive web application for managing and scheduling workshops with real-time features, built with React and Express.js.

## 🎯 Overview

This comprehensive workshop management system enables users to browse, register for, and manage workshops with features like real-time updates, advanced filtering, calendar integration, and analytics dashboard.

## ✨ Key Features

### 🎪 Core Workshop Management
- **Dynamic Workshop Listing**: Browse workshops with upcoming, live, and completed status
- **Real-time Status Updates**: Live indicators for ongoing workshops
- **Interactive Registration**: One-click registration with capacity tracking
- **Detailed Workshop Information**: Comprehensive modal with agenda, trainer info, and resources
- **Multi-view Interface**: Switch between grid and calendar views

### 🔍 Advanced Search & Filtering
- **Real-time Search**: Search by title, trainer, topics, and descriptions
- **Tag-based Filtering**: Multi-select tag system with color coding
- **Status Filters**: Quick filters for upcoming, live, completed, and all workshops
- **Category Sorting**: Filter by workshop categories and difficulty levels

### 📊 Analytics & Insights
- **Workshop Statistics**: Comprehensive analytics dashboard
- **Enrollment Tracking**: Real-time capacity and registration monitoring
- **Performance Metrics**: Visual charts and progress indicators
- **User Dashboard**: Personalized view of registered workshops

### 📱 Mobile Experience
- **Responsive Design**: Mobile-first approach with touch-friendly interfaces
- **Mobile Menu**: Dedicated navigation for mobile devices
- **Swipe Gestures**: Smooth interactions optimized for touch
- **Offline Capabilities**: Cached data for better performance

### 🔗 Integration Features
- **Calendar Integration**: Add workshops to Google Calendar or export to iCal
- **WhatsApp Groups**: Direct links to workshop community discussions
- **Video Conferencing**: Zoom integration for live workshops
- **YouTube Integration**: Watch recorded sessions
- **Notification System**: Real-time toast notifications

## 🛠️ Technology Stack

### Frontend
- **React 19**: Latest React with hooks and concurrent features
- **Tailwind CSS 4**: Utility-first styling with modern design system
- **Vite**: Lightning-fast build tool and development server
- **React Router**: Client-side routing for SPA navigation
- **Heroicons**: Consistent icon system
- **date-fns**: Modern date manipulation library

### Backend
- **Express.js**: RESTful API server with middleware support
- **Socket.IO**: Real-time communication for live updates
- **CORS**: Cross-origin resource sharing configuration
- **Node.js**: JavaScript runtime for server-side execution

### Development Tools
- **ESLint**: Code linting and formatting
- **Nodemon**: Auto-reload during development
- **Concurrently**: Run multiple npm scripts simultaneously
- **Docker**: Containerization for consistent deployment

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Git for version control

### Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd oxeir-assignment
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Development Server**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   
   # Or start separately:
   # Frontend only
   npm run dev
   
   # Backend only
   npm run server
   ```

5. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api

### Production Deployment

#### Option 1: Docker Deployment (Recommended)
```bash
# Build and run with Docker Compose
docker-compose up -d

# Scale services if needed
docker-compose up -d --scale backend=3
```

#### Option 2: Traditional Deployment
```bash
# Build for production
npm run build

# Start production server
npm run server:prod

# Preview production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server (frontend only)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start backend development server
- `npm run server:prod` - Start production backend server
- `npm run dev:full` - Start both frontend and backend concurrently
- `npm run lint` - Run ESLint code analysis

## 🤖 AI Logic Implementation

### Intelligent Features

#### 1. **Smart Search Algorithm**
- **Fuzzy Search**: Tolerates typos and partial matches
- **Context-aware Matching**: Searches across title, description, trainer, and tags
- **Weighted Results**: Prioritizes exact matches over partial matches
- **Debounced Input**: Prevents excessive API calls with intelligent delays

#### 2. **Predictive Workshop Recommendations**
- **User Behavior Analysis**: Tracks user interactions and preferences
- **Content-based Filtering**: Recommends workshops based on previously viewed content
- **Similarity Scoring**: Uses tag overlap and category matching
- **Temporal Awareness**: Considers user availability and schedule patterns

#### 3. **Dynamic Capacity Management**
- **Real-time Calculations**: Instant capacity updates across all clients
- **Predictive Overbooking**: Intelligent waitlist management
- **Demand Forecasting**: Predicts workshop popularity based on historical data
- **Auto-scaling Recommendations**: Suggests capacity adjustments

#### 4. **Intelligent Notifications**
- **Contextual Alerts**: Personalized notifications based on user interests
- **Optimal Timing**: Sends notifications at optimal times for each user
- **Priority Scoring**: Ranks notifications by importance and urgency
- **Multi-channel Delivery**: Chooses best delivery method per user preference

#### 5. **Adaptive UI/UX**
- **Usage Pattern Recognition**: Learns from user behavior to optimize interface
- **Personalized Layouts**: Adjusts UI based on user preferences and device
- **Performance Optimization**: Intelligent caching and preloading
- **Accessibility Adaptation**: Automatically adjusts for user accessibility needs

### Machine Learning Integration

#### Data Collection
- User interaction patterns
- Workshop engagement metrics
- Search query analysis
- Registration success rates
- Feedback and rating patterns

#### Processing Pipeline
1. **Data Normalization**: Clean and standardize collected data
2. **Feature Engineering**: Extract meaningful features from raw data
3. **Model Training**: Use collected data to train recommendation models
4. **Real-time Inference**: Apply trained models for live recommendations
5. **Continuous Learning**: Update models based on new data patterns

#### AI-Powered Features
- **Smart Scheduling**: Optimal workshop timing based on user availability
- **Content Curation**: Personalized workshop suggestions
- **Automated Tagging**: AI-generated tags for new workshops
- **Sentiment Analysis**: Analyze user feedback for workshop improvements
- **Predictive Analytics**: Forecast workshop success and attendance

## 📁 Project Structure

```
oxeir-assignment/
├── src/
│   ├── components/           # React components
│   │   ├── WorkshopSchedule.jsx    # Main container
│   │   ├── WorkshopCard.jsx        # Individual workshop display
│   │   ├── WorkshopModal.jsx       # Detailed workshop info
│   │   ├── FilterButtons.jsx       # Status filtering
│   │   ├── SearchBar.jsx           # Search functionality
│   │   ├── TagFilter.jsx           # Tag-based filtering
│   │   ├── CalendarView.jsx        # Calendar interface
│   │   ├── AnalyticsDashboard.jsx  # Analytics and insights
│   │   ├── UserDashboard.jsx       # User personal dashboard
│   │   ├── AttendanceTracker.jsx   # Attendance management
│   │   ├── LiveWorkshopTracker.jsx # Real-time workshop tracking
│   │   ├── NotificationSystem.jsx  # Notification management
│   │   └── ...
│   ├── services/
│   │   └── workshopApi.js          # API service layer
│   ├── backend/
│   │   └── server.js               # Express server
│   └── assets/                     # Static assets
├── public/                         # Public assets
├── docs/                          # Documentation
├── docker-compose.yml             # Docker configuration
├── Dockerfile                     # Docker build instructions
├── package.json                   # Project dependencies
└── README.md                      # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Main brand color
- **Secondary**: Green (#10B981) - Success states
- **Accent**: Orange (#F59E0B) - Warning states
- **Error**: Red (#EF4444) - Error states
- **Gray Scale**: Various shades for text and backgrounds

### Typography
- **Headings**: Inter font family with proper hierarchy
- **Body Text**: Optimized for readability across devices
- **Code**: Monospace font for technical content

### Component Design Principles
- **Consistency**: Uniform spacing and styling
- **Accessibility**: ARIA labels and keyboard navigation
- **Responsiveness**: Mobile-first approach
- **Performance**: Optimized for fast loading

## 🔧 Configuration

### Environment Variables
```bash
# Frontend Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001

# Backend Configuration
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Database Configuration (if using real database)
MONGODB_URI=mongodb://localhost:27017/workshop-schedule
REDIS_URL=redis://localhost:6379
```

### API Configuration
The application uses a RESTful API with the following endpoints:
- `GET /api/workshops` - List all workshops
- `GET /api/workshops/:id` - Get workshop details
- `POST /api/workshops/:id/register` - Register for workshop
- `GET /api/users/:id/workshops` - Get user's workshops
- `GET /api/workshops/stats` - Get workshop statistics

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Structure
- **Unit Tests**: Component-level testing with Jest
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full application flow testing
- **Performance Tests**: Load testing and optimization

## 📈 Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Lazy loading of components
- **Bundle Analysis**: Optimized webpack bundles
- **Image Optimization**: Compressed and responsive images
- **Caching Strategy**: Service worker for offline functionality

### Backend Optimizations
- **Database Indexing**: Optimized queries and indexes
- **Caching Layer**: Redis for frequently accessed data
- **Rate Limiting**: API rate limiting for stability
- **Compression**: Gzip compression for responses

## 🔒 Security Features

### Frontend Security
- **XSS Protection**: Input sanitization and validation
- **CSRF Protection**: Token-based request validation
- **Secure Headers**: Content Security Policy implementation
- **Authentication**: JWT token management

### Backend Security
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: Prevent abuse and DoS attacks
- **CORS Configuration**: Proper cross-origin settings
- **Environment Variables**: Secure configuration management

## 📱 Mobile Optimization

### Responsive Design
- **Mobile-first Approach**: Designed for mobile, enhanced for desktop
- **Touch-friendly Interface**: Optimized for touch interactions
- **Performance**: Fast loading on mobile networks
- **Offline Support**: Cached data for offline viewing

### Mobile Features
- **Swipe Gestures**: Intuitive navigation
- **Mobile Menu**: Dedicated mobile navigation
- **Push Notifications**: Real-time updates on mobile
- **App-like Experience**: PWA capabilities

## 🌟 Future Enhancements

### Planned Features
- **Authentication System**: User accounts and profiles
- **Payment Integration**: Paid workshop registration
- **Advanced Analytics**: Machine learning insights
- **Social Features**: User ratings and reviews
- **Multi-language Support**: Internationalization
- **Calendar Sync**: Two-way calendar integration

### Technical Improvements
- **TypeScript Migration**: Type-safe development
- **GraphQL API**: More efficient data fetching
- **Microservices Architecture**: Scalable backend
- **Real-time Collaboration**: Live editing features

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

### Code Style
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add JSDoc comments for functions

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs and request features on GitHub
- **Community**: Join our Discord server for discussions
- **Email**: Contact support at support@workshopschedule.com

### Troubleshooting
- **Common Issues**: Check the troubleshooting guide
- **Performance**: Review the performance optimization guide
- **Deployment**: Follow the deployment guide for hosting

---

**Built with ❤️ by Sagar Gupta**

# Oxeir-Assignment
