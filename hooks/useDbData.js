'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch collection data from MongoDB via API.
 * Falls back to the provided static data if the API fails or returns empty.
 * 
 * @param {string} collection - The MongoDB collection name
 * @param {Array} fallbackData - Static data to use as fallback
 * @returns {{ data: Array, loading: boolean }}
 */
export function useDbData(collection, fallbackData = []) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/data?collection=${collection}`)
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data && result.data.length > 0) {
          setData(result.data);
        }
        // If empty or failed, keep the fallback data
      })
      .catch(err => {
        console.error(`Failed to fetch ${collection} from DB, using static data`, err);
      })
      .finally(() => setLoading(false));
  }, [collection]);

  return { data, loading };
}
