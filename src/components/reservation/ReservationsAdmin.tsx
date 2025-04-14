import { useNavigate } from "react-router-dom";
import { Error } from "../generics/Error"
import { Loading } from "../generics/Loading"
import { useEffect, useState } from "react";
import { IReservation } from "../../interfaces/IReservation";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { ReservationStatus } from "../../enums/ReservationStatus";

export const ReservationsAdmin = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Array<IReservation>>([]);
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: "POST",
    url: "/reservations/filter",
    params: null,
    body: {}
  });

  const [fetchUpdateReservation, errorUpdate, loadingUpdate, fetchUpdateReservationFunction, fetchDataWithBody] = useAxiosFetch({
    method: "PUT",
    url: `/reservations/0`,
    params: null,
    body: { status: false },
    executeImmediately: false
  });



  useEffect(() => {
    if (data) {
      setReservations(data);
    } else {
      setReservations([]);
    }
  }, [data]);


  const changeStatusHandler = (reservationId: number, status: string) => {
    console.log("changeStatusHandler", reservationId, status);
    fetchDataWithBody(
      `/reservations/${reservationId}`,
      {
        status: status
      }).then(() => {
        fetchData();
      }).catch((error) => {
        console.error("Error updating reservation status:", error);
      });

  }

  const formatDate = (date: Date) => {
    //  // convertir de 2025-06-07T09:00:00.000-05:00	a formato dd/mm/yyyy
    // convertir de 2025-06-07T09:00:00.000-05:00	a formato dd/mm/yyyy

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
        {errorUpdate && <Error error={errorUpdate} />}
        {loadingUpdate && <Loading />}
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
              <th>Actions</th>
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
                <td>
                  {reservation.status == ReservationStatus.PENDING ? <button onClick={() => changeStatusHandler(reservation.reservationId, "ACCEPT")}>Accept</button> : ""}
                  {reservation.status == ReservationStatus.PENDING ? <button onClick={() => changeStatusHandler(reservation.reservationId, "REJECT")}>Reject</button> : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >

    </div >
  )
}
