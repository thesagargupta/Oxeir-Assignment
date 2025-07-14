// Enhanced Express server for Workshop Schedule API
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { format, addDays, subDays, addHours, subHours } from 'date-fns';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Enhanced mock database with realistic workshop data
let workshops = [
  {
    id: 1,
    title: "React Fundamentals",
    subtitle: "Master the basics of React development",
    description:
      "A comprehensive bootcamp covering React fundamentals including components, state management, hooks, and modern React patterns. Perfect for beginners and intermediate developers.",
    date: addDays(new Date(), 2),
    duration: 180, // in minutes
    mode: "Online",
    trainer: {
      name: "Sagar Gupta",
      image:"https://images.unsplash.com/photo-1752508970404-fd12ae09b74e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Senior React Developer at Tech Corp with 8+ years of experience. Passionate about teaching and modern web development.",
    },
    capacity: {
      total: 50,
      filled: 24,
    },
    status: "upcoming",
    tags: ["React", "JavaScript", "Frontend", "Beginner"],
    zoomLink: "https://zoom.us/j/123456789",
    youtubeLink: "https://youtube.com/watch?v=example",
    whatsappGroup: "https://chat.whatsapp.com/example",
    agenda: [
      "Introduction to React",
      "Components and JSX",
      "State and Props",
      "Event Handling",
      "Hooks Overview",
      "Building Your First App",
    ],
  },
  {
    id: 2,
    title: "Advanced TypeScript Workshop",
    subtitle: "Deep dive into TypeScript advanced features",
    description:
      "Take your TypeScript skills to the next level with advanced types, generics, decorators, and real-world patterns used in enterprise applications.",
    date: new Date(), // Today - Live now
    duration: 120,
    mode: "Hybrid",
    trainer: {
      name: "Alakh Pandey",
      image:"https://readableinfo.com/wp-content/uploads/2025/02/Alakh-Pandey-biography-Physics-Teacher-and-Founder-of-Physics-Wala-2.webp",
      bio: "TypeScript enthusiast and tech lead with expertise in large-scale applications. Author of 'TypeScript Best Practices' blog series.",
    },
    capacity: {
      total: 30,
      filled: 28,
    },
    status: "live",
    tags: ["TypeScript", "Advanced", "Programming"],
    zoomLink: "https://zoom.us/j/987654321",
    youtubeLink: "https://youtube.com/watch?v=live-example",
    whatsappGroup: "https://chat.whatsapp.com/typescript",
    agenda: [
      "Advanced Type System",
      "Generics and Constraints",
      "Utility Types",
      "Decorators",
      "Module System",
      "Performance Optimization",
    ],
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    subtitle: "Build scalable backend applications",
    description:
      "Learn to build robust, scalable backend applications using Node.js, Express, and MongoDB. Covers authentication, APIs, and deployment.",
    date: addDays(new Date(), 5),
    duration: 240,
    mode: "Online",
    trainer: {
      name: "Khan Sir",
      image:"https://img.etimg.com/thumb/msid-115889521,width-650,height-488,imgsize-24884,resizemode-75/khan-sir.jpg",
     bio: "Full-stack developer specializing in Node.js and cloud architecture. 10+ years experience in enterprise software development.",
    },
    capacity: {
      total: 40,
      filled: 12,
    },
    status: "upcoming",
    tags: ["Node.js", "Backend", "API", "Database"],
    zoomLink: "https://zoom.us/j/456789123",
    youtubeLink: "https://youtube.com/watch?v=nodejs-example",
    whatsappGroup: "https://chat.whatsapp.com/nodejs",
    agenda: [
      "Node.js Fundamentals",
      "Express.js Framework",
      "Database Integration",
      "Authentication & Security",
      "API Design",
      "Deployment Strategies",
    ],
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    subtitle: "Create beautiful and functional interfaces",
    description:
      "Master the art of UI/UX design with practical exercises, design thinking, and modern design tools. Learn to create user-centered designs.",
    date: subDays(new Date(), 3),
    duration: 150,
    mode: "Offline",
    trainer: {
      name: "CodeWithHarry",
      image:"https://media.licdn.com/dms/image/v2/D5622AQFqFwFBkkArlg/feedshare-shrink_800/feedshare-shrink_800/0/1725530456084?e=1755129600&v=beta&t=J9P8XOCjpEm4bn41Pm7-WdBgQxAInGDOd-daxrRtisQ",
      bio: "Senior UX Designer with expertise in user research and interface design. Former design lead at startup unicorns.",
    },
    capacity: {
      total: 25,
      filled: 25,
    },
    status: "completed",
    tags: ["Design", "UX", "UI", "Creative"],
    zoomLink: null,
    youtubeLink: "https://youtube.com/watch?v=design-recorded",
    whatsappGroup: "https://chat.whatsapp.com/design",
    agenda: [
      "Design Thinking Process",
      "User Research Methods",
      "Wireframing & Prototyping",
      "Visual Design Principles",
      "Usability Testing",
      "Design Systems",
    ],
  },
  {
    id: 5,
    title: "Python Data Science Intensive",
    subtitle: "Analyze data with Python and machine learning",
    description:
      "Comprehensive data science workshop covering Python, pandas, NumPy, matplotlib, and introduction to machine learning concepts.",
    date: addDays(new Date(), 7),
    duration: 300,
    mode: "Online",
    trainer: {
      name: "Apna College",
      image:"https://www.mypunepulse.com/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-27-at-2.11.07-PM.jpeg",
      bio: "Data Scientist with PhD in Statistics. Expert in machine learning and data visualization with 12+ years in the field.",
    },
    capacity: {
      total: 60,
      filled: 45,
    },
    status: "upcoming",
    tags: ["Python", "Data Science", "ML", "Analytics"],
    zoomLink: "https://zoom.us/j/789123456",
    youtubeLink: "https://youtube.com/watch?v=datascience-example",
    whatsappGroup: "https://chat.whatsapp.com/datascience",
    agenda: [
      "Python for Data Science",
      "Data Manipulation with Pandas",
      "Data Visualization",
      "Statistical Analysis",
      "Machine Learning Basics",
      "Real-world Project",
    ],
  },
  {
    id: 6,
    title: "DevOps and Cloud Computing",
    subtitle: "Master modern deployment and infrastructure",
    description:
      "Learn DevOps practices, CI/CD, Docker, Kubernetes, and cloud deployment strategies for modern application development.",
    date: subDays(new Date(), 1),
    duration: 200,
    mode: "Hybrid",
    trainer: {
      name: "TechGuru",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      bio: "DevOps Engineer and cloud architect with expertise in AWS, Docker, and Kubernetes. Consultant for Fortune 500 companies.",
    },
    capacity: {
      total: 35,
      filled: 35,
    },
    status: "completed",
    tags: ["DevOps", "Cloud", "Docker", "Kubernetes"],
    zoomLink: null,
    youtubeLink: "https://youtube.com/watch?v=devops-recorded",
    whatsappGroup: "https://chat.whatsapp.com/devops",
    agenda: [
      "DevOps Fundamentals",
      "CI/CD Pipelines",
      "Containerization with Docker",
      "Kubernetes Orchestration",
      "Cloud Deployment",
      "Monitoring & Logging",
    ],
  },
];

