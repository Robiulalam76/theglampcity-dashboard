import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import ProductServices from "../services/ProductServices";
import { notifyError, notifySuccess } from "../utils/toast";

const useProductSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState([]);
  const [children, setChildren] = useState("");
  const [tag, setTag] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // if (!imageUrl) {
    //   notifyError("Image is required!");
    //   return;
    // }
    if (data.originalPrice < data.salePrice) {
      notifyError("SalePrice must be less then or equal of product price!");
      return;
    }

    const productData = {
      title: data.title,

      titleSlug: data.titleSlug ? data.titleSlug.toLowerCase().replace("&", "").split(" ").join("-")
        : data.title.toLowerCase().replace("&", "").split(" ").join("-"),

      description: data.description,
      storeName: data.store,
      parent: data.parent,
      slug: data.parent && data.parent.toLowerCase().replace("&", "").split(" ").join("-"),
      originalPrice: data.originalPrice,
      price: data.salePrice ? data.salePrice : data.originalPrice,
      children: data.children,
      children_slug: data?.children.toLowerCase().replace("&", "").split(" ").join("-"),

      discount: data.salePrice > 0 &&
        ((data.originalPrice - data.salePrice) / data.originalPrice) * 100,
      images: imageUrl,

      tag: JSON.stringify(tag),

      // type: data.type,
      // unit: data.unit,
      // quantity: data.quantity,
      // sku: data.sku,
      // image:
      //   "https://images.unsplash.com/photo-1657299156537-2fd96dc2446e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    };

    console.log("product data from form: ", productData);

    if (id) {
      ProductServices.updateProduct(id, productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      ProductServices.addProduct(productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("sku");
      setValue("title");
      setValue("slug");
      setValue("description");
      setValue("parent");
      setValue("children");
      setValue("type");
      setValue("unit");
      setValue("quantity");
      setValue("originalPrice");
      setValue("salePrice");
      setImageUrl("");
      setChildren("");
      setTag([]);
      clearErrors("sku");
      clearErrors("title");
      clearErrors("slug");
      clearErrors("description");
      clearErrors("parent");
      clearErrors("children");
      clearErrors("type");
      clearErrors("unit");
      clearErrors("quantity");
      clearErrors("originalPrice");
      clearErrors("salePrice");
      clearErrors("tax1");
      clearErrors("tax2");
      return;
    }

    if (id) {
      ProductServices.getProductById(id)
        .then((res) => {
          if (res) {
            setValue("sku", res.sku);
            setValue("title", res.title);
            setValue("slug", res.slug);
            setValue("description", res.description);
            setValue("parent", res.parent);
            setValue("children", res.children);
            setValue("type", res.type);
            setValue("unit", res.unit);
            setValue("quantity", res.quantity);
            setValue("originalPrice", res.originalPrice);
            setValue("salePrice", res.price);
            setTag(JSON.parse(res.tag));
            setImageUrl(res.image);
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  useEffect(() => {
    setChildren(watch("children"));
  }, [watch, children]);

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
  };
};

export default useProductSubmit;
