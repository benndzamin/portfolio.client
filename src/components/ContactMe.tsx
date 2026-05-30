import { useState } from "react";
import ContactInfo from "./ContactInfo";
import FadeInOnScroll from "./FadeInOnScroll";

const ContactMe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // [DODANO] Stanje dok se mail šalje
  const [error, setError] = useState<string | null>(null); // [DODANO] Stanje za grešku

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // formspree endpoint
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeeddypg";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          message: message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
        setMessage("");

        // button restoring after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error("Pukla veza sa serverom. Pokušaj ponovo.");
      }
    } catch (err: any) {
      setError(err.message || "Slanje poruke nije uspjelo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 px-4 text-center bg-[radial-gradient(circle,_rgba(30,41,59,1)_0%,_rgba(15,23,42,1)_80%)] text-white py-16 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-sm tracking-[0.4em] text-cyan-400">
          02 // contact me
        </p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight text-white font-mono">
          Let's connect and create something meaningful
        </h2>
        <div className="mt-3 h-[2px] w-12 bg-cyan-500 mx-auto rounded"></div>
        <p className="text-center text-gray-400 mt-10 max-w-xl mx-auto">
          Whether you have a project in mind, a job opportunity, or just want to
          say hi — feel free to get in touch. You can reach out through any of
          the platforms below, or use the contact form.
        </p>

        {/* contact details */}
        <FadeInOnScroll delay={0.3}>
          <ContactInfo />
        </FadeInOnScroll>

        <p className="text-center text-gray-400 mb-10 max-w-xl mx-auto">
          Prefer typing? Drop me a message right here and I’ll get back to you
          shortly.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <input
            type="email"
            required
            disabled={loading || submitted}
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <textarea
            required
            disabled={loading || submitted}
            placeholder="Your message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-900 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50"
          />

          {/* Error printing if something is not working! */}
          {error && (
            <p className="text-red-500 text-sm text-center font-medium animate-pulse">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || submitted}
            className={`w-full transition text-white font-semibold p-3 rounded-lg ${
              submitted
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700"
            }`}
          >
            {loading
              ? "Sending..."
              : submitted
                ? "Message sent! I’ll get back to you soon."
                : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactMe;
