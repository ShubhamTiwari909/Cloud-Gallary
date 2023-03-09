import '@/styles/globals.css'
import Layout from '../../components/Layout'
import { useState } from 'react';
import { AppContext } from "../../components/Context"
import PropTypes from "prop-types";
import Navbar from '../../components/Navbar'
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";



Sentry.init({
  dsn: "https://eff507962585427ab0dda6bf6d0e0be6@o4504791975788544.ingest.sentry.io/4504791977951232",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


function App({ Component, pageProps }) {

  //states
  const [tokenId, setTokenId] = useState(null);

  // FOLDER
  const [folder, setFolder] = useState("");
  const [folders, setFolders] = useState([])
  const [folderStorage, setFolderStorage] = useState(0)
  const [update, setUpdate] = useState(false)
  const [updateId, setUpdateId] = useState("")

  // GALLARY
  const [images, setImages] = useState([])
  const [overlay, setOverlay] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [deleteAll, setDeleteAll] = useState([])

  // SEARCH
  const [search, setSearch] = useState("")

  return (
    <AppContext.Provider value={{
      tokenId, setTokenId, images, setImages, folder, setFolder, folders, setFolders,
      update, setUpdate, updateId, setUpdateId, folderStorage, setFolderStorage,
      overlay, setOverlay, selectAll, setSelectAll, deleteAll, setDeleteAll, search, setSearch
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

export default Sentry.withProfiler(App)


App.propTypes = {
  // States
  tokenId: PropTypes.string,
  update: PropTypes.bool,
  updateId: PropTypes.string,
  folder: PropTypes.string,
  folders: PropTypes.array,
  folderStorage: PropTypes.number,
  images: PropTypes.array,
  overlay: PropTypes.bool,
  selectAll: PropTypes.bool,
  deleteAll: PropTypes.array,
  search:PropTypes.string,

  // Setters for States
  setTokenId: PropTypes.func,
  setUpdate: PropTypes.func,
  setUpdateId: PropTypes.func,
  setFolder: PropTypes.func,
  setFolderId: PropTypes.func,
  setFolderStorage: PropTypes.func,
  setImages: PropTypes.func,
  setOverlay: PropTypes.func,
  setSelectAll: PropTypes.func,
  setDeleteAll: PropTypes.func,
  setSearch:PropTypes.func,
}