import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Search, CheckCircle, Circle, RotateCcw, BookOpen } from 'lucide-react';

const InterviewStudyGuide = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);

  const questionCategories = [
    {
      name: "HTML",
      count: 15,
      questions: [
        "Difference between <div> and <span>",
        "Semantic tags in HTML5",
        "What is doctype?",
        "Role of meta tags in SEO",
        "What are ARIA roles?",
        "How do forms work in HTML?",
        "What are custom data attributes?",
        "How does browser parse HTML?",
        "How to implement lazy loading in images?",
        "How does <picture> tag work for responsive design?",
        "Differences between HTML4 vs HTML5",
        "What is an iframe and how secure is it?",
        "How to make HTML5 accessible?",
        "What is Web Storage API?",
        "How to optimize HTML for SEO?"
      ]
    },
    {
      name: "CSS",
      count: 15,
      questions: [
        "Explain the Box Model",
        "Specificity and cascade – how it works",
        "Flexbox vs Grid – when to use what",
        "Media queries in responsive design",
        "Visibility: hidden vs display: none",
        "How to center a div both ways",
        "z-index and stacking context",
        "CSS variables – why and how",
        "What are pseudo-elements like ::before?",
        "Position: relative vs absolute vs fixed",
        "Units: px vs em vs rem vs %",
        "Dark mode toggle with CSS",
        "CSS transitions vs animations",
        "Inline vs external CSS pros/cons",
        "Responsive layout without media queries?"
      ]
    },
    {
      name: "JavaScript",
      count: 15,
      questions: [
        "What is closure?",
        "Event loop and microtask queue",
        "var vs let vs const",
        "== vs ===",
        "What is hoisting?",
        "Arrow vs regular functions",
        "What is currying in JS?",
        "Debounce vs throttle – use cases",
        "Event delegation",
        "Prototypal inheritance",
        "Memory leaks in JS – detection",
        "Scope chain and context",
        "WeakMap vs Map",
        "async/await vs Promises",
        "Module pattern in JS"
      ]
    },
    {
      name: "React / Angular / VueJS",
      count: 15,
      questions: [
        "Virtual DOM – what and why",
        "useEffect vs useLayoutEffect",
        "Controlled vs uncontrolled components",
        "React Context API use cases",
        "Lifecycle methods in React",
        "State management in large apps",
        "Angular's change detection",
        "Dependency Injection in Angular",
        "Routing in React vs Angular",
        "SSR vs CSR",
        "Lazy loading components",
        "Hooks – useState, useReducer, useCallback",
        "Higher-Order Components (HOCs)",
        "Vue's reactivity system",
        "Two-way binding in Angular"
      ]
    },
    {
      name: "Java & OOPS",
      count: 15,
      questions: [
        "Interface vs Abstract class",
        "Overloading vs Overriding",
        "Final vs static vs transient",
        "HashMap vs ConcurrentHashMap",
        "Garbage collection in Java",
        "What are design patterns?",
        "What is the Java Memory Model?",
        "SOLID principles in Java",
        "Exception handling flow",
        "Functional interfaces",
        "JVM vs JRE vs JDK",
        "Composition vs Inheritance",
        "What is polymorphism?",
        "What is encapsulation?",
        "Constructor overloading"
      ]
    },
    {
      name: "Spring Boot + JPA + Security",
      count: 15,
      questions: [
        "What is Spring Boot?",
        "How does Dependency Injection work?",
        "Autowiring with @Autowired",
        "@Transactional – use case",
        "CrudRepository vs JpaRepository",
        "How does JPA handle relationships?",
        "Lazy vs Eager fetching",
        "Spring Security flow",
        "JWT Authentication in Spring",
        "Exception handling in Spring Boot",
        "Entity vs DTO",
        "Hibernate LazyInitializationException",
        "Spring Boot starter dependencies",
        "OAuth2 in Spring Security",
        "Custom validations using annotations"
      ]
    },
    {
      name: "Frontend Integration",
      count: 15,
      questions: [
        "React with Spring Boot – API integration",
        "How Thymeleaf templates work",
        "CORS and how to handle it",
        "REST vs GraphQL integration",
        "SSR + REST API – how it works",
        "WebSockets integration with Spring Boot",
        "Form validation – frontend vs backend",
        "CSRF protection",
        "Environment-based config in frontend",
        "Auth flow – JWT and cookies",
        "API versioning",
        "Micro frontend concepts",
        "Error handling in frontend/backend",
        "React fetch vs Axios",
        "SPA vs MPA – pros and cons"
      ]
    },
    {
      name: "Database + ORM",
      count: 15,
      questions: [
        "JDBC vs JPA",
        "Lazy vs Eager loading",
        "JPQL vs Native queries",
        "N+1 problem in Hibernate",
        "Connection pooling",
        "Optimistic vs Pessimistic locking",
        "Indexing strategies",
        "ACID properties",
        "Database migrations (Flyway)",
        "OneToMany vs ManyToOne",
        "@Entity lifecycle",
        "Embedded vs Relational design",
        "Writing custom queries",
        "Performance tuning queries",
        "Isolation levels in transactions"
      ]
    },
    {
      name: "Testing + DevOps",
      count: 10,
      questions: [
        "JUnit vs Mockito",
        "Integration test vs Unit test",
        "Test coverage tools",
        "CI/CD with GitHub Actions",
        "Docker for Spring Boot",
        "Jenkins pipeline overview",
        "SonarQube for code quality",
        "How to mock REST calls",
        "Blue-green deployment",
        "Rolling back faulty builds"
      ]
    },
    {
      name: "Machine Coding Round",
      count: 10,
      questions: [
        "Design LRU Cache",
        "Build URL Shortener",
        "Design Splitwise",
        "Create Elevator System",
        "Food Delivery System",
        "Ride Sharing App (Uber)",
        "Rate Limiter design",
        "In-memory key-value store",
        "Library Management System",
        "Job Scheduler with Priority Queues"
      ]
    }
  ];

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const toggleQuestionComplete = (questionId) => {
    setCompletedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const resetProgress = () => {
    setCompletedQuestions(new Set());
  };

  const filteredCategories = questionCategories.map(category => ({
    ...category,
    questions: category.questions.filter(question =>
      question.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!showCompletedOnly || completedQuestions.has(`${category.name}-${question}`))
    )
  })).filter(category => category.questions.length > 0);

  const totalQuestions = questionCategories.reduce((sum, cat) => sum + cat.count, 0);
  const completedCount = completedQuestions.size;
  const progressPercentage = (completedCount / totalQuestions) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Java Full Stack Developer Interview Guide</h1>
          </div>
          <p className="text-gray-600 mb-6">Master these 125 essential interview questions to land your Java Full Stack Developer role in 2025</p>
          
          {/* Progress Bar */}
          <div className="bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
            <span>{completedCount} of {totalQuestions} questions completed</span>
            <span>{Math.round(progressPercentage)}% progress</span>
          </div>
        </header>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCompletedOnly(!showCompletedOnly)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showCompletedOnly 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-gray-100 text-gray-700 border border-gray-300'
              }`}
            >
              {showCompletedOnly ? 'Show All' : 'Show Completed'}
            </button>
            <button
              onClick={resetProgress}
              className="px-4 py-2 rounded-lg font-medium bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Progress
            </button>
          </div>
        </div>

        {/* Question Categories */}
        <div className="space-y-4">
          {filteredCategories.map((category) => {
            const categoryCompleted = category.questions.filter(q => 
              completedQuestions.has(`${category.name}-${q}`)
            ).length;
            const categoryProgress = (categoryCompleted / category.questions.length) * 100;
            
            return (
              <div key={category.name} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(category.name)}
                  className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {expandedSections[category.name] ? 
                      <ChevronDown className="w-5 h-5 text-gray-600" /> : 
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    }
                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {category.questions.length} questions
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-600">
                      {categoryCompleted}/{category.questions.length} completed
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${categoryProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </button>
                
                {expandedSections[category.name] && (
                  <div className="px-6 py-4 bg-white">
                    <div className="grid gap-3">
                      {category.questions.map((question, index) => {
                        const questionId = `${category.name}-${question}`;
                        const isCompleted = completedQuestions.has(questionId);
                        
                        return (
                          <div
                            key={index}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                              isCompleted 
                                ? 'bg-green-50 border-green-200' 
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                            onClick={() => toggleQuestionComplete(questionId)}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                            <span className={`text-sm ${isCompleted ? 'text-green-800 line-through' : 'text-gray-700'}`}>
                              {question}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No questions found matching your search criteria.</p>
          </div>
        )}

        <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            💡 <strong>Pro tip:</strong> Practice explaining each concept aloud and with examples. 
            Good luck with your interviews!
          </p>
        </footer>
      </div>
    </div>
  );
};

export default InterviewStudyGuide;