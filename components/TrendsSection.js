import styles from '../styles/Trends.module.css';
import { useDispatch } from 'react-redux';


function TrendsSection() {
    const dispatch = useDispatch();
    return (
        <div className={styles.trends_section}>
                <h1 className={styles.title}>Trends</h1>
            <div className={styles.trendContainer}>
                <div className={styles.row}>
                    <h1>Test</h1>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default TrendsSection;