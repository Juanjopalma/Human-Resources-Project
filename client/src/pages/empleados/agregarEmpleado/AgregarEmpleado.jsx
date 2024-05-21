import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const initialValue = {
    fullname: "",
    department: "",
    salary: ""
}

export const AgregarEmpleado = ({empleado, setEmpleado}) => {

    let navigate = useNavigate();

    const urlAddEmployee = "http://localhost:8080/users-app/users"

    useEffect(() => {
        setEmpleado(initialValue);
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEmpleado({...empleado, [name]:value})
    }

    const addEmployee = async (e) => {
        e.preventDefault();

        await axios.post(urlAddEmployee, empleado)

        navigate("/");
    }

    return (
        <div className="container">
            <div className="container" style={{margin: "30px"}}>
                <h3 className="text-center">Add Employee</h3>

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
                        <label htmlFor="departamento" className="form-label">Department</label>
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
                            type="text"
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
                        <button onClick={addEmployee} className="btn btn-warning btn-sm me-3">Add</button>
                        <Link to="/" className="btn btn-danger btn-sm">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
