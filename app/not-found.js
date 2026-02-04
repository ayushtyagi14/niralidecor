import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
    return (
        <>
            <Navbar forceScrolled={true} />
            <div
                className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-white"
                style={{ paddingTop: '150px', paddingBottom: '100px' }}
            >
                <h1
                    className="text-8xl font-bold text-[#96034f] mb-4"
                    style={{ fontFamily: "'Cinzel Decorative', serif" }}
                >
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-[#4a1a3a] mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-600 mb-8 max-w-md">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link
                    href="/"
                    className="px-8 py-3 bg-gradient-to-r from-[#96034f] to-[#d946ef] text-white rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                    Back to Home
                </Link>
            </div>
            <Footer />
        </>
    );
}
