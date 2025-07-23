import React from "react";
import { useFetchContent } from "../../hooks/useFetchContent";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useFetchContent();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse p-4 border rounded shadow">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!isLoading && error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-2">Gagal memuat konten.</p>
        <button onClick={() => refetch()} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Coba Lagi
        </button>
      </div>
    );
  }

  const { articles = [], videos = [] } = data?.data || {};

  return (
    <div className="p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Artikel</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {articles.map((item) => (
          <Card key={item.id} title={item.title} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Video</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((item) => (
          <Card key={item.id} title={item.title} />
        ))}
      </div>
      <button
        onClick={handleLogout}
        className={`flex-1 p-2 rounded bg-red-500 text-white hover:bg-red-600 transition mt-4 flex-end`}
      >
        Logout
      </button>
    </div>
  );
}

function Card({ title }) {
  return (
    <div className="p-4 border rounded shadow hover:shadow-md transition">
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
}
