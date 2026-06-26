import axios from "axios";

//const api = axios.create({ baseURL: "http://localhost:8080/api" });
const api = axios.create({ baseURL: "http://192.168.0.65:8080/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup = (data) => api.post("/auth/signup", data);
export const login  = (data) => api.post("/auth/login",  data);

export const getCustomer    = (id)       => api.get(`/customers/${id}`);
export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data);

export const searchCustomer = (name) =>
    api.get(`/customers/search?name=${name}`);

export const createCustomer = (data) =>
    api.post("/admin/customers", data);

export const getPayments = () =>
  api.get("/payments");

export const getCustomerPayments =
  (customerId) =>
    api.get(
      `/payments/customer/${customerId}`
    );

export const uploadDocuments = (
  customerId,
  files
) => {

  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append(
      "files",
      files[i]
    );
  }

  return api.post(
    `/documents/upload/${customerId}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data"
      }
    }
  );
};

export const getDocuments = (
  customerId
) =>
  api.get(
    `/documents/customer/${customerId}`
  );

export const deleteDocument = (
  documentId
) =>
  api.delete(
    `/documents/${documentId}`
  );

export const getCustomerStage = (customerId) =>
  api.get(`/stages/customer/${customerId}`);

export const getCustomerPhotos = (customerId) =>
  api.get(`/photos/customer/${customerId}`);

export const getCustomerMaterials = (customerId) =>
  api.get(`/materials/customer/${customerId}`);

export const downloadDocument = (documentId) =>
  `${"http://localhost:8080/api"}/documents/download/${documentId}`;

export const getDashboardStats = () =>
  api.get("/dashboard/stats");

export const deactivateCustomer = (id) =>
  api.put(`/customers/${id}/deactivate`);

export const getInactiveCustomers = () =>
  api.get("/customers/inactive");

export const activateCustomer = (id) =>
  api.put(`/customers/${id}/activate`);


export const updatePayment = (
  id,
  payment
) =>
  api.put(
    `/payments/${id}`,
    payment
  );

export const deletePayment = (
  id
) =>
  api.delete(
    `/payments/${id}`
  );

export const addPayment = (payment) =>
  api.post("/payments", payment);

export const updateStage = (
  customerId,
  stageId
) =>
  api.put(
    `/stages/${customerId}`,
    {
      stageId: Number(stageId)
    }
  );

export const deletePhoto = (id) =>
  api.delete(`/photos/${id}`);

export const filterPayments = (
  customerId,
  fromDate,
  toDate
) =>
  api.get(
    "/payments/filter",
    {
      params: {
        customerId,
        fromDate,
        toDate
      }
    }
  );

export const uploadPhotos =
  (customerId, files) => {

    const formData =
      new FormData();

    files.forEach(file => {
      formData.append(
        "files",
        file
      );
    });

    return api.post(
      `/photos/upload/${customerId}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );
  };

export const addMaterial = (material) =>
  api.post("/materials", material);

export const updateMaterial = (
  id,
  material
) =>
  api.put(
    `/materials/${id}`,
    material
  );

export const deleteMaterialApi = (
  id
) =>
  api.delete(
    `/materials/${id}`
  );

export const getStages = () =>
  api.get("/stages");

export const deletePaymentApi = (id) =>
  api.delete(`/payments/${id}`);
