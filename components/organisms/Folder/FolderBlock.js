import { useContext } from "react";
import Link from "next/link";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { searchFilter } from "../../../methods/SearchFilter";
import styles from '@/styles/Gallary.module.css';
import { AppContext } from '../../Context';
import FolderSettings from "./FolderSettings";

function FolderBlock({ toggle, setToggle }) {
  const { folders, search } = useContext(AppContext);

  const filteredFolders = folders.filter((folder) => searchFilter(folder, search));

  return (
    <ul className={`${styles.foldersList} ${toggle ? "mt-16 md:mt-24" : "mt-5 md:mt-10"}`}>
      {folders.length === 0 ? (
        <h2 className="text-center text-3xl md:text-6xl lg:text-9xl">No Folders</h2>
      ) : (
        filteredFolders.map(({ id, folderName, folderUrl, createdAt, color }) => (
          <li key={id} className={`${styles.folderLink} relative`} style={{ backgroundColor: color }}>
            <Link href={{
              pathname: `/folders/${folderUrl}`,
              query: {
                folderName: folderName
              }
            }} className={`text-black flex gap-4 items-center`}>
              <AiTwotoneFolderOpen color="rgb(50,10,100,0.9)" size="20px" /> {folderName.slice(0, 10)}
            </Link>
            <FolderSettings
              id={id}
              folderName={folderName}
              folderUrl={folderUrl}
              createdAt={createdAt}
              setToggle={setToggle}
            />
          </li>
        ))
      )}
    </ul>
  );
}

export default FolderBlock;
