import React from 'react'
import NavBar from '../components/NavBar'
import SearchBar from '../components/SearchBar'

const Home = () => {
  return (
    <div>
        <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main>
        <section className="flex min-h-[80vh] flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-6 text-center text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Explore the World
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">
              Discover countries, destinations, cultures, and amazing places
              around the world.
            </p>

            <div className="mx-auto mt-8 max-w-2xl">
              <SearchBar />
            </div>
          </div>
        </section>
      </main>
    </div>
    </div>
  )
}

export default Home