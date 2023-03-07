import { useContext } from 'react'
import InputGroup from './InputGroup'
import styles from '@/styles/Form.module.css'
import { AppContext } from '../Context'
function Search() {
    const { search, setSearch } = useContext(AppContext)
    return (
        <form>
            <InputGroup
                title="Search"
                type="text"
                name="search"
                placeholder="Search"
                className={styles.input_md}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>

    )
}

export default Search