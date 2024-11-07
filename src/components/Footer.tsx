import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <nav>
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/terms-and-conditions" className="text-blue-600 hover:text-blue-800">
                Terms and Conditions
              </Link>
            </li>
            {/* Add other footer links here */}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
