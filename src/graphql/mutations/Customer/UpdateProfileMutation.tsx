import { gql } from "@apollo/client";

export const EDIT_PROFILE = gql`
  mutation EditProfile($data: EditProfileInput!, $image: Upload) {
    editProfile(data: $data, image: $image) {
      message,
    	success,
    }
  }
`;