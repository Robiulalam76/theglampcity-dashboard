import React, { useContext } from 'react';
import { TableBody, TableRow, TableCell, Avatar, Badge } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import ShowHideButton from '../table/ShowHideButton';
import CategoryDrawer from '../drawer/CategoryDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';
import { AdminContext } from '../../context/AdminContext';
import { useState } from 'react';
import StoreDrawer from '../drawer/StoreDrawer';

const StoreTable = ({ stores }) => {
    const { serviceId, handleModalOpen } = useToggleDrawer();
    const { user } = useContext(AdminContext);
    const [openDrawer, setOpenDrawer] = useState(false)
    const [store, setStore] = useState({})
    const handleUpdate = (data) => {
        setOpenDrawer(true)
        setStore(data)
    }

    return (
        <>

            <StoreDrawer store={store} setStore={setStore} openDrawer={openDrawer} closeDrawer={setOpenDrawer} />
            <MainModal id={serviceId} />
            {/* <MainDrawer>
                <CategoryDrawer id={serviceId} />
            </MainDrawer> */}

            <TableBody>
                {stores?.map((store) => (
                    <TableRow key={store?._id}>
                        <TableCell className="font-semibold uppercase text-xs">
                            {store?._id.substring(20, 24)}
                        </TableCell>
                        <TableCell>
                            <Avatar
                                className="hidden mr-3 md:block bg-gray-50 p-1"
                                src="https://media.istockphoto.com/id/912819604/vector/storefront-flat-design-e-commerce-icon.jpg?s=612x612&w=0&k=20&c=_x_QQJKHw_B9Z2HcbA2d1FH1U1JVaErOAp2ywgmmoTI="
                                alt={store?.name}
                            />
                        </TableCell>

                        {/* <TableCell className="font-medium text-sm">
                            <div className="flex flex-row">
                                {store?.children?.map((child, i) => (
                                    <span
                                        key={i + 1}
                                        className="bg-gray-200 mr-2 border-0 text-gray-500 rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold font-serif mt-2 dark:bg-gray-700 dark:text-gray-300"
                                    >
                                        {child}
                                    </span>
                                ))}
                            </div>
                        </TableCell> */}


                        {/* {store?.children.length} */}
                        {/* {store?.type} */}

                        <TableCell className="text-sm ">{store?.name}</TableCell>
                        <TableCell>
                            {store.verified ? (
                                <Badge type="success">Verified</Badge>
                            ) : (
                                <Badge type="danger">unverified</Badge>
                            )}
                        </TableCell>
                        <TableCell className="text-sm">Type</TableCell>

                        <TableCell>
                            <ShowHideButton id={store?._id} status={store?.status} />
                        </TableCell>


                        <TableCell>
                            <EditDeleteButton
                                store={store}
                                handleUpdate={handleUpdate}
                                handleModalOpen={handleModalOpen}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};

export default StoreTable;
