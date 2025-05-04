import { useState } from "react";
import { Offer } from "../interfaces/Offer";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { User } from "../interfaces/User";

interface Props {
  offer: Offer;
}

interface RootState {
  user: User;
}

const OfferItem = ({ offer }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const [promoCode, setPromoCode] = useState<string | null>(null);

  const handleGeneratePromoCode = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/promo-code/create-promo",
        {
          userId: user.id,
          offerId: offer.id,
        }
      );
      setPromoCode(res.data.code);
      toast.success(res.data.message);
      console.log("numero de código", res.data.code);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        toast.warning(errorMessage);
      }
    }
  };

  return (
    <>
      <div className="bg-gray-300 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          {offer.title}
        </h2>
        <p className="text-gray-700 mb-4">{offer.details}</p>
        <button
          onClick={handleGeneratePromoCode}
          className={`mt-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
            promoCode
              ? "bg-green-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {promoCode ? `Código Generado` : "Generar código promocional"}
        </button>
      </div>
    </>
  );
};

export default OfferItem;
