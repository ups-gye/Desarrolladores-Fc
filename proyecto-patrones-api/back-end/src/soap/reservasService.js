
const { habitacion_service, hotel_service, reserva_service, usuario_service } = require('../services');
const service = {
    ReservasService: {
        ReservasPort: {
            // Métodos para Hoteles
            CrearHotel(args) {
                return hotel_service.crearHotel(args)
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },
            ObtenerHoteles() {
                return hotel_service.obtenerHoteles()
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },
            ActualizarHotel(args) {
                return hotel_service.actualizarHotel(args)
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },
            EliminarHotel(args) {
                return hotel_service.eliminarHotel(args.id)
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },

            // Métodos para Habitaciones
            CrearHabitacion(args) {
                return habitacion_service.crearHabitacion(args)
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },
            ObtenerHabitaciones(args) {
                return habitacion_service.habitaciones(args.hotel_id)
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },
            ActualizarHabitacion(args) {
                return habitacion_service.actualizarHabitacion(args.id)
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },
            EliminarHabitacion(args) {
                return habitacion_service.eliminarHabitacion(args.id)
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },
            // Métodos para Reservas
            CrearReserva(args) {
                return reserva_service.crearReserva(args)
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },
            ObtenerReservas() {
                return reserva_service.obtenerReservas()
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },
            ActualizarReserva(args) {
                return reserva_service.actualizarReserva(args)
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },
            EliminarReserva(args) {
                return reserva_service.eliminarReserva(args.id)
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },

            // Métodos para Usuarios
            CrearUsuario(args) {
                return usuario_service.crearUsuario(args)
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },
            ObtenerUsuarios() {
                return usuario_service.obtenerUsuarios()
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },
            ActualizarUsuario(args) {
                return usuario_service.actualizarUsuario(args)
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },
            EliminarUsuario(args) {
                return usuario_service.eliminarUsuario(args.id)
                    .then(confirmation => {
                        return { confirmation };
                    }).catch(err => {
                        throw new Error(err.message);
                    });
            },

        }
    }
};

module.exports = service;
