import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm.js'
import Logout from './components/Logout.js'

const App = () => {
  const [notes, setNotes] = useState([]) 
  
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(token)

    } else {
      setUser(null)
      setToken(null)
    }
  }, [])
  

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const token = await loginService.token({
        username,
        password
      })

      const user = await loginService.login({
        username,
        password
      })
  
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(token)
      )

      setToken(token)
      setUser(user)
    
    } catch(e) {
      
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    console.log('logout')
    window.localStorage.removeItem('loggedAppUser')
  }

  
  return (
    <div className="container">
      <h1 className="text-center ">LOGIN</h1>

      <Notification message={errorMessage} />

      <div className="row justify-content-center">
        <div className="col-sm-6 col-md-4">
       {  
        localStorage.getItem('loggedAppUser') === null ? 
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          : 
          <>
            <div>
              <h2>LOGUEADO</h2>
              <p>{user.username} logged-in</p>
            </div>
            <Logout handleSubmitLogout={handleLogout} />
          </>
}  
          
        </div>
      </div>
    </div>
  );
}


export default App