import { useCallback, useState } from "react";
import { Alert } from "react-native";

const API_URL = "http://192.168.35.43:5001/api";

export const useTransaction = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchTransaction = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.log("error occur", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.log("error occur", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    setLoading(true);
    if (!userId) return;
    try {
      await Promise.all([fetchTransaction(), fetchSummary()]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [fetchSummary, fetchTransaction, userId]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete transaction");

      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      Alert.alert("Error deleteing",error);
      console.log(error);
    }
  };


  return {transactions,summary,loading,loadData,deleteTransaction}
};
