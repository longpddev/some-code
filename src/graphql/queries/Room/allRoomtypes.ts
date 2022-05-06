import { gql } from "@apollo/client";

export const ALL_ROOM_TYPES = gql`
  query allRoomtypes {
    allRoomtypes {
      id
      title
      shortDescription
    }
  }
`