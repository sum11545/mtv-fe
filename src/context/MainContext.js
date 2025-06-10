import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import createAxiosInstance from "../configs/axios";

const MainContext = createContext();

export const useMain = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMain must be used within a MainProvider");
  }
  return context;
};

export const MainProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axiosInstance = createAxiosInstance();
  const [contentConfigurations, setContentConfigurations] = useState(null);

  // This api contains configuration based on content type
  useEffect(() => {
    const getContentConfiguration = async () => {
      try {
        const response = await axiosInstance.get(`/contentConfigurations`);
        setContentConfigurations(response.data.response.data);
        return response;
      } catch (err) {
        console.log({ err });
        throw err;
      }
    };

    getContentConfiguration();
  }, []);

  const fetchHomePageData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/homePageContents`);
      return response;
    } catch (err) {
      console.log({ err });
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const fetchSectionPageData = async (sectionName) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/sectionPage/${sectionName}`);
      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const fetchVideoDetailPageData = async (sectionName, videoId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(
        `/contentDetailPage/${sectionName}/${videoId}`
      );
      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const fetchShortDetailPageData = async (videoId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/shorts/${videoId}`);
      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const value = {
    loading,
    error,
    fetchHomePageData,
    fetchSectionPageData,
    fetchVideoDetailPageData,
    contentConfigurations,
    fetchShortDetailPageData,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContext;
