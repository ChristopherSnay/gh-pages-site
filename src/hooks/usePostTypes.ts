import { useEffect, useState } from 'react';
import { postTypesService } from '../services/local-only/postTypesService';
import { staticPostTypesService } from '../services/staticPostTypesService';

const isDev = import.meta.env.MODE === 'development';

export default function usePostTypes() {
  const [postTypes, setPostTypes] = useState<string[]>([]);
  const [postTypesLoading, setPostTypesLoading] = useState<boolean>(false);
  const [postTypesError, setPostTypesError] = useState<string | null>(null);

  const fetchPostTypes = async () => {
    setPostTypesLoading(true);
    setPostTypesError(null);
    try {
      const response = isDev
        ? await postTypesService.fetchPostTypes()
        : await staticPostTypesService.fetchPostTypes();

      setPostTypes(response);
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
