# Workshop Schedule Page

A comprehensive, responsive workshop schedule application built with React, Tailwind CSS, and modern web technologies.

## 🚀 Features

### Core Features
- **Dynamic Workshop Listing**: Display upcoming, live, and completed workshops
- **Interactive Filtering**: Filter workshops by status (All, Upcoming, Live Now, Completed)
- **Advanced Search**: Search by workshop title, trainer name, topics, and descriptions
- **Real-time Status Updates**: Live indicators for ongoing workshops
- **Registration System**: Register for workshops with capacity management
- **Modal Detail View**: Comprehensive workshop information in modal

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Fade-in animations and hover effects
- **Loading States**: Elegant loading spinners and skeleton screens
- **Error Handling**: Graceful error states with retry functionality
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

### Workshop Management
- **Capacity Tracking**: Visual progress bars showing enrollment status
- **Registration Status**: Clear indicators for registered workshops
- **Multi-mode Support**: Online, Offline, and Hybrid workshops
- **Trainer Profiles**: Trainer information with photos and bios
- **Agenda Display**: Detailed workshop curriculum and timeline

### Integration Features
- **Calendar Integration**: "Add to Calendar" functionality (Google Calendar, iCal)
- **WhatsApp Groups**: Direct links to workshop discussion groups
- **Video Conferencing**: Integration with Zoom and YouTube Live
- **Social Sharing**: Share workshops via native sharing API

## 🛠️ Technology Stack

- **Frontend**: React 19, Tailwind CSS 4
- **Icons**: Heroicons
- **Date Handling**: date-fns
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Styling**: Custom CSS with Tailwind utilities

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd oxeir-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── WorkshopSchedule.jsx     # Main component
│   ├── WorkshopCard.jsx         # Individual workshop card
│   ├── WorkshopModal.jsx        # Workshop details modal
│   ├── FilterButtons.jsx        # Status filter buttons
│   ├── SearchBar.jsx            # Search functionality
│   └── LoadingSpinner.jsx       # Loading component
├── services/
│   └── workshopApi.js           # API service layer
├── backend/
│   └── server.js                # Express server (demo)
└── styles/
    └── index.css                # Global styles
```

## 🎨 Component Overview

### WorkshopSchedule (Main Component)
- State management for workshops, filters, and search
- Handles workshop registration and user interactions
- Responsive layout with mobile-first approach
- Error handling and loading states

### WorkshopCard
- Individual workshop display with key information
- Status badges (Upcoming, Live Now, Completed)
- Interactive buttons based on workshop status
- Capacity indicators and progress bars
- Hover effects and animations

### WorkshopModal
- Detailed workshop information
- Trainer profiles and bios
- Full agenda and curriculum
- Registration and sharing functionality
- Calendar integration buttons

### FilterButtons
- Status-based filtering (All, Upcoming, Live, Completed)
- Dynamic count badges
- Active state styling
- Responsive button layout

### SearchBar
- Real-time search functionality
- Clear search button
- Responsive input field
- Debounced search for performance

## 🔧 API Integration

The application uses a mock API service (`workshopApi.js`) that simulates:

- `getWorkshops()` - Fetch all workshops with filtering
- `getWorkshop(id)` - Get single workshop details
- `registerForWorkshop(workshopId, userId)` - Register user for workshop
- `getUserWorkshops(userId)` - Get user's registered workshops

### Sample Workshop Data Structure
```javascript
{
  id: 1,
  title: "React Fundamentals Bootcamp",
  subtitle: "Master the basics of React development",
  description: "Comprehensive bootcamp covering React fundamentals...",
  date: "2024-01-15T10:00:00Z",
  duration: 180, // minutes
  mode: "Online", // Online, Offline, Hybrid
  trainer: {
    name: "Sarah Johnson",
    image: "https://...",
    bio: "Senior React Developer..."
  },
  capacity: {
    total: 50,
    filled: 24
  },
  status: "upcoming", // upcoming, live, completed
  tags: ["React", "JavaScript", "Frontend"],
  zoomLink: "https://zoom.us/j/123456789",
  youtubeLink: "https://youtube.com/watch?v=example",
  whatsappGroup: "https://chat.whatsapp.com/example",
  agenda: [
    "Introduction to React",
    "Components and JSX",
    // ...more items
  ]
}
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Key responsive features:
- Flexible grid layouts (1-2-3 columns)
- Collapsible navigation and filters
- Mobile-optimized modal presentations
- Touch-friendly button sizes
- Responsive typography scaling

## 🎯 User Interactions

### Registration Flow
1. User clicks "Register" on workshop card
2. System checks workshop capacity
3. Registration API call with user ID
4. Success/error feedback
5. UI updates to show registered status

### Live Workshop Flow
1. "Live Now" status indicator appears
2. "Join Live" button becomes available
3. Click opens Zoom/YouTube link in new tab
4. WhatsApp group link for discussion

### Search & Filter Flow
1. User types in search bar
2. Real-time filtering of workshops
3. Filter buttons update counts
4. Results update dynamically
5. Clear search functionality

## 🔧 Customization

### Adding New Workshop Status
1. Update `workshopApi.js` mock data
2. Add new status badge in `WorkshopCard.jsx`
3. Update filter buttons in `FilterButtons.jsx`
4. Add corresponding styles and colors

### Modifying Workshop Card Layout
1. Edit `WorkshopCard.jsx` component
2. Update Tailwind classes for styling
3. Modify information display order
4. Add/remove card elements

### Extending Search Functionality
1. Modify `filterWorkshops()` in `WorkshopSchedule.jsx`
2. Add new searchable fields
3. Implement advanced search filters
4. Add search result highlighting

## 🚀 Performance Optimizations

- **Lazy Loading**: Components load as needed
- **Debounced Search**: Prevents excessive API calls
- **Optimistic Updates**: Immediate UI feedback
- **Efficient Re-renders**: React.memo and useCallback usage
- **Image Optimization**: Proper image sizing and formats

## 🧪 Testing Considerations

### Unit Tests
- Component rendering tests
- User interaction tests
- API service tests
- Search and filter functionality

### Integration Tests
- Registration flow testing
- Modal interactions
- Responsive behavior
- Error state handling

### E2E Tests
- Complete user journey testing
- Cross-browser compatibility
- Mobile device testing
- Accessibility compliance

## 🔒 Security Considerations

- Input sanitization for search
- XSS prevention in user-generated content
- Secure API endpoints
- User authentication integration
- Rate limiting for API calls

## 🌐 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
```
REACT_APP_API_URL=https://api.example.com
REACT_APP_ZOOM_SDK_KEY=your-zoom-key
REACT_APP_ANALYTICS_ID=your-analytics-id
```

### Deployment Platforms
- **Vercel**: Automatic deployments with Git integration
- **Netlify**: Static site hosting with form handling
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for public repositories

## 📈 Future Enhancements

### Phase 2 Features
- User authentication and profiles
- Workshop ratings and reviews
- Email notifications for registrations
- Advanced analytics dashboard
- Multi-language support

### Phase 3 Features
- Payment integration for paid workshops
- Video streaming integration
- Workshop creation interface
- Advanced reporting and analytics
- Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created as part of the Oxeir assignment - demonstrating modern React development practices and responsive design principles.

---

For questions or support, please contact the development team.