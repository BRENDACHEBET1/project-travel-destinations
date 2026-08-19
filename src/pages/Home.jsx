import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    { src: "/travel1.png", alt: "Tropical beach destination" },
    { src: "/travel2.jpg", alt: "Scenic travel destination" },
    { src: "/travel3.jpg", alt: "Mountain travel destination" },
  ];

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(slideTimer);
  }, [slides.length]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/destinations?search=${searchTerm}`);
    } else {
      navigate("/destinations");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main>
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 text-center text-white">
          {slides.map((slide, index) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-slate-950/55" />

          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Explore the World
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">
              Discover countries, destinations, cultures, and amazing places
              around the world.
            </p>

            <div className="mx-auto mt-8 flex max-w-2xl gap-3">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <button
                onClick={handleSearch}
                className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50"
              >
                Search
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === activeSlide ? "true" : undefined}
                className={`h-3 w-3 rounded-full transition ${
                  index === activeSlide
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
