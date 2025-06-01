import { Axios } from "../utils/axiosInstance";

export const fetchCurrentUser = async () => {
    try {
        const res = await Axios.get('user/decodeCookie',{withCredentails:true})
        return res.data
    } catch (error) {
        throw error;
    }
}

export const registerUser = async(email,name,password) => {
    try {
        const res = await Axios.post('/user/register',{
            email,
            name,
            password
        })
        return res.data;
    } catch (error) {
        console.error('Register error:',error);
        throw error;
    }
}

export const loginUser = async(email,password,rememberMe) => {
    try {
      const response = await Axios.post('/user/login',{   
        email,
        password,
        rememberMe,
      })
      return response.data;
    } catch (error) {
      console.error('Login Error: ',error);
      throw error;
    }
}

export const logoutUser = async() => {
  try {
    const res = await Axios.delete('/user/logout',{withCredentials:true});
    return res.data;
  } catch (error) {
    throw error;
  }
}
export const updateName = async(id, newName) => {
  try {
    const res = await Axios.patch('/user/updateName',{
      id,
      newName
    })
    return res.data;
  }catch (error) {
    console.error('Update Name error:',error);
    throw error;
  }
}

export const updateEmail = async (id, newEmail) => {
  try {
    const res = await Axios.patch('/user/updateEmail', {
      id,
      newEmail
    });
    return res.data;
  } catch (error) {
    console.error('Update Email error:', error);
    throw error;
  }
};

export const updatePassword = async (id, currentPassword, newPassword) => {
  try {
    const res = await Axios.patch('/user/updatePassword', {
      id,
      currentPassword,
      newPassword
    });
    return res.data;
  } catch (error) {
    console.error('Update Password error:', error);
    throw error;
  }
};

