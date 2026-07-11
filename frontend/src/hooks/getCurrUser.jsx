import { useEffect } from "react";
import axios from "axios";
import { serverURL } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

function getCurrUser() {
    
    const dispatch = useDispatch()
  useEffect(() => {
    const fetchCurrUser = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/user/me`,
          {
            withCredentials: true,
          }
        );

        dispatch(setUserData(result.data))
        
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchCurrUser();
  }, []);
}

export default getCurrUser;