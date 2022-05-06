import { gql } from '@apollo/client';

export const ALL_ROOMS = gql`
    query allRooms($pageSize: Int, $page: Int) {
        allRooms (pageSize: $pageSize, page: $page) {
            pageSize
            page
            totalPages
            hasNext
            hasPrev
            data {
                id
                thumbnailImage
                name
                maxAdult
                maxChild
                roomAmenities
                shortDescription
                description
                price
                specialPrice
                status
                createdDate
                modifiedDate
            }
        }
    }
`