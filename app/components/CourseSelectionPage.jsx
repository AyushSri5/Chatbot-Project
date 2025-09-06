'use client'
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  PlayCircle, 
  BookOpen, 
  Code, 
  Database, 
  Globe, 
  Smartphone, 
  Server,
  ArrowRight,
  User,
  Bell,
  Settings,
  LogOut,
  Brain
} from 'lucide-react';

const CourseSelectionPage = () => {
  const [selectedInstructor, setSelectedInstructor] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('courses'); // 'courses' or 'chat'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedVideoLesson, setSelectedVideoLesson] = useState(null);

  // Course data
  const courses = [
    {
      id: 1,
      title: "Complete JavaScript Course 2024",
      instructor: "Hitesh Chaudhary",
      instructorColor: "from-orange-500 to-red-500",
      rating: 4.8,
      students: 120000,
      duration: "32 hours",
      lessons: 180,
      category: "JavaScript",
      icon: <Code className="w-6 h-6" />,
      description: "Master JavaScript from basics to advanced concepts with hands-on projects",
      thumbnail: "bg-gradient-to-br from-yellow-400 to-orange-500",
      topics: ["ES6+", "DOM Manipulation", "Async Programming", "Projects"]
    },
    {
      id: 2,
      title: "React JS Complete Guide",
      instructor: "Hitesh Chaudhary",
      instructorColor: "from-orange-500 to-red-500",
      rating: 4.9,
      students: 95000,
      duration: "28 hours",
      lessons: 160,
      category: "React",
      icon: <Globe className="w-6 h-6" />,
      description: "Build modern web applications with React, Hooks, and Redux",
      thumbnail: "bg-gradient-to-br from-blue-400 to-cyan-500",
      topics: ["Hooks", "Context API", "Redux", "Testing"]
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      instructor: "Hitesh Chaudhary",
      instructorColor: "from-orange-500 to-red-500",
      rating: 4.7,
      students: 85000,
      duration: "35 hours",
      lessons: 200,
      category: "Backend",
      icon: <Server className="w-6 h-6" />,
      description: "Create scalable backend applications with Node.js and Express",
      thumbnail: "bg-gradient-to-br from-green-400 to-emerald-500",
      topics: ["Express.js", "MongoDB", "Authentication", "APIs"]
    },
    {
      id: 4,
      title: "Full Stack Web Development",
      instructor: "Piyush Garg",
      instructorColor: "from-green-500 to-teal-500",
      rating: 4.9,
      students: 110000,
      duration: "45 hours",
      lessons: 250,
      category: "Full Stack",
      icon: <Database className="w-6 h-6" />,
      description: "Complete full stack development with MERN stack",
      thumbnail: "bg-gradient-to-br from-purple-400 to-pink-500",
      topics: ["MERN Stack", "GraphQL", "Docker", "Deployment"]
    },
    {
      id: 5,
      title: "System Design & Architecture",
      instructor: "Piyush Garg",
      instructorColor: "from-green-500 to-teal-500",
      rating: 4.8,
      students: 75000,
      duration: "25 hours",
      lessons: 120,
      category: "System Design",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Learn to design scalable systems and understand architecture patterns",
      thumbnail: "bg-gradient-to-br from-indigo-400 to-purple-500",
      topics: ["Scalability", "Microservices", "Load Balancing", "Caching"]
    },
    {
      id: 6,
      title: "DevOps & Cloud Computing",
      instructor: "Piyush Garg",
      instructorColor: "from-green-500 to-teal-500",
      rating: 4.7,
      students: 65000,
      duration: "30 hours",
      lessons: 140,
      category: "DevOps",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Master DevOps practices with AWS, Docker, and Kubernetes",
      thumbnail: "bg-gradient-to-br from-cyan-400 to-blue-500",
      topics: ["AWS", "Docker", "Kubernetes", "CI/CD"]
    }
  ];

  // Dummy video data for chat interface
  const videoLessons = [
    { id: 1, title: "Introduction to the Course", duration: "5:30", completed: true },
    { id: 2, title: "Setting up Development Environment", duration: "12:45", completed: true },
    { id: 3, title: "Variables and Data Types", duration: "18:20", completed: true },
    { id: 4, title: "Functions and Scope", duration: "22:15", completed: false },
    { id: 5, title: "Objects and Arrays", duration: "25:30", completed: false },
    { id: 6, title: "DOM Manipulation Basics", duration: "30:45", completed: false },
    { id: 7, title: "Event Handling", duration: "28:10", completed: false },
    { id: 8, title: "Async JavaScript - Promises", duration: "35:20", completed: false },
    { id: 9, title: "Fetch API and AJAX", duration: "40:15", completed: false },
    { id: 10, title: "Project: Todo Application", duration: "55:30", completed: false }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesInstructor = selectedInstructor === 'all' || course.instructor.toLowerCase().includes(selectedInstructor);
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesInstructor && matchesSearch;
  });



