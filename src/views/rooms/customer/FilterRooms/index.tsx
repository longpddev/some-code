import React, { useState } from 'react'
import './FilterRooms.scss'
import { Button, TextInput, Select } from 'react-materialize'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useRoomType from '../useRoomType'
import { toast, Flip } from 'react-toastify'

function getDateByFormat(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    const formatNumber = (num: number) => (num < 10 ? `0${num}` : num)

    return `${year}-${formatNumber(month)}-${formatNumber(day)} 00:00:00`
}
interface FilterRoomsProps {
    label: string
    onSubmit?: Function
}

const showMessage = (message: string, status: string = 'error') => {
    if(status === 'error') {
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: true,
            transition: Flip,
            theme: "colored",
        });
    } else {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: true,
            transition: Flip,
            theme: "colored",
        });
    }

}

const FilterRooms: React.FC<FilterRoomsProps> = ({
    onSubmit,
    label
}) => {

    const [ roomTypeId, setRoomTypeId ] = useState("")
    const [ numOfAdults, setNumOfAdults ] = useState("")
    const [ numOfChildrens, setNumOfChildrens ] = useState("")
    const [ arrivalDate, setArrivalDate ] = useState<Date | undefined>()
    const [ departureDate, setDepartureDate ] = useState<Date | undefined>()

    const { data } = useRoomType()

    const isSubmitable = Boolean(departureDate && arrivalDate)
    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault()

        if(![roomTypeId, numOfAdults, numOfChildrens].every(Boolean)) {
            showMessage('Please fill in all fields before submit')
            return;
        }

        if(!arrivalDate || !departureDate || arrivalDate.getTime() > departureDate.getTime()) {
            showMessage('Arrival Date must be greater than Departure Date')
        } else {
            onSubmit && onSubmit({
                roomTypeId: parseInt(roomTypeId),
                numOfAdults: parseInt(numOfAdults),
                numOfChildrens: parseInt(numOfChildrens),
                page: 1,
                arrivalDate: getDateByFormat(arrivalDate),
                departureDate: getDateByFormat(departureDate)
            })
        }
    }

    return (
        <div className="filter-rooms">
            <div className="container">
            <div className="filter-rooms__inner">
                <h3 className="filter-rooms__title">{label}</h3>
                <form className="filter-rooms__list row" onSubmit={handleSubmit}>
                    <div className="input-wrap">
                        <Select
                            multiple={false}
                            options={{
                                classes: '',
                                dropdownOptions: {
                                    alignment: 'left',
                                    autoTrigger: true,
                                    closeOnClick: true,
                                    constrainWidth: true,
                                    coverTrigger: true,
                                    hover: false,
                                    inDuration: 150,
                                    outDuration: 250
                                }
                            }}
                            value={roomTypeId}
                            onChange={({target: { value }}) => setRoomTypeId(value)}
                        >
                            <option
                                disabled
                                value=""
                            >
                                Select Room
                            </option>
                            {data.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.title}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="input-wrap">
                    <Select
                            multiple={false}
                            options={{
                                classes: '',
                                dropdownOptions: {
                                    alignment: 'left',
                                    autoTrigger: true,
                                    closeOnClick: true,
                                    constrainWidth: true,
                                    coverTrigger: true,
                                    hover: false,
                                    inDuration: 150,
                                    outDuration: 250
                                }
                            }}
                            value={numOfAdults}
                            onChange={({target: { value }}) => setNumOfAdults(value)}
                        >
                            <option
                                disabled
                                value=""
                            >
                                No of adults
                            </option>
                            {Array(10).fill(1).map((_, index) => (
                                <option key={index} value={index+1}>
                                    {index+1} adults
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="input-wrap">
                    <Select
                            multiple={false}
                            options={{
                                classes: '',
                                dropdownOptions: {
                                    alignment: 'left',
                                    autoTrigger: true,
                                    closeOnClick: true,
                                    constrainWidth: true,
                                    coverTrigger: true,
                                    hover: false,
                                    inDuration: 150,
                                    outDuration: 250
                                }
                            }}
                            value={numOfChildrens}
                            onChange={({target: { value }}) => setNumOfChildrens(value)}
                        >
                            <option
                                disabled
                                value=""
                            >
                                No children
                            </option>
                            {Array(10).fill(1).map((_, index) => (
                                <option key={index} value={index+1}>
                                    {index+1} children
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="input-wrap">
                        <div className="col input-field ">
                            <DatePicker placeholderText='Arrival Date' selected={arrivalDate} onChange={(date: Date) => {
                            setArrivalDate(date)
                        }} />
                        </div>
                    </div>
                    <div className="input-wrap">
                        <div className="col input-field ">
                        <DatePicker placeholderText='Departure Date' selected={departureDate} onChange={(date: Date) => {
                            setDepartureDate(date)
                        }} />
                        </div>
                    </div>
                    <div className="input-wrap">
                        <div className="col input-field">
                            <Button className="red">Submit</Button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
  )
}

export default FilterRooms