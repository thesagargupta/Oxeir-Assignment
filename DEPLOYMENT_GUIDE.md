# Workshop Schedule App - Deployment Guide

## 🚀 Production Deployment Options

### Option 1: Docker Deployment (Recommended)

#### Prerequisites
- Docker & Docker Compose installed
- Node.js 18+ (for development)
- MongoDB & Redis (or use Docker containers)

#### Quick Start
```bash
# 1. Clone and setup
git clone <your-repo>
cd workshop-schedule

# 2. Configure environment
cp .env.example .env
# Edit .env with your configuration

# 3. Build and start services
docker-compose up -d

# 4. Initialize database (if needed)
docker-compose exec backend npm run seed

# 5. Access application
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
# Database: mongodb://localhost:27017
```

#### Docker Services
- **Frontend**: React app with production build
- **Backend**: Express API with Socket.IO
- **MongoDB**: Database for workshops and users
- **Redis**: Cache and session storage
- **Nginx**: Reverse proxy and SSL termination

### Option 2: Traditional Deployment

#### Frontend (React)
```bash
# Build for production
npm run build

# Deploy to static hosting
# - Vercel: vercel --prod
# - Netlify: netlify deploy --prod
# - AWS S3: aws s3 sync dist/ s3://your-bucket
```

#### Backend (Express)
```bash
# Install dependencies
npm install

# Set environment variables
export NODE_ENV=production
export MONGODB_URI=mongodb://localhost:27017/workshop-schedule

# Start server
npm start
```

### Option 3: Cloud Platform Deployment

#### Heroku
```bash
# Frontend
heroku create workshop-schedule-frontend
heroku buildpacks:set heroku/nodejs
git push heroku main

# Backend
heroku create workshop-schedule-api
heroku addons:create mongolab:sandbox
heroku addons:create heroku-redis:hobby-dev
git push heroku main
```

#### AWS ECS/EKS
```bash
# Build and push Docker images
docker build -t workshop-schedule-frontend .
docker tag workshop-schedule-frontend:latest <aws-account>.dkr.ecr.<region>.amazonaws.com/workshop-schedule-frontend:latest
docker push <aws-account>.dkr.ecr.<region>.amazonaws.com/workshop-schedule-frontend:latest

# Deploy using ECS/EKS configurations
```

#### Google Cloud Run
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT-ID/workshop-schedule-frontend
gcloud run deploy --image gcr.io/PROJECT-ID/workshop-schedule-frontend --platform managed
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```env
REACT_APP_API_URL=https://api.workshopschedule.com
REACT_APP_SOCKET_URL=https://api.workshopschedule.com
REACT_APP_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
REACT_APP_ENABLE_ANALYTICS=true
```

#### Backend (.env)
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb://localhost:27017/workshop-schedule
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=https://workshopschedule.com
```

### Database Setup

#### MongoDB Schema
```javascript
// workshops collection
{
  _id: ObjectId,
  title: String,
  description: String,
  date: Date,
  duration: Number,
  trainer: {
    name: String,
    email: String,
    image: String
  },
  capacity: {
    total: Number,
    filled: Number
  },
  status: String, // upcoming, live, completed
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}

// users collection
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  role: String, // user, admin, trainer
  registeredWorkshops: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}

// registrations collection
{
  _id: ObjectId,
  userId: ObjectId,
  workshopId: ObjectId,
  registrationDate: Date,
  status: String, // confirmed, cancelled, completed
  paymentStatus: String // free, paid, pending
}
```

#### Database Migrations
```bash
# Run database migrations
npm run migrate

# Seed initial data
npm run seed
```

### SSL Configuration

#### Let's Encrypt (Free SSL)
```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificates
sudo certbot --nginx -d workshopschedule.com -d www.workshopschedule.com

