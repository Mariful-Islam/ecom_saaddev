import React from 'react'

const OrderItemList = ({orderItem}) => {
  


  return (
    
      <div className='order_header'>
        <p>{orderItem.product_name}</p>
        <p>{orderItem.quantity}</p>
        <p>{orderItem.product_price}</p>
        <p>{orderItem.quantity * orderItem.product_price}</p>
        <p>{orderItem.get_time}  {orderItem.get_date}</p>
        <p>{orderItem.get_delivery_place}</p>
      </div>
  )
}

export default OrderItemList