// Enhanced registration system
let registrations = [];
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", registeredAt: new Date() },
  { id: 2, name: "Jane Smith", email: "jane@example.com", registeredAt: new Date() }
];

// Notification system
let notifications = [];

// Analytics tracking
let analytics = {
  totalViews: 0,
  registrations: 0,
  completions: 0,
  popularWorkshops: {}
};

// Enhanced API Routes

// Get all workshops with advanced filtering
app.get('/api/workshops', (req, res) => {
  const { filter, search, tags, category, level, mode, page = 1, limit = 10 } = req.query;
  let filteredWorkshops = [...workshops];
  
  // Track analytics
  analytics.totalViews++;
  
  // Filter by status
  if (filter && filter !== 'all') {
    filteredWorkshops = filteredWorkshops.filter(w => w.status === filter);
  }
  
  // Search functionality
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredWorkshops = filteredWorkshops.filter(workshop =>
      workshop.title.toLowerCase().includes(searchTerm) ||
      workshop.subtitle.toLowerCase().includes(searchTerm) ||
      workshop.description.toLowerCase().includes(searchTerm) ||
      workshop.trainer.name.toLowerCase().includes(searchTerm) ||
      workshop.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      workshop.category.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filter by tags
  if (tags) {
    const tagArray = tags.split(',');
    filteredWorkshops = filteredWorkshops.filter(workshop =>
      tagArray.every(tag => workshop.tags.includes(tag))
    );
  }
  
  // Filter by category
  if (category) {
    filteredWorkshops = filteredWorkshops.filter(w => w.category === category);
  }
  
  // Filter by level
  if (level) {
    filteredWorkshops = filteredWorkshops.filter(w => w.level === level);
  }
  
  // Filter by mode
  if (mode) {
    filteredWorkshops = filteredWorkshops.filter(w => w.mode === mode);
  }
  
  // Sort by date
  filteredWorkshops.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedWorkshops = filteredWorkshops.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    data: paginatedWorkshops,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filteredWorkshops.length,
      pages: Math.ceil(filteredWorkshops.length / limit)
    }
  });
});

