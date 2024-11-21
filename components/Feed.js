import { useState, useEffect } from 'react'
import { login } from '../reducers/user'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import styles from '../styles/Feed.module.css';
import LogoutSection from './LogoutSection';
import TrendsSection from './TrendsSection'
import FeedList from './FeedList';
import { NewTweet } from './NewTweet';
    
function Feed(){
  return (
    <div className={styles.body}>
      {/* // Logout section below */}
     <LogoutSection />
          {/* Feed section below */}
          <NewTweet />
          <FeedList />

     {/* Trends section below */}
     <TrendsSection/>
    </div>
  )
}

export default Feed;