import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ChangeEvent, useEffect, useState } from "react";
import { IUser } from "../../interfaces/IUser";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { Loading } from "../generics/Loading";
import { Error } from "../generics/Error";

export const UpdateProfileOwner = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [currentUser, setCurrentUser] = useState<IUser>({
        userId: user?.userId || 0,
        password: user?.password || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        role: "OWNER",
        business: {
            id: 0,
            legalName: user?.userBusiness?.legalName || "",
            phoneNumber: user?.userBusiness?.phoneNumber || "",
            taxCode: user?.userBusiness?.taxCode || "",
        }
    });


    const { data: fetchUpdateUser, error: errorUpdate, loading: loadingUpdate, fetchData: fetchUpdateHotelFunction } = useAxiosFetch({
        method: "PUT",
        url: `/users`,
        params: null,
        body: currentUser,
        executeImmediately: false
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;
        console.log("value", value);
        console.log("name", name);

        if (name === "legalName" || name === "phoneNumber" || name === "taxCode") {
            setCurrentUser((prevUser) => ({
                ...prevUser,
                business: {
                    ...prevUser.business,
                    [name]: value,
                },
            }));
            return;
        }

        setCurrentUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const updateUser = () => {
        fetchUpdateHotelFunction();
    };

    useEffect(() => {
        if (fetchUpdateUser && !errorUpdate) {
            alert("User updated successfully!");
            currentUser.userBusiness = currentUser.business;
            login(currentUser);
            navigate(-1);
        }
    }, [fetchUpdateUser, errorUpdate]);


    return (
        <>
            <div className="container">
                <div className="searchForm">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h2>User profile</h2>
                        {loadingUpdate && <Loading />}
                        {errorUpdate && <Error error={errorUpdate} />}
                        <div className="formRow">
                            <h3>User</h3>
                        </div>
                        <div className="formRow">
                            <div className="formGroup">
                                <label htmlFor="firstName">First name:</label>
                                <input type="text" id="firstName" name="firstName" value={currentUser?.firstName} onChange={handleChange} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="lastName">Last name:</label>
                                <input type="text" id="lastName" name="lastName" value={currentUser?.lastName} onChange={handleChange} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="email">Email:</label>
                                <input type="text" id="email" name="email" value={currentUser?.email} onChange={handleChange} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" value={currentUser?.password} onChange={handleChange} />
                            </div>

                        </div>

                        <div className="formRow">
                            <h3>Business</h3>
                        </div>
                        <div className="formRow">
                            <div className="formGroup">
                                <label htmlFor="legalName">Legal name:</label>
                                <input type="text" id="legalName" name="legalName" value={currentUser?.business?.legalName} onChange={handleChange} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="phoneNumber">Phone number:</label>
                                <input type="text" id="phoneNumber" name="phoneNumber" value={currentUser?.business?.phoneNumber} onChange={handleChange} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="taxCode">Tax code:</label>
                                <input type="text" id="taxCode" name="taxCode" value={currentUser?.business?.taxCode} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="formRow">
                            <button type="submit" onClick={updateUser}>Update</button>
                            <button type="button" className="cancel" onClick={() => navigate(-1)}>Cancel</button>
                        </div>

                    </form>
                </div>

            </div>
        </>
    )
}
