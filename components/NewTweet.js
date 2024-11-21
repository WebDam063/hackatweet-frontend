import { useState } from "react";
import { useSelector } from "react-redux";

export const NewTweet = () => {
    const [tweetValue, setTweetValue] = useState('')
    const user = useSelector((state) => state.user.value)

    const extractHashtags = (str) => {
        return str.match(/(#(?:[^\x00-\x7F]|\w)+)/gi)
    }

    const countChar = () => {
        return tweetValue.length
    }

    const saveTweet = async () => {
        const { username } = user
        const hashtags = extractHashtags(tweetValue)
        const response = await fetch('http://localhost:3000/tweets/newtweet', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username, message: tweetValue, hashtags })
        })
        const dataFromBack = await response.json()
        console.log({ dataFromBack });

        if (dataFromBack.result) {
            setTweetValue('')
        }
    }

    return (
        <div className="newtweet-container">
            <h1>Home</h1>
            <input
                type="text"
                className="newtweet-input"
                value={tweetValue}
                placeholder="What's up"
                onChange={(e) => setTweetValue(e.target.value)}
            />
            <div className="bottom">
                <span>{countChar()}/280</span>
                <button
                    className="newtweet-button"
                    onClick={saveTweet}
                >Tweet</button>
            </div>
        </div>
    )
};
