import { useState, useEffect, useMemo } from 'react';
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from "../../components/Table";
import { getReservas } from '../../query/soap.query';

export default function Reservas() {
    const [reservas, setReservas] = useState([]);
    const editable = true;
    const onNewClick = () => {
        console.log("Nuevo");
        // setTitleModal("Nuevo Miembro");
        // setIsModalOpen(true);
    };
    const onEditClick = (item) => {
        console.log(item);
        // setTitleModal("Editar Miembro");
    };
    const onRemoveClick = (items) => {
        console.log(items);
    };
    const handleRowSelected = (selectedRows) => {
        console.log(selectedRows);
        //getMiembrosSeleccionados(selectedRows);
    };
    const handleModificarClick = (miembro) => {
        // setModalMiembro(miembro); // Almacena los datos del socio seleccionado en el estado del modal
        // setShowModalMiembro(true); // Muestra el modal
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await getReservas();
            const reservas = response.map((reserva) => {
                return {
                    id: reserva.id,
                    email: reserva.Usuario.email,
                    nombres_usuario: reserva.Usuario.nombre + " " + reserva.Usuario.apellido,
                    fecha_entrada: reserva.fecha_entrada,
                    fecha_salida: reserva.fecha_salida,
                    estado: reserva.estado,
                    estaActivo: reserva.Usuario.estaActivo,
                    numero_habitacion: reserva.Habitacion.numero,
                };
            });
            console.log(reservas);
            setReservas(reservas);
        };
        fetchData();
    }, []);
    const columns = useMemo(() => {
        const headers = [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Habitación",
                accessor: "numero_habitacion",
            },
            {
                Header: "Usuario",
                accessor: "nombres_usuario",
                emailAccessor: "email",
                filter: "includes",
                Filter: SelectColumnFilter,
            },
            {
                Header: "Email",
                accessor: "email",
                filter: "includes",
                //Filter: SelectColumnFilter,
            },
            {
                Header: "Fecha Entrada",
                accessor: "fecha_entrada",
                //Filter: SelectColumnFilter,
                filter: "includes",
            },
            {
                Header: "Fecha Salida",
                accessor: "fecha_salida",
                //Filter: SelectColumnFilter,
                filter: "includes",
            },
            {
                Header: "Estado",
                accessor: "estado",
                Cell: StatusPill,
                Filter: SelectColumnFilter,
                filter: "includes",
            },
            {
                Header: "Acción",
                accessor: "action",
                Cell: ({ row }) => {
                    if (!editable) {
                        return (<a className="text-sm" href={`/miembros/${row.original.cedula}`}>
                            DETALLES
                        </a>);
                    }
                    if (row.original.estaActivo === -2) {
                        return (
                            <a className="text-sm" href={`/admin/pagos/plan/${row.original.secuencial}`}>
                                PAGAR
                            </a>
                        );
                    } else {
                        return (
                            <a className="text-sm" onClick={() => handleModificarClick(row.original)}>
                                MODIFICAR
                            </a>
                        );
                    }

                }
            }
        ];
        return headers.filter((item) => item !== null);
    }, []);

    return (
        <div>
            <Table columns={columns}
                data={reservas}
                search={true}
                editable={editable}
                onNew={onNewClick}
                onEdit={onEditClick}
                onRemove={onRemoveClick}
                onSelected={handleRowSelected} />
        </div>
    );
}