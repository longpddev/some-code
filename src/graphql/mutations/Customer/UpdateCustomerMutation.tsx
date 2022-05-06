import { gql } from "@apollo/client";

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($data: CustomerUpdateInput!, $image: Upload) {
    updateCustomer(data: $data, image: $image) {
      success
      message
      user {
          id 
          firstName
          lastName
          username
          image
          age
          phone
          email
          firstAddress
          secondAddress
          isActive
      }
    }
  }
`;