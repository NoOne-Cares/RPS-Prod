import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md w-5xl rounded-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                    <img
                        src="/rps.png"
                        alt="RPS Logo"
                        className="w-10 h-10 rounded"
                    />
                    <span className="text-2xl font-bold">
                        RPS Game
                    </span>
                </Link>
                <div>
                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
