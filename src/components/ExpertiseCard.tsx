import { ReactNode } from "react";

type ExpertiseCardProps = {
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
};

const ExpertiseCard = ({
  title,
  subtitle,
  description,
  icon,
}: ExpertiseCardProps) => {
  return (
    <div className="border border-white/80 backdrop-blur-sm text-white p-6 w-full sm:w-[300px] transition duration-300 shadow-md relative">
      <span className="absolute top-5 left-6 m-2 text-[2.8rem]">{icon}</span>
      <span className="text-xl font-bold text-white max-w-40 flex flex-col items-center ml-16 mb-2">
        {title}
      </span>
      <p className="text-sm text-blue-400 font-medium">{subtitle}</p>
      <hr className="border-gray-600 my-2" />
      <p className="text-gray-300 mt-3 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ExpertiseCard;
