import React from 'react'
import { Link } from 'react-router-dom'
import './RoomItem.scss'
import imageFake from '../../assets/images/rooms/950x650.jpg'
import { IRoomTypeRes } from '../../interfaces/IRoomType'
import { ROOMS_STATUS, ROOM_AMENITIES } from '../../constants/constants'
interface RoomItemProps {
  className?: string,
  data: IRoomTypeRes
}
const baseUrl: string = process.env.REACT_APP_BASE_URL as string;

const RoomItem: React.FC<RoomItemProps> = ({className = "", data}) => {
  return (
    <div className={`room-item ${className}`}>
      {data.specialPrice && (
        <div className="ribbon ribbon-top-left"><span>Special</span></div>
      )}
      
      <div className="room-image p-10">
        <Link to="#">
          <img src={baseUrl + '/media/' + data.thumbnailImage} alt="" />
        </Link>
      </div>
      <div className="main-info p-10">
        <Link to="#">
          <h4 className="main-info__title">{data.name}</h4>
        </Link>
        <ul>
          <li>Max Adult : {data.maxAdult}</li>
          <li>Max Child : {data.maxChild}</li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="main-feature p-10">
        {data.roomAmenities && (
          <ul>
            {data.roomAmenities.map((item, index) => (
              <li key={item}>{ROOM_AMENITIES[item]}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="main-price p-10">
        <p>Price for 1 night</p>
        <p>
          {data.specialPrice && data.specialPrice < data.price ? (
            <>
            <span className="room-price-regular">{data.specialPrice}</span>&nbsp;
            <span className="room-price-sale">$: {data.price}</span>
            </>
          ) : (
            <span className="room-price-regular">{data.price}</span>
          )}
          
        </p>
      </div>
      <div className="main-actions p-10">
        <div className={`r2-available ${data.status === "A_2" ? "unavailable" : ""}`}>{ROOMS_STATUS[data.status]}</div>
        <p>Price for 1 night</p>
        <Link to="#" className="link-book">Book</Link>
      </div>
    </div>
  )
}

export default RoomItem