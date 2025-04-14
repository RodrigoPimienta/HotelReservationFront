import { IUser } from "../../interfaces/IUser";

export const Business = ({ user }: { user: IUser }) => {
    console.log(user);
    if (!user) return null;
    const business = user?.userBusiness;
    return (
        <>

            <div className="formRow">
                <h3>Business</h3>
            </div>
            <div className="formRow">
                <div className="formGroup">
                    <label htmlFor="legalName">Legal name:</label>
                    <input className="readonly" disabled type="text" id="legalName" name="legalName" value={business?.legalName} />
                </div>

                <div className="formGroup">
                    <label htmlFor="phoneNumber">Phone number:</label>
                    <input className="readonly" disabled type="text" id="phoneNumber" name="phoneNumber" value={business?.phoneNumber} />
                </div>

                <div className="formGroup">
                    <label htmlFor="taxCode">Tax code:</label>
                    <input className="readonly" disabled type="text" id="taxCode" name="taxCode" value={business?.taxCode} />
                </div>
            </div></>
    )
}
