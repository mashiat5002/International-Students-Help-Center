export default function UnauthorizedErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="mb-8 text-lg text-gray-300">You must be logged in to view this page.</p>
      <a href="/" className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition">Go to Homepage</a>
    </div>
  );
} 