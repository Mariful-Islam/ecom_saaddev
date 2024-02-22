import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CartContext from '../../context/CartContext'

const ProductView = () => {
    let params = useParams()

    let {getCarts, carts} = useContext(CartContext)

    let [cartItem, setCartItem] = useState([])


    useEffect(()=>{
      getCartItem()
    }, [])

    let getCartItem = async() => {
      let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/cart-item/${username}/${params.id}/`)
      let data = await response.json()
      setCartItem(data)
    }


    let [product, setProduct] = useState([])

    useEffect(()=>{
        getProduct()
    }, [])

    let getProduct = async() =>{
        let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/product/${params.id}/`)
        let data = await response.json()
        setProduct(data)
    }
    let username = localStorage.getItem('username')

    let onAdd = async(e) => {
      e.preventDefault()
      let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/add-cart/${username}/${params.id}/`,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          })
      let data = await response.json()
      getCarts()
      getCartItem()
  }
  let deleteQuantity = async(e) =>{
    if (1<cartItem.quantity){
      e.preventDefault()
      let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/item-decrease/${cartItem.id}/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      let data = await response.json()
      console.log('Delete', data)
      getCarts()
      getCartItem()
    }else{
      e.preventDefault()
      let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/cart-delete/${cartItem.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
    let data = await response.json()
    getCarts()
    getCartItem()
    }
  }

  let addQuantity = async(e) => {
    e.preventDefault()
    let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/item-increase/${cartItem.id}/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    let data = await response.json()
    getCarts()
    getCartItem()
  }
  return (
    <div className='wrapper product_view'>
        <div className='product_view_image'>
          <img src={`https://saaddev.pythonanywhere.com/${product.image}`} alt={product.image}/>
        </div>
        <div className='product_view_info'>
          <div>
            <strong>Name: </strong>{product.name}
          </div>
          <div >
            <strong>Price: </strong>{product.price}$
          </div>
          <div>
            <strong>Description: </strong>{product.desc}
          </div>
          <div>
              <strong>Quantity: </strong>
              <button className='btn red' onClick={deleteQuantity}>- </button>  
              {cartItem.quantity}  
              <button className='btn green' onClick={addQuantity}> +</button> <br/>
              <p><strong>SubTotal: </strong>{cartItem.quantity ? cartItem.quantity*product.price : 0 }$</p>
          </div>
          <button className='addBtn' onClick={onAdd}>Add</button>
        </div>
        
        
    </div>
  )
}

export default ProductView