import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <section className="min-h-95 bg-white flex items-center justify-center px-4">
            <div className="text-center max-w-lg">

                <h1 className="text-7xl font-extrabold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-700 mb-6">
                    Oops! The page you're looking for doesn't exist.
                </p>

                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-300 font-semibold"
                >
                    Go Back Home
                </Link>
            </div>
        </section>
    );
};

export default NotFound;
