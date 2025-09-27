import { apiService } from '../../services/api-service';

export default function DevPage() {
  const fetchData = async () => {
    const data = await apiService.getHello();
    console.log(data);
  };

  fetchData();

  return (
    <div>
      <h1>Development Page</h1>
    </div>
  );
}
