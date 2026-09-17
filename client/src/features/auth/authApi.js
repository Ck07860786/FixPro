import api from '../../services/api';

export const registerCustomer = async(data)=>{
    try {

        const response = await api.post('/auth/register/customer',data)
        return response.data;
        
    } catch (error) {
        throw new Error(
      error.response?.data?.message || "Customer registration failed"
    );
        
    }

}

export const registerBusiness = async(data)=>{
    try {
        const response = await api.post('/auth/register/business',data)
        return response.data;
    } catch (error) {
        throw new Error(
      error.response?.data?.message || "Business registration failed"
    );
    }
}

export const loginUser = async(data)=>{
    try {

        const response = await api.post('/auth/login',data)

        return response.data;
        
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Login Failed"
        )
    }
}

export const changePassword = async (data) => {
  try {
    const response = await api.put('/auth/change-password', data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to change password"
    );
  }
};
