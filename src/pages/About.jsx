import NavBar from "../components/NavBar";

const aboutCards = [
  {
    title: "Discover",
    image: "/About1.jpg",
    description:
      "Find fascinating countries and destinations from every corner of the world.",
  },
  {
    title: "Learn",
    image: "/About2.jpg",
    description:
      "Get to know the regions, languages, people, and cultures that make each place unique.",
  },
  {
    title: "Explore",
    image: "/About3.jpg",
    description:
      "Collect inspiration for your next adventure and turn curiosity into a journey.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />

      <main className="px-6 py-16 sm:py-20">
        <section className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-600">
            Our mission
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">
            See more of the world.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            WorldExplorer makes it easy to discover countries, learn about
            different cultures, and find amazing destinations around the world.
          </p>
        </section>

        <section className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-3">
          {aboutCards.map((card) => (
            <article
              key={card.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-200/70 transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-300/60"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                  src={card.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
                <h2 className="absolute bottom-5 left-6 text-2xl font-bold text-white">
                  {card.title}
                </h2>
              </div>

              <p className="p-6 pt-5 leading-7 text-slate-600">
                {card.description}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default About;
