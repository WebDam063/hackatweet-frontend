import { useState, useEffect } from 'react'
import { login } from '../reducers/user'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
function Home() {
  const router = useRouter()
  const [isSignUp, setIsSignup] = useState(true)

  const SingupModal = ({ connectionType }) => {
    console.log({connectionType});
    
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)
    const [firstname, setFirstname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
  
    useEffect(() => {
      console.log('debug useEffect', { user });
  
    })
  
    const fetchBackForSignupSignin = async (type) => {
      console.log('debug', { type });
  
      if (type === 'signup') {
        console.log('debug1');
  
        const response = await fetch('http://localhost:3000/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstname, username, password })
        })
        const dataFromBack = await response.json()
        if (dataFromBack.result) {
          dispatch(login({ token: dataFromBack.user.token, username: dataFromBack.user.username }))
          router.push('/feed')
        }
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
        <button
          className='button button-signup'
          onClick={() => fetchBackForSignupSignin(connectionType)}
        >
          Sign up
        </button>
      </div>
    )
  }

  return (
    <div className='home-container'>
      {isSignUp && <SingupModal connectionType='signup' />}
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