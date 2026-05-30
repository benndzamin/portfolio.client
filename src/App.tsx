import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbarr";
import ContactMe from "./components/ContactMe";
import Spinner from "./components/Spinner";
import FadeInOnScroll from "./components/FadeInOnScroll";
import { motion, AnimatePresence } from "framer-motion";
import Chat from "./components/Chat";
import ExpertiseSection from "./components/ExpertiseSection";
import WorkSection from "./components/WorkSection";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <div id="home">
      <Chat />
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Spinner />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!loading && (
        <motion.main
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <Navbar />
          </motion.div>

          <div
            id="background"
            className="background-section grain-overlay scroll-mb-40 relative bg-cover bg-center overflow-hidden h-[90vh] mb-10"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, delay: 2 }}
            >
              <video
                src="/code-glitch2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="video-code-overlay"
              />
            </motion.div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
              <motion.h1
                className="flex flex-wrap items-baseline justify-center gap-x-4 text-[11vw] md:text-[8vw] lg:text-[7vw] font-sans tracking-tight leading-none text-red-600 z-10 font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
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
                transition={{ duration: 0.8, delay: 1.5 }}
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
      )}
    </div>
  );
}

export default App;
