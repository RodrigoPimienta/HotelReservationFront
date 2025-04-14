import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../images_amenities.css';
import { useAxiosFetch } from '../../../hooks/useAxiosFetch';
import { Error } from '../../generics/Error';
import { Loading } from '../../generics/Loading';
import { IRoom } from '../../../interfaces/IRoom';


export const HotelsRoomsLayout = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>(); // Obtiene solo hotelId de los parámetros
  const location = useLocation();
  const name = location.state?.name as string; // Obtiene name del state
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: 'GET',
    url: `/hotels/${hotelId}/rooms`,
    params: null,
    body: null,
  });

  useEffect(() => {
    if (data) {
      setRooms(data);
    } else {
      setRooms([]);
    }
  }, [data]);

  return (
    <div className="cointainer">

      <div className="titleDiv">
        <h2>Rooms for Hotel: {name}</h2>
        <button type="button" onClick={() => navigate("new")}>New room</button>
      </div>

      <div className="searchResults">
        {error && <Error error={error} />}
        {loading && <Loading />}
        <table>
          <thead>
            <tr>
              <th>Num</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.hotelRoomId}>
                <td>{room.num}</td>
                <td>{room.roomType?.name}</td>
                <td>
                  <button onClick={() => navigate(`${room.hotelRoomId}/update`)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};