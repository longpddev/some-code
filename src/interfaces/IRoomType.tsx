import { ROOM_AMENITIES } from '../constants/constants'

export interface IRoomType {
    id: number;
    title: string;
    shortDescription: string;
    description: string;
}

export interface IRoomTypeDetails {
    title: string;
    shortDescription: string;
    description: string;
}

export interface IRoomTypeRes {
    id: number
    thumbnailImage: string | null
    name: string | null
    roomType: RoomTypeType
    maxAdult: number | null
    maxChild: number | null
    roomAmenities: Array<ROOM_AMENITY> | null
    shortDescription: string | null
    description: string | null
    price: number
    specialPrice: number | null
    status: RoomStatus
    createdDate: string | null
    modifiedDate: string | null
    roomimageSet: Array<RoomImageType>
    bookingSet: Array<any>
    roomImages: Array<RoomImageType> | null
}
  
export interface RoomTypeType {
    id: number
    title: string
    shortDescription: string | null
    description: string | null
    createdDate: string | null
    modifiedDate: string | null
    roomSet: Array<any>
}

export interface RoomImageType {
    id: number
    room: IRoomTypeRes
    image: string
}

enum RoomStatus {
    A_1 = "A_1",
    A_2 = "A_2"
}

export interface IRoomPaginatedType {
    pageSize: number
    page: number
    totalPages: number
    hasNext: Boolean
    hasPrev: Boolean
    data: Array<IRoomTypeRes>
}

export type ROOM_AMENITY  = keyof typeof ROOM_AMENITIES