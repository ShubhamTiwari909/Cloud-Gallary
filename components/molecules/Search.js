import { useContext } from 'react'
import InputGroup from '../atoms/InputGroup'
import styles from '@/styles/Form.module.css'
import { AppContext } from '../Context'
function Search() {
    const { search, setSearch } = useContext(AppContext)
    return (
        <form onSubmit={e => e.preventDefault()}>
            <InputGroup
                type="text"
                className={styles.input_md}
                value={search}
                onChange={(e) => {
                    e.preventDefault();
                    setSearch(e.target.value)
                }}
                title=""
                name="search"
                placeholder="Search"
            />
        </form>

    )
}

export default Search