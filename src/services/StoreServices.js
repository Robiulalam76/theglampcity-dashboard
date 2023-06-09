import requests from "./httpService";

const StoreServices = {
  getAllStore() {
    return requests.get("/store/getAllStores/byRole");
  },

  getStoreById(id) {
    return requests.get(`/category/${id}`);
  },
  updateStoreStatus(id, body) {
    return requests.put(`/store/status/${id}`, body);
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

export default StoreServices;
