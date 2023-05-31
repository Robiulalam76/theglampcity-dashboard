import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ProductImageCorousel from '../cards/ProductImageCorousel';

const SelectProductForOffer = ({ storeId, handleSelectProduct }) => {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5055/api/products/store/show/${storeId}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [])


    return (
        <div className='p-2 max-w-[700px] max-h-[700px]'>
            <h1 className='font-bold text-left text-xl text-black'>Please Select Product</h1>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 h-full w-full overflow-y-auto scrollBar cursor-pointer'>
                {
                    products?.map(product => (
                        <div className="border border-gray-600/20 bg-white" id='box-shadow' >
                            <div className='relative w-64 md:w-auto h-32 mx-auto overflow-hidden bg-slate-200 group'>
                                <ProductImageCorousel images={product?.images} />
                            </div>

                            <div onClick={() => handleSelectProduct(product?._id)} className="grid grid-cols-1 gap-2 p-3">
                                <div className="flex flex-col-reverse justify-start lg:flex-row lg:items-center lg:justify-between">
                                    <h1 className="flex-grow font-bold text-gray-800">{product?.title.slice(0, 30)}</h1>
                                    <h1 className='font-bold text-orange-600 text-xl'>${product?.price}</h1>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default SelectProductForOffer;