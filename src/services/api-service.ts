export const apiService = {
  getHello: async () => {
    const response = await fetch('/api/test');
    return response.json();
  },
};
