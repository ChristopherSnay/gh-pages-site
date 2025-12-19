import { useEffect, useState } from 'react';

export default function useAdminPostTypes() {
  const [postTypes, setPostTypes] = useState<string[]>([]);
  const [postTypesLoading, setPostTypesLoading] = useState<boolean>(false);
  const [postTypesError, setPostTypesError] = useState<string | null>(null);

  const fetchPostTypes = async () => {
    setPostTypesLoading(true);
    setPostTypesError(null);
    try {
      const response = await fetch('/api/post-types');
      if (!response.ok) {
        throw new Error('Failed to fetch post types');
      }
      const data = await response.json();
      setPostTypes(data.data);
    } catch (error: any) {
      setPostTypesError(error.message);
    } finally {
      setPostTypesLoading(false);
    }
  };

  useEffect(() => {
    fetchPostTypes();
  }, []);

  return { postTypes, postTypesLoading, postTypesError, fetchPostTypes };
}
