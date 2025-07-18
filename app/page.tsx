import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Stats from '@/components/sections/Stats'
import ApiDemo from '@/components/sections/ApiDemo'
import CTA from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <Features />

      {/* API Demo Section */}
      <ApiDemo />

      {/* CTA Section */}
      <CTA />
    </>
  )
}
