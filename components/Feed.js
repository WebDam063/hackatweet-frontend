import { useState, useEffect } from 'react'
import { login } from '../reducers/user'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import  styles  from '../styles/Feed.module.css';
import Logout from './UserLogout'

function Feed(){
  return (
    <div className={styles.body}>
     <Logout />
    </div>
  )
}

export default Feed;