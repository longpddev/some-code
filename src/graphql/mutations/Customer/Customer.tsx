import { gql } from "@apollo/client";
export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($data: CreateCustomerInput!, $image: Upload) {
    createCustomer(data: $data, image: $image) {
      success
      message
      user {
        username
        firstName
        lastName
        isActive
        email
        phone
        image
        fullname
        firstAddress
        secondAddress
      }
    }
  }
`

  