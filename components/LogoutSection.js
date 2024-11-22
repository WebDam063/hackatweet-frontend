import styles from '../styles/Logout.module.css';
import { logout } from '../reducers/user';
import { removeAllTweets } from '../reducers/tweets';
import { removeAllTrends } from '../reducers/trends';
import { useDispatch, useSelector } from 'react-redux';


function LogoutSection() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)

    const disconnect = () => {
        dispatch(logout())
        dispatch(removeAllTweets())
        dispatch(removeAllTrends())
    }
 
    return (
        <div className={styles.logout_section}>
            <div>
                <img src="icons/twitter.png" className={styles.twitterIcon}  alt="Twitter"/>
            </div>
            <div className={styles.bottom}>
                <div className={styles.profileInfos}>
                    <div className={styles.profileIcon}></div>
                    <div className={styles.userInfos}>
                        <span className={styles.firstName}>{user.firstname}</span>
                        <span className={styles.userName}>@{user.username}</span>
                    </div>
                </div>
                <button className={styles.logoutBtn} onClick={disconnect}>Logout</button>
            </div>
        </div>
    )
}

export default LogoutSection;