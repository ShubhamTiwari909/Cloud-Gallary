import { useState, useEffect, useContext } from "react";
import styles from "@/styles/Gallary.module.css";
import { getFolders } from "../../../firebase/Gallary/folderOperations";
import { getStorageSize } from "../../../firebase/Gallary/dbOperations";
import { AppContext } from "../../Context";
import PropTypes from "prop-types";
import Button from "@/components/atoms/Button";
import FolderBlock from "./FolderBlock";
import FolderHeader from "./FolderHeader";

function FolderNavbar() {
  const { folders, setFolders, folderStorage, setFolderStorage } =
    useContext(AppContext);

  const [toggle, setToggle] = useState("");
  const [showStorage, setShowStorage] = useState(false);
  const [filesCount, setFilesCount] = useState({
    images: [],
    pdfs: [],
  });

  // Use to get the folders from the database and set it to the state.
  useEffect(() => {
    getFolders(setFolders);
    setTimeout(() => {
      getStorageSize(folders, setFolderStorage);
    }, 1000);
  }, [folderStorage]); // if the folder storage is updated, then the code will rerun inside

  return (
    <>
      <div className={`${styles.foldersNav}`}>
        <div className="flex flex-col justify-start items-end fixed bottom-3 right-3 z-100">
          <div
            className={`${
              showStorage ? "block" : "hidden"
            } bg-white text-slate-900 p-8 rounded-lg w-fit`}
            onMouseLeave={() => setShowStorage(false)}
          >
            <p className="text-slate-900 mb-4">
              Storage - {folderStorage} GB / 5 GB
            </p>
            <button
              className="bg-red-500 text-slate-100 px-4 py-2 rounded-full"
              onClick={() => setShowStorage(false)}
            >
              Close
            </button>
          </div>
          <Button
            className="text-center mt-2 text-sm bg-slate-700 text-white px-4 py-2 rounded-xl"
            onMouseEnter={() => {
              getStorageSize(folders, setFolderStorage, setFilesCount);
              setShowStorage(true);
            }}
          >
            Get Storage
          </Button>
        </div>

        <FolderHeader toggle={toggle} setToggle={setToggle} />

        <FolderBlock toggle={toggle} setToggle={setToggle} />
      </div>
    </>
  );
}

FolderNavbar.propTypes = {
  toggle: PropTypes.string,
  setToggle: PropTypes.func,
};

export default FolderNavbar;
