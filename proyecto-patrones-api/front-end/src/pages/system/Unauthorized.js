export default function Unauthorized() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">No autorizado</h2>
                <p className="text-red-500">No tienes permisos para acceder a esta página.</p>
            </div>
        </div>
    );
}