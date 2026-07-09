/*
  App.jsx
  -------
  Root component.
  Sets up React Router with all application routes.
  Currently only the Dashboard route is defined;
  more routes will be added as features are built.
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
