import { useQuery  } from '@apollo/client'
import { ALL_ROOM_TYPES } from '../../../graphql/queries/Room'
import { IRoomPaginatedType } from '../../../interfaces/IRoomType'
export default function useRoomType () {
    const { loading, error, data } = useQuery<{
        allRoomtypes: Array<{
            id: number
            title: string
            shortDescription: string
        }>
    }>(ALL_ROOM_TYPES)

    return {
        loading, 
        error, 
        data: data?.allRoomtypes || []
    }
}
