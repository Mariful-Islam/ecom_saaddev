import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CartContext from '../../../context/CartContext'

const ProductComponent = ({product}) => {

    const navigate = useNavigate()

    let {getCarts} = useContext(CartContext)

    let username = localStorage.getItem('username')

    let onView = async() =>{
        navigate(`/product/${product.id}/`)
    }

    let onAdd = async(e) => {
        e.preventDefault()
        let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/add-cart/${username}/${product.id}/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            })
        let data = await response.json()
        getCarts()
    }


  return (

        <div>
            <div className='product_item'>
                <div className='product_image'>
                    
                    <img src={`https://saaddev.pythonanywhere.com/${product.image}`} alt={product.image.url}/>
                    
                </div>
                <div className='product_info'>
                    <p className='product_name'>{product.name}</p> 
                    <p>{product.price}$</p>
                </div>         
                <div className='cart_price'>
                    <button className='addBtn' onClick={onView}>View</button>
                    <button className='addBtn' onClick={onAdd}>Add</button>
                </div>
            </div>
      </div>
  )
}

export default ProductComponent