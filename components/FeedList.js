import { useState, useEffect } from "react";
import { login } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../styles/Feed.module.css";
import LogoutSection from "./LogoutSection";
import TrendsSection from "./TrendsSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function FeedList() {
  const user = useSelector((state) => state.user.value);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    console.log(tweets)
    fetch("http://localhost:3000/tweets/gettweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      })
        .then((response) => response.json())
        .then((data) => {
          data.data.forEach((element, i) => {
            const tweet_row = (
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
                <div>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
            );
            setTweets(tweets => [...tweets, tweet_row]);
          });
        });
  },[])

  return (
    <div className={styles.FeedRowContainer}>
      {/* <div className={styles.FeedRow}>
            <div className={styles.tweetAuthor}>    
                <div className={styles.profileIcon}></div>
                <span className={styles.fullname}>John Doe</span>
                <span>@JohnDoe</span>
                <span>5 hours</span>
            </div>
            <div className={styles.tweetMsg}>
                <p>Ceci est un message de test</p>
            </div>
            <div>
            <FontAwesomeIcon icon={faHeart} />
            </div>
        </div>
        <div className={styles.FeedRow}>
            <div className={styles.tweetAuthor}>
                <div className={styles.profileIcon}></div>
                <span className={styles.fullname}>MR Dams</span>
                <span>@MRDams</span>
                <span>2 hours</span>
            </div>
            <div className={styles.tweetMsg}>
                <p>Teeeest</p>
            </div>
            <div>
            <FontAwesomeIcon icon={faHeart} />
            </div>
        </div> */}
      TEST
      {tweets}
    </div>
  );
}

export default FeedList;
