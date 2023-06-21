import { useContext } from 'react';
import InputGroup from '../atoms/InputGroup';
import styles from '@/styles/Form.module.css';
import { AppContext } from '../Context';

function Search() {
  const { search, setSearch } = useContext(AppContext);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="text"
        className={styles.input_md}
        value={search}
        onChange={handleSearchChange}
        title=""
        name="search"
        placeholder="Search"
      />
    </form>
  );
}

export default Search;
