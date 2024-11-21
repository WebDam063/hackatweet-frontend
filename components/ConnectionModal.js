import { useState, useEffect } from 'react'
import { login } from '../reducers/user'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'

export const ConnectionModal = ({ connectionType, setIsSignIn, setIsSignup }) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [firstname, setFirstname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const closeModal = () => {
        if (connectionType === 'signin') {
            setIsSignIn(false)
        } else {
            setIsSignup(false)
        }
    }


    const fetchBackForSignupSignin = async (type) => {
        console.log({ username, firstname, password, connectionType });
        const data = {
            username, firstname, password
        }
        const response = await fetch(`http://localhost:3000/users/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const dataFromBack = await response.json()
        console.log({dataFromBack});
        
        if (dataFromBack.result) {
            dispatch(login({ token: dataFromBack.user.token, username: dataFromBack.user.username }))
            router.push('/feed')
        }
    }

    return (
        <div className='modal'>
            <img src='/icons/twitter.png' className='modal-icon' />
            <img src='/icons/close.png' className='modal-icon-close' onClick={closeModal}/>
            {connectionType === 'signup' && <p>Create your Hackatweet account</p>}
            {connectionType === 'signin' && <p>Connect to Hackatweet</p>}
            {connectionType === 'signup' && <div className='firstname'>
                <input
                    type='text'
                    className='firstname-input'
                    placeholder='Firstname'
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                ></input>
            </div>}
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