import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="sticky bottom-0 left-0 right-0 bg-white py-4 flex justify-around border border-gray-400">
            <Link href="/" legacyBehavior>
                <a className="text-center text-pink-500">
                    <span className="block text-[2rem]">🏠</span>
                    <span className="text-xs">Home</span>
                </a>
            </Link>
            <Link href="/list" legacyBehavior>
                <a className="text-center text-pink-500">
                    <span className="block text-[2rem]">📅️</span>
                    <span className="text-xs">Poop history</span>
                </a>
            </Link>
        </div>
    );
};

export default Navbar;
