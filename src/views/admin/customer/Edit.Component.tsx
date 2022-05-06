import React, { useState } from 'react';
import "./Customers.style.scss";
import Layout from "../../../components/layout";
import DashboardCenterTop from '../../../components/DashboardCenterTop/DashboardCenterTop.component';
import DashboardLeft from "../../../components/DashboardLeft";
import InfoCustomer from "../../../components/InfoCustomer";

import CustomInput from '../../../components/InputCustom';
import InputFile from '../../../components/InputFile';
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { Button, Select } from 'react-materialize';
import { NavLink } from 'react-router-dom';
import { Flip, toast, Zoom } from "react-toastify";

import { useQuery, useMutation } from '@apollo/client';
import "./Customers.style.scss"
import { ICustomerTypeEdit, ICustomerType } from "../../../interfaces/ICustomerType";

import { GET_CUSTOMER_BY_ID } from "../../../graphql/queries/getCustomerById";
import {
    useParams,
    useNavigate
} from "react-router-dom";
import { UPDATE_CUSTOMER } from "../../../graphql/mutations/Customer/UpdateCustomerMutation";

import Title from './Title'

const Edit = () => {
    const params = useParams();
    const customerId = params.id;

    const { loading, error, data } = useQuery(GET_CUSTOMER_BY_ID, {
        variables: {
            userId: customerId
        },
        fetchPolicy: "no-cache"
    });

    const [updateCustomer] = useMutation(UPDATE_CUSTOMER, {
        context: {
            headers: {
            },
            useMultipart: true
        },
        refetchQueries: [
            GET_CUSTOMER_BY_ID,
            'customer'
        ],
    }
    );
    console.log(data)
    const handleSubmit = (value:any, { resetForm }: any) => {
        const prepareData : ICustomerTypeEdit = {
          userId: data.customer.id,
          isActive: value.isActive === '1' ? true : false,
        }
    
        if(value.firstName) prepareData.firstName = value.firstName
        if(value.lastName) prepareData.lastName = value.lastName
        if(value.username) prepareData.username = value.username
        if(value.email) prepareData.email = value.email
        if(value.phone) prepareData.phone = value.phone
        if(value.age) prepareData.age = parseInt(value.age, 10)
        if(value.firstAddress) prepareData.firstAddress = value.firstAddress
        if(value.secondAddress) prepareData.secondAddress = value.secondAddress
        
        updateCustomer({
          variables: {
            data: prepareData,
            image: value.profile ?? ""
          },
          onCompleted: ({ updateCustomer }) => {
            toast.success(updateCustomer.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 500,
              hideProgressBar: true,
              transition: Flip,
              theme: "colored",
            });

            resetForm()
          }
        })
      }
    
    return (
        <Layout>
            <div className ="dashboard create-customer">
                <DashboardLeft />
                <div className="db-cent">
                <DashboardCenterTop name = 'Jana Novakova' />
                <div className="main-input">
                    <Title
                        title="Edit customer"
                    />
                    <div className="profile-edit">
                        <div className="db-profile">
                                <div className="col s12" >
                                <Formik
                                    initialValues={{
                                        firstName: data?.customer?.firstName || "",
                                        lastName: data?.customer?.lastName || "",
                                        username: data?.customer?.username || "",
                                        email: data?.customer?.email || "",
                                        phone: data?.customer?.phone || "",
                                        firstAddress: data?.customer?.firstAddress || "",
                                        profile: "",
                                        secondAddress: data?.customer?.secondAddress || "",
                                        age: (data?.customer?.age || "").toString(),
                                        isActive: data?.customer?.isActive ? "1" : ""
                                    }}
                                    enableReinitialize
                                    onSubmit={handleSubmit}

                                    validationSchema={Yup.object().shape({
                                      firstName: Yup.string()
                                        .required("First Name is required")
                                        .min(2, "First Name is too short - should be 2 chars minimum."),
                                      lastName: Yup.string()
                                        .required("Last Name is required")
                                        .min(2, "Last Name is too short - should be 2 chars minimum."),
                                      username: Yup.string()
                                        .required("Username is required")
                                        .min(5, "Username is too short - should be 5 chars minimum.")
                                        .max(16, "Must be 16 characters or less"),
                                      phone: Yup.string().required("Phone is Required")
                                        .matches(/^\+?[0-9]+$/g, "Invalid phone number"),
                                      email: Yup.string()
                                      .email('Must be a valid email')
                                      .matches(/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Must be a valid email")
                                      .required('Email is required'),
                                      age: Yup.number()
                                      .min(16,  "Must be large than 15"),
                                      profile: Yup.mixed().test("fileType", "The picture is not in the correct format", (value) => {
                                        if(value) {
                                          return /^(image\/).*/.test(value.type)
                                        }
                                        return true;
                                      }),
                                    })}
                                >
                                {({ 
                                    values, 
                                    isSubmitting, 
                                    handleChange, 
                                    handleBlur, 
                                    handleSubmit,
                                    handleReset,
                                    resetForm,
                                }: any) => {
                                    return (
                                    <form onSubmit={handleSubmit}>
                                        <div className="control-input">
                                        <Field
                                            label="First Name"
                                            id="firstName"
                                            name="firstName"
                                            component={CustomInput}
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        </div>
                                        <div className="control-input">
                                        <Field
                                            label="Last Name"
                                            id="lastName"
                                            name="lastName"
                                            component={CustomInput}
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        </div>
                                        <div className="control-input">
                                        <Field
                                            label="Username"
                                            id="username"
                                            name="username"
                                            component={CustomInput}
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        </div>
                                        <div className="control-input">
                                        <Field
                                            label="Email"
                                            id="email"
                                            name="email"
                                            type="email"
                                            component={CustomInput}
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        </div>
                                        <div className="control-input">
                                        <Field
                                            label="Phone"
                                            id="phone"
                                            name="phone"
                                            component={CustomInput}
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        </div>
                                        <div className="control-input">
                                        <Field
                                            label="Age"
                                            id="age"
                                            name="age"
                                            type="number"
                                            component={CustomInput}
                                            value={values.age.toString()}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        </div>
                                        <div className="control-input file-field">
                                        <Field
                                            label="Profile Picture"
                                            id="profile"
                                            name="profile"
                                            type="file"
                                            accept="image/*"
                                            component={InputFile}
                                            value={values.profile}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        </div>
                                        <div className="control-input">
                                        <Field
                                            label="Address Line 1"
                                            id="firstAddress"
                                            name="firstAddress"
                                            component={CustomInput}
                                            value={values.firstAddress}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        </div>
                                        <div className="control-input">
                                        <Field
                                            label="Address Line 2"
                                            id="secondAddress"
                                            name="secondAddress"
                                            component={CustomInput}
                                            value={values.secondAddress}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        </div>
                                        <div className="control-input input-checkbox">
                                        <label htmlFor="">Active user</label>
                                            <Select
                                                name="isActive"
                                                value={values.isActive ? "1" : "0"}
                                                onChange={handleChange}
                                            >
                                                <option value="1">
                                                    Enable
                                                </option>
                                                <option value="0">
                                                    Disable
                                                </option>
                                            </Select>
                                        </div>
                                        <div className="control-input">
                                            <div className="input-field col s8 flex justify-between">
                                                <Button className="c-btn no-shadow button-red">Submit</Button>
                                                <NavLink to="/admin/customers" className="c-btn no-shadow link-button warning" >Cancel</NavLink>
                                                <Button className="c-btn no-shadow secondary" onClick={handleReset}>Reset</Button>
                                            </div>
                                        </div>
                                    </form>
                                    )
                                }}
                                </Formik>
                                </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </Layout>
    );
};

export default Edit;
