import { IHotel } from "./IHotel";

export interface IRoomType {
    hotelRoomTypeId: number;
    name: string; // single, double, king, suite
    maxGuest: number;
    price: number;
    numberRooms?: number; // Number of rooms of this type in the hotel
    hotel?: IHotel; // Foreign key to Hotel
}