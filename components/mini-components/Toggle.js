import styles from "../../src/styles/Toggle.module.css"
import { toast } from 'react-toastify'

function Toggle({ toggle,onClick }) {
    return (
        <label htmlFor="toggle" className={`${styles.toggle} ${toggle ? styles.bg_nightsky : styles.bg_daysky}`} onClick={onClick}>
            <input type="checkbox" className={styles.toggleCheckbox} />
            <span className={`${styles.circle} ${toggle ? styles.bg_moon : styles.bg_sun} ${toggle ? styles.slideRight : styles.slideLeft}`}></span>
        </label>
    )
}

export default Toggle