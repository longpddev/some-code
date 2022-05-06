import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Homepage from "./views/homepage";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import ProfileForm from "./components/ProfileForm";
import { Users, AddUser, EditUser } from "./pages/Admin/AdminUser";
import { Menus, AddMenu, EditMenu } from "./pages/Admin/Menu";
import { Services, AddService, EditService } from "./pages/Admin/Service";
import { AUTH_TOKEN, REFRESH_EXPIRES_IN, REFRESH_TOKEN, IS_CUSTOMER, IS_ADMIN, IS_SUPER_ADMIN, REMEMBER_ME, IS_LOGGED_IN } from "./constants/constants";

import { setContext } from "@apollo/client/link/context";
import MyAccount from "./pages/MyAccount";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";

import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Customer from "./views/admin/customer";
import Edit from "./views/admin/customer/Edit.Component";
import CreateCustomer from "./views/admin/customer/Create.component";
import { createUploadLink } from "apollo-upload-client";
import MenuPage from "./pages/MenuPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedSuperAdmin from "./components/ProtectedSuperAdmin";
import ProtectedAdmin from "./components/ProtectedAdmin";
import ServicesPage from "./pages/ServicesPage";
import StickyContact from "./components/sticky-contact";
import ContactPage from "./pages/ContactUs";
import AboutUsPage from "./pages/AboutUs";
toast.configure();

const graphqlHost: string = process.env.REACT_APP_GRAPHQL_HOST as string;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach((error) => {
      const { locations, message, path } = error;
      console.warn(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      if (message === 'You do not have permission to perform this action') {
        setTimeout(() => {
          window.location.pathname = "/";
        }, 1500);
      }

      if (message === 'Error decoding signature') {
        setTimeout(() => {
          window.location.pathname = "/";
        }, 1500);
      }

      if (message === 'Signature has expired' || message === 'Invalid refresh token') {
        localStorage.clear();
        setTimeout(() => {
          window.location.pathname = "/";
        }, 1500);
      }

      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
        transition: Flip,
        theme: "colored",
      });
    });

  if (networkError) console.warn(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const exp = localStorage.getItem(REFRESH_EXPIRES_IN);
  const currentTime = Math.round(+new Date() / 1000);
  const expiryTime = Number(exp);
  if (exp !== null) {
    if (currentTime >= expiryTime) {
      localStorage.clear();
      setTimeout(() => {
        window.location.pathname = "/";
      }, 1500);
    }
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = from([
  errorLink,
  new HttpLink({
    uri: graphqlHost,
  }),
]);

const uploadLink = from([
  errorLink,
  createUploadLink({
    uri: graphqlHost,
  }),
]);

// const uploadLink = createUploadLink({
//   uri: graphqlHost,
// });

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache({
    addTypename: false
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* NOTE: Need update config route follow react-router v6 */}
        <Routes>
   

          <Route path='/admin/customers' element={<ProtectedAdmin />}>
            <Route path='/admin/customers' element={<Customer />} />
          </Route>
          <Route path='/admin/customer/edit/:id' element={<ProtectedAdmin />}>
            <Route path='/admin/customer/edit/:id' element={<Edit />} />
          </Route>
          <Route path='/admin/customer/create' element={<ProtectedAdmin />}>
            <Route path='/admin/customer/create' element={<CreateCustomer />} />
          </Route>

          <Route path="/rooms" element={<Rooms />} />



        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
