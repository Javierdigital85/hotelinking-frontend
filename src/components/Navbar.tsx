import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/user";
import { toast } from "react-toastify";
import { MouseEvent } from "react";
import { User } from "../interfaces/User";

interface RootState {
  user: User;
}

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      axios.post(
        "http://localhost:8000/api/users/logout",
        { name: user },
        { withCredentials: true }
      );
      dispatch(setUser({ id: 0, name: "", email: "", token: "" }));
      toast.success("You have successfully logged out");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-blue-100 shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-800">Hotelinking</div>

      <div className="flex space-x-6 text-xl font-bold text-blue-400">
        {user.id ? (
          <>
            <Link to={"offer-list"}>Ofertas</Link>
            <Link to={"promotional-codes"}>Códigos Promocionales</Link>
            <span className="text-gray-600">Welcome {user.name}!</span>
            <Link to={"login"} onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to={"/"}>Register</Link>
            <Link to={"login"}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
