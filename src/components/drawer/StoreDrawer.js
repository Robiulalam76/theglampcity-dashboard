import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import ReactTagInput from "@pathofdev/react-tag-input";

import Error from "../form/Error";
import Title from "../form/Title";
import InputArea from "../form/InputArea";
import LabelArea from "../form/LabelArea";
import SelectOption from "../form/SelectOption";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useStoreSubmit from "../../hooks/useStoreSubmit";
import Drawer from "rc-drawer";
import { FiX } from "react-icons/fi";
import { Button } from "@windmill/react-ui";
import { useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useContext } from "react";
import StoreServices from "../../services/StoreServices";
import { notifyError, notifySuccess } from "../../utils/toast";

const StoreDrawer = ({ store, setStore, openDrawer, closeDrawer }) => {
  const { user } = useContext(AdminContext);
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    children,
    setChildren,
    setIsUpdate
  } = useStoreSubmit(store?._id);



  const [logoFile, setLogoFile] = useState([])
  const [imageFiles, setImageFiles] = useState([])

  const uploadImagesToImageBB = async (files) => {
    let images = []
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch('https://api.imgbb.com/1/upload?key=932ae96b4af949bccda61ebea8105393', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      images.push(data?.data?.url)
    }
    return images
  };


  const handleGetInputData = async (event) => {
    event.preventDefault();
    const form = event.target;

    if (logoFile) {
      const images = await uploadImagesToImageBB(imageFiles)
      const logo = await uploadImagesToImageBB(logoFile)
      const data = {
        name: form.name.value,
        username: form.name.value,
        street: form.street.value,
        city: form.city.value,
        country: form.country.value,
        postalCode: form.postalCode.value,
        email: form.email.value,
        description: form.description.value,
        userId: user?._id,
        logo: logo[0],
        images: images,
        verified: false
      };
      if (store && store?._id) {
        fetch(`http://localhost:5055/api/store/update/${store?._id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            setIsUpdate(true);
            notifySuccess(res.message);
            form.reset()
            setLogoFile([])
            setImageFiles([])
            setStore({})
            closeDrawer(false)
          })
          .catch((err) => {
            setIsUpdate(true);
            notifyError(err.message);
            setLogoFile([])
            setImageFiles([])
            setStore({})
            closeDrawer(false)
          });
      }
      else {
        fetch(`http://localhost:5055/api/store`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            setIsUpdate(true);
            notifySuccess(res.message);
            form.reset()
            setLogoFile([])
            setImageFiles([])
            closeDrawer(false)
          })
          .catch((err) => {
            setIsUpdate(true);
            notifyError(err.message);
            setLogoFile([])
            setImageFiles([])
            closeDrawer(false)
          });
      }


    }
  };

  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => closeDrawer(false)}
        parent={null}
        level={null}
        placement={'right'}
      >
        <button
          onClick={() => closeDrawer(false)}
          className="absolute focus:outline-none z-50 text-red-500 hover:bg-red-100 hover:text-gray-700 transition-colors duration-150 bg-white shadow-md mr-6 mt-6 right-0 left-auto w-10 h-10 rounded-full block text-center"
        >
          <FiX className="mx-auto" />
        </button>

        <div className="flex flex-col w-full h-full justify-between">


          <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {store?._id ? (
              <Title
                title="Update Store"
                description="Updated your Store and necessary information from here"
              />
            ) : (
              <Title
                title="Add Store"
                description=" Add your Store and necessary information from here"
              />
            )}
          </div>

          <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
            <form onSubmit={handleGetInputData}>
              <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">

                <div className="flex flex-col">
                  <div className="w-full flex justify-end items-center mb-2">
                    {
                      logoFile && logoFile?.map(file => (
                        <img className="pe-2" style={{ width: "70px" }} src={URL.createObjectURL(file)} alt="" />
                      ))
                    }
                  </div>
                  <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        Logo
                      </label>
                    </div>
                    <div class="flex justify-center items-center border border-dashed border-blue-900 md:w-2/3 relative">
                      <input onChange={(e) => setLogoFile([e.target.files[0]])} class="opacity-0 absolute w-full h-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="file" placeholder="Name" />
                      <h1>Upload Logo</h1>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="w-full flex justify-end items-center mb-2">
                    {
                      imageFiles && imageFiles?.map(file => (
                        <img className="pe-2" style={{ width: "70px" }} src={URL.createObjectURL(file)} alt="" />
                      ))
                    }
                  </div>
                  <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        Images
                      </label>
                    </div>
                    <div class="flex justify-center items-center border border-dashed border-blue-900 md:w-2/3 relative">
                      <input onChange={(e) => setImageFiles([...imageFiles, e.target.files[0]])} class="opacity-0 absolute w-full h-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="file" />
                      <h1>Upload Logo</h1>
                    </div>
                  </div>
                </div>

                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                      Name
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="name" type="text" placeholder="Name" defaultValue={store?.name} required />
                  </div>
                </div>

                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                      City
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="city" type="text" placeholder="Enter city" defaultValue={store?.city} required />
                  </div>
                </div>

                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                      Street
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="street" type="text" placeholder="Enter street" defaultValue={store?.street} required />
                  </div>
                </div>

                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                      Country
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="country" type="text" placeholder="Enter country" defaultValue={store?.country} required />
                  </div>
                </div>

                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                      postal Code
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="postalCode" type="number" placeholder="Enter postal Code" defaultValue={store?.postalCode} required />
                  </div>
                </div>

                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                      Email
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="email" type="email" placeholder="Enter Email" defaultValue={store?.email} required />
                  </div>
                </div>

                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                      description
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <textarea class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" name="description" placeholder="description" defaultValue={store?.description} required />
                  </div>
                </div>




                <div class="md:flex md:items-center">
                  <div class="md:w-1/3"></div>
                  <div class="md:w-2/3">
                    <button type='submit' class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                      {
                        store?._id ? "Update Store" : "Add Store"
                      }
                    </button>
                  </div>
                </div>
              </div>

              {/* <DrawerButton id={id} title="Store" /> */}
            </form>
          </Scrollbars>
        </div>
      </Drawer>
    </>
  );
};

export default StoreDrawer;
