import React, { useContext } from 'react'
import CartContext from '../../context/CartContext'

const CartComponent = ({cart}) => {

  let {getCarts} = useContext(CartContext)

    let deleteQuantity = async(e) =>{
        if (1<cart.quantity){
          e.preventDefault()
          let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/item-decrease/${cart.id}/`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          let data = await response.json()
          console.log('Delete', data)
          getCarts()
        }else{
          e.preventDefault()
          let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/cart-delete/${cart.id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      )
        let data = await response.json()
        getCarts()
        }
      }
    
      let addQuantity = async(e) => {
        e.preventDefault()
        let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/item-increase/${cart.id}/`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        let data = await response.json()
        getCarts()
      }
    
      let onDelete = async(e) => {
        e.preventDefault()
        let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/cart-delete/${cart.id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      )
        let data = await response.json()
        getCarts()
      }
  return (
    <div>
        <div className='data_row'>
          {cart ? 
          <>
              <img src={`https://saaddev.pythonanywhere.com/${cart.product_image}`} alt=''/>
              <p>{cart.product_name}</p>
              <p>{cart.product_price}$</p>
              
              <p>
                <button className='btn red' onClick={deleteQuantity}>- </button>  
                {cart.quantity}  
                <button className='btn green' onClick={addQuantity}> +</button>
              </p>

              <p>{cart.product_price * cart.quantity}$</p>
              <p onClick={onDelete} className='deleteBtn'>Delete</p>
          </>:
          <>
            
          </>
          }
            </div>
    </div>
  )
}
export default CartComponent