import React, { createContext, useState, useEffect, useContext } from "react";
import {
  saveLikedFormSubmission,
  fetchLikedFormSubmissions,
} from "../service/mockServer";

// Create a context
const ListContext = createContext();

// Create a provider component
export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLists = async () => {
    setLoading(true);
    try {
      const response = await fetchLikedFormSubmissions();
      if (response.status === 200) setLists(response.formSubmissions);
      else setError(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const addList = async (newList) => {
    try {
      const response = await saveLikedFormSubmission(newList);
      if (response.status === 202) fetchLists();
      else setError(response);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <ListContext.Provider
      value={{ lists, loading, error, addList, fetchLists }}
    >
      {children}
    </ListContext.Provider>
  );
};

// Custom hook to use the ListContext
export const useListContext = () => {
  return useContext(ListContext);
};
