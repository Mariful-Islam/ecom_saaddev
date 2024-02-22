import React, { useEffect, useState } from 'react'
import { createContext } from 'react'


let CartContext = createContext()

export default CartContext


export const CartProvider = ({children}) => {

    let username = localStorage.getItem('username')

    let [carts, setCarts] = useState([])
    
    useEffect(()=>{
        getCarts()
    },[])

    let getCarts = async() => {
        if (username) {
          let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/cart/${username}/`)
          let data = await response.json()
          setCarts(data)
        }else{
          
        }
        
      }

      let contextData = {
        getCarts: getCarts,
        carts: carts
      }
    
  return (
    <div>
        <CartContext.Provider value={contextData}>
            {children}
        </CartContext.Provider>
    </div>
  )
}


