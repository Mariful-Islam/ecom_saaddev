import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Signup = () => {
  let [user, setUser] = useState([])

  let navigate = useNavigate()

  let getUser = async(e) => {
    e.preventDefault()
    let response = await fetch('http://saaddev.pythonanywhere.com/ecom/signup/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"username": e.target.username.value, 
                          "email": e.target.email.value, 
                          "password": e.target.password.value})
    })
    let data = await response.json()
    setUser(data)

    localStorage.setItem('username', data['username'])
    localStorage.setItem('token', data['token'])

    console.log('username', data['username'], 'token', data['token'])

    navigate('/')
    window.location.reload()
  }
  
  return (
    <div className='wrapper'>
      <h2 className='text-center'>Sign Up</h2>
      <form onSubmit={getUser} className='input_form' method='POST'>
        <input className='input_field' type='text' name='username' placeholder='username'/>
        <br/>
        <input className='input_field' type='email' name='email' placeholder='email'/>
        <br/>
        <input className='input_field' type='password' name='password' placeholder='password'/>
        <br/>
        <input  className='input_field' type='Submit' value='Sign Up'/>
      </form>
      <span className='alter-link'>Already have account <Link to='/login/'>Login</Link></span>
      {user}
    </div>
  )
}

export default Signup