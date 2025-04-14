import { ReservationStatus } from "../enums/ReservationStatus";
import { IRoom } from "./IRoom";
import { IUser } from "./IUser";

export interface IReservation {
    reservationId: number;
    totalGuest: number;
    guestNumber: number;
    checkIn: Date;
    checkOut: Date;
    total?: number;
    comment?: string;
    status?: ReservationStatus;
    user?: IUser;
    room?: IRoom;
    hotelId?: number;
    roomTypeId?: number;
}


