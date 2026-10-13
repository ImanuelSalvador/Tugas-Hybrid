import { useState } from "react";

function Courses({ onNavigate, onStartQuiz }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [bookmarkedIds, setBookmarkedIds] = useState(["js-fundamentals"]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState(["js-fundamentals"]);

  const categories = ["All", "Programming", "Business", "Design", "Marketing", "Data"];

  const coursesList = [
    {
      id: "js-fundamentals",
      title: "JavaScript Fundamentals & ES6+",
      subtitle: "Master modern ECMAScript, closures, asynchronous execution, and modern tooling.",
      category: "Programming",
      instructor: "Andi Pratama, M.Kom",
      role: "Senior Software Architect",
      lessons: 12,
      duration: "10h 30m",
      rating: 4.9,
      reviews: "1,240 reviews",
      badge: "Best Seller",
      badgeColor: "bg-amber-100 text-amber-800",
      color: "from-indigo-600 to-primary",
      syllabus: [
        "1. Introduction to V8 & Execution Context",
        "2. Scope, Closures & Lexical Scoping",
        "3. Objects, Prototypes & Modern ES6 Classes",
        "4. Asynchronous Event Loop & Microtasks",
        "5. Modern Promises & Async/Await In-depth",
        "6. Final Exam & Certification Project"
      ]
    },
    {
      id: "react-native-hybrid",
      title: "React Native: Hybrid Mobile Architecture",
      subtitle: "Build native Android and iOS mobile applications with single React codebase.",
      category: "Programming",
      instructor: "Siti Rahma, S.T.",
      role: "Lead Mobile Engineer",
      lessons: 16,
      duration: "14h 45m",
      rating: 4.8,
      reviews: "980 reviews",
      badge: "Popular",
      badgeColor: "bg-blue-100 text-blue-800",
      color: "from-blue-600 to-cyan-600",
      syllabus: [
        "1. Setting up Expo & Native Bare Workflows",
        "2. Core Mobile UI Components & Flexbox",
        "3. State Management with Zustand & Redux",
        "4. Native Device APIs (Camera, GPS, Storage)",
        "5. Publishing to Google Play & App Store"
      ]
    },
    {
      id: "ui-ux-mobile",
      title: "UI/UX Mobile Design System Masterclass",
      subtitle: "Create production-ready design tokens, Figma auto-layouts, and user test workflows.",
      category: "Design",
      instructor: "Budi Santoso",
      role: "Product Design Lead",
      lessons: 20,
      duration: "18h 15m",
      rating: 4.9,
      reviews: "2,150 reviews",
      badge: "Trending",
      badgeColor: "bg-purple-100 text-purple-800",
      color: "from-purple-600 to-pink-600",
      syllabus: [
        "1. Mobile Design Principles & Human Interface Guidelines",
        "2. Color Theory, Contrast & Accessible Typography",
        "3. Wireframing & Interactive Micro-interactions",
        "4. Designing Scalable Mobile Design Systems"
      ]
    },
    {
      id: "python-ai",
      title: "Python for AI & Applied Machine Learning",
      subtitle: "Learn NumPy, Pandas, Scikit-Learn, and build predictive AI models.",
      category: "Data",
      instructor: "Dr. Rian Hidayat",
      role: "AI Research Scientist",
      lessons: 24,
      duration: "22h 00m",
      rating: 4.9,
      reviews: "1,530 reviews",
      badge: "New",
      badgeColor: "bg-emerald-100 text-emerald-800",
      color: "from-emerald-600 to-teal-700",
      syllabus: [
        "1. Python Essentials for Data Science",
        "2. Data Wrangling with Pandas & NumPy",
        "3. Data Visualization with Seaborn & Matplotlib",
        "4. Supervised vs Unsupervised ML Algorithms"
      ]
    },
    {
      id: "digital-marketing",
      title: "Growth Marketing & SEO Strategies",
      subtitle: "Drive exponential user acquisition through organic SEO and paid performance funnels.",
      category: "Marketing",
      instructor: "Clara Wijaya",
      role: "Head of Growth",
      lessons: 10,
      duration: "8h 20m",
      rating: 4.7,
      reviews: "640 reviews",
      badge: "Practical",
      badgeColor: "bg-rose-100 text-rose-800",
      color: "from-rose-600 to-orange-600",
      syllabus: [
        "1. Growth Funnel Architecture (AARRR)",
        "2. Technical SEO & Content Optimization",
        "3. Performance Marketing & Conversion Optimization"
      ]
    }
  ];

  function toggleBookmark(id, e) {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  function handleEnroll(id) {
    if (!enrolledCourses.includes(id)) {
      setEnrolledCourses(prev => [...prev, id]);
    }
  }

  const filtered = coursesList.filter(course => {
    const matchesCategory = activeTab === "All" || course.category === activeTab;
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                          course.subtitle.toLowerCase().includes(search.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex-1 flex flex-col overflow-y-auto no-scrollbar pb-24 text-left">
      {/* Sticky Header */}
      <header className="w-full px-5 py-3 flex items-center justify-between sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/20">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all"
            aria-label="Back to Home"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <h1 className="font-headline text-lg font-bold text-on-surface">
            Explore Courses
          </h1>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === "Saved" ? "All" : "Saved")}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              activeTab === "Saved" 
                ? "bg-primary text-white" 
                : "text-on-surface hover:bg-surface-container"
            }`}
            title="View Saved Bookmarks"
          >
            <span className="material-symbols-outlined text-[20px]">
              {activeTab === "Saved" ? "bookmark" : "bookmark_border"}
            </span>
          </button>
        </div>
      </header>

      {/* Search & Categories */}
      <div className="px-5 pt-3 space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, teacher, skills..."
              className="w-full h-12 pl-10 pr-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-5 px-5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              className={`h-8 px-4 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === cat
                  ? "bg-primary-container text-white shadow-xs"
                  : "bg-surface-container-lowest border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="px-5 pt-3 space-y-3.5">
        <div className="flex items-center justify-between text-xs text-on-surface-variant px-0.5">
          <span>Showing {filtered.length} courses</span>
          <span className="text-primary font-semibold">Updated weekly</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-center text-on-surface-variant space-y-2">
            <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
            <p className="text-sm font-medium">No courses found</p>
            <button
              type="button"
              onClick={() => { setSearch(""); setActiveTab("All"); }}
              className="text-xs text-primary font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filtered.map((course) => {
            const isBookmarked = bookmarkedIds.includes(course.id);
            const isEnrolled = enrolledCourses.includes(course.id);

            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group active:scale-99"
              >
                {/* Course Banner */}
                <div className={`h-28 bg-gradient-to-r ${course.color} p-4 flex flex-col justify-between text-white relative`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${course.badgeColor}`}>
                      {course.badge}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(course.id, e)}
                      className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                      aria-label="Bookmark"
                    >
                      <span className="material-symbols-outlined text-base">
                        {isBookmarked ? "bookmark" : "bookmark_border"}
                      </span>
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-white/80">
                      {course.category}
                    </span>
                    <h3 className="font-headline font-bold text-base text-white leading-tight line-clamp-1">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-on-surface-variant line-clamp-2">
                    {course.subtitle}
                  </p>

                  <div className="flex items-center justify-between text-xs text-outline border-t border-outline-variant/30 pt-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-amber-500 text-sm fill-icon">star</span>
                      <span className="font-bold text-on-surface">{course.rating}</span>
                      <span className="text-[11px]">({course.reviews.split(" ")[0]})</span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">timer</span>
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">menu_book</span>
                        {course.lessons}
                      </span>
                    </div>
                  </div>

                  {/* Instructor & CTA */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {course.instructor[0]}
                      </div>
                      <span className="text-xs font-medium text-on-surface">
                        {course.instructor}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCourse(course);
                      }}
                      className={`h-8 px-3.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                        isEnrolled
                          ? "bg-secondary/10 text-secondary hover:bg-secondary/20"
                          : "bg-primary text-white hover:bg-primary/90"
                      }`}
                    >
                      <span>{isEnrolled ? "Continue" : "Details"}</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Course Detail Modal Drawer */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-surface rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col overflow-hidden animate-slideUp shadow-2xl">
            {/* Modal Header */}
            <div className={`p-5 bg-gradient-to-r ${selectedCourse.color} text-white flex justify-between items-start shrink-0`}>
              <div className="space-y-1">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-wider">
                  {selectedCourse.category}
                </span>
                <h2 className="font-headline text-lg font-bold text-white leading-snug">
                  {selectedCourse.title}
                </h2>
                <p className="text-xs text-white/90">
                  By {selectedCourse.instructor} • {selectedCourse.role}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1 text-left">
              <div>
                <h4 className="font-headline font-bold text-sm text-on-surface mb-1">
                  About this Course
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {selectedCourse.subtitle}
                </p>
              </div>

              {/* Course Highlights */}
              <div className="grid grid-cols-3 gap-2 bg-surface-container rounded-xl p-3 text-center">
                <div>
                  <span className="text-xs font-bold text-on-surface block">{selectedCourse.lessons}</span>
                  <span className="text-[10px] text-outline">Modules</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-on-surface block">{selectedCourse.duration}</span>
                  <span className="text-[10px] text-outline">Duration</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-600 block">{selectedCourse.rating} ★</span>
                  <span className="text-[10px] text-outline">Rating</span>
                </div>
              </div>

              {/* Syllabus list */}
              <div>
                <h4 className="font-headline font-bold text-sm text-on-surface mb-2">
                  Curriculum Overview
                </h4>
                <div className="space-y-1.5">
                  {selectedCourse.syllabus.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface"
                    >
                      <span className="material-symbols-outlined text-primary text-base">
                        play_circle
                      </span>
                      <span className="font-medium flex-1">{item}</span>
                      <span className="text-[10px] text-outline font-mono">15m</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-surface border-t border-outline-variant/20 flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  handleEnroll(selectedCourse.id);
                  if (onStartQuiz) onStartQuiz();
                  setSelectedCourse(null);
                }}
                className="flex-1 h-12 bg-primary text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:bg-primary/90 active:scale-98 transition-all"
              >
                <span className="material-symbols-outlined text-base">quiz</span>
                <span>Take Chapter Quiz</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleEnroll(selectedCourse.id);
                  alert(`Enrolled successfully in ${selectedCourse.title}! You can start immediately.`);
                  setSelectedCourse(null);
                }}
                className="h-12 px-5 bg-secondary-fixed text-on-secondary-fixed rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:brightness-105 active:scale-98 transition-all"
              >
                <span>{enrolledCourses.includes(selectedCourse.id) ? "Resume" : "Enroll"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
