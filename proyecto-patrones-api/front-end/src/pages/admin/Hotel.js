import { useState, useEffect } from 'react';
import { getHotelById } from '../../query/graphql.query';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Íconos de estrellas
import ErrorMessage from '../../components/error.message';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

// Componente para mostrar estrellas
const StarRating = ({ stars }) => {
    const fullStars = Math.floor(stars);
    const halfStar = stars % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center space-x-1">
            {Array(fullStars).fill(0).map((_, index) => (
                <FaStar key={`full-${index}`} className="text-yellow-400" />
            ))}
            {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
            {Array(emptyStars).fill(0).map((_, index) => (
                <FaRegStar key={`empty-${index}`} className="text-gray-400" />
            ))}
        </div>
    );
};
// Componente para seleccionar estrellas
const StarSelector = ({ selectedStars, onChange }) => {
    return (
        <div className="flex items-center space-x-1">
            {Array(5).fill(0).map((_, index) => (
                <button
                    key={`star-${index}`}
                    type="button"
                    onClick={() => onChange(index + 1)} // Selecciona la calificación
                    className="focus:outline-none"
                >
                    {index < selectedStars ? (
                        <FaStar className="text-yellow-400" />
                    ) : (
                        <FaRegStar className="text-gray-400" />
                    )}
                </button>
            ))}
        </div>
    );
};


export default function Hotel() {
    const [hoteles, setHoteles] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth(); // Obtener el usuario y la función de login 
    const navigate = useNavigate();
    const backgroundImageUrl = 'https://images.unsplash.com/photo-1529290130-4ca3753253ae?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    useEffect(() => {
        const fetchHoteles = async () => {
            try {
                const data = await getHotelById(1);
                setHoteles(data);
            } catch (err) {
                setError(err.message || 'Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchHoteles();
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        setHoteles({ ...hoteles, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!hoteles.nombre || !hoteles.descripcion) {
            alert('Por favor completa los campos obligatorios');
            return;
        }
        console.log('Datos actualizados:', hoteles); // Aquí agregarías la lógica de actualización real
        handleCloseModal();
    };

    if (loading) return <div className="text-center text-2xl mt-10">Cargando...</div>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div>
            <div className="flex-1 bg-gray-100">
                <div
                    className="relative h-full w-full bg-cover bg-center text-white rounded-lg overflow-hidden flex justify-center items-center"
                    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-60"></div>

                    <div className="relative z-10 p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto h-[calc(90vh-4rem)] flex flex-col justify-center">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            {hoteles.nombre}
                        </h1>

                        <div className="flex items-center space-x-4 mb-8">
                            <StarRating stars={hoteles.estrellas} />
                            <span className="text-base sm:text-lg">{hoteles.estrellas} estrellas</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 text-sm sm:text-lg">
                            <p><strong>Descripción:</strong> {hoteles.descripcion}</p>
                            <p><strong>Dirección:</strong> {hoteles.direccion}</p>
                            <p><strong>País:</strong> {hoteles.pais}</p>
                            <p><strong>Ciudad:</strong> {hoteles.ciudad}</p>
                            <p><strong>Teléfono:</strong> {hoteles.telefono}</p>
                            <p><strong>Email:</strong> {hoteles.email}</p>
                            {user && user.rol === 'admin' && (
                                <button
                                    onClick={handleOpenModal}
                                    className="mt-8 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition w-full sm:w-auto"
                                >
                                    Editar Datos
                                </button>
                            )}

                        </div>

                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Editar Hotel">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={hoteles.nombre || ''}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Descripción</label>
                        <textarea
                            name="descripcion"
                            value={hoteles.descripcion || ''}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border rounded px-3 py-2 mt-1"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={hoteles.direccion || ''}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-3">Estrellas</label>
                        <StarSelector
                            selectedStars={hoteles.estrellas || 0}
                            onChange={(value) => setHoteles({ ...hoteles, estrellas: value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">País</label>
                            <input
                                type="text"
                                name="pais"
                                value={hoteles.pais || ''}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Ciudad</label>
                            <input
                                type="text"
                                name="ciudad"
                                value={hoteles.ciudad || ''}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 mt-1"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </Modal>

        </div>

    );
}
