import '@/styles/globals.css'
import Layout from '../../components/Layout'
import { useState } from 'react';
import { AppContext } from "../../components/Context"
import PropTypes from "prop-types";
import Navbar from '../../components/Navbar'



export default function App({ Component, pageProps }) {

  //states
  const [tokenId, setTokenId] = useState(null);
  const [images, setImages] = useState([])


  return (
    <AppContext.Provider value={{
      tokenId, setTokenId,images, setImages
    }}>
      <div className='fixed top-0 z-99 w-full'>
        <Navbar tokenId={tokenId} />
      </div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  )
}


App.propTypes = {
  tokenId: PropTypes.string,
  setTokenId: PropTypes.func,
  title: PropTypes.string,
  setTitle: PropTypes.func,
  task: PropTypes.string,
  setTask: PropTypes.func,
  priority: PropTypes.string,
  setPriority: PropTypes.func,
  deadline: PropTypes.string,
  setDeadline: PropTypes.func,
  completed: PropTypes.bool,
  setCompleted: PropTypes.func,
  url: PropTypes.object,
  setUrl: PropTypes.func,
  percent: PropTypes.number,
  setPercent: PropTypes.func,
  taskGroup: PropTypes.array,
  setTaskGroup: PropTypes.func,
  update: PropTypes.bool,
  setUpdate: PropTypes.func,
  updateId: PropTypes.string,
  setUpdateId: PropTypes.func,
  search: PropTypes.string,
  setSearch: PropTypes.string,
  searchCompleted: PropTypes.string,
  setSearchCompleted: PropTypes.func,
  menu: PropTypes.bool,
  setMenu: PropTypes.func,
  getId: PropTypes.func,
  getData: PropTypes.func,
  addTask: PropTypes.func,
  updateTask: PropTypes.func,
  deleteTask: PropTypes.func,
  getCompleted: PropTypes.func,
}