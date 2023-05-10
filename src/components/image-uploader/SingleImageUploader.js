import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

const SingleImageUploader = ({ setImageUrl, imageUrl }) => {
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: false,
        maxSize: 500000,
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });


    const handleImageUpload = async (e) => {
        const formData = new FormData();
        formData.append("image", e);

        try {
            const response = await fetch("https://api.imgbb.com/1/upload?key=932ae96b4af949bccda61ebea8105393", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.data.url) {
                setImageUrl(data.data.url)
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        for (let i = 0; i < files.length; i++) {
            handleImageUpload(files[i])
        }
    }, [files])


    const thumbs = files.map((file) => (
        <div key={file.name}>
            <div>
                <img
                    className="inline-flex border-2 border-gray-100 w-24 max-h-24"
                    src={file.preview}
                    alt={file.name}
                />
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <div className="w-full text-center">
            <div
                className="px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer"
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <span className="mx-auto flex justify-center">
                    <FiUploadCloud className="text-3xl text-green-500" />
                </span>
                <p className="text-sm mt-2">Drag your image here</p>
                <em className="text-xs text-gray-400">
                    (Only *.jpeg and *.png images will be accepted)
                </em>
            </div>

            <aside className="flex flex-row flex-wrap mt-4">
                {thumbs}
            </aside>
        </div>
    );
};

export default SingleImageUploader;
