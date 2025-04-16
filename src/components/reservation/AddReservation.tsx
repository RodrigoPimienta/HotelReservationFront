import { ChangeEvent, useEffect, useState } from "react";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../generics/Loading";
import { Error } from "../generics/Error";
import { IReservation } from "../../interfaces/IReservation";
import { IRoomType } from "../../interfaces/IRoomType";

export const AddReservation = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const roomType = location.state?.roomType as IRoomType;  
    const checkIn = location.state?.checkIn as string; 
    const checkOut = location.state?.checkOut as string;


    const [reservation, setReservation] = useState<IReservation>({
        hotelId: roomType.hotel?.hotelId,
        roomTypeId: roomType.hotelRoomTypeId,
        reservationId: 0,
        totalGuest: roomType.maxGuest,
        guestNumber: roomType.maxGuest,
        checkIn: new Date(checkIn), 
        checkOut: new Date(checkOut)
    });

    const transforReservation = (reservation: IReservation) => {

        let checkInString = reservation.checkIn.toISOString().slice(0, 10); // Extrae los primeros 10 caracteres (AAAA-MM-DD)
        let checkOutString = reservation.checkOut.toISOString().slice(0, 10); // Extrae los primeros 10 caracteres (AAAA-MM-DD)
        return {
            ...reservation,
            checkIn: checkInString,
            checkOut: checkOutString,
        };
    }
    const {data, error, loading, fetchData} = useAxiosFetch({
        method: "POST",
        url: "/reservations",
        params: null,
        body: transforReservation(reservation),
        executeImmediately: false
    });




    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;

        if (typeof value === "string") {
            value = value.trim();
        }

        if(name === "checkIn" || name === "checkOut") {
            setReservation((prevRev) => ({
                ...prevRev,
                [name]: new Date(value),
            }));
        }else{
            setReservation((prevRev) => ({
                ...prevRev,
                [name]: value,
            }));
        }


    }

    const addReservation = async () => {

        if (reservation.totalGuest < reservation.guestNumber) {
            alert("The number of guests cannot be greater than: " + reservation.totalGuest);
            return;
        }

        fetchData();

    };


    useEffect(() => {
        console.log("Data:", data);
        console.log("Error:", error);
        if (data && !error) {
            alert("Reservation added successfully!");
            navigate(-1); // Redirigir a la lista de hoteles
        }

    }, [data, error]);

    return (
        <>
            <div className="container">
                <div className="searchForm">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h2>New reservation</h2>

                        {error && <Error error={error} />}
                        {loading && <Loading />}
                        <div className="formRow">
                        <h3>Hotel</h3>
                        </div>

                        <div className="formRow">
                            <div className="formGroup">
                                <label htmlFor="name">Name:</label>
                                <input className="readonly" disabled type="text" id="name" name="name" value={roomType.hotel?.name}  />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="country">Country:</label>
                                <input  className="readonly" disabled type="text" id="country" name="country" value={roomType.hotel?.country} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="state">State:</label>
                                <input  className="readonly" disabled type="text" id="state" name="state" value={roomType.hotel?.state} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="city">City:</label>
                                <input  className="readonly" disabled type="text" id="city" name="city" value={roomType.hotel?.city} />
                            </div>


                            <div className="formGroup">
                                <label htmlFor="hotelCity">Street:</label>
                                <input  className="readonly" disabled type="text" id="street" name="street" value={roomType.hotel?.street} />
                            </div>


                            <div className="formGroup">
                                <label htmlFor="houseNumber">House number:</label>
                                <input  className="readonly" disabled type="text" id="houseNumber" name="houseNumber" value={roomType.hotel?.houseNumber} />
                            </div>


                            <div className="formGroup">
                                <label htmlFor="postalCode">Postal code:</label>
                                <input  className="readonly" disabled type="text" id="postalCode" name="postalCode" value={roomType.hotel?.postalCode} />
                            </div>
                        </div>

                        <div className="formRow">
                        <h3>Room type</h3>
                        </div>
                        <div className="formRow">
                            <div className="formGroup">
                                <label htmlFor="name">Name:</label>
                                <input  className="readonly" disabled type="text" id="name" name="name" value={roomType.name} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="maxGuest">Max guest:</label>
                                <input  className="readonly" disabled type="number" id="maxGuest" name="maxGuest" value={roomType.maxGuest} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="price">Price:</label>
                                <input  className="readonly" disabled type="number" id="price" name="price" value={roomType.price} />
                            </div>
                        </div>

                        
                        <div className="formRow">
                            <h3>Reservation data:</h3>
                        </div>
                        <div className="formRow">
                            <div className="formGroup">
                                <label htmlFor="checkIn">Check in (9:00 AM) :</label>
                                <input type="date" id="checkIn" name="checkIn" value={reservation.checkIn.toISOString().split("T")[0]} onChange={handleChange} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="checkOut">Check out (3:00 PM):</label>
                                <input type="date" id="checkOut" name="checkOut" value={reservation.checkOut.toISOString().split("T")[0]} onChange={handleChange} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="guestNumber">Guest number:</label>
                                <input type="number" id="guestNumber" name="guestNumber" value={reservation.guestNumber} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="formRow">
                            <button type="submit" onClick={addReservation}>Save</button>
                            <button type="button" className="cancel" onClick={() => navigate(-1)}>Cancel</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}
