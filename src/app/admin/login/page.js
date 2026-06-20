import { login } from './actions'
import Image from 'next/image'

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Subtle decorative element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl z-0" />

        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-primary p-4 rounded-2xl inline-flex items-center justify-center">
              <Image
                src="/images/logo-white.png"
                alt="The Access Group"
                width={180}
                height={60}
                className="object-contain"
              />
            </div>
          </div>

          <h2 className="mt-2 text-center text-xl font-black tracking-tight text-primary">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-xs font-medium text-primary/70 uppercase tracking-widest">
            Management
          </p>
        </div>

        {params?.error && (
          <div className="relative z-10 bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center font-semibold border border-red-100">
            {params.error}
          </div>
        )}

        <form className="mt-8 space-y-6 relative z-10" action={login}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-bold text-primary/80 mb-2">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-base py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-colors border text-gray-900"
                placeholder="admin@theaccessgroup.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-primary/80 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-base py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-colors border text-gray-900"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-xl bg-primary px-4 py-4 text-lg font-black text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-primary/20"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

