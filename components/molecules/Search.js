import { useContext } from 'react'
import InputGroup from '../atoms/InputGroup'
import styles from '@/styles/Form.module.css'
import { AppContext } from '../Context'
function Search() {
    const { search, setSearch } = useContext(AppContext)
    return (
        <form>
            <InputGroup
                type="text"
                className={styles.input_md}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                title="Search"
                name="search"
                placeholder="Search"
            />
        </form>

    )
}

export default Search