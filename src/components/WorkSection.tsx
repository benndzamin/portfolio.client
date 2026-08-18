import React, { useState } from "react";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";

interface GithubLink {
  label: string;
  url: string;
}

interface WorkItem {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string; // Path to your project image
  githubLinks?: GithubLink[]; // One entry = plain "GitHub" button. Two+ = hover-expands into one button per entry. Omit when there's no public repo to link.
  liveLink: string; // Live project URL
}

const workItems: WorkItem[] = [
  {
    title: "Orea",
    category: "E-Commerce / Marketplace",
    description:
      "Contributed to a Next.js-powered multi-vendor marketplace with separate buyer and seller accounts, product filtering and search, cart and checkout, a customer loyalty program, gift cards, and order tracking.",
    tags: ["Next.js", "React"],
    image: "/projects/oreabazaar.png",
    liveLink: "https://oreabazaar.com",
  },
  {
    title: "Rikorent",
    category: "Rental Platform",
    description:
      "Contributed to Rikorent, a PHP and MySQL-based rental management platform with a responsive Bootstrap and jQuery front end, secured behind authenticated account access.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap", "jQuery"],
    image: "/projects/rikorent.png",
    liveLink: "https://rikorent.com",
  },
  {
    title: "Valores",
    category: "Fintech / Investment Platform",
    description:
      "Contributed to Valores, a Slovenian fintech platform for precious metals investment, where users buy, sell and store gold and silver through a digital Metal Account — backed by companion iOS/Android apps and multi-language support across the region.",
    tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "jQuery"],
    image: "/projects/valores.png",
    liveLink: "https://valores.si",
  },
  {
    title: "Dispocem",
    category: "Logistics / Weighbridge Management",
    description:
      "A full-stack PWA for managing bulk-cement dispatch operations — role-based dashboards for buyers, weighbridge operators and supervisors, a buyer registration and approval workflow, a cement product catalog, and real-time load-announcement alerts delivered via push notifications.",
    tags: ["React", "Vite", "Supabase", "Tailwind CSS", "React Router", "PWA"],
    image: "/projects/dispocem.png",
    githubLinks: [{ label: "GitHub", url: "https://github.com/benndzamin/dispocem" }],
    liveLink: "https://dispocem.vercel.app",
  },
  {
    title: "INAL Electric",
    category: "E-Commerce / API Integration",
    description:
      "A Next.js webshop that automatically syncs inventory from an OLX.ba marketplace account through a cost-aware, two-phase sync strategy, with category filtering, search, sale detection, and an admin panel for publishing new listings directly to OLX.",
    tags: ["Next.js", "TypeScript", "React", "Supabase", "Tailwind CSS"],
    image: "/projects/inalelectric.png",
    githubLinks: [{ label: "GitHub", url: "https://github.com/benndzamin/inalelectric" }],
    liveLink: "https://inalelectric.vercel.app",
  },
  {
    title: "Portfolio AI Assistant",
    category: "Full-Stack / AI Integration",
    description:
      "An intelligent real-time chat assistant integrated into the portfolio platform. Features an optimized Express.js backend written in TypeScript, leveraging RESTful architecture to streamline communication with the Google Gemini API.",
    tags: ["React", "TypeScript", "Node.js", "Express", "Gemini API", "Axios"],
    image: "/projects/portfolio-ai-assistant.png",
    githubLinks: [
      { label: "Frontend", url: "https://github.com/benndzamin/portfolio.client" },
      { label: "Backend", url: "https://github.com/benndzamin/portfolio.server" },
    ],
    liveLink: "https://portfolio-phi-wheat-25.vercel.app",
  },
];

const githubButtonClass =
  "rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wider text-slate-200 uppercase transition-colors hover:bg-slate-800 hover:border-cyan-500";

/**
 * Renders a project's GitHub link(s).
 * - Single link: a plain button, same as before.
 * - Multiple links: starts collapsed as one "GitHub" button; hovering (or
 *   tapping, for touch devices) it splits it into one stacked button per
 *   link, and it collapses back when the pointer leaves.
 */
const GithubLinkGroup = ({ links }: { links: GithubLink[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (links.length === 1) {
    return (
      <motion.a
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 15, opacity: 0 }}
        transition={{ delay: 0.05 }}
        href={links[0].url}
        target="_blank"
        rel="noopener noreferrer"
        className={githubButtonClass}
      >
        {links[0].label}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 15, opacity: 0 }}
      transition={{ delay: 0.05 }}
      // Fixed footprint (height AND width) sized for the EXPANDED
      // (two-button) state - invisible, right-aligned (items-end) so the
      // collapsed "GitHub" button still sits at its natural compact size,
      // flush against "Live Demo". This keeps the row's total width (and
      // therefore "Live Demo"'s position) constant across both states -
      // expanding "grows into" the reserved space on the left instead of
      // pushing "Live Demo" sideways. Height stability also prevents the
      // pointer from "falling out" of the zone right as it expands.
      className="flex min-h-20 w-28 flex-col items-end justify-center"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded((prev) => !prev)} // tap-to-toggle for touch devices
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex w-full flex-col gap-1.5"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // don't let it bubble into the wrapper's collapse toggle
                className={githubButtonClass}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={githubButtonClass}
          >
            GitHub
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const WorkSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="work"
      className="work-section py-20 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_40%,_#000000_100%)] text-slate-100 border-t border-slate-900"
    >
      <div className="container mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-sm tracking-[0.4em] text-cyan-400">
            03 // my work
          </p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-white font-mono">
            Featured Projects
          </h2>
          <div className="mt-3 h-[2px] w-12 bg-cyan-500 mx-auto rounded"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item, index) => (
            <Card key={item.title} className="flex flex-col h-full">
              {/* Image & Hover Overlay Container */}
              <div
                className="relative h-48 w-full overflow-hidden border-b border-slate-800 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={() =>
                  setHoveredIndex(hoveredIndex === index ? null : index)
                } // Mobile touch support
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out"
                  style={{
                    transform:
                      hoveredIndex === index ? "scale(1.1)" : "scale(1)",
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
                      {/* GitHub Link(s) - only rendered when there's a public repo to link */}
                      {item.githubLinks && item.githubLinks.length > 0 && (
                        <GithubLinkGroup links={item.githubLinks} />
                      )}

                      {/* Live Demo Link Button */}
                      <motion.a
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 15, opacity: 0 }}
                        transition={{ delay: item.githubLinks?.length ? 0.1 : 0.05 }}
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
                  <h3 className="mt-1 text-xl font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
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
