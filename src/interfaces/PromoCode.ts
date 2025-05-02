export interface PromoCode {
  id: number;
  offerId: number;
  userId: number;
  code: string;
  redeem: boolean;
  offer?: {
    title: string;
  };
}
