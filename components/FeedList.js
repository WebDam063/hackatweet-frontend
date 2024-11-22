import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Feed.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addAllTweetsToStore } from '../reducers/tweets'

function FeedList() {
    const dispatch = useDispatch()

    // Récupérer l'utilisateur actuel depuis le store Redux
    const user = useSelector((state) => state.user.value);
    const tweetsFromStore = useSelector((state) => state.tweets.value);

    // Déclarer un état local pour stocker les tweets
    const [tweets, setTweets] = useState([]);
    // Déclarer un état local pour stocker les tweets likés par l'utilisateur
    const [likedTweets, setLikedTweets] = useState(new Set());

    // Fonction pour gérer le like d'un tweet
    const handleLike = (tweetId) => {
        if (likedTweets.has(tweetId)) {
            // Si le tweet est déjà liké, envoyer une requête pour supprimer le like
            fetch('http://localhost:3000/tweets/unlike', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tweetId: tweetId })
            })
                .then((response) => response.json())
                .then(data => {
                    console.log("Unlike response:", data); // Log pour vérifier la réponse
                    // Mettre à jour l'état local des tweets
                    setTweets(prevTweets =>
                        prevTweets.map(tweet =>
                            tweet._id === tweetId ? { ...tweet, likes: data.likes } : tweet
                        )
                    );
                    // Mettre à jour l'état local des tweets likés
                    setLikedTweets(prevLikedTweets => {
                        const newLikedTweets = new Set(prevLikedTweets);
                        newLikedTweets.delete(tweetId);
                        return newLikedTweets;
                    });
                })
                .catch(error => {
                    console.error("Error unliking tweet:", error); // Log pour vérifier les erreurs
                });
        } else {
            // Si le tweet n'est pas liké, envoyer une requête pour liker le tweet
            fetch('http://localhost:3000/tweets/like', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tweetId: tweetId })
            })
                .then((response) => response.json())
                .then(data => {
                    console.log("Like response:", data); // Log pour vérifier la réponse
                    // Mettre à jour l'état local des tweets
                    setTweets(prevTweets =>
                        prevTweets.map(tweet =>
                            tweet._id === tweetId ? { ...tweet, likes: data.likes } : tweet
                        )
                    );
                    // Mettre à jour l'état local des tweets likés
                    setLikedTweets(prevLikedTweets => {
                        const newLikedTweets = new Set(prevLikedTweets);
                        newLikedTweets.add(tweetId);
                        return newLikedTweets;
                    });
                })
                .catch(error => {
                    console.error("Error liking tweet:", error); // Log pour vérifier les erreurs
                });
        }
    };

    // Utiliser useEffect pour récupérer les tweets lors du montage du composant
    useEffect(() => {
        // Envoyer une requête POST pour récupérer les tweets
        fetch("http://localhost:3000/tweets/gettweets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched tweets:", data.data); // Log pour vérifier les tweets récupérés
                // Mettre à jour l'état local des tweets
                setTweets(data.data);
                dispatch(addAllTweetsToStore(data.data))
                // Initialiser les tweets likés par l'utilisateur
                setLikedTweets(new Set(data.data.filter(tweet => tweet.likedByUser).map(tweet => tweet._id)));
            })
            .catch(error => {
                console.error("Error fetching tweets:", error); // Log pour vérifier les erreurs
            });
    }, [user]); // Dépendance sur l'utilisateur pour récupérer les tweets lorsque l'utilisateur change


    useEffect(() => {
        let tweets_array = []
        tweetsFromStore.forEach((element, i) => {
            tweets_array.push({ username: element.username, text: element.text, _id: element._id, likes: element.likes });
        });
        setTweets(tweets_array)
    }, [tweetsFromStore])



    return (
        <div className={styles.FeedRowContainer}>
            {tweets.map((tweet, i) => (
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
                    <div onClick={() => handleLike(tweet._id)} style={{ cursor: 'pointer' }}>
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={`${styles.heartIcon} ${likedTweets.has(tweet._id) ? styles.liked : ''}`}
                        />
                        <span>{tweet.likes}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FeedList;