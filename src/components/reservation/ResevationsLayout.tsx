import { useAuth } from "../../context/AuthContext"
import { ReservationsAdmin } from "./ReservationsAdmin"
import { ReservationsUser } from "./ReservationsUser"

export const ResevationsLayout = () => {
  const { user } = useAuth()

  return (
    <>
      {user?.role === 'USER' && <ReservationsUser />}
      {user?.role === 'OWNER' && <ReservationsAdmin />}

    </>
  )
}