// Get workshop categories
app.get('/api/workshops/categories', (req, res) => {
  const categories = [...new Set(workshops.map(w => w.category))];
  res.json({ success: true, data: categories });
});

// Get workshop tags
app.get('/api/workshops/tags', (req, res) => {
  const tags = [...new Set(workshops.flatMap(w => w.tags))];
  res.json({ success: true, data: tags });
});

// Get workshop statistics
app.get('/api/workshops/stats', (req, res) => {
  const stats = {
    total: workshops.length,
    upcoming: workshops.filter(w => w.status === 'upcoming').length,
    live: workshops.filter(w => w.status === 'live').length,
    completed: workshops.filter(w => w.status === 'completed').length,
    totalCapacity: workshops.reduce((sum, w) => sum + w.capacity.total, 0),
    totalEnrolled: workshops.reduce((sum, w) => sum + w.capacity.filled, 0),
    averageRating: workshops.reduce((sum, w) => sum + (w.trainer.rating || 0), 0) / workshops.length,
    categories: workshops.reduce((acc, w) => {
      acc[w.category] = (acc[w.category] || 0) + 1;
      return acc;
    }, {}),
    modes: workshops.reduce((acc, w) => {
      acc[w.mode] = (acc[w.mode] || 0) + 1;
      return acc;
    }, {}),
    analytics
  };
  
  res.json({ success: true, data: stats });
});

// Get single workshop
app.get('/api/workshops/:id', (req, res) => {
  const workshop = workshops.find(w => w.id === parseInt(req.params.id));
  if (!workshop) {
    return res.status(404).json({ success: false, error: 'Workshop not found' });
  }
  
  // Track workshop views
  analytics.popularWorkshops[workshop.id] = (analytics.popularWorkshops[workshop.id] || 0) + 1;
  
  res.json({ success: true, data: workshop });
});

// Workshop registration with enhanced validation
app.post('/api/workshops/:id/register', (req, res) => {
  const { userId, userEmail, userName } = req.body;
  const workshopId = parseInt(req.params.id);
  
  // Validate required fields
  if (!userId || !userEmail) {
    return res.status(400).json({ success: false, error: 'User ID and email are required' });
  }
  
  const workshop = workshops.find(w => w.id === workshopId);
  if (!workshop) {
    return res.status(404).json({ success: false, error: 'Workshop not found' });
  }
  
  // Check if workshop is in the past
  if (workshop.status === 'completed') {
    return res.status(400).json({ success: false, error: 'Cannot register for completed workshops' });
  }
  
  // Check capacity
  if (workshop.capacity.filled >= workshop.capacity.total) {
    return res.status(400).json({ success: false, error: 'Workshop is full' });
  }
  
  // Check if already registered
  const existingRegistration = registrations.find(r => 
    r.userId === userId && r.workshopId === workshopId
  );
  
  if (existingRegistration) {
    return res.status(400).json({ success: false, error: 'Already registered for this workshop' });
  }
  
  // Add registration
  const registration = {
    id: registrations.length + 1,
    userId,
    userEmail,
    userName,
    workshopId,
    registrationDate: new Date(),
    status: 'confirmed',
    paymentStatus: workshop.price > 0 ? 'pending' : 'free'
  };
  
  registrations.push(registration);
  
  // Update capacity
  workshop.capacity.filled += 1;
  
  // Add notification
  notifications.push({
    id: notifications.length + 1,
    userId,
    type: 'registration',
    message: `Successfully registered for ${workshop.title}`,
    workshopId,
    createdAt: new Date(),
    read: false
  });
  
  // Track analytics
  analytics.registrations++;
  
  res.json({
    success: true,
    message: 'Successfully registered for workshop!',
    data: { registration, workshop }
  });
});

