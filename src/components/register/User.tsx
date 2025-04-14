import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { Loading } from "../generics/Loading";
import { Error } from "../generics/Error";
import { Business } from "./Business";

export const User = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<IUser>({
    userId: 0,
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "USER",
  });


  const [fetchAddUser, errorAdd, loadingAdd, fetchAddHotelFunction] = useAxiosFetch({
    method: "POST",
    url: `/users`,
    params: null,
    body: currentUser,
    executeImmediately: false
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

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

    if(name == "role" && value === "USER") {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        business: null,
      }));
    }

    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const addUser = () => {
    fetchAddHotelFunction();
  };

  useEffect(() => {
    if (fetchAddUser && !errorAdd) {
      alert("User registed successfully!");
      navigate(-1);
    }
  }, [fetchAddUser, errorAdd]);


  return (
    <>
      <div className="container">
        <div className="searchForm">
          <form onSubmit={(e) => e.preventDefault()}>
            <h2>User profile</h2>
            {loadingAdd && <Loading />}
            {errorAdd && <Error error={errorAdd} />}
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

              <div className="formGroup">
                <label htmlFor="hotelRoomTypeId">Room Type:</label>
                <select id="role" name="role" value={currentUser.role} onChange={handleChange}>
                  <option value="">Select Room Type</option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>


            {currentUser.role === "OWNER" && <Business currentUser={currentUser} handleChange={handleChange} />}

            <div className="formRow">
              <button type="submit" onClick={addUser}>Create</button>
              <button type="button" className="cancel" onClick={() => navigate(-1)}>Cancel</button>
            </div>

          </form>
        </div>

      </div>
    </>
  )
}
