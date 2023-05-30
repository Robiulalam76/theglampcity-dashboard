import ProductImageCorousel from '@/components/ProductCards/ProductImageCorousel';
import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const SelectProductForOffer = ({ handleSelectProduct }) => {
    const [products, setProducts] = useState(null)

    // 644a46a61d99756b22d24e76

    useEffect(() => {
        fetch(`http://localhost:5055/api/products/show/all`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [])

    console.log(products);
    const handleCreateOffer = (data) => {
        console.log(data);
    }

    return (
        <div className='p-2 max-h-[700px]'>
            <h1 className='font-bold text-left text-xl text-black'>Please Select Product</h1>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-[500px] max-h-[500px] overflow-y-auto scrollBar cursor-pointer'>
                {
                    products?.map(product => (
                        <div onClick={() => handleSelectProduct(product?._id)} className="border border-gray-600/20 bg-white" id='box-shadow' >
                            <div className='relative w-full h-32 overflow-hidden bg-slate-200 group'>
                                <ProductImageCorousel images={product?.images} />
                            </div>

                            <div className="grid grid-cols-1 gap-2 p-3">
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