import { apiService } from '../../services/apiService';

export default function AdminPage() {
  const fetchData = async () => {
    const data = await apiService.getHello();
    console.log(data);
  };

  fetchData();

  return (
    <div className="container my-4">
      <h1>Admin Page</h1>
    </div>
  );
}
