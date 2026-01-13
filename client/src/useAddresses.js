import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Authurl } from "./assets/api";

export default function useAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = useCallback(async () => {
    try {
      const res = await axios.get(`${Authurl}/address`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAddresses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch addresses", err);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return { addresses, loading, refresh: fetchAddresses };
}
