import IUser from "./i-user";

export default interface IProperty {
  _id?: string;
  name: string;
  address: string;
  type: string;
  description: string;
  image_url: string;
  total_rooms: number;
  occupancy_type: string;
  rent_amount: number;
  rent_frequency: number;
  userId: string;
  user?: IUser;
  created_on?: string;
  createdAt?: string;
}
