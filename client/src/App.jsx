import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {RoutesApp} from "./routesApp/routesApp.jsx";
import {RhProvider} from "./context/rhContext.jsx";

export const App = () => {

  return (
      <RhProvider>
          <RoutesApp />
      </RhProvider>
  )
}

