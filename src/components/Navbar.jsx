import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 flex items-center justify-center h-11 w-screen bg-white">
      <Link className="m-4" to="/">
        Home
      </Link>
      <Link className="m-4" to="/nutrition">
        Nutrition
      </Link>
      <Link className="m-4" to="/lawyer">
        Lawyer
      </Link>
    </nav>
  );
};

export default Navbar;
