import ExpertiseCard from "./ExpertiseCard";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { IoLogoReact } from "react-icons/io5";
import { TbLayoutDashboard, TbStack2 } from "react-icons/tb";

const ExpertiseSection = () => {
  return (
    <section className="py-16 px-4 text-center" id="expertise">
      <h2 className="text-6xl font-bold text-white mb-10 mt-8 drop-shadow">
        My Expertise
      </h2>

      <div className="flex flex-wrap justify-center">
        <ExpertiseCard
          title="UX/UI Engineer"
          subtitle="User-Centered Design & Prototyping"
          description="Skilled in creating intuitive, user-friendly interfaces and seamless experiences with a strong focus on usability, accessibility, and aesthetics."
          icon={<TbLayoutDashboard />}
        />
        <ExpertiseCard
          title="Frontend Developer"
          subtitle="JavaScript, TypeScript & React Ecosystem"
          description="Experienced in building dynamic, responsive web applications using modern technologies such as React, NextJS, Tailwind CSS, and Bootstrap."
          icon={<IoLogoReact />}
        />
        <ExpertiseCard
          title="Full Stack Developer"
          subtitle="React, NextJS & Backend Technologies"
          description="Proficient in developing end-to-end solutions combining frontend frameworks with backend APIs and databases using ASP.NET, MySQL, and PHP."
          icon={<TbStack2 />}
        />
        <ExpertiseCard
          title="Software Engineer"
          subtitle="Bachelor's Degree in IT Engineering"
          description="Educated software engineer with a strong foundation in software architecture, algorithm design, problem solving, and development lifecycle."
          icon={<HiOutlineDesktopComputer />}
        />
      </div>
    </section>
  );
};

export default ExpertiseSection;
