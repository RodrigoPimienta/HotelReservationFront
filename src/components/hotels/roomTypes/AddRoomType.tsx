import { ChangeEvent, useEffect, useState } from "react";
import { useAxiosFetch } from "../../../hooks/useAxiosFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../generics/Loading";
import { Error } from "../../generics/Error";
import { IRoomType } from "../../../interfaces/IRoomType";

export const AddRoomType = () => {
    const { hotelId } = useParams<{ hotelId: string }>();
    const navigate = useNavigate();
    const [roomType, setRoomType] = useState<IRoomType>({
        hotelRoomTypeId: 0,
        name: "",
        maxGuest: 0,
        price: 0,
    });

    const {data, error, loading, fetchData} = useAxiosFetch({
        method: "POST",
        url: `/hotels/${hotelId}/roomTypes`,
        params: null,
        body: [roomType],
        executeImmediately: false
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;

        if (typeof value === "string") {
            value = value.trim();
        }

        setRoomType((prevRoomType) => ({
            ...prevRoomType,
            [name]: value,
        }));
    }

    const resetFilters = () => {
        setRoomType({
            hotelRoomTypeId: 0,
            name: "",
            maxGuest: 0,
            price: 0,
        });

        for (const input of document.querySelectorAll("input")) {
            (input as HTMLInputElement).value = "";
        }
    }


    const addNewRoomType = async () => {

        // check if all fields are filled
        if (Object.values(roomType).some(value => value === "")) {
            alert("Please fill all fields");
            return;
        }


        fetchData();

    };


    useEffect(() => {
        if (data && !error) {
            alert("Room type added successfully!");
            resetFilters();
            navigate(-1);
        }

    }, [data, error]);

    return (
        <>
            <div className="container">
                <div className="searchForm">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h2>New hotel</h2>

                        {error && <Error error={error} />}
                        {loading && <Loading />}
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
                            <button type="submit" onClick={addNewRoomType}>Save</button>
                            <button type="button" onClick={resetFilters}>Clean</button>
                            <button type="button" className="cancel" onClick={() => navigate(-1)}>Cancel</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}
