import { useState, useEffect } from "react";
import styles from "../styles/Feed.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const HashtagList = ({ hashTagSearch, fetchHashtag, setFetchHashtag }) => {
    const [tweetsFromHashtag, setTweetsFromHashtag] = useState([]);
    console.log('hashTagSearch => ', hashTagSearch);

    useEffect(() => {
        fetch("http://localhost:3000/tweets/getHashtags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ hashTagSearch }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched hashtags:", data.data);
                setTweetsFromHashtag(data.tweets)
            })
            .catch(error => {
                console.error("Error fetching tweets:", error); // Log pour vérifier les erreurs
            });
        setFetchHashtag(false)
    }, [fetchHashtag]);



    return (
        <div className={styles.FeedRowContainer}>
            {tweetsFromHashtag.map((tweet, i) => (
                <div key={i} className={styles.FeedRow}>
                    <div className={styles.tweetAuthor}>
                        <div className={styles.profileIcon}></div>
                        <span className={styles.fullname}>{tweet.username}</span>
                        <span>@{tweet.username}</span>
                        <span>5 hours</span>
                    </div>
                    <div className={styles.tweetMsg}>
                        <p>{tweet.text}</p>
                    </div>
                    <div className={styles.tweetIcons}>
                        <div className={styles.likesDiv}>
                            <FontAwesomeIcon
                                icon={faHeart}
                                styles={{ cursor: 'pointer' }}
                                className={styles.heartIcon}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};