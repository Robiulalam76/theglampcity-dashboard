import React, { useContext } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Button,
  Input,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { FiPlus } from "react-icons/fi";

import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import Loading from "../components/preloader/Loading";
import { SidebarContext } from "../context/SidebarContext";
import PageTitle from "../components/Typography/PageTitle";
import CategoryServices from "../services/CategoryServices";
import CategoryTable from "../components/category/CategoryTable";
import SelectCategory from "../components/form/SelectCategory";
import MainDrawer from "../components/drawer/MainDrawer";
import CategoryDrawer from "../components/drawer/CategoryDrawer";
import ParentStore from "../components/category/ParentStore";
import StoreDrawer from "../components/drawer/StoreDrawer";
import NewStoreDrawer from "../components/drawer/NewStoreDrawer";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Store = () => {
  // const { toggleDrawer } = useContext(SidebarContext);
  const { open, setOpen } = useContext(SidebarContext);
  const [store, setStore] = useState([])
  const { data, loading } = useAsync(CategoryServices.getAllCategory);
  const {
    categoryRef,
    setFilter,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitCategory,
  } = useFilter(data);

  console.log(store);

  useEffect(async () => {
    const res = await axios.get('http://localhost:5055/api/store');
    setStore(res.data)
  }, [])

  return (
    <>
      <PageTitle> Stores </PageTitle>

      {/* <MainDrawer>
        <StoreDrawer />
      </MainDrawer> */}

      {
        open && <NewStoreDrawer></NewStoreDrawer>
      }

      <p>Dihan Abir</p>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitCategory}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={() => setOpen(!open)} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Store
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitCategory}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Store
              </Button>
            </div>
          </form>
        </CardBody>
      </Card> */}

      {loading ? (
        <Loading loading={loading} />
      ) : serviceData.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>ID</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>Store</TableCell>
                <TableCell>Store Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell className="text-center">Published</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <CategoryTable categories={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Category" />
      )}
    </>
  );
};

export default Store;
