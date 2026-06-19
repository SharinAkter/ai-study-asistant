import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 dark:from-navy-900 dark:via-navy-900 dark:to-navy-800">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-800/20" />
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary-300/30 blur-3xl dark:bg-primary-700/20" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <p className="mb-3 inline-block rounded-full bg-primary-100 px-4 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
            Smart &amp; Interactive Study Platform
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-navy-800 sm:text-5xl lg:text-6xl dark:text-white">
            Study Smarter with{' '}
            <span className="text-primary-500">AI Study Assistant</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-300">
            Manage study materials, practice quizzes, plan your routine, and get smart
            summaries — all in one simple, user-friendly web application built for students.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              to="/register"
              className="rounded-xl bg-primary-500 px-8 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:bg-primary-600"
            >
              Get Started Free
            </Link>
            <a
              href="#features"
              className="rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-center text-base font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-white/20 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
            >
              Explore Features
            </a>
          </div>
        </div>

        <div className="flex flex-1 justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-primary-500/20 blur-2xl" />
            <img
              src="/logo.png"
              alt="AI Study Assistant Logo"
              className="relative h-56 w-56 rounded-3xl object-contain shadow-2xl sm:h-72 sm:w-72"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
