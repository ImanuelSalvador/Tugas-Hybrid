import { useState } from "react";

function Home({ user, onNavigate, onSelectCourse }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Programming", "Design", "Business", "Data"];

  const featuredCourse = {
    id: "js-fundamentals",
    title: "JavaScript Fundamentals",
    subtitle: "Asynchronous Execution & Event Loop",
    category: "Development",
    lessonInfo: "Lesson 7 of 12",
    progress: 58,
    instructor: "Andi Pratama, M.Kom",
    rating: 4.9,
    students: "1,240 enrolled"
  };

  const recommendedCourses = [
    {
      id: "react-native",
      title: "React Native & Hybrid Apps",
      category: "Programming",
      instructor: "Siti Rahma, S.T.",
      lessons: 16,
      duration: "14h total",
      rating: 4.8,
      progress: 35,
      tag: "Popular",
      color: "from-blue-600 to-indigo-700"
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Mobile Design Masterclass",
      category: "Design",
      instructor: "Budi Santoso",
      lessons: 20,
      duration: "18h total",
      rating: 4.9,
      progress: 10,
      tag: "Trending",
      color: "from-purple-600 to-pink-600"
    },
    {
      id: "python-data",
      title: "Python for AI & Data Analysis",
      category: "Data",
      instructor: "Dr. Rian Hidayat",
      lessons: 24,
      duration: "22h total",
      rating: 4.9,
      progress: 0,
      tag: "New",
      color: "from-emerald-600 to-teal-700"
    }
  ];

  const filteredCourses = recommendedCourses.filter(c => {
    const matchesCategory = activeCategory === "All" || c.category === activeCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex-1 flex flex-col overflow-y-auto no-scrollbar pb-24 text-left">
      {/* Top App Header */}
      <header className="w-full px-5 py-3 flex items-center justify-between sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-container text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[20px]">
              school
            </span>
          </div>
          <span className="font-headline text-lg font-bold tracking-tight text-primary">
            EduLearn
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            type="button"
            onClick={() => alert("You have 3 unread course announcements!")}
            className="relative w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors active:scale-95"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("profile")}
            className="relative w-9 h-9 rounded-full ring-2 ring-primary-container/30 overflow-hidden shrink-0 hover:ring-primary transition-all"
            aria-label="Profile"
          >
            <img 
              src={user?.avatar || "/assets/avatar.png"} 
              alt="Avatar" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<span class="material-symbols-outlined text-primary text-xl flex items-center justify-center h-full">person</span>';
              }}
            />
          </button>
        </div>
      </header>

      {/* Main Content Stream */}
      <main className="px-5 pt-3 space-y-5">
        {/* Greeting & Search */}
        <section className="space-y-3">
          <div>
            <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface">
              Good Morning, {user?.name || "William"} 👋
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Ready to continue your academic goals today?
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-12 bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-3.5 flex items-center gap-2.5 shadow-2xs focus-within:ring-2 focus-within:ring-primary-container/20 focus-within:border-primary-container transition-all">
              <span className="material-symbols-outlined text-outline text-[20px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons, topics..."
                className="w-full bg-transparent border-none p-0 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-0"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="text-outline hover:text-on-surface">
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              )}
            </div>

            <button 
              type="button"
              onClick={() => onNavigate("courses")}
              className="w-12 h-12 bg-surface-container-lowest border border-outline-variant/50 rounded-xl flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all shadow-2xs"
              aria-label="Filter"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>
        </section>

        {/* Section: Your Learning (4-Stat Bento Grid) */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-base font-bold text-on-surface">
              Your Learning
            </h2>
            <span className="text-[11px] font-semibold text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full">
              This Week
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-1">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
              </div>
              <span className="font-headline font-bold text-base text-on-surface leading-tight">5</span>
              <span className="text-[10px] text-on-surface-variant font-medium">Courses</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary mb-1">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              </div>
              <span className="font-headline font-bold text-base text-on-surface leading-tight">2</span>
              <span className="text-[10px] text-on-surface-variant font-medium">Done</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container mb-1">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
              </div>
              <span className="font-headline font-bold text-base text-on-surface leading-tight">24h</span>
              <span className="text-[10px] text-on-surface-variant font-medium">Hours</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-tertiary-fixed/60 flex items-center justify-center text-tertiary mb-1">
                <span className="material-symbols-outlined text-[18px]">trending_up</span>
              </div>
              <span className="font-headline font-bold text-base text-on-surface leading-tight">86%</span>
              <span className="text-[10px] text-on-surface-variant font-medium">Score</span>
            </div>
          </div>
        </section>

        {/* Section: Featured "Continue Learning" Card */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-base font-bold text-on-surface">
              Continue Learning
            </h2>
            <button 
              type="button"
              onClick={() => onNavigate("quiz")}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
            >
              <span>Take Quiz</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-primary-container to-primary rounded-3xl p-5 text-white shadow-lg shadow-primary-container/20">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute top-2 right-4 opacity-15 pointer-events-none">
              <span className="material-symbols-outlined text-[80px]">code</span>
            </div>

            <div className="relative z-10 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white">
                  {featuredCourse.category}
                </span>
                <span className="text-xs text-on-primary-container font-medium">
                  {featuredCourse.lessonInfo}
                </span>
              </div>

              <div>
                <h3 className="font-headline text-lg font-bold text-white tracking-tight leading-snug">
                  {featuredCourse.title}
                </h3>
                <p className="text-xs text-on-primary-container mt-0.5">
                  {featuredCourse.subtitle}
                </p>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-center text-xs text-on-primary-container">
                  <span>Course Progress</span>
                  <span className="font-bold text-white">{featuredCourse.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary-fixed rounded-full transition-all duration-500" 
                    style={{ width: `${featuredCourse.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectCourse) onSelectCourse(featuredCourse);
                    onNavigate("courses");
                  }}
                  className="h-11 bg-white text-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-slate-50 active:scale-98 transition-all"
                >
                  <span className="material-symbols-outlined text-base fill-icon">play_arrow</span>
                  <span>Continue</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate("quiz")}
                  className="h-11 bg-white/15 backdrop-blur-md text-white border border-white/25 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-white/25 active:scale-98 transition-all"
                >
                  <span className="material-symbols-outlined text-base">quiz</span>
                  <span>Practice Quiz</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter Pills */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-base font-bold text-on-surface">
              Explore Topics
            </h2>
            <button 
              type="button"
              onClick={() => onNavigate("courses")}
              className="text-xs font-semibold text-primary hover:underline"
            >
              See All
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-5 px-5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`h-8 px-3.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-primary-container text-white shadow-xs"
                    : "bg-surface-container-lowest border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Recommended Courses List */}
        <section className="space-y-3 pb-2">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => {
                if (onSelectCourse) onSelectCourse(course);
                onNavigate("courses");
              }}
              className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-3.5 flex gap-3 shadow-2xs hover:shadow-md transition-all cursor-pointer active:scale-99"
            >
              <div className={`w-20 h-20 rounded-xl bg-gradient-to-tr ${course.color} text-white flex flex-col items-center justify-center shrink-0 p-2 text-center shadow-xs`}>
                <span className="material-symbols-outlined text-2xl">
                  {course.category === "Design" ? "palette" : course.category === "Data" ? "analytics" : "code"}
                </span>
                <span className="text-[10px] font-bold mt-1 opacity-90">{course.tag}</span>
              </div>

              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">
                      {course.category}
                    </span>
                    <span className="text-[11px] font-bold text-amber-500 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-xs fill-icon text-amber-500">star</span>
                      {course.rating}
                    </span>
                  </div>

                  <h4 className="font-headline text-sm font-bold text-on-surface leading-tight mt-0.5 line-clamp-1">
                    {course.title}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    {course.instructor}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-outline pt-1">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">play_lesson</span>
                    {course.lessons} Lessons
                  </span>
                  <span className="font-semibold text-primary">
                    {course.progress > 0 ? `${course.progress}% done` : "Enroll"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Home;
