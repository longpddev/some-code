import { gql } from "@apollo/client";

export const SEARCH_ROOM_AVAILABLE = gql`
  query searchRoomAvailable($pageSize: Int, $page: Int, $roomTypeId: Int, $numOfAdults: Int, $numOfChildren: Int, $arrivalDate: String, $departureDate: String){
    searchRoomAvailable(pageSize: $pageSize, page: $page, roomTypeId: $roomTypeId, numOfAdults: $numOfAdults, numOfChildrens: $numOfChildren, arrivalDate: $arrivalDate, departureDate: $departureDate) {
      pageSize
      page
      totalPages
      hasNext
      hasPrev
      data {
        id
        thumbnailImage
        name
        roomType {
          id
          title
        }
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
        roomimageSet {
          id
          image
        }
        bookingSet {
          id
          firstname
          lastname
          phone
          email
          firstAddress
          secondAddress
          checkin
          checkout
          adults
          children
          comment
          price
        }
        roomImages {
          id
          image
        }
      }
    }
  }
`;
