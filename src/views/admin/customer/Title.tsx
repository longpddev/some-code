import React from 'react'

interface TitleInterface {
  title: string,
  description?: string 
}

const Title = ({
  title,
  description
}: TitleInterface) => {
  return (
    <div className="db-title">
      <h3><span className="material-icons">supervised_user_circle</span> {title}</h3>
      {description && (
        <p>{description}</p>
      )}
    </div>
  )
}

export default Title