import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import styles from '../styles/Feed.module.css';
import LogoutSection from './LogoutSection';
import TrendsSection from './TrendsSection'
import FeedList from './FeedList';
import { NewTweet } from './NewTweet';
import { Hashtag } from './Hashtag'
import { HashtagList } from './HashtagList'

function Feed() {
  const user = useSelector((state) => state.user.value)
  const router = useRouter();
  const [hashTagSearch, setHashTagSearch] = useState('')
  const [ fetchHashtag, setFetchHashtag] = useState(false)

  if (!user.username) {
    router.push('/')
    return;
  }

  return (
    <div className={styles.body}>
      {/* // Logout section below */}
      <LogoutSection setHashTagSearch={setHashTagSearch} />
      {/* Feed section below */}
      <div className={styles.feedContainer}>
        {hashTagSearch.length > 0 ?
          <><Hashtag hashTagSearch={hashTagSearch} setHashTagSearch={setHashTagSearch} setFetchHashtag={setFetchHashtag} /><HashtagList hashTagSearch={hashTagSearch} fetchHashtag={fetchHashtag} setFetchHashtag={setFetchHashtag} /></>
          : <><NewTweet /><FeedList /></>}
      </div>

      {/* Trends section below */}
      <TrendsSection setHashTagSearch={setHashTagSearch} />
    </div>
  )
}

export default Feed;