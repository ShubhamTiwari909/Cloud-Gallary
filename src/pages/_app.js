import "@/styles/globals.css";
import "@/styles/button.css";
import "@/styles/card.css";
import "@/styles/form.css";
import Layout from "../../components/Layout";
import { useState } from "react";
import { AppContext } from "../../components/Context";
import PropTypes from "prop-types";
import Navbar from "@/components/organisms/common/Navbar";
import Footer from "@/components/organisms/common/Footer";

function App({ Component, pageProps }) {
  //states
  const [tokenId, setTokenId] = useState(null);

  // FOLDER
  const [folder, setFolder] = useState(""); // handling folder input field
  const [folders, setFolders] = useState([]); // handle the folders array
  const [folderStorage, setFolderStorage] = useState(0); // handle the folder storage
  const [update, setUpdate] = useState(false); // toggle the update button for the folder input
  const [updateId, setUpdateId] = useState(""); // handle the update id of the folder to update

  // GALLARY
  const [images, setImages] = useState([]); // handle the images array inside folder
  const [overlay, setOverlay] = useState(false); // toggle the overlay
  const [selectAll, setSelectAll] = useState(false); // toggle the select all feature
  const [deleteAll, setDeleteAll] = useState([]); // delete all the selected images

  // SEARCH
  const [search, setSearch] = useState(""); // handle the search input

  return (
    <AppContext.Provider
      value={{
        tokenId,
        setTokenId,
        images,
        setImages,
        folder,
        setFolder,
        folders,
        setFolders,
        update,
        setUpdate,
        updateId,
        setUpdateId,
        folderStorage,
        setFolderStorage,
        overlay,
        setOverlay,
        selectAll,
        setSelectAll,
        deleteAll,
        setDeleteAll,
        search,
        setSearch,
      }}
    >
      <header className="fixed top-0 z-105 w-full">
        <Navbar tokenId={tokenId} />
      </header>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {tokenId && (
        <footer>
          <Footer />
        </footer>
      )}
    </AppContext.Provider>
  );
}

export default App;

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
  search: PropTypes.string,

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
  setSearch: PropTypes.func,
};
