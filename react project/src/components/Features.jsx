const features = [
  {
    number: '01',
    title: 'User Login System',
    description: 'Simple login and registration with local storage-based authentication for secure session management.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Notes Management',
    description: 'Add, edit, and delete study notes. All your materials stored securely in your browser.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Smart Summary',
    description: 'Get short, digestible summaries of lengthy notes to focus on what matters most.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Quiz Practice',
    description: 'Multiple-choice quiz practice to test your knowledge and improve retention.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8 dark:bg-navy-900">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy-800 sm:text-4xl dark:text-white">Features</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Everything you need to organize your studies and boost learning productivity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary-300 hover:shadow-md dark:border-white/10 dark:bg-navy-800/50 dark:hover:border-primary-700"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                  {feature.icon}
                </div>
                <span className="text-sm font-bold text-primary-500">{feature.number}</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-800 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
