import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

const Uploader = ({ setImageUrl, imageUrl }) => {
  const [files, setFiles] = useState([]);
  // const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL;
  // const upload_Preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

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
    // console.log(e);
    const image = e
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload?key=932ae96b4af949bccda61ebea8105393", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.data.url) {
        setImageUrl([...imageUrl, data.data.url])
      }
    } catch (error) {
      console.error(error);
    }
  };


  console.log("Image urls", imageUrl);

  useEffect(() => {
    for (let i = 0; i < files.length; i++) {
      handleImageUpload(files[i])
    }
  }, [files])

  console.log(files);








  // useEffect(async () => {
  //   const uploadURL = uploadUrl;
  //   const uploadPreset = upload_Preset;
  //   console.log("files Forned ", files);






  // if (files) {
  //   files.forEach((file) => {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     console.log("files: ", file);
  //     formData.append("upload_preset", uploadPreset);
  //     axios({
  //       url: uploadURL,
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       data: formData,
  //     })
  //       .then((res) => {
  //         // setImageUrl(
  //         //   "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  //         // );
  //         setImageUrl(res.data.secure_url);
  //       })
  //       .catch((err) => console.log(err));
  //   });
  // }
  // if (files) {
  //   files.forEach(async (file) => {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     console.log("files Frnt: ", file);
  //     // formData.append("upload_preset", uploadPreset);
  //     // formData.append("upload_preset", file);
  //     console.log("formData", formData);
  //     await axios({
  //       // url: uploadURL,
  //       url: "http://localhost:5055/api/uploadaws/upload",
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       data: file,
  //     })
  //       .then((res) => {
  //         console.log("Response form backend ", res);
  //         // setImageUrl(
  //         //   "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  //         // );
  //         // setImageUrl(res.data.secure_url);
  //       })
  //       .catch((err) => console.log("Backend error: ", err));
  //     console.log("Done");
  //   });
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [files]);

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
        {imageUrl ? <>
          {
            imageUrl?.map((image, i) => (
              <img key={i}
                className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2"
                src={image}
                alt="product"
              />
            ))
          }
        </> : (
          thumbs
        )}
      </aside>


      {/* <aside className="flex flex-row flex-wrap mt-4">
        {imageUrl ? (
          <img
            className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2"
            src={imageUrl}
            alt="product"
          />
        ) : (
          thumbs
        )}
      </aside> */}
    </div>
  );
};

export default Uploader;
