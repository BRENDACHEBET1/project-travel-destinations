import React from 'react'
import NavBar from '../components/NavBar'

const About = () => {
  return (
    <div>
        <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="px-6 py-16">
        <section className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            About Us
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Welcome to our destination explorer. Our goal is to make it easy
            for you to discover countries, learn about different cultures,
            and explore amazing destinations around the world.
          </p>
        </section>

        <section className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Discover
            </h2>
        <p className="mt-3 text-gray-600">
              Find interesting countries and destinations from around the
              world.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Learn
            </h2>

            <p className="mt-3 text-gray-600">
              Learn about countries, their regions, populations, languages,
              and cultures.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Explore
            </h2>

            <p className="mt-3 text-gray-600">
              Explore new places and find inspiration for your next
              adventure.
            </p>
          </div>
        </section>
      </main>
    </div>
    </div>
  )
}

export default About