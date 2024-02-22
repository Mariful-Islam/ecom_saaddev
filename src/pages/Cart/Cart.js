import React, { useContext, useEffect, useState } from 'react'
import CartComponent from '../../components/Cart/CartComponent'
import CartContext from '../../context/CartContext'
import OrderItemContext from '../../context/OrderItemContext'


const Cart = () => {


    let username = localStorage.getItem('username')

    let [orderConfirmation, setOrderConfirmation] = useState("")

    let {getCarts, carts} = useContext(CartContext)

    let {getOrderItems} = useContext(OrderItemContext)

    let totalProductQuantity = 0
    
    carts.map((cart, key)=>(
      totalProductQuantity += cart.quantity
      ))
    
    localStorage.setItem('totalProductQuantity', totalProductQuantity)
      
    let totalPrice = 0
    carts.map((cart, key)=>(
      totalPrice += cart.product_price * cart.quantity
      ))
      
    localStorage.setItem('totalPrice', totalPrice)

    let onBuy = async() => {
      let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/cart_to_order/${username}/`, {
        method: "DELETE",
        headers:{
          "Content-Type" : "application/json"
        },
      })
      let data = await response.json()
      setOrderConfirmation(data)
      getCarts()
      getOrderItems()
    }

    let [submit, setSubmit] = useState("")
    let [deliveryPlace, setDeliveryPlace] = useState([])

    let onDeliverTo = async(e) => {
      e.preventDefault()
      
      let response = await fetch('http://saaddev.pythonanywhere.com/ecom/submit_delivery_place/', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({"user": username, "name": e.target.deliver_to.value})
      })
      let data = await response.json()
      setSubmit(data)
      getDeliveryPlace()
    }

    useEffect(()=>{
      getDeliveryPlace()
    }, [])

    let getDeliveryPlace = async() => {
      let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/get_delivery_place/${username}/`)
      let data = await response.json()
      setDeliveryPlace(data)
      
    }


  return (
    <div className='wrapper'>
      {orderConfirmation ? <h3 style={{textAlign: 'center'}}>{orderConfirmation}</h3> :
      <>
      {!carts ? 
      <h3 style={{textAlign: 'center'}}>No Cart Items</h3>  : 
      <>
      <h3 className='text-center'>Cart</h3>
        <div className='cart'>

          <div className='cart_table'>
            <div className='cart_header'>
              <h4>Image</h4>
              <h4>Products</h4>
              <h4>Price</h4>
              <h4>Quantity</h4>
              <h4>Net Price</h4>
            </div>
            <div className='cart_data'>
              {carts.map((cart, key)=>(
                <CartComponent key={key} cart={cart} getCarts={getCarts}/>
              ))}
            </div>
          </div>

          <div style={{display:'flex', flexDirection: 'column', alignItems:'flex-end'}}>
            <div className='summary_cart'>
              <p><strong>Total Quantity : </strong> {carts ? totalProductQuantity : 0}</p>
              <p><strong>Total Price : </strong> {carts ? totalPrice : 0}$</p>
            </div>
            <div>
              { deliveryPlace.length===0 ?
              <>
              {submit ? 
              <>{submit}</>:
              <>
                <h4>Enter Your Location</h4>
                <form method='POST' onSubmit={(e)=>onDeliverTo(e)}>
                  
                  <input name='deliver_to' type='text' placeholder='Place where you collected from' />
                  <br/>
                  <input type='submit' value='Submit'/>
                </form>
                </>
              
              }
              </>
              :
              <>
                <p style={{display: 'flex', gap:10}}>Send products to  
                  <select>
                      {
                        deliveryPlace.map((d)=>
                        
                          <option>{d.name}</option>
                        
                        )
                        
                    }
                  </select>
                </p>
                <p className='Btn' 
                style={{backgroundColor: '#ffa500', 
                color: 'white', cursor: 'pointer'}}
                onClick={()=>onBuy()}
                >
                  Buy
                </p>
              </>
            }
            </div>
          </div>
        </div> 
      </>
      
}</>   }
    </div>
 
  )
}

export default Cart