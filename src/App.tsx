import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import OfferList from "./components/OfferList";
import Navbar from "./components/Navbar";
import PromotionalCodes from "./components/PromotionalCodes";
import Register from "./components/Register";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUser } from "./redux/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userName = async () => {
      try {
        console.log("Enviando solicitud para obtener usuario...");
        const res = await axios.get("http://localhost:8000/api/users/me", {
          withCredentials: true,
        });

        dispatch(setUser(res.data));
        console.log("la data", res.data);
      } catch (error) {
        console.log(error);
      }
    };
    userName();
  }, [dispatch]);

  return (
    <>
      <div>
        <BrowserRouter>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/offer-list" element={<OfferList />} />
            <Route path="/promotional-codes" element={<PromotionalCodes />} />
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
