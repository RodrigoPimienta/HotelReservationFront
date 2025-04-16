import { ChangeEvent, useEffect, useState } from "react";
import { IRoomType } from "../../interfaces/IRoomType";
import { IRoomFilters } from "../../interfaces/IRoomFilters";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { Error } from "../generics/Error";
import { Loading } from "../generics/Loading";
import { useNavigate } from "react-router-dom";

export const HotelsUser = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Array<IRoomType>>([]);
  const [filters, setFilters] = useState<IRoomFilters>({
    checkInDate: new Date().toISOString().split("T")[0], // current date
    checkOutDate: new Date(Date.now() + 86400000).toISOString().split("T")[0] // current date + 1 day
  });

  const transformFilters = (filters: IRoomFilters) => {
    return {
      ...filters,
      checkIn: filters.checkInDate,
      checkOut: filters.checkOutDate,
    };
  }
  const {data, error, loading, fetchData} = useAxiosFetch({
    method: "POST",
    url: "/hotels/roomTypes/filter",
    params: null,
    body: transformFilters(filters)
  });


  useEffect(() => {
    if (data) {
      setRooms(data);
      console.log(data);
    } else {
      setRooms([]);
    }
  }, [data]);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    // si el valor es "", eliminar la propiedad del objeto filters
    if (value.trim() === "") {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters };
        delete newFilters[name as keyof IRoomFilters];
        return newFilters;
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value
      }));
    }
  }

  const searchRooms = () => {
    fetchData();
  };

  const resetFilters = () => {
    setFilters({
      checkInDate: new Date().toISOString().split("T")[0], // current date
      checkOutDate: new Date(Date.now() + 86400000).toISOString().split("T")[0] // current date + 1 day
    });

    for (const input of document.querySelectorAll("input")) {
      (input as HTMLInputElement).value = "";

      if (input.name === "checkInDate") {
        input.value = new Date().toISOString().split("T")[0];
      }

      if (input.name === "checkOutDate") {
        input.value = new Date(Date.now() + 86400000).toISOString().split("T")[0];
      }
    }

    for (const select of document.querySelectorAll("select")) {
      (select as HTMLSelectElement).value = "";
    }

    searchRooms();
  }

  return (
    <>
      <div className="container">

        <div className="titleDiv">
          <h2>Rooms List</h2>
        </div>


        <div className="searchForm">
          <form onSubmit={(e) => e.preventDefault()}>
            <h2>Search Rooms</h2>
            <div className="formRow">
              <div className="formGroup">

                <label htmlFor="name">Hotel Name</label>
                <input type="text" id="name" name="name" value={filters.name} onChange={handleChange} />
              </div>

              <div className="formGroup">
                <label htmlFor="country">Hotel Country</label>
                <input type="text" id="country" name="country" value={filters.country} onChange={handleChange} />
              </div>

              <div className="formGroup">
                <label htmlFor="state">Hotel State</label>
                <input type="text" id="state" name="state" value={filters.state} onChange={handleChange} />
              </div>

              <div className="formGroup">
                <label htmlFor="city">Hotel City</label>
                <input type="text" id="city" name="city" value={filters.city} onChange={handleChange} />
              </div>

            </div>
            <div className="formRow">

              <div className="formGroup">

                <label htmlFor="capacity">Capacity</label>
                <input type="number" id="capacity" name="capacity" min={1} max={10} value={filters.capacity} onChange={handleChange} />
              </div>

              <div className="formGroup">

                <label htmlFor="priceMin">Price Min</label>
                <input type="number" id="priceMin" name="priceMin" min={0} step={0.01} value={filters.priceMin} onChange={handleChange} />
              </div>

              <div className="formGroup">

                <label htmlFor="priceMax">Price Max</label>
                <input type="number" id="priceMax" name="priceMax" min={0} step={0.01} value={filters.priceMax} onChange={handleChange} />
              </div>

            </div>
            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="checkInDate">Check In Date</label>
                <input type="date" id="checkInDate" name="checkInDate" value={filters.checkInDate} onChange={handleChange} />
              </div>

              <div className="formGroup">

                <label htmlFor="checkOutDate">Check Out Date</label>
                <input type="date" id="checkOutDate" name="checkOutDate" value={filters.checkOutDate} onChange={handleChange} />
              </div>

              <div className="formGroup">

                <button type="submit" onClick={searchRooms}>Search</button>
                <button type="button" onClick={resetFilters}>Reset</button>
              </div>

            </div>

          </form>
        </div>

        <div className="searchResults">
          {error && <Error error={error} />}
          {loading && <Loading />}
          {rooms.length === 0 && <div>No results found</div>}
          <div className="search-results" style={{ display: "flex", flexWrap: "wrap", gap: "5px", justifyContent: "center" }}>
            {rooms.map((room) => (
              <div className="card" key={room.hotelRoomTypeId}>
                {room.hotel?.images && room.hotel?.images.length > 0 && (
                  <img src={room.hotel?.images[0].url} alt="Hotel Room" className="hotel-image" />
                )}
                <div className="card-content">
                  <h3>{room.hotel?.name}</h3>
                  <p>Dirección: {`${room.hotel?.city}, ${room.hotel?.state}, ${room.hotel?.country}`}</p>
                  <p>Capacidad: {room.maxGuest}</p>
                  <p>Precio: {room.price}</p>
                  <p>Tipo de Habitación: {room.name}</p>
                  <p>Habitaciones Disponibles: {room.numberRooms}</p>
                  <button onClick={() => navigate('../reservations/new', { state: { roomType: room, checkIn: filters.checkInDate, checkOut: filters.checkOutDate } })}>Reservar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};