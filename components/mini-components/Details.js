import { RxCross1 } from "react-icons/rx"

function Details({ details, detailPopup, setDetailPopup, setOverlay }) {

    return (
        <div className={`${detailPopup ? "" : "hidden"} w-72 md:w-96 fixed absolute-center z-101 mt-2 bg-white p-4 rounded-lg`
        }>
            {details.map(detail => {
                return (
                    <>
                        {detail.button ?
                            detail.button
                            :
                            <p className='text-sm md:text-lg font-semibold mb-2 text-black'>
                                {detail.name}: <span className='text-slate-700'>{detail.value}</span>
                            </p>
                        }
                    </>
                )
            })}
            <button className='text-sm absolute top-2 right-2' onClick={() => {
                setDetailPopup(false)
                setOverlay(false)
            }}>
                <RxCross1 size="16px" color='crimson' />
            </button>
        </div >
    )
}

export default Details