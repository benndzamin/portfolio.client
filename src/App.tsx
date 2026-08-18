import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbarr";
import ContactMe from "./components/ContactMe";
import FadeInOnScroll from "./components/FadeInOnScroll";
import { motion } from "framer-motion";
import Chat from "./components/Chat";
import ExpertiseSection from "./components/ExpertiseSection";
import WorkSection from "./components/WorkSection";

function App() {
  // Pozadinska slika i video se učitavaju u pozadini - tekst ne čeka na njih.
  const [bgLoaded, setBgLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setBgLoaded(true);
    img.src = "/bgimg.png";
  }, []);

  return (
    <div id="home">
      <Chat />

      <motion.main
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Navbar />
        </motion.div>

        <div
          id="background"
          className="background-section grain-overlay scroll-mb-40 relative bg-cover bg-center overflow-hidden h-[90vh] mb-10"
        >
          {/* Slika grada fejduje in tek kad se stvarno učita - nema više "popping in" */}
          <motion.div
            className="absolute inset-0"
            style={{
              zIndex: 0,
              backgroundImage:
                'linear-gradient(to bottom, rgba(0,0,0,0) 70%, #020617 100%), url("/bgimg.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: bgLoaded ? 1 : 0 }}
            transition={{ duration: 1 }}
          />

          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: videoReady ? 1 : 0 }}
            transition={{ duration: 1.2 }}
          >
            <video
              src="/code-glitch3.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onCanPlayThrough={() => setVideoReady(true)}
              className="video-code-overlay"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
            <motion.h1
              className="flex flex-wrap items-baseline justify-center gap-x-4 text-[11vw] md:text-[8vw] lg:text-[7vw] font-sans tracking-tight leading-none text-red-600 z-10 font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              <span className="whitespace-nowrap">Hi,</span>
              <span className="whitespace-nowrap text-[0.65em] text-white font-normal">
                I&apos;m Benjamin.
              </span>
            </motion.h1>

            <motion.p
              className="text-[2.6vw] md:text-[1.8vw] lg:text-[1.6vw] text-gray-200 mb-52 md:mb-24 lg:mb-20 z-10 font-light tracking-wide"
              initial={{ y: 30, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Software Engineer, Full-stack Developer.
            </motion.p>
          </div>
        </div>

        <FadeInOnScroll delay={0.3}>
          <ExpertiseSection />
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.3}>
          <WorkSection />
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.3}>
          <ContactMe />
        </FadeInOnScroll>
      </motion.main>
    </div>
  );
}

export default App;
