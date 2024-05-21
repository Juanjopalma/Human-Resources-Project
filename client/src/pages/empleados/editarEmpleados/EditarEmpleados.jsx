import React, {useContext, useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {RhContext} from "../../../context/rhContext.jsx";

export const EditarEmpleados = ({empleado, setEmpleado}) => {

    const { token } = useContext(RhContext);
    let navigate = useNavigate();

    const urlBase = "http://localhost:8080/users-app/users";

    const {id} = useParams();

    const cargarEmpleado = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`);
        setEmpleado(resultado.data);
    }

    useEffect(() => {
        cargarEmpleado();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEmpleado({...empleado, [name]:value})
    }

    const updateEmployee = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: token
            }
        };

        await axios.put(`${urlBase}/${id}`, empleado, config)

        navigate("/");
    }

    return (
        <div className="container">
            <div className="container" style={{margin: "30px"}}>
                <h3 className="text-center">Edit Employee</h3>

                <form>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            name="fullname"
                            onChange={handleChange}
                            value={empleado.fullname}
                            required={true}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="departamento" className="form-label">Departmment</label>
                        <input
                            type="text"
                            className="form-control"
                            id="departamento"
                            name="department"
                            onChange={handleChange}
                            value={empleado.department}
                            required={true}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sueldo" className="form-label">Salary</label>
                        <input
                            type="number"
                            step="any"
                            className="form-control"
                            id="sueldo"
                            name="salary"
                            onChange={handleChange}
                            value={empleado.salary}
                            required={true}
                        />
                    </div>

                    <div className="text-center">
                        <button onClick={updateEmployee} className="btn btn-warning btn-sm me-3">Edit</button>
                        <Link to="/" className="btn btn-danger btn-sm">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
