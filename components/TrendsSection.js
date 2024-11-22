import styles from '../styles/Trends.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addAllTrendsToStore } from '../reducers/trends'

function TrendsSection({ setHashTagSearch }) {
    const dispatch = useDispatch();
    const [hashtags, setHashtags] = useState([])
    const user = useSelector((state) => state.user.value)
    const trends = useSelector((state) => state.trends.value)

    const fetchTrends = async (onMount = true) => {
        const response = await fetch('http://localhost:3000/tweets/trend')
        const trendFromBack = await response.json()
        onMount && dispatch(addAllTrendsToStore(trendFromBack.hashtags))
        setHashtags(trendFromBack.hashtags)
    }

    useEffect(() => {
        fetchTrends()
    }, [])

    useEffect(() => {
        fetchTrends(false)
    }, [trends])


    const hashtags_array = hashtags.map((hashtag, index) => {
        return (
            <div className={styles.row} key={index} onClick={() => setHashTagSearch(hashtag._id)}>
                <h1 className={styles.hashtag}>{hashtag._id}</h1>
                <span>{hashtag.count} tweet{hashtag.count > 1 && 's'}</span>
            </div >
        )
    })

    return (
        <div className={styles.trends_section}>
            <h1 className={styles.title}>Trends</h1>
            <div className={styles.trendContainer}>
                {hashtags_array.length > 0 ? hashtags_array : <p className={styles.notrend}>No trends yet</p>}
            </div>
        </div>
    )
}

export default TrendsSection;