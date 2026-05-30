import React, { useState } from 'react';
import Card from './Card';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkItem {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;       // Path to your project image
  githubLink: string;  // GitHub repository link
  liveLink: string;    // Live project URL
}

const workItems: WorkItem[] = [
  {
    title: 'Portfolio AI Assistant',
    category: 'Full-Stack / AI Integration',
    description: 'An intelligent real-time chat assistant integrated into the portfolio platform. Features an optimized Express.js backend written in TypeScript, leveraging RESTful architecture to streamline communication with the Google Gemini API.',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'Gemini API', 'Axios'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', // Replace with your chat screenshot later
    githubLink: 'https://github.com/your-username/portfolio-backend',
    liveLink: 'https://your-portfolio-link.com',
  },
  {
    title: 'Enterprise CRUD Solution',
    category: 'Backend Architecture',
    description: 'A robust and scalable backend system engineered with ASP.NET Core and Entity Framework Core. Features secure JWT authentication, structured repository patterns, and full integration with SQL Server and PostgreSQL databases.',
    tags: ['ASP.NET Core', 'EF Core', 'SQL Server', 'JWT', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    githubLink: 'https://github.com/',
    liveLink: 'https://',
  },
  {
    title: 'Modern Web Application',
    category: 'Frontend Development',
    description: 'A blazing fast, highly responsive user interface built using modern React, Vite, and Next.js ecosystems. Fully styled and optimized for accessibility and UX utilizing Tailwind CSS and advanced Bootstrap structures.',
    tags: ['Next.js', 'Vite', 'Tailwind CSS', 'Bootstrap'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    githubLink: 'https://github.com/',
    liveLink: 'https://',
  },
];

const WorkSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="work" className="work-section py-20 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_40%,_#000000_100%)] text-slate-100 border-t border-slate-900">
      <div className="container mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-sm tracking-[0.4em] text-cyan-400">03 // my work</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-white font-mono">Featured Projects</h2>
          <div className="mt-3 h-[2px] w-12 bg-cyan-500 mx-auto rounded"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item, index) => (
            <Card 
              key={item.title} 
              className="flex flex-col h-full"
            >
              {/* Image & Hover Overlay Container */}
              <div 
                className="relative h-48 w-full overflow-hidden border-b border-slate-800 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={() => setHoveredIndex(hoveredIndex === index ? null : index)} // Mobile touch support
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-full w-full object-cover transition-transform duration-500 ease-out"
                  style={{
                    transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                  }}
                />

                {/* Smooth Overlay on Hover */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center gap-4 bg-slate-950/80 backdrop-blur-sm"
                    >
                      {/* GitHub Link Button */}
                      <motion.a
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 15, opacity: 0 }}
                        transition={{ delay: 0.05 }}
                        href={item.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wider text-slate-200 uppercase transition-colors hover:bg-slate-800 hover:border-cyan-500"
                      >
                        GitHub
                      </motion.a>

                      {/* Live Demo Link Button */}
                      <motion.a
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 15, opacity: 0 }}
                        transition={{ delay: 0.1 }}
                        href={item.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold tracking-wider text-slate-950 uppercase transition-colors hover:bg-cyan-400 font-bold shadow-lg shadow-cyan-500/20"
                      >
                        Live Demo
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Text Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3">
                  <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono">
                    {item.category}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold text-white tracking-tight">{item.title}</h3>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-slate-400 flex-1">
                  {item.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="mt-auto flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/60">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="rounded bg-slate-950 px-2.5 py-1 text-[11px] font-medium text-slate-400 font-mono border border-slate-800/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;