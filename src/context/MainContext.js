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
  const fetchHomePageData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/homePageContents`);
      return response;
    } catch (err) {
      console.log({ err });
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
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
      throw err;
    } finally {
      setLoading(false);
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
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchShortDetailPageData = async (sectionName, videoId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(
        `/shorts/${sectionName}/${videoId}`
      );
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchSideBarData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/publicMenus`);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    error,
    fetchHomePageData,
    fetchSectionPageData,
    fetchVideoDetailPageData,
    fetchShortDetailPageData,
    fetchSideBarData,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContext;