# Auto-renewal
sudo crontab -e
0 12 * * * /usr/bin/certbot renew --quiet
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name workshopschedule.com www.workshopschedule.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name workshopschedule.com www.workshopschedule.com;
    
    ssl_certificate /etc/letsencrypt/live/workshopschedule.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/workshopschedule.com/privkey.pem;
    
    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /api/ {
        proxy_pass http://backend:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /socket.io/ {
        proxy_pass http://backend:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## 🔐 Security Considerations

### Production Security Checklist
- [ ] Use HTTPS everywhere
- [ ] Implement rate limiting
- [ ] Sanitize user inputs
- [ ] Use secure JWT secrets
- [ ] Enable CORS properly
- [ ] Implement CSP headers
- [ ] Use environment variables for secrets
- [ ] Enable database authentication
- [ ] Implement proper error handling
- [ ] Set up monitoring and logging

### Security Headers
```javascript
// In Express app
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));
```

## 📊 Monitoring & Analytics

### Application Monitoring
```javascript
// Error tracking with Sentry
import * as Sentry from "@sentry/node";

Sentry.init({
    dsn: "YOUR_SENTRY_DSN",
    environment: process.env.NODE_ENV,
});

// Performance monitoring
import { createPrometheusMetrics } from './metrics';
const metrics = createPrometheusMetrics();
```

### Health Checks
```javascript
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'connected',
        redis: 'connected'
    });
});
```

### Log Management
```javascript
// Winston logger configuration
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});
```

## 📈 Performance Optimization

### Frontend Optimization
- [ ] Enable React production build
- [ ] Implement code splitting
- [ ] Use lazy loading for routes
- [ ] Optimize bundle size
- [ ] Enable gzip compression
- [ ] Use CDN for static assets
- [ ] Implement service worker

### Backend Optimization
- [ ] Enable database indexing
- [ ] Implement Redis caching
- [ ] Use connection pooling
- [ ] Enable gzip compression
- [ ] Implement pagination
- [ ] Use database transactions
- [ ] Enable query optimization

### Database Optimization
```javascript
// MongoDB indexes
db.workshops.createIndex({ "date": 1 });
db.workshops.createIndex({ "status": 1 });
db.workshops.createIndex({ "tags": 1 });
db.registrations.createIndex({ "userId": 1, "workshopId": 1 });
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Your deployment commands here
          echo "Deploying to production..."
```

### Automated Testing
```bash
# Run tests
npm test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Performance tests
npm run test:performance
```

## 📱 Mobile App Extension

### React Native Setup
```bash
# Initialize React Native project
npx react-native init WorkshopScheduleMobile

# Install dependencies
npm install @react-navigation/native @react-navigation/stack
npm install react-native-vector-icons react-native-async-storage

# Configure API connection
export const API_URL = 'https://api.workshopschedule.com';
```

### Mobile-specific Features
- Push notifications for workshop reminders
- Offline support for workshop schedules
- Camera integration for QR code scanning
- Calendar integration
- Location services for offline workshops

## 🎯 Production Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Database migrations run
- [ ] Security headers configured
- [ ] Monitoring set up
- [ ] Backup strategy implemented

### Post-deployment
- [ ] Health checks passing
- [ ] Error monitoring active
- [ ] Performance metrics collecting
- [ ] User feedback system working
- [ ] Analytics tracking
- [ ] Documentation updated

## 🆘 Troubleshooting

### Common Issues

#### Frontend Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Fix build issues
npm run build --verbose
```

#### Backend Connection Issues
```bash
# Check database connection
mongodb://localhost:27017/workshop-schedule

# Check Redis connection
redis-cli ping

# Debug API endpoints
curl -X GET http://localhost:3001/api/workshops
```

#### Docker Issues
```bash
# Check container logs
docker-compose logs backend

# Rebuild containers
docker-compose down
docker-compose up --build

# Check container status
docker-compose ps
```

### Error Monitoring
```javascript
// Sentry error tracking
Sentry.captureException(error);

// Custom error handling
app.use((err, req, res, next) => {
    logger.error(err.message, { error: err, request: req.url });
    res.status(500).json({ error: 'Internal server error' });
});
```

## 📞 Support

For deployment support and questions:
- Documentation: [Link to docs]
- Issues: [GitHub Issues]
- Email: support@workshopschedule.com
- Slack: #workshop-schedule-dev

---

**Happy Deploying! 🚀**