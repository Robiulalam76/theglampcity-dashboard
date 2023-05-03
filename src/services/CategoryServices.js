import Cookies from "js-cookie";
import requests from "./httpService";

// const { token, _id } = Cookies.get('adminInfo') ? JSON.parse(Cookies.get('adminInfo')) : null
// console.log(token);

const CategoryServices = {
  getAllCategory() {
    return requests.get("/category/getAllCategories/byRole");
  },

  getCategoryById(id) {
    return requests.get(`/category/${id}`);
  },

  addCategory(body) {
    return requests.post("/category/add", body);
  },

  updateCategory(id, body) {
    return requests.put(`/category/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.put(`/category/status/${id}`, body);
  },

  deleteCategory(id, body) {
    return requests.patch(`/category/${id}`, body);
  },
};

export default CategoryServices;
