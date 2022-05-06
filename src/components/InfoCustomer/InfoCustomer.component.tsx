import React from 'react'
import "./InfoCustomer.style.scss";
import imageDefault from '../../assets/images/user.jpg'

interface InfoCustomerInterFace {
    imgSrc?: string;
    name: string;
    address: string;
}

const InfoCustomer = ({
    imgSrc,
    name,
    address,
}: InfoCustomerInterFace) => {
  return (
    <div className="info-customer">
        <div className="info-customer__top">
            <img 
                width={120} 
                height={120} 
                src={imgSrc || imageDefault}
                alt={name}
            />
            <h4>{name}</h4>
            <p>{address}</p>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Age</th>
                    <th>Profile Completion</th>
                    <th>Join Date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>32</td>
                    <td>90%</td>
                    <td>May 2010</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default InfoCustomer