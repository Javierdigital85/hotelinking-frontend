import axios from "axios";
import { useCallback, useEffect } from "react";
import { PromoCode } from "../interfaces/PromoCode";
import { setPromoCode } from "../redux/promoCode";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { User } from "../interfaces/User";

const PromotionalCodes = () => {
  interface RootState {
    user: User;
    promoCodes: PromoCode[];
  }

  const user = useSelector((state: RootState) => state.user);
  const promoCodes = useSelector((state: RootState) => state.promoCodes);
  const userId = user.id;

  const dispatch = useDispatch();
  const loadCodes = useCallback(async () => {
    try {
      if (userId) {
        const res = await axios.get(
          "http://localhost:8000/api/promo-code/get-promos",
          {
            params: { userId: userId },
            withCredentials: true,
          }
        );
        dispatch(setPromoCode(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userId, dispatch]);

  const handleSubmit = async (promoCode: string) => {
    try {
      console.log("Holaaaaa", promoCode);
      await axios.put(`http://localhost:8000/api/promo-code/${promoCode}`);
      toast.success("Code redeem successfully!");
      loadCodes();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        toast.warning(errorMessage);
      }
    }
  };

  useEffect(() => {
    loadCodes();
  }, [loadCodes]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Códigos Promocionales
      </h1>
      {userId ? (
        <div className="grid gap-4 md:grid-cols-3">
          {promoCodes.map((code) => (
            <div
              key={code.id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-indigo-600">
                Tu código promocional es:
              </h2>
              <p className="text-sm text-gray-500 mt-2">{code.code}</p>
              <p className="text-sm text-gray-500 mt-2">
                Oferta: {code.offer?.title}
              </p>
              <button
                onClick={() => handleSubmit(code.code)}
                className={`${
                  code.redeem
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } border p-2 rounded-md w-full font-poppins text-white transition`}
              >
                {code.redeem ? "Código Canjeado" : "Canjear Código"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-4xl text-center text-white-700">
            ¡Regístrate e inicia sesión para descubrir promociones increíbles!
          </h1>
        </div>
      )}
    </div>
  );
};

export default PromotionalCodes;
