import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import CategoryServices from "../services/CategoryServices";
import { notifyError, notifySuccess } from "../utils/toast";

const useStoreSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  );
  const [children, setChildren] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ parent, type }) => {
    // if (!imageUrl) {
    //   notifyError("Icon is required!");
    //   return;
    // }
    const categoryData = {
      parent: parent,
      // slug: slug,
      type: type,
      icon: "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      children: children,
    };

    if (id) {
      CategoryServices.updateCategory(id, categoryData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      CategoryServices.addCategory(categoryData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setIsUpdate(true);
          notifyError(err.message);
        });
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("parent");
      // setValue("slug");
      setValue("children");
      setValue("type");
      setImageUrl("");
      setChildren([]);
      clearErrors("parent");
      // setValue("slug");
      clearErrors("children");
      clearErrors("type");
      return;
    }
    if (id) {
      CategoryServices.getCategoryById(id)
        .then((res) => {
          if (res) {
            setValue("parent", res.parent);
            // setValue("slug", res.slug);
            setChildren(res.children);
            setValue("type", res.type);
            setValue("icon", res.icon);
            setImageUrl(res.icon);
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    children,
    setChildren,
  };
};

export default useStoreSubmit;
