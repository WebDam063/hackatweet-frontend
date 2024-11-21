import { useState, useEffect } from 'react'

function Home() {
  const [isSignUp, setIsSignup] = useState(true)



  return (
    <div className='home-container'>
      {isSignUp && <SingupModal />}
      {/* <div className='image'></div>

      <main className='main'>
        <div className='logo'>
          <img src="/icons/twitter.png" alt="twitter icon" className="twitter-icon"/>
        </div>
          <h1>See what's happening</h1>
        <div className='signup'>
          <p>Join hackatweet today</p>
          <button type='submit' className="button signup-button" onClick={() => setIsSignup(!isSignUp)}>
            Sign up
          </button>
        </div>
        <div className='signin'>
          <p>Already have an account</p>
          <button type='submit' className="button signin-button">
            Sign in
          </button>
        </div>
      </main> */}
    </div>
  );
}

export default Home;


const SingupModal = () => {
  const [firstname, setFirstname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const fetchBackForSignupSignin = async (type) => {
    if (type === 'signup') {
      const response = await fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, username, password})
      })
      const dataFromBack = await response.json()
      
    }
  }

  return (
    <div className='modal'>
      <img src='/icons/twitter.png' />
      <div className='firstname'>
        <input
          type='text'
          className='firstname-input'
          placeholder='Firstname'
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        ></input>
      </div>
      <div className='username'>
        <input
          type='text'
          className='username-input'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div className='password'>
        <input
          type='password'
          className='password-input'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <button className='button button-signup'>
        Sign up
      </button>
    </div>
  )
}