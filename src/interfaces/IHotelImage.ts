export interface IHotelImage {
    hotelImageId: number;
    name: string; 
    description: string;
    url: string; 
    // Optional fields
    hotelId?: number; // Optional hotel ID if the amenity is associated with a specific hotel
}
