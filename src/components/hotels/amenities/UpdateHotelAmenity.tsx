import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxiosFetch } from "../../../hooks/useAxiosFetch";
import { Loading } from "../../generics/Loading";
import { IHotelAmenity } from "../../../interfaces/IHotelAmenity";

export const UpdateHotelAmenity = () => {
    const { hotelId, hotelAmenityId } = useParams<{ hotelId: string,  hotelAmenityId: string }>();
    const navigate = useNavigate();
    const [amenity, setAmenity] = useState<IHotelAmenity>({
        hotelAmenityId: 0,
        name: "",
        description: "",
        url: ""
    });

    const [fetchDataAmenity, errorAmenity, loadingAmenity, fetchDataAmenityFunction] = useAxiosFetch({
        method: "GET",
        url: `/hotels/${hotelId}/amenities/${hotelAmenityId}`,
        params: null,
        body: null,
        executeImmediately: false
    });

    const [fetchUpdateAmenity, errorUpdate, loadingUpdate, fetchUpdateHotelFunction] = useAxiosFetch({
        method: "PUT",
        url: `/hotels/${hotelId}/amenities/${hotelAmenityId}`,
        params: null,
        body: amenity,
        executeImmediately: false
    });

    // Memoriza la función fetchDataAmenityFunction
    const memoizedfetchDataAmenity = useCallback(fetchDataAmenityFunction, [hotelId]);

    useEffect(() => {
        memoizedfetchDataAmenity();
    }, [hotelId, memoizedfetchDataAmenity]);

    useEffect(() => {
        if (fetchDataAmenity) {
            setAmenity(fetchDataAmenity);
        }
    }, [fetchDataAmenity]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;

        if (typeof value === "string") {
            value = value.trim();
        }

        setAmenity((prevAmenity) => ({
            ...prevAmenity,
            [name]: value,
        }));
    };

    const updateAmenity = () => {
        fetchUpdateHotelFunction();
    };

    useEffect(() => {
        if (fetchUpdateAmenity && !errorUpdate) {
            alert("Amenity updated successfully!");
            navigate(-1);
        }
    }, [fetchUpdateAmenity, errorUpdate]);

    return (
        <div className="container">
            <div className="searchForm">
                <h2>Update Amenity</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="formRow">
                    <div className="formGroup">
                                <label htmlFor="hotelName">Name:</label>
                                <input type="text" id="name" name="name" value={amenity.name} onChange={handleChange} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="hotelCountry">Country:</label>
                                <input type="text" id="country" name="country" value={amenity.description} onChange={handleChange} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="hotelState">State:</label>
                                <input type="text" id="state" name="state" value={amenity.url} onChange={handleChange} />
                            </div>
                    </div>
                    <div className="formRow">
                        <button type="submit" onClick={updateAmenity}>Update</button>
                        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="button" className="cancel" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </form>
                {loadingAmenity && <Loading />}
                {loadingUpdate && <Loading />}

                {errorAmenity && <div>Error loading hotel data: {errorAmenity}</div>}
            </div>
        </div>
    );
};