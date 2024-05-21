import React, {useContext, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {NavbarApp} from "../components/navbar/NavbarApp.jsx";
import {ListadoEmpleados} from "../pages/dashboard/Home/ListadoEmpleados.jsx";
import {AgregarEmpleado} from "../pages/empleados/agregarEmpleado/AgregarEmpleado.jsx";
import {EditarEmpleados} from "../pages/empleados/editarEmpleados/EditarEmpleados.jsx";
import {Login} from "../pages/auth/Login/Login.jsx";
import {RhContext} from "../context/rhContext.jsx";
import {Register} from "../pages/auth/Register/Register.jsx";

const initialValue = {
    fullname: "",
    department: "",
    salary: ""
}

export const RoutesApp = () => {

    const { token } = useContext(RhContext);

    const [empleado, setEmpleado] = useState(initialValue);

    return (
        <BrowserRouter>
            <NavbarApp/>
            <Routes>
                {!token ? (
                    <>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                    ) : (
                    <>
                        <Route path="/" element={<ListadoEmpleados/>} />
                        <Route path="/agregar" element={<AgregarEmpleado empleado={empleado} setEmpleado={setEmpleado} />} />
                        <Route path="/editar/:id" element={<EditarEmpleados empleado={empleado} setEmpleado={setEmpleado} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                    )
                }
            </Routes>
        </BrowserRouter>
    );
};
