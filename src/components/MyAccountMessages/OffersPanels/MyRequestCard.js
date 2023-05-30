import { AuthContext } from '@/ContextAPI/AuthProvider';
import { setCartItems } from '@/Slices/controllerSlice';
import DeleteModal from '@/components/Modals/DeleteModal';
import { Button, ButtonGroup } from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const MyRequestCard = ({ data, refetch }) => {
    const { user } = useContext(AuthContext)
    const [product, setProduct] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch(`http://localhost:5055/api/products/${data?.productId}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
            })
    }, [data?.productId])


    const handleRefetch = () => {
        refetch && refetch()
    }


    // get all cart products
    const handleGetCartProducts = () => {
        fetch(`http://localhost:5055/api/cartProduct/${user?._id}`)
            .then(res => res.json())
            .then(data => {
                dispatch(setCartItems(data));
            })
    }


    const handleUpdateOffer = () => {
        handleGetCartProducts()
        const updateData = {
            status: "true"
        }
        if (data?.status === "false" && data?.approved === "true") {
            fetch(`http://localhost:5055/api/offer/${data?._id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(updateData)
            })
                .then(res => res.json())
                .then(data => {
                    refetch && refetch()
                })
        }
    }


    const handleAddCart = () => {
        const addCartProduct = {
            productId: product?._id,
            userId: user?._id,
            title: product?.title,
            description: product?.description,
            price: data?.price,
            images: product?.images,
        }
        if (data?.status === "false" && data?.approved === "true") {

            fetch(`http://localhost:5055/api/cartProduct`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(addCartProduct)
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.status === "success") {
                        handleUpdateOffer()
                    }
                })
        }
    }


    return (
        <div className='flex flex-col justify-between bg-white h-fit'>
            <img className='h-28 object-cover' src={product?.images[0]} alt="" />
            <div className='p-1'>
                <h1 className='text-black font-bold text-xl'>{product?.title}</h1>
                <p>Quantity: {data?.quantity}</p>
                <p>Amount: {data?.price}</p>
                <ButtonGroup className='py-1'>
                    {
                        data?.requestType === "store" ? <Button onClick={() => setDeleteModal(data?.status === "false" && true)}
                            className={`py-2 
                        ${data?.status === "true" ? "bg-blue-gray-600 text-white" : "bg-red-600"}`}>Cancel</Button>
                            :
                            <Button onClick={() => setDeleteModal(data?.status === "false" && true)} className="bg-red-600 py-2" >Delete</Button>
                    }
                    {
                        data?.approved === "true" ? <Button onClick={() => handleAddCart()}
                            className={`py-2 ${data?.status === "true" ? "bg-blue-gray-600 text-white" : "bg-primary"}`}>
                            {
                                data?.status === "true" ? "Cart Added" : "Add Cart"
                            }
                        </Button>
                            :
                            <Button className="bg-primary py-2">Wait for Approve</Button>
                    }
                </ButtonGroup>
            </div>


            {
                deleteModal && <DeleteModal open={deleteModal} close={setDeleteModal}
                    endpoint={`offer/${data?._id}`} refetch={handleRefetch} />
            }

        </div>
    );
};

export default MyRequestCard;