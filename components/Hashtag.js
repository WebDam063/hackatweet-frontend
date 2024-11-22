import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


export const Hashtag = ({ hashTagSearch, setHashTagSearch, setFetchHashtag }) => {

    return (
        <div className="newtweet-container">
            <h1 className="hashtag">Hashtag</h1>
            <input
                type="text"
                className="newtweet-input"
                value={hashTagSearch}
                onChange={(e) => setHashTagSearch(e.target.value)}
            />
            <div className="bottom">
                <button
                    onClick={() => setFetchHashtag(true)}
                    className="newtweet-button"
                >search</button>
            </div>
        </div>
    )
};
