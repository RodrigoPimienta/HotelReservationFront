import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Business } from "./Business";

export const Profile = () => {

    const navigate = useNavigate();
    const { user } = useAuth();


    const handlerUpdateProfile = () => {
        if (user?.role == "USER") {
            console.log("user", user);
            navigate("update");
        }else {
            console.log("business", user);
            navigate("update/business");
        }
    }
    return (
        <>
            <div className="container">
                <div className="searchForm">
                    <form onSubmit={(e) => e.preventDefault()}>

                        <div className="titleDiv">
                            <h2>User profile</h2>
                            <button type="button" onClick={() => handlerUpdateProfile()} className="btn btn-primary">Update</button>
                        </div>


                        <div className="formRow">
                            <h3>User</h3>
                        </div>
                        <div className="formRow">
                            <div className="formGroup">
                                <label htmlFor="firstName">First name:</label>
                                <input className="readonly" disabled type="text" id="firstName" name="firstName" value={user?.firstName} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="lastName">Last name:</label>
                                <input className="readonly" disabled type="text" id="lastName" name="lastName" value={user?.lastName} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="email">Email:</label>
                                <input className="readonly" disabled type="text" id="email" name="email" value={user?.email} />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="role">Role:</label>
                                <input className="readonly" disabled type="text" id="role" name="role" value={user?.role} />
                            </div>
                        </div>

                        {user?.role === "OWNER" && <Business user={user} />}

                    </form>
                </div>

            </div>
        </>
    )
}