// Cancel registration
app.delete('/api/workshops/:id/register', (req, res) => {
  const { userId } = req.body;
  const workshopId = parseInt(req.params.id);
  
  const registrationIndex = registrations.findIndex(r => 
    r.userId === userId && r.workshopId === workshopId
  );
  
  if (registrationIndex === -1) {
    return res.status(404).json({ success: false, error: 'Registration not found' });
  }
  
  const workshop = workshops.find(w => w.id === workshopId);
  if (workshop && workshop.capacity.filled > 0) {
    workshop.capacity.filled -= 1;
  }
  
  registrations.splice(registrationIndex, 1);
  
  // Add notification
  notifications.push({
    id: notifications.length + 1,
    userId,
    type: 'cancellation',
    message: `Registration cancelled for ${workshop.title}`,
    workshopId,
    createdAt: new Date(),
    read: false
  });
  
  res.json({
    success: true,
    message: 'Registration cancelled successfully'
  });
});

// Get user's registered workshops
app.get('/api/users/:userId/workshops', (req, res) => {
  const { userId } = req.params;
  const userRegistrations = registrations.filter(r => r.userId === userId);
  const userWorkshops = userRegistrations.map(reg => ({
    ...workshops.find(w => w.id === reg.workshopId),
    registrationDate: reg.registrationDate,
    registrationStatus: reg.status,
    paymentStatus: reg.paymentStatus
  })).filter(Boolean);
  
  res.json({ success: true, data: userWorkshops });
});

// Get user notifications
app.get('/api/users/:userId/notifications', (req, res) => {
  const { userId } = req.params;
  const userNotifications = notifications
    .filter(n => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  res.json({ success: true, data: userNotifications });
});

// Mark notification as read
app.patch('/api/notifications/:id/read', (req, res) => {
  const notificationId = parseInt(req.params.id);
  const notification = notifications.find(n => n.id === notificationId);
  
  if (!notification) {
    return res.status(404).json({ success: false, error: 'Notification not found' });
  }
  
  notification.read = true;
  res.json({ success: true, message: 'Notification marked as read' });
});

// Get workshop feedback/reviews
app.get('/api/workshops/:id/reviews', (req, res) => {
  const workshopId = parseInt(req.params.id);
  
  // Mock reviews data
  const reviews = [
    {
      id: 1,
      userId: 1,
      userName: "John Doe",
      rating: 5,
      comment: "Excellent workshop! Very informative and well-structured.",
      createdAt: new Date()
    },
    {
      id: 2,
      userId: 2,
      userName: "Jane Smith",
      rating: 4,
      comment: "Great content, but could use more hands-on exercises.",
      createdAt: new Date()
    }
  ];
  
  res.json({ success: true, data: reviews });
});

// Submit workshop feedback
app.post('/api/workshops/:id/reviews', (req, res) => {
  const { userId, userName, rating, comment } = req.body;
  const workshopId = parseInt(req.params.id);
  
  if (!userId || !rating) {
    return res.status(400).json({ success: false, error: 'User ID and rating are required' });
  }
  
  const review = {
    id: Date.now(),
    userId,
    userName,
    rating,
    comment,
    workshopId,
    createdAt: new Date()
  };
  
  res.json({
    success: true,
    message: 'Review submitted successfully',
    data: review
  });
});

// WebSocket for real-time updates (if needed)
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"]
  }
});

// Real-time updates for workshop status changes
io.on('connection', (socket) => {
  console.log('Client connected for real-time updates');
  
  socket.on('join-workshop', (workshopId) => {
    socket.join(`workshop-${workshopId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Function to broadcast workshop updates
const broadcastWorkshopUpdate = (workshopId, update) => {
  io.to(`workshop-${workshopId}`).emit('workshop-update', update);
};

// Simulate real-time workshop status changes
setInterval(() => {
  // Check for workshops that should be live
  workshops.forEach(workshop => {
    const now = new Date();
    const workshopDate = new Date(workshop.date);
    const workshopEnd = new Date(workshopDate.getTime() + workshop.duration * 60000);
    
    if (workshopDate <= now && now <= workshopEnd && workshop.status === 'upcoming') {
      workshop.status = 'live';
      broadcastWorkshopUpdate(workshop.id, { status: 'live' });
      console.log(`Workshop ${workshop.id} is now live`);
    } else if (now > workshopEnd && workshop.status === 'live') {
      workshop.status = 'completed';
      broadcastWorkshopUpdate(workshop.id, { status: 'completed' });
      console.log(`Workshop ${workshop.id} is now completed`);
      analytics.completions++;
    }
  });
}, 30000); // Check every 30 seconds

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Workshop API Server running on port ${PORT}`);
  console.log(`📊 Real-time updates enabled`);
  console.log(`🔗 API endpoints available at http://localhost:${PORT}/api`);
});

export default app;