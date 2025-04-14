
import { HotelsUser } from "./HotelsUser";
import { HotelsAdmin } from "./HotelsAdmin";
import { useAuth } from "../../context/AuthContext";

export const HotelsLayout = () => {
  // TODO: Change useState to useContext to get the role from the context
  const { user } = useAuth()

  return (
    <>
      {user?.role === 'USER' && <HotelsUser />}
      {user?.role === 'OWNER' && <HotelsAdmin />}
    </>

  )
}
