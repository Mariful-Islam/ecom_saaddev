/* eslint-disable no-unused-expressions */
import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import OrderItemContext from '../../context/OrderItemContext'




const Login = () => {

  let {getCarts} = useContext(CartContext)
  let {getOrderItems} = useContext(OrderItemContext)

  let navigate = useNavigate()

  let errorMsg

  let onLogin = async(e)=>{
    e.preventDefault()
    let response = await fetch('http://saaddev.pythonanywhere.com/ecom/login/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"username": e.target.username.value,
                          "password": e.target.password.value})
    })
    let data = await response.json()
    if (response.status===401){
      errorMsg = "Invalid Username or Password"
    }else{
      localStorage.setItem('username', data['username'])
      localStorage.setItem('token', data['token'])
      console.log('username', data['username'], 'token', data['token'])
      navigate('/')
      getCarts()
      getOrderItems()
      window.location.reload()
    } 
  }
  return (
    <div className='wrapper'>
      <h2 className='text-center'>Log In</h2>
      <p>{errorMsg}</p>
      <form onSubmit={onLogin} className='input_form'>
        <input className='input_field' type='text' name='username' placeholder='username'/>
        <br/>
        <input className='input_field' type='password' name='password' placeholder='password'/>
        <br/>
        <input  className='input_field' type='submit' value='Login'/>
      </form>
      <span className='alter-link'>Not have account <Link to='/signup/'> Sign Up</Link></span>
    </div>
  )
}

export default Login