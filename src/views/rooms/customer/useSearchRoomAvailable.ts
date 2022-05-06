import { useQuery  } from '@apollo/client'
import { SEARCH_ROOM_AVAILABLE } from '../../../graphql/queries/Room'
import { IRoomPaginatedType } from '../../../interfaces/IRoomType'

interface useSearchRoomAvailableInterface {
  pageSize: number
  page: number
  roomTypeId: number
  numOfAdults: number
  numOfChildren: number
  arrivalDate: string
  departureDate: string
}
const useSearchRoomAvailable = ({
  pageSize,
  page,
  roomTypeId,
  numOfAdults,
  numOfChildren,
  arrivalDate,
  departureDate,
} : useSearchRoomAvailableInterface,  options?: {skip: boolean}) => {
  const { loading, error, data } = useQuery<{
    searchRoomAvailable : IRoomPaginatedType
  }>(SEARCH_ROOM_AVAILABLE, {
    variables: {
      pageSize: pageSize,
      page: page,
      roomTypeId: roomTypeId,
      numOfAdults: numOfAdults,
      numOfChildren: numOfChildren,
      arrivalDate: arrivalDate,
      departureDate: departureDate
    },
    skip: options?.skip || false
  })
  
  return {
    loading, error, data: data?.searchRoomAvailable
  }
}

export default useSearchRoomAvailable