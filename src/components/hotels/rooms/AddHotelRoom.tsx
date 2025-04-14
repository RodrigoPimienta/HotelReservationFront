import { ChangeEvent, useEffect, useState } from "react";
import { useAxiosFetch } from "../../../hooks/useAxiosFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../generics/Loading";
import { Error } from "../../generics/Error";
import { IRoom } from '../../../interfaces/IRoom';
import { IRoomType } from '../../../interfaces/IRoomType';

export const AddHotelRoom = () => {
    const { hotelId } = useParams<{ hotelId: string }>();
    const navigate = useNavigate();
    const [Room, setRoom] = useState<IRoom>({
        hotelRoomId: 0,
        num : 0,
        hotelRoomTypeId: 0,
    });
    const [RoomType, setRoomType] = useState<IRoomType>({
        hotelRoomTypeId: 0,
        name: "",
        maxGuest: 0,
        price: 0,
    });


    const [data, error, loading, fetchData] = useAxiosFetch({
        method: "POST",
        url: `/hotels/${hotelId}/rooms`,
        params: null,
        body: [Room],
        executeImmediately: false
    });

    
    const [fetchRoomTypes, errorRoomTypes, loadingRoomType, fetchDataRoomTypeFunction] = useAxiosFetch({
        method: "GET",
        url: `/hotels/${hotelId}/roomTypes`,
        params: null,
        body: null,
        executeImmediately: true
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;

        if (typeof value === "string") {
            value = value.trim();
        }

        console.log(name, value);

        setRoom((prevRoom) => ({
            ...prevRoom,
            [name]: value,
        }));

        if(name.trim() === "hotelRoomTypeId") {
            const selectedRoomType = fetchRoomTypes?.find((roomType: IRoomType) => roomType.hotelRoomTypeId === Number(value));
            if (selectedRoomType) {
                setRoomType({
                    hotelRoomTypeId: selectedRoomType.hotelRoomTypeId,
                    name: selectedRoomType.name,
                    maxGuest: selectedRoomType.maxGuest,
                    price: selectedRoomType.price,
                });
            }else{
                setRoomType({
                    hotelRoomTypeId: 0,
                    name: "",
                    maxGuest: 0,
                    price: 0,
                });
            }
        }
    }

    const resetFilters = () => {
        setRoom({
            hotelRoomId: 0,
            num : 0,
            hotelRoomTypeId: 0,
        });

        for (const input of document.querySelectorAll("input")) {
            (input as HTMLInputElement).value = "";
        }
    }


    const addNewRoom = async () => {

        // check if all fields are filled
        if (Object.values(Room).some(value => value === "")) {
            alert("Please fill all fields");
            return;
        }


        fetchData();

    };


    useEffect(() => {
        if (data && !error) {
            alert("Room added successfully!");
            resetFilters();
            navigate(-1);
        }

    }, [data, error]);

    return (
        <>
            <div className="container">
                <div className="searchForm">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h2>New room</h2>

                        {error && <Error error={error} />}
                        {errorRoomTypes && <Error error={errorRoomTypes} />}
                        {loading && <Loading />}
                        {loadingRoomType && <Loading />}

                        <div className="formRow">
                            <div className="formGroup">
                                <label htmlFor="num">Num:</label>
                                <input type="number" id="num" name="num" value={Room.num} onChange={handleChange} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="hotelRoomTypeId">Room Type:</label>
                                <select id="hotelRoomTypeId" name="hotelRoomTypeId" value={Room.hotelRoomTypeId} onChange={handleChange}>
                                    <option value="">Select Room Type</option>
                                    {fetchRoomTypes && fetchRoomTypes.map((roomType : IRoomType) => (
                                        <option key={roomType.hotelRoomTypeId} value={roomType.hotelRoomTypeId}>
                                            {roomType.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="formGroup">
                                <label htmlFor="maxGuest">Max guest:</label>
                                <input type="number" id="maxGuest" name="maxGuest" value={RoomType.maxGuest} disabled style={{backgroundColor: "lightgray"}}/>
                            </div>
                            <div className="formGroup">
                                <label htmlFor="price">Price:</label>
                                <input type="number" id="price" name="price" value={RoomType.price} disabled style={{backgroundColor: "lightgray"}}/>
                            </div>

                        </div>

                        <div className="formRow">
                            <button type="submit" onClick={addNewRoom}>Save</button>
                            <button type="button" onClick={resetFilters}>Clean</button>
                            <button type="button" className="cancel" onClick={() => navigate(-1)}>Cancel</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}
