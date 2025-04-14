import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxiosFetch } from "../../../hooks/useAxiosFetch";
import { Loading } from "../../generics/Loading";
import { IRoom } from "../../../interfaces/IRoom";
import { IRoomType } from "../../../interfaces/IRoomType";
import { Error } from "../../generics/Error";

export const UpdateHotelRoom = () => {
    const { hotelId, hotelRoomId } = useParams<{ hotelId: string, hotelRoomId: string }>();
    const navigate = useNavigate();
    const [Room, setRoom] = useState<IRoom>({
        hotelRoomId: 0,
        num: 0,
        hotelRoomTypeId: 0,
    });

    const [RoomType, setRoomType] = useState<IRoomType>({
        hotelRoomTypeId: 0,
        name: "",
        maxGuest: 0,
        price: 0,
    });

    const [fetchDataRoom, errorRoom, loadingRoom, fetchDataRoomFunction] = useAxiosFetch({
        method: "GET",
        url: `/hotels/${hotelId}/rooms/${hotelRoomId}`,
        params: null,
        body: null,
        executeImmediately: false
    });

    const [fetchRoomTypes, errorRoomTypes, loadingRoomType, fetchDataRoomTypeFunction] = useAxiosFetch({
        method: "GET",
        url: `/hotels/${hotelId}/roomTypes`,
        params: null,
        body: null,
        executeImmediately: true
    });

    const [fetchUpdateRoom, errorUpdate, loadingUpdate, fetchUpdateHotelFunction] = useAxiosFetch({
        method: "PUT",
        url: `/hotels/${hotelId}/rooms/${hotelRoomId}`,
        params: null,
        body: Room,
        executeImmediately: false
    });

    // Memoriza la función fetchDataRoomFunction
    const memoizedfetchDataRoom = useCallback(fetchDataRoomFunction, [hotelId]);

    useEffect(() => {
        memoizedfetchDataRoom();
    }, [hotelId, memoizedfetchDataRoom]);

    useEffect(() => {
        if (fetchDataRoom) {
            setRoom({
                hotelRoomId: fetchDataRoom.hotelRoomId,
                num: fetchDataRoom.num,
                hotelRoomTypeId: fetchDataRoom.roomType.hotelRoomTypeId,
            });

            setRoomType({
                hotelRoomTypeId: fetchDataRoom.roomType.hotelRoomTypeId,
                name: fetchDataRoom.roomType.name,
                maxGuest: fetchDataRoom.roomType.maxGuest,
                price: fetchDataRoom.roomType.price,
            });

        }
    }, [fetchDataRoom]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;

        if (typeof value === "string") {
            value = value.trim();
        }

        setRoom((prevRoom) => ({
            ...prevRoom,
            [name]: value,
        }));

        if (name === "hotelRoomTypeId") {
            const selectedRoomType = fetchRoomTypes?.find((roomType: IRoomType) => roomType.hotelRoomTypeId === Number(value));
            if (selectedRoomType) {
                setRoomType({
                    hotelRoomTypeId: selectedRoomType.hotelRoomTypeId,
                    name: selectedRoomType.name,
                    maxGuest: selectedRoomType.maxGuest,
                    price: selectedRoomType.price,
                });
            } else {
                setRoomType({
                    hotelRoomTypeId: 0,
                    name: "",
                    maxGuest: 0,
                    price: 0,
                });
            }
        }
    };

    const updateRoom = () => {
        fetchUpdateHotelFunction();
    };

    useEffect(() => {
        if (fetchUpdateRoom && !errorUpdate) {
            alert("Room updated successfully!");
            navigate(-1);
        }
    }, [fetchUpdateRoom, errorUpdate]);

    console.log("Room", Room);
    return (
        <div className="container">
            <div className="searchForm">
                <h2>Update Room</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="formRow">
                        <div className="formGroup">
                            <label htmlFor="num">Num:</label>
                            <input type="text" id="num" name="num" value={Room.num} onChange={handleChange} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="hotelRoomTypeId">Room Type:</label>
                            <select id="hotelRoomTypeId" name="hotelRoomTypeId" value={Room.hotelRoomTypeId} onChange={handleChange}>
                                <option value="">Select Room Type</option>
                                {fetchRoomTypes && fetchRoomTypes.map((roomType: IRoomType) => (
                                    <option key={roomType.hotelRoomTypeId} value={roomType.hotelRoomTypeId}>
                                        {roomType.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="formGroup">
                            <label htmlFor="maxGuest">Max guest:</label>
                            <input type="number" id="maxGuest" name="maxGuest" value={RoomType.maxGuest} disabled style={{ backgroundColor: "lightgray" }} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="price">Price:</label>
                            <input type="number" id="price" name="price" value={RoomType.price} disabled style={{ backgroundColor: "lightgray" }} />
                        </div>
                    </div>
                    <div className="formRow">
                        <button type="submit" onClick={updateRoom}>Update</button>
                        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="button" className="cancel" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </form>
                {loadingRoom && <Loading />}
                {loadingUpdate && <Loading />}
                {loadingRoomType && <Loading />}
                {errorRoomTypes && <Error error={errorRoomTypes} />}

                {errorRoom && <div>Error loading hotel data: {errorRoom}</div>}
            </div>
        </div>
    );
};