import { useState, createContext } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();
const AppContextProvider = (props) => {
  /// Constants
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  /// Get Data from other fils
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  /// States
  const [credit, setCredit] = useState(false);
  const [image, setImage] = useState(false);
  const [resultImg, setResultImg] = useState(false);
  /// Use Effects

  /// Handling Function
  const loadCreditsData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backend_url + "/api/user/credits", {
        headers: { token },
      });
      if (data.success) {
        console.log(data.credits);
        setCredit(data.credits);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeBg = async (image) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }
      setImage(image);
      setResultImg(false);
      navigate("/result");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = {
    backend_url,
    credit,
    setCredit,
    loadCreditsData,
    image,
    setImage,
    removeBg,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
