import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section id="cta" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to Improve Your Learning?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-100">
          Join AI Study Assistant today and take control of your academic journey with
          organized notes, smart summaries, and interactive quiz practice.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/register"
            className="rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary-600 shadow transition hover:bg-primary-50"
          >
            Create Free Account
          </Link>
          <Link
            to="/login"
            className="rounded-xl border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  )
}
