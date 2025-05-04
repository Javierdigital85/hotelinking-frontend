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
  const promoId = promoCodes.length > 0 ? promoCodes[0].id : null;

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
      toast.success("Code redeemed successfully!");
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
      {!userId && (
        <h1 className="text-4xl text-center text-white-700 flex h-screen items-center justify-center">
          ¡Regístrate e inicia sesión para descubrir promociones increíbles!
        </h1>
      )}

      {userId && (
        <>
          {promoId ? (
            <h1 className="text-3xl font-bold mb-6 text-center">
              Códigos Promocionales
            </h1>
          ) : (
            <h1 className="flex h-screen items-center justify-center text-5xl">
              No se ha generado ningún código de promoción aún.
            </h1>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            {promoCodes.map((code) => (
              <div
                key={code.id}
                className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition"
              >
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  Código Promocional
                </h2>
                <div className="bg-gray-100 rounded-lg p-3 mb-2">
                  <p className="text-md font-mono text-blue-700 tracking-wide break-words">
                    {code.code}
                  </p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3">
                  <p className="text-sm text-indigo-700 font-medium">
                    Oferta Aplicada:
                    <span className="font-semibold">{code.offer?.title}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleSubmit(code.code)}
                  className={`${
                    code.redeem
                      ? "bg-green-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  } border p-2 rounded-md w-full font-poppins text-white transition`}
                >
                  {code.redeem ? "Código Canjeado" : "Canjear Código"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PromotionalCodes;
