/*
  Dashboard.jsx
  -------------
  Main page of the application.
  Composes the Navbar, InteractionTable, and ChatWindow
  into a single dashboard layout.
*/

import Navbar from "../components/layout/Navbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      </main>
    </div>
  );
};

export default Dashboard;
