export const postTypesService = {
  fetchPostTypes: async () => {
    const response = await fetch('/api/post-types');

    if (!response.ok) {
      throw new Error('Failed to fetch post types');
    }

    const data = await response.json();
    return data.data as string[];
  }
};
