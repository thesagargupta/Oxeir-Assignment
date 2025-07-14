// API service for workshops
import axios from "axios";
import { format, addDays, addHours, subDays } from "date-fns";

const API_BASE_URL = "http://localhost:3001/api";

const mockWorkshops = [
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

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const workshopApi = {
  // Get all workshops
  getWorkshops: async (
    filter = "all",
    search = "",
    tags = "",
    category = "",
    level = "",
    mode = ""
  ) => {
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.append("filter", filter);
      if (search) params.append("search", search);
      if (tags) params.append("tags", tags);
      if (category) params.append("category", category);
      if (level) params.append("level", level);
      if (mode) params.append("mode", mode);

      const response = await axios.get(`${API_BASE_URL}/workshops?${params}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching workshops:", error);
      // Fallback to mock data if backend is not available
      return {
        success: true,
        data: mockWorkshops.filter(
          (w) => filter === "all" || w.status === filter
        ),
      };
    }
  },

  // Get single workshop
  getWorkshop: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/workshops/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching workshop:", error);
      // Fallback to mock data
      const workshop = mockWorkshops.find((w) => w.id === parseInt(id));
      return workshop
        ? { success: true, data: workshop }
        : { success: false, error: "Workshop not found" };
    }
  },

  // Register for workshop
  registerForWorkshop: async (
    workshopId,
    userId,
    userEmail = "user@example.com",
    userName = "User"
  ) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/workshops/${workshopId}/register`,
        {
          userId,
          userEmail,
          userName,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error registering for workshop:", error);
      return {
        success: false,
        error: error.response?.data?.error || "Failed to register for workshop",
      };
    }
  },

  // Get user's registered workshops
  getUserWorkshops: async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/${userId}/workshops`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user workshops:", error);
      // Fallback to mock data
      const userWorkshops = [1, 3, 5];
      const registeredWorkshops = mockWorkshops.filter((w) =>
        userWorkshops.includes(w.id)
      );
      return { success: true, data: registeredWorkshops };
    }
  },

  // Get workshop statistics
  getWorkshopStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/workshops/stats`);
      return response.data;
    } catch (error) {
      console.error("Error fetching workshop stats:", error);
      return { success: false, error: "Failed to fetch statistics" };
    }
  },

  // Get workshop categories
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/workshops/categories`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return {
        success: true,
        data: [
          "Frontend Development",
          "Backend Development",
          "Data Science",
          "Design",
          "DevOps",
        ],
      };
    }
  },

  // Get workshop tags
  getTags: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/workshops/tags`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tags:", error);
      return {
        success: true,
        data: ["React", "JavaScript", "Python", "Node.js", "UI/UX", "Docker"],
      };
    }
  },
};
