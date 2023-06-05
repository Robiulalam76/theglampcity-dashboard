import React from 'react';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';
import { TableCell, TableBody, TableRow, Select } from '@windmill/react-ui';

import Status from '../table/Status';
import { FiEye } from 'react-icons/fi';
import Tooltip from '../tooltip/Tooltip';
import SelectStatus from '../form/SelectStatus';

const OrderTable = ({ orders, getProducts, storeId }) => {


  const handleUpdateStaus = (input, storeId, orderId) => {
    fetch(`http://localhost:5055/api/order/update/status/${storeId}/${orderId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ shippingStatus: input })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        getProducts && getProducts(storeId)
      })
  }
  return (
    <>
      <TableBody>
        {orders && orders?.map((order, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{i + 1}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {dayjs(order.createdAt).format('MMM D, YYYY')}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{order.address.address.substring(0, 25)}</span>
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm">{order.address?.mobileNumber}</span>{' '}
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">
                {order.paymentMethod}
              </span>
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm font-semibold">
                ${Math.round(order.totalPayment)}.00
              </span>{' '}
            </TableCell>
            {/* <TableCell className="text-xs">
              <Status status={order.status} />
            </TableCell> */}
            <TableCell className="">
              <Select
                onChange={(e) => handleUpdateStaus(e.target.value, order?.store, order?._id)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option selected={order?.shippingStatus === "shopping soon"} value="shopping soon">shopping soon</option>
                <option selected={order?.shippingStatus === "shipped"} value="shipped">shipped</option>
                <option selected={order?.shippingStatus === "out for delivery"} value="out for delivery">out for delivery</option>
                <option selected={order?.shippingStatus === "delivered"} value="delivered">delivered</option>
              </Select>
            </TableCell>
            <TableCell className="flex justify-center">
              <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                {/* {' '} */}
                <Link to={`/orders/${order._id}`}>
                  <Tooltip
                    id="view"
                    Icon={FiEye}
                    title="View Invoice"
                    bgColor="#34D399"
                  />
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
