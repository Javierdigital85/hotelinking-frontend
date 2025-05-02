import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../redux/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

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
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 max-w-md rounded-md  font-lato mx-auto"
      >
        <h1>Login</h1>
        <input
          type="text"
          placeholder="email"
          onChange={handleChange}
          className="border w-full p-2 rounded-lg mb-3 font-poppins px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="email"
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          className="border w-full p-2 rounded-lg mb-3 font-poppins px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="password"
        />
        <button className="border bg-blue-600 p-2 hover:bg-blue-500 rounded-md text-white w-full font-poppins">
          Send
        </button>
      </form>
    </>
  );
};

export default Login;
