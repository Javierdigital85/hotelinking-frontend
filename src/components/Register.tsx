import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/users/register", user);
      toast.success("You have successfully registered");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message || "An error occured";
        toast.warning(errorMessage);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-4 max-w-md rounded-md font-lato mx-auto shadow-lg" 
      >
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <input
          type="text"
          placeholder="name"
          className="border w-full p-2 px-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
          onChange={handleChange}
          name="name"
          value={user.name}
          autoFocus
        />
        <input
          type="email"
          placeholder="e-mail"
          className="border w-full p-2 px-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
          onChange={handleChange}
          value={user.email}
          name="email"
        />

        <input
          type="text"
          placeholder="password"
          className="border w-full p-2 px-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
          onChange={handleChange}
          value={user.password}
          name="password"
        />

        <button
          type="submit"
          className="border bg-blue-600 p-2 hover:bg-blue-500 rounded-md text-white w-full font-poppins"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Register;
