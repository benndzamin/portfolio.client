import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaWhatsapp, FaViber } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const contacts = [
  {
    icon: <FaLinkedin className="text-blue-500 text-2xl" />,
    label: "linkedin.com/in/mkbenjamin",
    tooltip: "LinkedIn profil",
    href: "https://linkedin.com/in/mkbenjamin",
  },
  {
    icon: (
      <div className="flex items-center gap-1">
        <MdPhone className="text-green-500 text-2xl" />
        <FaWhatsapp className="text-green-400 text-lg" />
        <FaViber className="text-purple-400 text-lg" />
      </div>
    ),
    label: "+387 61 234 567",
    tooltip: "Pozovi ili piši na WhatsApp / Viber",
    href: "tel:+38761234567",
  },
  {
    icon: <MdEmail className="text-red-400 text-2xl" />,
    label: "mujka.benjo@gmail.com",
    tooltip: "Pošalji e-mail",
    href: "mailto:mujka.benjo@gmail.com",
  },
  {
    icon: <FaGithub className="text-gray-300 text-2xl" />,
    label: "github.com/benndzamin",
    tooltip: "GitHub profil",
    href: "https://github.com/benndzamin",
  },
];

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-3 text-white font-mono w-full max-w-md mx-auto my-8 px-4">
      {contacts.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.2,
            duration: 0.4,
            ease: "easeOut",
          }}
          className="flex items-center justify-center gap-3 py-2 rounded-md group relative"
        >
          {/* Ikona */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
            title={item.tooltip}
          >
            {item.icon}
          </motion.div>

          {/* Tekst */}
          <motion.a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.2 }}
            className="text-white/90 hover:text-white underline-offset-4 hover:underline transition-all text-sm sm:text-base text-left"
          >
            {item.label}
          </motion.a>
        </motion.div>
      ))}
    </div>
  );
};

export default ContactInfo;
