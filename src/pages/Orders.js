import React from 'react';
import { CSVDownloader } from 'react-papaparse';
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Card,
  CardBody,
  Pagination,
} from '@windmill/react-ui';
import { IoCloudDownloadOutline } from 'react-icons/io5';

import orderData from '../utils/orders';
import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import NotFound from '../components/table/NotFound';
import OrderServices from '../services/OrderServices';
import Loading from '../components/preloader/Loading';
import OrderTable from '../components/order/OrderTable';
import PageTitle from '../components/Typography/PageTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import StoreServices from '../services/StoreServices';
import Cookies from 'js-cookie';

const Orders = () => {
  const [stores, setStores] = useState([])

  const [loading, setLoading] = useState(false)
  const [storeId, setStoreId] = useState("")
  const [orders, setOrders] = useState([]);

  const getProducts = (id) => {
    setLoading(true)
    fetch(`http://localhost:5055/api/order/store/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    getProducts(stores[0]?._id)
  }, [stores]);

  const handleSetStoreId = (id) => {
    setStoreId(id)
    getProducts(id)
  }

  // const {
  //   orderRef,
  //   setStatus,
  //   setTime,
  //   handleChangePage,
  //   totalResults,
  //   resultsPerPage,
  //   dataTable,
  //   serviceData,
  //   handleSubmitOrder,
  // } = useFilter(data);

  const adminInfo = Cookies.get('adminInfo')
    ? JSON.parse(Cookies.get('adminInfo')) : null

  useEffect(() => {
    fetch(`http://localhost:5055/api/store/getAllStores/byrole`, {
      headers: {
        authorization: `Bearer ${adminInfo?.token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setStores(data));
  }, []);


  return (
    <>
      <PageTitle>Orders</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            // onSubmit={handleSubmitOrder}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:grid-cols-4 xl:grid-cols-4"
          >

            <div>
              <Select
                onChange={(e) => handleSetStoreId(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                {
                  stores?.map(store => <option value={store?._id}>{store.name}</option>)
                }
              </Select>
            </div>
            <div>
              <Select
                onChange={(e) => handleUpdateStaus(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="Status" defaultValue hidden>
                  Status
                </option>
                <option value="shopping soon">shopping soon</option>
                <option value="shipped">shipped</option>
                <option value="out for delivery">out for delivery</option>
                <option value="delivered">delivered</option>
              </Select>
            </div>
            <div>
              {/* <Select
                // onChange={(e) => setTime(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="Order limits" defaultValue hidden>
                  Order limits
                </option>
                <option value="5">Last 5 days orders</option>
                <option value="7">Last 7 days orders</option>
                <option value="15">Last 15 days orders</option>
                <option value="30">Last 30 days orders</option>
              </Select> */}
            </div>
            <div>
              <CSVDownloader data={orderData} filename={'orders'}>
                <button className="flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium focus:outline-none px-6 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-auto">
                  Download all Orders
                  <span className="ml-2 text-base">
                    <IoCloudDownloadOutline />
                  </span>
                </button>
              </CSVDownloader>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : orders.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>SR NO</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Shipping Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell >Status</TableCell>
                {/* <TableCell className="text-center">Action</TableCell> */}
                <TableCell>Invoice</TableCell>
              </tr>
            </TableHeader>
            <OrderTable orders={orders} getProducts={getProducts} storeId={storeId} />
          </Table>
          {/* <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter> */}
        </TableContainer>
      ) : (
        <NotFound title="Order" />
      )}
    </>
  );
};

export default Orders;
