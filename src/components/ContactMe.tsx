import { useState } from "react";
import ContactInfo from "./ContactInfo";
import FadeInOnScroll from "./FadeInOnScroll";

const ContactMe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ovde možeš dodati integraciju sa email servisom (EmailJS, Formspree, slanje na server itd.)
    console.log({ email, message });

    setSubmitted(true);
    setEmail("");
    setMessage("");
  };

  return (
    <section
      id="contact"
      className="w-full bg-[radial-gradient(circle,_rgba(30,41,59,1)_0%,_rgba(15,23,42,1)_80%)] text-white py-16 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Pozivni tekst */}
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Let's connect and create something meaningful
        </h2>
        <p className="text-center text-gray-400 mb-10 max-w-xl mx-auto">
          Whether you have a project in mind, a job opportunity, or just want to
          say hi — feel free to get in touch. You can reach out through any
          platform below, or send a message directly. I’ll respond as soon as I
          can.
        </p>

        {/* Kontakt detalji */}
        <FadeInOnScroll delay={0.3}>
          <ContactInfo />
        </FadeInOnScroll>

        <p className="text-center text-gray-400 mb-10 max-w-xl mx-auto">
          Prefer typing? Just drop me a message here — I’ll get back to you
          shortly.
        </p>

        {/* Forma */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            required
            placeholder="Your message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-900 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg"
          >
            {submitted ? "Thanks, I’ll be in touch!" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactMe;
