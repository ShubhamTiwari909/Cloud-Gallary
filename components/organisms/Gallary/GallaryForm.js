import React, { useState, useContext, useEffect } from "react";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";
import styles from "@/styles/Form.module.css";
import InputGroup from "@/components/atoms/InputGroup";
import { handleUpload } from "../../../firebase/Gallary/GallaryUpload";
import { addImageToDB, getData } from "../../../firebase/Gallary/dbOperations";
import { AppContext } from "../../Context";
import Link from "next/link";
import Para from "@/components/atoms/text/Para";
import Button from "@/components/atoms/Button";
import Search from "@/components/molecules/Search";
import { CgSearchLoading } from "react-icons/cg";

function GallaryForm({ folderName }) {
  const { setImages, setOverlay } = useContext(AppContext);

  const [file, setFile] = useState([]);
  const [url, setUrl] = useState([]);
  const [success, setSuccess] = useState(0);
  const [successUpload, setSuccessUpload] = useState(false);
  const [targetFiles, setTargetFiles] = useState([]);
  const [toggleUpload, setToggleUpload] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [disableFormClose, setDisableFormClose] = useState(false);

  useEffect(() => {
    const Files = [...file];
    Files.forEach((element) => {
      element.percent = 0;
    });
    setTargetFiles(Files);
  }, [file]);

  const isOpenSearch = () => setOpenSearch((prevOpenSearch) => !prevOpenSearch);

  const handleUploadClick = (e) => {
    addImageToDB(e, url, setUrl, folderName, setSuccessUpload);
    setTimeout(() => {
      getData(setImages, folderName);
    }, 1000);
    setSuccess(0);
    setTargetFiles([]);
    setOverlay(false);
    setToggleUpload(false);
    setDisableFormClose(false);
  };

  const handleAddToCloudClick = (e) => {
    if (targetFiles.length !== 0) {
      handleUpload(e, targetFiles, folderName, setUrl, setSuccess);
    }
    setDisableFormClose(true);
  };

  const handleCancelButtonClick = () => {
    setToggleUpload(false);
    setOverlay(false);
  };

  return (
    <>
      <Para
        className={`fixed top-0 -ml-4 w-full text-center py-3 bg-green-500 text-white ${
          successUpload ? "" : "hidden"
        }`}
      >
        Files Uploaded Successfully
      </Para>
      <div className="w-full fixed top-18 md:top-20 flex gap-4 justify-end md:justify-center flex-wrap z-102 py-2.5 md:py-4 px-2 bg-gradient-to-r from-black via-gray-900 to-slate-800 -ml-4">
        <Link
          href="/folders/navigation"
          className="fixed left-1.5 top-19 md:top-24 z-102 text-slate-800 flex gap-2 items-center px-4 py-2 rounded-full bg-slate-100 text-sm"
        >
          <RxDoubleArrowLeft size="1rem" />
        </Link>
        <form className="flex gap-4 justify-center items-center flex-wrap">
          <InputGroup
            type="file"
            className={styles.input_file}
            onChange={(e) => {
              setFile(e.target.files);
              if (targetFiles.length < 21) {
                setOverlay(true);
                setToggleUpload(true);
              } else {
                alert("Please Select not more than 20 files");
              }
            }}
            labelClassname={styles.file_label}
            title="Upload File"
            name="file"
            placeholder=""
            accept="image/*,application/pdf"
          />
        </form>
        <button
          className="px-4 py-1 border border-white rounded-md"
          onClick={isOpenSearch}
        >
          <CgSearchLoading color="#ffffff" size="1.4rem" />
        </button>
        <div
          className={`justify-center w-full ${openSearch ? "flex" : "hidden"}`}
        >
          <Search />
        </div>
      </div>

      <div
        className={`fixed right-0 top-2/4 -translate-y-2/4 px-6 pt-3 rounded-xl bg-white h-3/4 z-105 ${
          toggleUpload ? "block" : "hidden"
        }`}
      >
        <Para className="text-slate-700 mb-2">Files Uploaded: {success}</Para>
        <div className="overflow-auto h-3/4 space-y-4 mb-3 w-52 md:w-96 max-w-sm">
          {targetFiles ? (
            targetFiles.map((item) => (
              <div key={item.name} className="">
                <Para className="text-ellipse">
                  {item.name === undefined ? (
                    <span></span>
                  ) : (
                    item.name.slice(0, 60)
                  )}
                </Para>
                <Para
                  className={`mt-1 flex justify-center items-center rounded-lg bg-green-500 h-5 text-white text-center text-sm`}
                  style={{ width: `${item.percent}%` }}
                >
                  {item.percent}%
                </Para>
              </div>
            ))
          ) : (
            <span></span>
          )}
        </div>
        <div className="flex gap-2 lg:gap-5">
          <Button
            className={`${styles.button_sm} ${
              [...file].length === success
                ? styles.button_purple
                : "bg-slate-400"
            }`}
            onClick={handleUploadClick}
            disabled={[...file].length === success ? undefined : "disabled"}
          >
            {[...file].length === success ? "Upload" : "Waiting..."}
          </Button>
          <Button
            className={`${styles.button_sm} ${
              [...file].length === success
                ? "bg-gray-600 ml-4 cursor-none"
                : styles.button_purple
            }`}
            onClick={handleAddToCloudClick}
            disabled={[...file].length === success ? "disabled" : undefined}
          >
            {[...file].length === success ? "Added" : "Add to Cloud"}
          </Button>
        </div>

        <Button
          onClick={handleCancelButtonClick}
          className={`absolute top-2 right-2 ${
            disableFormClose ? "hidden pointer-events-none" : ""
          }`}
          disabled={disableFormClose ? "disabled" : undefined}
        >
          <AiOutlineClose size="1rem" />
        </Button>
      </div>
    </>
  );
}

GallaryForm.propTypes = {
  folderName: PropTypes.string.isRequired,
};

export default GallaryForm;
