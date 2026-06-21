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

// export const createCustomer = (customer) => api.post("/auth/admin/create-customer", customer);
// export const createCustomer = (customer) => api.post("/admin/customers", customer);

// export const searchCustomer = (name) => api.get(`/customers/search?name=${name}`);

// export const searchCustomer = (keyword) => api.get(`/customers/search?keyword=${keyword}`);

export const searchCustomer = (name) =>
    api.get(`/customers/search?name=${name}`);

// export const searchCustomer = (name) => api.get(`/api/customers/search?name=${name}`);

// export const createCustomer = (data) => api.post("/api/admin/customers", data);

export const createCustomer = (data) =>
    api.post("/admin/customers", data);

export const getPayments = () =>
  api.get("/payments");

export const getCustomerPayments = (customerId) =>
  api.get(`/payments/customer/${customerId}`);


// export const uploadDocument = (
//   customerId,
//   file
// ) => {

//   const formData = new FormData();

//   formData.append("file", file);

//   return api.post(
//     `/documents/upload/${customerId}`,
//     formData,
//     {
//       headers: {
//         "Content-Type":
//           "multipart/form-data"
//       }
//     }
//   );
// };

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
