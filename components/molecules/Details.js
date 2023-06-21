import { RxCross1 } from "react-icons/rx";
import Para from "../atoms/text/Para";
import Button from "../atoms/Button";

function Details({ details, detailPopup, setDetailPopup, setOverlay }) {
    const handleClosePopup = () => {
        setDetailPopup(false);
        setOverlay(false);
    };

    return (
        <div className={`w-72 md:w-96 fixed absolute-center z-106 mt-2 bg-white p-4 rounded-lg ${detailPopup ? "" : "hidden"}`}>
            {details.map((detail, index) => (
                <div key={index}>
                    {detail.button ? (
                        detail.button
                    ) : (
                        <Para className="text-sm md:text-lg font-semibold mb-2 text-black">
                            {detail.name}: <span className="text-slate-700">{detail.value}</span>
                        </Para>
                    )}
                </div>
            ))}
            <Button className="text-sm absolute top-2 right-2" onClick={handleClosePopup}>
                <RxCross1 size="16px" color="crimson" />
            </Button>
        </div>
    );
}

export default Details;
