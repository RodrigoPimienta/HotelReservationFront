import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from "./context/AuthContext";
import { HomePublic } from './components/Layouts/HomePublic'
import { Login } from './components/login/Login'
import { HomePrivate } from './components/Layouts/HomePrivate'
import { HotelsLayout } from './components/hotels/HotelsLayout'
import { AddHotel } from './components/hotels/AddHotel'
import { UpdateHotel } from './components/hotels/UpdateHotel'
import { HotelsImagesLayout } from './components/hotels/images/HotelsImagesLayout'
import { AddHotelAmenity } from './components/hotels/amenities/AddHotelAmenity'
import { UpdateHotelAmenity } from './components/hotels/amenities/UpdateHotelAmenity'
import { UpdateRoomType } from './components/hotels/roomTypes/UpdateRoomType';
import { AddRoomType } from './components/hotels/roomTypes/AddRoomType';
import { HotelsRoomTypesLayout } from './components/hotels/roomTypes/HotelsRoomTypesLayout';
import { HotelsRoomsLayout } from './components/hotels/rooms/HotelsRoomsLayout';
import { AddHotelRoom } from './components/hotels/rooms/AddHotelRoom';
import { UpdateHotelRoom } from './components/hotels/rooms/UpdateHotelRoom';
import { AddReservation } from './components/reservation/AddReservation';
import { ResevationsLayout } from './components/reservation/ResevationsLayout';
import { Profile } from './components/profile/Profile';
import { UpdateProfile } from './components/profile/UpdateProfile';
import { UpdateProfileOwner } from './components/profile/UpdateProfileOwner';
import { UpdateHotelImage } from './components/hotels/images/UpdateHotelImage';
import { AddHotelImage } from './components/hotels/images/AddHotelImage';

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePublic />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<h1>Register</h1>} />

            <Route path="private" element={<HomePrivate />}>
              <Route index element={<HotelsLayout />} /> {/* Default route for private section */}
              <Route path="hotels" element={<HotelsLayout />} />
              <Route path="hotels/new" element={<AddHotel />} />
              <Route path="hotels/:hotelId/update" element={<UpdateHotel />} />
              <Route path="hotels/:hotelId/images" element={<HotelsImagesLayout />} />
              <Route path="hotels/:hotelId/images/new" element={<AddHotelImage />} />
              <Route path="hotels/:hotelId/images/:hotelImageId/update" element={<UpdateHotelImage />} />
              <Route path="hotels/:hotelId/amenities" element={<HotelsImagesLayout />} />
              <Route path="hotels/:hotelId/amenities/new" element={<AddHotelAmenity />} />
              <Route path="hotels/:hotelId/amenities/:hotelAmenityId/update" element={<UpdateHotelAmenity />} />
              <Route path="hotels/:hotelId/roomTypes" element={<HotelsRoomTypesLayout />} />
              <Route path="hotels/:hotelId/roomTypes/new" element={<AddRoomType />} />
              <Route path="hotels/:hotelId/roomTypes/:RoomTypeId/update" element={<UpdateRoomType />} />
              <Route path="hotels/:hotelId/rooms" element={<HotelsRoomsLayout />} />
              <Route path="hotels/:hotelId/rooms/new" element={<AddHotelRoom />} />
              <Route path="hotels/:hotelId/rooms/:hotelRoomId/update" element={<UpdateHotelRoom />} />
              <Route path="reservations" element={<ResevationsLayout />} />
              <Route path="reservations/new" element={<AddReservation />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/update" element={<UpdateProfile />} />
              <Route path="profile/update/business" element={<UpdateProfileOwner />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
