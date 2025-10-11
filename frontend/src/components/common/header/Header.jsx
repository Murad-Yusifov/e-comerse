import { useState, useContext, useEffect, useRef } from "react"; 
import { useNavigate, useLocation, Link } from "react-router-dom";
import Top from "./Top";
import logo from "../../../assets/images/logo.png"; 
import NavBar from "../NavBar";
import { AuthContext } from "../../../context/authContext";

const Header = () => {
  const [query, setQuery] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const { user, logout } = useContext(AuthContext);
  const cartCountRef = useRef(0);
  const wishCountRef = useRef(0);
  const [, forceUpdate] = useState(0); // dummy state to force re-render

  // Update counts from localStorage
  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const wish = JSON.parse(localStorage.getItem("wishlist")) || [];
      cartCountRef.current = cart.reduce((sum, item) => sum + (item.count || 1), 0);
      wishCountRef.current = wish.length;
      forceUpdate(x => x + 1); // force re-render
    };
    updateCounts();
    window.addEventListener("storage", updateCounts);
    return () => window.removeEventListener("storage", updateCounts);
  }, []);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (min) params.set("min", min);
    if (max) params.set("max", max);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleLogout = () => {
    logout(); // clears auth and context
    navigate("/"); // back to home page
  };

  return (
    <>
      <Top />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 gap-2 w-full">
        <div className="flex justify-between items-center w-full md:w-auto">
          <img src={logo} alt="logo" className="h-10 w-auto" />
          {/* Mobile menu button placeholder, can add real menu if needed */}
        </div>

        <form
          onSubmit={handleSearch}
          className="border flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 w-full md:w-2/4 p-2 mt-2 md:mt-0"
        >
          <input
            type="text"
            placeholder="Search product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded px-2 py-1 w-full sm:w-1/3 outline-none"
          />
          <input
            type="number"
            placeholder="Min $"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="border rounded px-2 py-1 w-full sm:w-1/6 outline-none"
          />
          <input
            type="number"
            placeholder="Max $"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="border rounded px-2 py-1 w-full sm:w-1/6 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600 w-full sm:w-auto"
          >
            Search
          </button>
        </form>

        <ul className="flex flex-col sm:flex-row justify-around items-center w-full md:w-1/4 gap-2 mt-2 md:mt-0">
          <li>
            <Link to="/userChooses/WishList">Wishlist<sup>{wishCountRef.current}</sup></Link>
          </li>
          <li>
            <Link to="/userChooses/CartList">Cart<sup>{cartCountRef.current}</sup></Link>
          </li>
          <li>
            {user ? (
              <>
                <Link to="/account">My Account</Link>
                <button
                  onClick={handleLogout}
                  className="ml-2 text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>

      <NavBar />
    </>
  );
};

export default Header;
