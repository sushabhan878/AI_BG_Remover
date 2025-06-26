import { useState, createContext } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
const AppContext = createContext();
const AppContextProvider = (props) => {
  /// Constants
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  /// Get Data from other fils
  const { getToken } = useAuth();
  /// States
  const [credit, setCredit] = useState(false);

  /// Use Effects

  /// Handling Function
  const loadCreditsData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backend_url + "/api/user/credits", {
        headers: { token },
      });
      if (data.success) {
        setCredit(data.credits);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const value = {};
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
