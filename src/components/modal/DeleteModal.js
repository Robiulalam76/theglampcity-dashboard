import React, { useEffect, useRef } from "react";

export default function DeleteModal({ open, close, endpoint, refetch }) {

    const confirm = () => {
        fetch(`http://localhost:5055/api/${endpoint}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                refetch && refetch()
                close(false);
            })
        close(false);
    }

    let modalRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!modalRef?.current?.contains(e.target)) {
                close && close(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });

    return (
        <>
            {
                open && <div className='z-50 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-primary bg-opacity-25 w-full h-full cursor-pointer'>
                    <div ref={modalRef} className={`w-80 md:w-96 h-fit bg-white shadow-xl p-5 m-5 zoom-in`}>
                        <div>
                            <div className="flex flex-col items-center gap-2">
                                {/* <TrashIcon className="text-red-600 w-8" /> */}
                                <h1 className="text-center font-bold text-xl">Are You Sure?</h1>
                            </div>
                            <p className="text-sm font-sans text-gray-600 text-center mt-4">Do You Really Want to Delete these Records? This proccess cannot be undone.</p>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => close(false)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Cancel
                            </button>
                            <button onClick={() => confirm()}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Delete
                            </button>
                        </div>
                    </div >
                </div >
            }
        </>
    );
}