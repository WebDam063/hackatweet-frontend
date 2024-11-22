import styles from '../styles/Trends.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function TrendsSection() {
    const [hashtags, setHashtags] = useState([])
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)
    console.log('DEBUG 1', user);

    useEffect(() => {
        const fetchTrend = async () => {
            const response = await fetch('http://localhost:3000/tweets/trend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.username })
            })
            const trendFromBack = await response.json()
            console.log('DEBUG 2',trendFromBack.hashtags);
            setHashtags(trendFromBack.hashtags)
        }
        fetchTrend()
    }, [])


    const hashtags_array = hashtags.map((hashtag, index) => {
        return (
            <div className={styles.row} key={index}>
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