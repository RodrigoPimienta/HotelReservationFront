import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxiosFetch } from "../../../hooks/useAxiosFetch";
import { Loading } from "../../generics/Loading";
import { IRoomType } from "../../../interfaces/IRoomType";

export const UpdateRoomType = () => {
    const { hotelId, RoomTypeId } = useParams<{ hotelId: string, RoomTypeId: string }>();
    const navigate = useNavigate();
    const [roomType, setRoomType] = useState<IRoomType>({
        hotelRoomTypeId: 0,
        name: "",
        maxGuest: 0,
        price: 0,
    });

    const [fetchDataRoomType, errorRoomType, loadingRoomType, fetchDataRoomTypeFunction] = useAxiosFetch({
        method: "GET",
        url: `/hotels/${hotelId}/roomTypes/${RoomTypeId}`,
        params: null,
        body: null,
        executeImmediately: false
    });

    const [fetchUpdateRoomType, errorUpdate, loadingUpdate, fetchUpdateHotelFunction] = useAxiosFetch({
        method: "PUT",
        url: `/hotels/${hotelId}/roomTypes/${RoomTypeId}`,
        params: null,
        body: roomType,
        executeImmediately: false
    });

    // Memoriza la función fetchDataRoomTypeFunction
    const memoizedfetchDataRoomType = useCallback(fetchDataRoomTypeFunction, [hotelId]);

    useEffect(() => {
        memoizedfetchDataRoomType();
    }, [hotelId, memoizedfetchDataRoomType]);

    useEffect(() => {
        if (fetchDataRoomType) {
            setRoomType(fetchDataRoomType);
        }
    }, [fetchDataRoomType]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;

        if (typeof value === "string") {
            value = value.trim();
        }

        setRoomType((prevRoomType) => ({
            ...prevRoomType,
            [name]: value,
        }));
    };

    const updateRoomType = () => {
        fetchUpdateHotelFunction();
    };

    useEffect(() => {
        if (fetchUpdateRoomType && !errorUpdate) {
            alert("Room type updated successfully!");
            navigate(-1);
        }
    }, [fetchUpdateRoomType, errorUpdate]);

    return (
        <div className="container">
            <div className="searchForm">
                <h2>Update RoomType</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="formRow">
                        <div className="formGroup">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={roomType.name} onChange={handleChange} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="maxGuest">Max guest:</label>
                            <input type="number" id="maxGuest" name="maxGuest" value={roomType.maxGuest} onChange={handleChange} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="price">Price:</label>
                            <input type="number" id="price" name="price" value={roomType.price} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="formRow">
                        <button type="submit" onClick={updateRoomType}>Update</button>
                        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="button" className="cancel" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </form>
                {loadingRoomType && <Loading />}
                {loadingUpdate && <Loading />}

                {errorRoomType && <div>Error loading hotel data: {errorRoomType}</div>}
            </div>
        </div>
    );
};