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
import useCategorySubmit from "../../hooks/useCategorySubmit";
import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import Drawer from "rc-drawer";
import { FiX } from 'react-icons/fi';
import axios from "axios";
import { useEffect } from "react";

const NewStoreDrawer = ({ id }) => {
    const { open, setOpen } =
        useContext(SidebarContext);
    // console.log(useCategorySubmit(id));  
    const {
        register,
        // handleSubmit,
        onSubmit,
        errors,
        imageUrl,
        setImageUrl,
        children,
        setChildren,
    } = useCategorySubmit(id);

    const handleSubmit = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const description = event.target.description.value
        const address = event.target.address.value

        const newStore = { name, description, address }

        axios.post('http://localhost:5055/api/store', {
            name: name, description: description, address: address
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <>
            <Drawer
                open={open}
                onClose={open}
                parent={null}
                level={null}
                placement={'right'}
            >
                <button
                    onClick={() => setOpen(false)}
                    className="absolute focus:outline-none z-50 text-red-500 hover:bg-red-100 hover:text-gray-700 transition-colors duration-150 bg-white shadow-md mr-6 mt-6 right-0 left-auto w-10 h-10 rounded-full block text-center"
                >
                    <FiX className="mx-auto" />
                </button>

                <div className="flex flex-col w-full h-full justify-between">
                    <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {id ? (
                            <Title
                                title="Update"
                                description="Updated your Product category and necessary information from here"
                            />
                        ) : (
                            <Title
                                title="Add"
                                description=" Add your Product category and necessary information from here"
                            />
                        )}
                    </div>
                    <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
                        <form onSubmit={handleSubmit}>
                            <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
                                <div class="md:flex md:items-center mb-6">
                                    <div class="md:w-1/3">
                                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                            Name
                                        </label>
                                    </div>
                                    <div class="md:w-2/3">
                                        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" name="name" placeholder="Name" required />
                                    </div>
                                </div>
                                <div class="md:flex md:items-center mb-6">
                                    <div class="md:w-1/3">
                                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                            address
                                        </label>
                                    </div>
                                    <div class="md:w-2/3">
                                        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" name="address" placeholder="address" required />
                                    </div>
                                </div>


                                <div class="md:flex md:items-center mb-6">
                                    <div class="md:w-1/3">
                                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                            description
                                        </label>
                                    </div>
                                    <div class="md:w-2/3">
                                        <textarea class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" name="description" placeholder="description" required />
                                    </div>
                                </div>




                                <div class="md:flex md:items-center">
                                    <div class="md:w-1/3"></div>
                                    <div class="md:w-2/3">
                                        <button type='submit' class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                            Add Store
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* <DrawerButton id={id} title="Category" /> */}
                        </form>
                    </Scrollbars>
                </div>
            </Drawer>

        </>
    );
};

export default NewStoreDrawer;
