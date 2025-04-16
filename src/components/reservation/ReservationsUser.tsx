import { Error } from "../generics/Error"
import { Loading } from "../generics/Loading"
import { useEffect, useState } from "react";
import { IReservation } from "../../interfaces/IReservation";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";

export const ReservationsUser = () => {
    const [reservations, setReservations] = useState<Array<IReservation>>([]);

    const {data, error, loading} = useAxiosFetch({
        method: "GET",
        url: "/reservations/user",
        params: null,
        body: null
    });

    useEffect(() => {
        if (data) {
            setReservations(data);
        } else {
            setReservations([]);
        }
    }, [data]);

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const dateString = new Date(date).toLocaleDateString('en-GB', options); // 'en-GB' for dd/mm/yyyy format
        return dateString;
    }

    return (
        <div className="container">

            <div className="titleDiv">
                <h2>Reservtions List</h2>
            </div>

            <div className="searchResults">
                {error && <Error error={error} />}
                {loading && <Loading />}
                <table>
                    <thead>
                        <tr>
                            <th>Hotel Name</th>
                            <th>Hotel Country</th>
                            <th>Hotel State</th>
                            <th>Hotel City</th>
                            <th>Room type</th>
                            <th>Price</th>
                            <th>Guests</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.reservationId}>
                                <td>{reservation.room?.hotel?.name}</td>
                                <td>{reservation.room?.hotel?.country}</td>
                                <td>{reservation.room?.hotel?.state}</td>
                                <td>{reservation.room?.hotel?.city}</td>
                                <td>{reservation.room?.roomType?.name}</td>
                                <td>${reservation.total}</td>
                                <td>{reservation.totalGuest}</td>
                                <td>{formatDate(reservation.checkIn)}</td>
                                <td>{formatDate(reservation.checkOut)}</td>
                                <td>{reservation.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
