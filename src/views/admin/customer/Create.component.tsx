import React, { useState, useEffect, useRef } from 'react'
import Layout from '../../../components/layout';
import DashboardLeft from "../../../components/DashboardLeft";

import { useMutation } from "@apollo/client";
import './Create.component.style.scss';
import { ICustomerTypeRes } from '../../../interfaces/ICustomerType';
import { CREATE_CUSTOMER } from '../../../graphql/mutations/Customer/Customer';
import DashboardCenterTop from '../../../components/DashboardCenterTop/DashboardCenterTop.component';

import { NavLink } from 'react-router-dom';
import { Button } from 'react-materialize';
import { Flip, toast, Zoom } from "react-toastify";

import CustomInput from '../../../components/InputCustom';
import CheckboxCustom from '../../../components/CheckboxCustom';
import InputFile from '../../../components/InputFile';
import { Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import Title from './Title'

import * as Yup from "yup";
import { trimObjValues } from "../../../commom/Function";

const Create = () => {
  const navigate = useNavigate();
  const [createCustomer] = useMutation(CREATE_CUSTOMER, {
    context: {
      headers: {
      },
      useMultipart: true
    }
  })

  const handleSubmit = (value: any, { resetForm }: any) => {
    const prepareData: ICustomerTypeRes = {
      firstName: value.firstName.trim(),
      lastName: value.lastName.trim(),
      username: value.username.trim(),
      password: value.password,
      email: value.email.trim(),
      phone: value.phone.trim(),
      isActive: value.isActive,
    }

    if (value.age) prepareData.age = value.age
    if (value.firstAddress) prepareData.firstAddress = value.firstAddress.trim()
    if (value.secondAddress) prepareData.secondAddress = value.secondAddress.trim()
    createCustomer({
      variables: {
        data: prepareData,
        image: value.profile
      },
      onCompleted: ({ createCustomer }) => {
        navigate('/admin/customers');
        toast.success(createCustomer.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
          hideProgressBar: true,
          transition: Flip,
          theme: "colored",
        });

        resetForm();
      }
    })
  }
  return (
    <Layout>
      <div className="dashboard create-customer">
        <DashboardLeft />
        <div className="db-cent">
          <DashboardCenterTop name='Jana Novakova' />
          <div className="main-input">
            <Title
              title="Create customer"
            />
            <div className="profile-edit">
              <div className="db-profile">
                <div className="col s12" >
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      username: "",
                      password: "",
                      repeatPassword: "",
                      email: "",
                      phone: "",
                      isActive: true,
                      firstAddress: "",
                      profile: "",
                      secondAddress: "",
                      age: "",
                    }}
                    onSubmit={handleSubmit}

                    validationSchema={Yup.object().shape({
                      firstName: Yup.string().trim()
                        .required("First Name is required")
                        .min(2, "First Name is too short - should be 2 chars minimum."),
                      lastName: Yup.string().trim()
                        .required("Last Name is required")
                        .min(2, "Last Name is too short - should be 2 chars minimum."),
                      username: Yup.string().trim()
                        .required("Username is required")
                        .min(5, "Username is too short - should be 5 chars minimum.")
                        .max(16, "Must be 16 characters or less"),
                      phone: Yup.string().trim()
                        .required("Phone is Required")
                        .matches(/^\+?[0-9]+$/g, "Invalid phone number"),
                      age: Yup.number()
                        .min(16, "Must be large than 15"),
                      email: Yup.string().trim()
                        .email('Must be a valid email')
                        .matches(/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Must be a valid email")
                        .required('Email is required'),
                      password: Yup.string().trim()
                        .required("Password is required")
                        .min(8, "Password is too short - should be 8 chars minimum.")
                        .max(16, "Must be 16 characters or less"),
                      repeatPassword: Yup.string().trim()
                        .required("Repeat Password is required")
                        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                      profile: Yup.mixed().test("fileType", "The picture is not in the correct format", (value) => {
                        if (value) {
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
                              label="Password"
                              id="password"
                              name="password"
                              type="password"
                              component={CustomInput}
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="control-input">
                            <Field
                              label="Repeat Password"
                              id="repeatPassword"
                              name="repeatPassword"
                              type="password"
                              component={CustomInput}
                              value={values.repeatPassword}
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
                              value={values.age}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="control-input">
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
                            <Field
                              label="Active Customer"
                              id="isActive"
                              name="isActive"
                              type="checkbox"
                              value=""
                              component={CheckboxCustom}
                              checked={values.isActive}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="control-input">
                            <div className="input-field form-actions col s8 flex justify-between">
                              <Button className="button-red c-btn no-shadow">Submit</Button>
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
  )
}



export default Create