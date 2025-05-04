import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Offer } from "../interfaces/Offer";
import OfferItem from "./OfferItem";
import { useSelector } from "react-redux";
import { User } from "../interfaces/User";

interface RootState {
  user: User;
}

const OfferList = () => {
  const [offer, setOffer] = useState<Offer[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const userId = user.id;

  const loadOffers = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/offer/get-offers");
      setOffer(res.data.offers);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadOffers();
  }, [loadOffers]);

  return (
    <div className="container mx-auto mt-5 p-10">
      {userId ? (
        <>
          <h1 className="text-3xl font-bold text-center mb-8">
            Ofertas Disponibles
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offer.map((offer) => (
              <OfferItem offer={offer} key={offer.id} />
            ))}
          </div>
        </>
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

export default OfferList;
