import { ChangeEventHandler } from 'react';
import { IUser } from "../../interfaces/IUser"

export const Business = ({currentUser,handleChange } : {currentUser: IUser, handleChange: ChangeEventHandler<HTMLInputElement>}) => {
    return (
        <>
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
        </>
    )
}
