import React, { useEffect, useState } from 'react'
import ProductComponent from '../../components/Home/ProductComponent/ProductComponent'



const Home = () => {
  
  let [products, setProducts] = useState([])

  useEffect(()=>{
    getProduct()
  }, [])

  let getProduct = async() => {
    let response = await fetch('http://saaddev.pythonanywhere.com/ecom/products/')
    let data = await response.json()
    setProducts(data)
  }
  return (
    <div className='wrapper product_list'>
      {products.map((product, index)=>(
        <ProductComponent key={index} product={product}/>
      ))}
    </div>
  )
}

export default Home