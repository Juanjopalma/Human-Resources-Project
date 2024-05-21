import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {NumericFormat} from "react-number-format";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {RhContext} from "../../../context/rhContext.jsx";

export const ListadoEmpleados = () => {

    const urlBase = "http://localhost:8080/users-app/users";

    const [empleados, setEmpleados] = useState([]);
    const { token } = useContext(RhContext);

    const cargarEmpleados = async () => {

        const config = {
            headers: {
                Authorization: token
            }
        };

        try {
            const resultado = await axios.get(urlBase, config);
            setEmpleados(resultado.data);
        } catch (error) {
            console.error("Error al cargar empleados:", error);
        }
    }

    const deleteEmployee = async (id) => {
        const config = {
            headers: {
                Authorization: token
            }
        };

        try {
            await axios.delete(`${urlBase}/${id}`, config);
            cargarEmpleados();

    } catch (error) {
            console.log("Error al eliminar empleado: ", error);
        }
    }

    const deactiveEmployee = async (id) => {
        const config = {
            headers: {
                Authorization: token
            }
        };

        try {
            await axios.put(`${urlBase}/${id}/deactivate`, null, config);
            cargarEmpleados();

        } catch (error) {
            console.log("Error al eliminar empleado: ", error);
        }
    }

    useEffect(() => {
        if (token) {
            cargarEmpleados();
        }
    }, [token]);

    return (
        <div className="container">
            <div className="text-center" style={{margin: "30px"}}>
                <h3 className="text-center">Human Resources System</h3>
            </div>

            <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Employee</th>
                        <th scope="col">Departament</th>
                        <th scope="col">Salary</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {
                    empleados.map((empleado, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{empleado.user_id}</th>
                                <td>{empleado.fullname}</td>
                                <td>{empleado.department}</td>
                                <td>
                                    <NumericFormat
                                        value={empleado.salary}
                                        displayType={'text'}
                                        thousandSeparator=','
                                        prefix={'$'}
                                        decimalScale={2}
                                        fixedDecimalScale
                                    />
                                </td>
                                <td className="text-center">
                                    <div>
                                        <Link to={`/editar/${empleado.user_id}`}
                                              className="btn btn-warning btn-sm me-3"
                                        >Edit</Link>

                                        <Button onClick={() => deactiveEmployee(empleado.user_id)}
                                              className="btn btn-secondary btn-sm me-3"
                                        >Deactivate</Button>

                                        <Button onClick={() => deleteEmployee(empleado.user_id)}
                                              className="btn btn-danger btn-sm me-3"
                                        >Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
};