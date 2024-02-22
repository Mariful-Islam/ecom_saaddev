import React, { createContext, useEffect, useState } from 'react'



let OrderItemContext = createContext()

export default OrderItemContext

export const OrderItemProvider = ({children}) => {

    let username = localStorage.getItem('username')

    let [orderItems, setOrderItems] = useState([])


    useEffect(()=>{
        getOrderItems()
    }, [])

    let getOrderItems = async() => {
        let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/order_items/${username}/`)
        let data = await response.json()
        setOrderItems(data)
    }

    let contextData = {
        getOrderItems: getOrderItems,
        orderItems: orderItems
    }

  return (
    <div>
        <OrderItemContext.Provider value={contextData}>
            {children}
        </OrderItemContext.Provider>
    </div>
  )
}
