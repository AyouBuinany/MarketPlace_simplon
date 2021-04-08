import React from 'react'
import { Card } from 'react-bootstrap'
import { AiFillStar,AiOutlineStar } from "react-icons/ai";

export default function Product({ title, color, price, image }) {
  return (
    <Card
      border="succes"
      className='p-2'
      style={{ height: '100%',  minWidth: '150px' }}
    >
      <Card.Img  src={image? image : undefined} />
      <Card.Body>
        <Card.Title >{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <div >
            {price}
          </div>
        </Card.Subtitle>
        <Card.Text >
        <AiFillStar />  <AiFillStar />  <AiFillStar /> <AiOutlineStar />  <AiOutlineStar />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
