import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbarr";
import Card from "./components/Card";
import ContactMe from "./components/ContactMe";
import Spinner from "./components/Spinner";
import FadeInOnScroll from "./components/FadeInOnScroll";
import { motion, AnimatePresence } from "framer-motion";
import Chat from "./components/Chat";
import ExpertiseSection from "./components/ExpertiseSection";

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
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Navbar />
          </motion.div>

          <div
            id="background"
            className="background-section grain-overlay scroll-mb-40 relative bg-cover bg-center overflow-hidden h-[90vh] mb-10"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
              <motion.h1
                className="text-[9vw] font-sans md:text-[6vw] lg:text-[7vw] text-white z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                BENJAMIN MUJKIĆ
              </motion.h1>
              <motion.p
                className="text-[2.5vw] md:text-[2vw] lg:text-[2vw] text-gray-200 mb-52 md:mb-24 lg:mb-20 z-10"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Software Engineer, Full-stack Developer.
              </motion.p>
            </div>
          </div>

          <FadeInOnScroll delay={0.3}>
            <ExpertiseSection />
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <Card>
              <h1 className="text-xl font-semibold text-white mb-2">
                Paragraf
              </h1>
              <p className="text-gray-300">
                Ovo je neki tekst sadržaj... Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Asperiores soluta fugiat
                veritatis, velit cumque sapiente impedit perferendis expedita
                fuga nihil officia tempore vitae molestias enim tempora
                consectetur, ducimus excepturi rem.
              </p>
            </Card>
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
