import { useEffect, useState } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-blue-800 h-[100px] shadow-md'
                    : 'bg-transparent h-[200px]'
            }`}
        >
            <div className="container mx-auto flex justify-between items-center h-full px-6">
                <div className="text-4xl font-bold text-white">My Portfolio</div>
                <ul className="flex space-x-8 text-white text-xl">
                    <li className="hover:text-gray-300 transition">Home</li>
                    <li className="hover:text-gray-300 transition">Projects</li>
                    <li className="hover:text-gray-300 transition">About Me</li>
                    <li className="hover:text-gray-300 transition">Contact</li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
