import { AiOutlineFolderAdd } from "react-icons/ai";
import { CgSearchLoading } from "react-icons/cg";
import Button from '@/components/atoms/Button';
import FolderForm from "./FolderForm";
import Search from "@/molecules/Search";

function FolderHeader({ toggle, setToggle }) {
    const handleToggleAdd = () => {
        setToggle(toggle === "" || toggle === "SEARCH" ? "ADD" : "");
    };

    const handleToggleSearch = () => {
        setToggle(toggle === "" || toggle === "ADD" ? "SEARCH" : "");
    };

    return (
        <div className="w-full fixed top-18 md:top-20 flex flex-col z-100 py-3 bg-gradient-to-r from-black via-gray-900 to-slate-800 -ml-6">
            <div className="flex justify-around">
                <Button onClick={handleToggleAdd}>
                    <AiOutlineFolderAdd className="text-2xl md:text-4xl" color="rgb(255,255,255,0.8)" />
                </Button>
                <Button onClick={handleToggleSearch}>
                    <CgSearchLoading className="text-2xl md:text-4xl" color="rgb(255,255,255,0.8)" />
                </Button>
            </div>
            <div className={`flex justify-center ${toggle === "ADD" || toggle === "SEARCH" ? "mt-3" : ""}`}>
                {toggle === "ADD" && <FolderForm setToggle={setToggle} />}
                {toggle === "SEARCH" && <Search />}
            </div>
        </div>
    );
}

export default FolderHeader;
