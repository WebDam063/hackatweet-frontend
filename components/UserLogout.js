import styles from '../styles/Logout.module.css';
import {logout} from '../reducers/user';
import { useDispatch } from 'react-redux';

const firstName = "John";
const userName = "JohnDoe"

function Logout() {
    const dispatch = useDispatch();
    return (
        <div className={styles.logout_section}>
            <div>
                <img src="icons/twitter.png" className={styles.twitterIcon}  alt="Twitter"/>
            </div>
            <div className={styles.bottom}>
                <div className={styles.profileInfos}>
                    <div className={styles.profileIcon}></div>
                    <div className={styles.userInfos}>
                        <span className={styles.firstName}>{firstName}</span>
                        <span className={styles.userName}>@{userName}</span>
                    </div>
                </div>
                <button className={styles.logoutBtn} onClick={() => dispatch(logout())}>Logout</button>
            </div>
        </div>
    )
}

export default Logout;