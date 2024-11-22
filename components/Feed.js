import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import styles from '../styles/Feed.module.css';
import LogoutSection from './LogoutSection';
import TrendsSection from './TrendsSection'
import FeedList from './FeedList';
import { NewTweet } from './NewTweet';

function Feed(){
  const user = useSelector((state) => state.user.value)
  const router = useRouter();

  if(!user.username){
    router.push('/')
    return;
  }

  return (
    <div className={styles.body}>
      {/* // Logout section below */}
     <LogoutSection />
          {/* Feed section below */}
          <div className={styles.feedContainer}>
            <NewTweet />
            <FeedList />
          </div>

     {/* Trends section below */}
     <TrendsSection/>
    </div>
  )
}

export default Feed;