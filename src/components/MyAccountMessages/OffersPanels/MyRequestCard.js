import React, { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../../context/MessageContext';
import { Button } from '@windmill/react-ui';
import DeleteModal from '../../modal/DeleteModal';

const MyRequestCard = ({ data, refetch }) => {
    const { store } = useContext(MessageContext)
    const [product, setProduct] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:5055/api/products/${data?.productId}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
            })
    }, [data?.productId])

    const handleApprove = () => {
        fetch(`http://localhost:5055/api/offer/${data?._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ approved: "true" })
        })
            .then(res => res.json())
            .then(data => {
                refetch && refetch()
            })
    }


    return (
        <div className='flex flex-col justify-between bg-white h-64 border' >
            <img className='h-24 w-24 mx-auto object-cover' src={product?.images[0]} alt="" />
            <div className='p-1'>
                <h1 className='text-black font-bold text-xl'>{product?.title}</h1>
                <p>Quantity: {data?.quantity}</p>
                <p>Amount: {data?.price}</p>
                <div className='py-1'>
                    {
                        data?.requestType === "store" && <Button onClick={() => setDeleteModal(data?.status === "false" && true)}
                            className="bg-red-600 py-2" >Delete</Button>
                    }
                    {
                        data?.approved === "true" ? <Button
                            className={`py-2 ${data?.status === "true" ? "bg-blue-gray-600 text-white" : "bg-primary"}`}>
                            {
                                data?.status === "true" ? "Cart Added" : "Accepted"
                            }
                        </Button>
                            :
                            <Button onClick={() => handleApprove()} className="bg-primary py-2">Approve</Button>
                    }
                </div>
            </div>


            {
                deleteModal && <DeleteModal open={deleteModal} close={setDeleteModal}
                    endpoint={`offer/${data?._id}`} refetch={refetch} />
            }

        </div>
    );
};

export default MyRequestCard;