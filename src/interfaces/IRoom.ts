import { IHotel } from "./IHotel";
import { IRoomType } from "./IRoomType";

export interface IRoom {
    hotelRoomId: number;
    num: number; // room number
    roomType?: IRoomType; // single, double, king, suite
    hotel?: IHotel | null; // Optional hotel object
    hotelRoomTypeId?: number; // Optional hotelRoomTypeId
}