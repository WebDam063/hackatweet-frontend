import { useState, useEffect } from "react";
import { login } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../styles/Feed.module.css";
import LogoutSection from "./LogoutSection";
import TrendsSection from "./TrendsSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addAllTweetsToStore } from '../reducers/tweets'

function FeedList() {
    const dispatch = useDispatch()
    const [isLiked, setIsLiked] = useState(false);

    const user = useSelector((state) => state.user.value);
    const tweetsFromStore = useSelector((state) => state.tweets.value);

    const [tweets, setTweets] = useState([]);

    const handleLike = (event) => {
        const tweetId = event.target.getAttribute('data-tweetid');

        fetch('http://localhost:3000/tweets/like', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tweetId: tweetId })
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data)
            })
    }

    useEffect(() => {
        fetch("http://localhost:3000/tweets/gettweets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user }),
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addAllTweetsToStore(data.data))
            });
    }, [])


    useEffect(() => {
        let tweets_array = []
        tweetsFromStore.forEach((element, i) => {
            tweets_array.push(
                <div key={i} className={styles.FeedRow}>
                    <div className={styles.tweetAuthor}>
                        <div className={styles.profileIcon}></div>
                        <span className={styles.fullname}>{element.username}</span>
                        <span>@{element.username}</span>
                        <span>5 hours</span>
                    </div>
                    <div className={styles.tweetMsg}>
                        <p>{element.text}</p>
                    </div>
                    <div onClick={(e) => handleLike(e)} data-tweetid={element._id} >
                        <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} style={{ 'pointerEvents': 'none' }} />
                        <span style={{ 'pointerEvents': 'none' }}>{element.likes}</span>
                    </div>
                </div>
            );
        });
        setTweets(tweets_array)
    }, [tweetsFromStore])

    return (
        <div className={styles.FeedRowContainer}>
            {tweets}
        </div>
    );
}

export default FeedList;
