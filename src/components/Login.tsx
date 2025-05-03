import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../redux/user";
import openEye from "../assets/OpenEye.svg";
import closeEye from "../assets/CloseEye.svg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [eye, setEye] = useState(false);

  const handleClick = () => {
    setEye(!eye);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/login",
        { email: userData.email, password: userData.password },
        {
          withCredentials: true,
        }
      );

      dispatch(setUser(res.data));
      toast.success("You have logged in successfully");
      navigate("/offer-list");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        toast.warning(errorMessage);
      } else {
        toast.warning("An unexpected error occured");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 max-w-md w-full rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <input
          type="text"
          placeholder="email"
          onChange={handleChange}
          className="border w-full p-2 px-3 h-10 rounded-lg mb-2 font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="email"
        />
        <div className="relative mb-2">
          <input
            type={eye ? "text" : "password"}
            placeholder="password"
            onChange={handleChange}
            className="border w-full p-2 rounded-lg mb-2 font-poppins px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="password"
          />
          <div
            className="absolute inset-y-1 right-0 pr-3 mb-3 flex items-center cursor-pointer"
            onClick={handleClick}
          >
            {eye ? (
              <img
                src={openEye}
                className="w-5 h-5 filter brightness-0 invert"
              />
            ) : (
              <img
                src={closeEye}
                className="w-5 h-5 filter brightness-0 invert"
              />
            )}
          </div>
        </div>

        <button className="border bg-blue-600 p-2 hover:bg-blue-500 rounded-md text-white w-full font-poppins">
          Send
        </button>
      </form>
    </div>
  );
};

export default Login;
