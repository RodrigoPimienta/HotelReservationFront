import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../images_amenities.css';
import { useAxiosFetch } from '../../../hooks/useAxiosFetch';
import { Error } from '../../generics/Error';
import { Loading } from '../../generics/Loading';
import { IRoomType } from '../../../interfaces/IRoomType';


export const HotelsRoomTypesLayout = () => {
  const [RoomTypes, setRoomTypes] = useState<IRoomType[]>([]);

  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>(); // Obtiene solo hotelId de los parámetros
  const location = useLocation();
  const name = location.state?.name as string; // Obtiene name del state
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: 'GET',
    url: `/hotels/${hotelId}/roomTypes`,
    params: null,
    body: null,
  });

  useEffect(() => {
    if (data) {
      setRoomTypes(data);
    } else {
      setRoomTypes([]);
    }
  }, [data]);

  return (
    <div className="container">

      <div className="titleDiv">
        <h2>Room types for Hotel: {name}</h2>
        <button type="button" onClick={() => navigate("new")}>New room type</button>
      </div>

      <div className="searchResults">
        {error && <Error error={error} />}
        {loading && <Loading />}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Max guest</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {RoomTypes.map((roomType) => (
              <tr key={roomType.hotelRoomTypeId}>
                <td>{roomType.name}</td>
                <td>{roomType.maxGuest}</td>
                <td>${roomType.price}</td>
                <td>
                  <button onClick={() => navigate(`${roomType.hotelRoomTypeId}/update`)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};