const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setCurrentView('chat');
    setSelectedVideoLesson(null); // Reset video selection when switching courses
};

const handleVideoLessonSelect = (lessonId) => {
    setSelectedVideoLesson(lessonId);
};

  const handleBackToCourses = () => {
    setCurrentView('courses');
    setSelectedCourse(null);
    setSelectedVideoLesson(null);
  };

  if (currentView === 'chat') {
    return (
      <div className="min-h-screen bg-gray-50 flex h-screen overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center justify-between">
              <button 
                onClick={handleBackToCourses}
                className="text-white hover:text-blue-100 transition-colors"
              >
                ← Back to Courses
              </button>
            </div>
            <h2 className="text-white font-semibold mt-2 text-sm">{selectedCourse?.title}</h2>
            <p className="text-blue-100 text-xs">{selectedCourse?.instructor}</p>
          </div>

          {/* Course Progress */}

          {/* Video Lessons */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center sticky top-0 bg-white z-10 py-2">
                <PlayCircle className="w-5 h-5 mr-2 text-blue-600" />
                Video Lessons
              </h3>
              <div className="space-y-2">
                {videoLessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    onClick={() => handleVideoLessonSelect(lesson.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedVideoLesson === lesson.id
                        ? 'bg-green-50 border border-green-200 hover:bg-green-100'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${
                          selectedVideoLesson === lesson.id ? 'text-green-800' : 'text-gray-800'
                        }`}>
                          {lesson.title}
                        </h4>
                        <div className="flex items-center mt-1 space-x-2">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500">{lesson.duration}</span>
                          {selectedVideoLesson === lesson.id && (
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-800">StudyBot AI Assistant</h1>
                  <p className="text-sm text-gray-500">Ask me anything about {selectedCourse?.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Welcome Message */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm border border-gray-200 max-w-lg">
                  <p className="text-gray-800">
                    Hello! I am your AI study assistant for <strong>{selectedCourse?.title}</strong>. 
                    I can help you with concepts, coding problems, and answer questions about the course content. 
                    {selectedVideoLesson && (
                      <><br/><br/>Currently selected lesson: <strong>
                        {videoLessons.find(l => l.id === selectedVideoLesson)?.title}
                      </strong></>
                    )}
                    <br/><br/>What would you like to learn about?
                  </p>
                </div>
              </div>

              {/* Suggested Questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                <button className="text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
                  <div className="flex items-center space-x-3">
                    <Code className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                    <span className="text-gray-700 group-hover:text-blue-700">Explain JavaScript closures</span>
                  </div>
                </button>
                <button className="text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
                  <div className="flex items-center space-x-3">
                    <PlayCircle className="w-5 h-5 text-purple-600 group-hover:text-purple-700" />
                    <span className="text-gray-700 group-hover:text-purple-700">Help with current lesson</span>
                  </div>
                </button>
                <button className="text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-green-600 group-hover:text-green-700" />
                    <span className="text-gray-700 group-hover:text-green-700">Review key concepts</span>
                  </div>
                </button>
                <button className="text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
                    <span className="text-gray-700 group-hover:text-orange-700">Practice problems</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Ask a question about the course..."
                    className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                StudyBot can make mistakes. Please verify important information.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">StudyBot Dashboard</h1>
                <p className="text-sm text-gray-600">Choose your course to get started</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
                <button
                  onClick={() => setSelectedInstructor('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedInstructor === 'all' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All Instructors
                </button>
                <button
                  onClick={() => setSelectedInstructor('hitesh')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedInstructor === 'hitesh' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Hitesh Chaudhary
                </button>
                <button
                  onClick={() => setSelectedInstructor('piyush')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedInstructor === 'piyush' 
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Piyush Garg
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseSelect(course)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >
              {/* Course Thumbnail */}
              <div className={`h-48 ${course.thumbnail} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                    {course.icon}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                    {course.category}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2">
                    {course.topics.slice(0, 2).map((topic, index) => (
                      <span key={index} className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                        {topic}
                      </span>
                    ))}
                    {course.topics.length > 2 && (
                      <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                        +{course.topics.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${course.instructorColor} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-semibold text-sm">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{course.instructor}</p>
                    <p className="text-gray-500 text-xs">Course Instructor</p>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <PlayCircle className="w-4 h-4" />
                    <span>{course.lessons}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105">
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseSelectionPage;