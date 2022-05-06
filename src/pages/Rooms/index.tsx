import React, { useState } from 'react'
import Layout from '../../components/layout'
import Banner from '../../components/Banner'
import FilterRooms from '../../views/rooms/customer/FilterRooms'
import RoomItem from '../../components/RoomItem'
import useSearchRoomAvailable from '../../views/rooms/customer/useSearchRoomAvailable'
import useRoomType from '../../views/rooms/customer/useRoomType'
import useAllRooms from '../../views/rooms/customer/useAllRooms'
import Pagination from '../../components/Pagination'

import './Rooms.scss'

const Rooms : React.FC = () => {
  const { data: roomtype } = useRoomType()
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ isFiltered, setIsFiltered ] = useState(false)
  const { data: allRoom } = useAllRooms(10, currentPage, {
    skip: isFiltered
  })
  const [ query, setQuery ] = useState({
    pageSize: 10,
    page: currentPage,
    roomTypeId: 6,
    numOfAdults: 1,
    numOfChildren: 1,
    arrivalDate: "2022-01-01 00:00:00",
    departureDate: "2023-01-01 00:00:00",
  })
  const { data } = useSearchRoomAvailable(query, {
    skip: !isFiltered
  })

  const renderRooms = isFiltered ? data : allRoom

   return (
      <Layout>
          <Banner src={''} />
          <FilterRooms 
            label="CHECK AVAILABILITY"
            onSubmit={(filter: any) => {
              setIsFiltered(true)
              setQuery({
                ...query,
                ...filter
              })
            }}
          />
          <div className="inn-body-section pad-bot-55">
            <div className="title-page ">
              <h2>Room Types</h2>
              <div className="head-title">
                <div className="hl-1"></div>
                <div className="hl-2"></div>
                <div className="hl-3"></div>
              </div>
              <p className="head-detail">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
              </p>
            </div>

            <div className="container rooms-page">
              <div className="row">
                {renderRooms && renderRooms.data && renderRooms.data.map(item => (
                  <RoomItem className="room-info-item" key={item.id} data={item} />
                ))}
              </div>
              <div>
                {renderRooms && (
                  <Pagination 
                    totalPage={renderRooms.totalPages}
                    goto ={(page) => {
                      setCurrentPage(page)
                      setQuery(prev => ({
                        ...prev,
                        page: page
                      }))
                    }}
                    current={renderRooms.page}
                  />
                )}
              </div>
            </div>
          </div>
      </Layout>
  )
}

export default Rooms