export default function AdminUnauthorizedErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="mb-8 text-lg text-gray-300">Must enter address as below and correctly</p>
      <a href="/admin-login" className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition">http://localhost:3000/admin-login/?secret-key="admin secret key"</a>
    </div>
  );
} 