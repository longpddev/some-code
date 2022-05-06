import { useState, useRef } from 'react';
import "./Customers.style.scss";
import Layout from "../../../components/layout";
import DashboardCenterTop from '../../../components/DashboardCenterTop/DashboardCenterTop.component';
import DashboardLeft from "../../../components/DashboardLeft";

import { useQuery, useMutation } from '@apollo/client';
import "./Customers.style.scss"
import { GET_ALL_CUSTOMERS } from "../../../graphql/queries/getAllCustomers";
import { DELETE_CUSTOMER } from "../../../graphql/mutations/Customer/CustomerMutation";
import {
    useNavigate
} from "react-router-dom";
import { ICustomerType } from "../../../interfaces/ICustomerType";
import Pagination from '../../../components/Pagination';
import Modal from 'react-modal';
import { Link } from 'react-router-dom'
import { Button, Dropdown, Table } from 'react-materialize';
import { Flip, toast, Zoom } from "react-toastify";
import { FaUserEdit, FaUserMinus } from "react-icons/fa";
import defaultImage from "../../../assets/images/default-image.jpg"

const baseUrl: string = process.env.REACT_APP_BASE_URL as string;

const Customers = () => {
    const totalPage = useRef(0);
    const history = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [customerPerPage, setCustomerPerPage] = useState(20);
    const [listCustomerCurrent, setListCustomerCurrent] = useState<ICustomerType[]>([]);
    const { data } = useQuery(GET_ALL_CUSTOMERS, {
        variables: {
            pageSize: customerPerPage,
            page: currentPage
        },
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            setListCustomerCurrent(data.allCustomers.data);
        }
    });

    totalPage.current = data?.allCustomers?.totalPages ?? totalPage.current
    // Change page
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [customerId, setCustomerId] = useState(0);
    const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
        refetchQueries: [
            GET_ALL_CUSTOMERS,
            'AllCustomers'
        ],
    });

    const convertDate = (date: string) => {
        let obDate = new Date(date);
        let day = obDate.getDate();
        let month = obDate.getMonth()
        let year = obDate.getFullYear()

        return `${day < 10 ? "0" : ''}${day}/${month < 10 ? "0" : ''}${month}/${year}`
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Layout>
            <div className="dashboard">
                <DashboardLeft />
                <div className="db-cent ">
                    <DashboardCenterTop name='Jana Novakova' />
                    <div className="db-cent-3">
                        <Link className="btn" to="/admin/customer/create">Add new customer</Link>

                        <div className="table-customer">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Profile Picture</th>
                                        <th>First name</th>
                                        <th>Last name</th>
                                        <th>User name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Age</th>
                                        <th>Address Line 1</th>
                                        <th>Address Line 2</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                        <th>Modified At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listCustomerCurrent?.map((customer: ICustomerType, index: number) => (
                                        <tr key={index}>
                                            <td data-label="ID">{customer.id}</td>
                                            <td data-label="Profile Picture">
                                                {customer.image ? <img width={100} height={100} src={baseUrl + '/media/' + customer.image} /> : <img src={defaultImage} />}
                                            </td>
                                            <td data-label="First name">{customer.firstName}</td>
                                            <td data-label="Last name">{customer.lastName}</td>
                                            <td data-label="User name">{customer.username}</td>
                                            <td data-label="Email">{customer.email}</td>
                                            <td data-label="Phone">{customer.phone}</td>
                                            <td data-label="Age">{customer.age}</td>
                                            <td data-label="Address Line 1">{customer.firstAddress}</td>
                                            <td data-label="Address Line 2">{customer.secondAddress}</td>
                                            <td data-label="Status">{customer.isActive ? 'Enable' : 'Disable'}</td>
                                            <td data-label="Created At">{convertDate(customer.createdDate)}</td>
                                            <td data-label="Modified At">{convertDate(customer.modifiedDate)}</td>
                                            <td data-label="Actions">
                                                <div className="dropdown-action">
                                                    <Dropdown
                                                        id={`Dropdown_cus${customer.id}`}
                                                        options={{
                                                            alignment: 'left',
                                                            autoTrigger: true,
                                                            closeOnClick: true,
                                                            constrainWidth: true,
                                                            container: null,
                                                            coverTrigger: true,
                                                            hover: false,
                                                            inDuration: 150,
                                                            outDuration: 250
                                                        }}
                                                        trigger={<Button node="button">Action</Button>}
                                                    >
                                                        <a onClick={() => history('/admin/customer/edit/' + customer.id)}>
                                                            <FaUserEdit /> Edit
                                                        </a>
                                                        <a onClick={() => {
                                                            setCustomerId(customer.id);
                                                            handleShow();
                                                        }}>
                                                            <FaUserMinus /> Delete
                                                        </a>
                                                    </Dropdown>
                                                </div>
                                                {/* <Button onClick={() => history('/admin/customer/edit/' + customer.id)}>Edit</Button>
                                            <Button className="red" onClick={() => {
                                                setCustomerId(customer.id);
                                                handleShow();
                                            }}>Delete</Button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        {totalPage.current > 0 && (
                            <Pagination totalPage={totalPage.current} current={currentPage} goto={paginate} />
                        )}
                        <div>
                            <Modal
                                isOpen={show}
                                onRequestClose={handleClose}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <h3>Confirm</h3>
                                <div>Are you sure to delete this customer?</div>
                                <div>
                                    <Button className='c-btn' onClick={() => {
                                        deleteCustomer({
                                            variables: {
                                                id: customerId
                                            },
                                            onCompleted: ({ deleteCustomer }) => {
                                                if (deleteCustomer.success) {
                                                    toast.success(deleteCustomer.message, {
                                                        position: toast.POSITION.TOP_CENTER,
                                                        autoClose: 500,
                                                        hideProgressBar: true,
                                                        transition: Flip,
                                                        theme: "colored",
                                                    });
                                                } else {
                                                    toast.error(deleteCustomer.message, {
                                                        position: toast.POSITION.TOP_CENTER,
                                                        autoClose: 500,
                                                        hideProgressBar: true,
                                                        transition: Flip,
                                                        theme: "colored",
                                                    });
                                                }

                                                handleClose()
                                            }
                                        });
                                    }}>YES</Button>
                                    <Button className="c-btn" onClick={handleClose}>Cancel</Button>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Customers;
