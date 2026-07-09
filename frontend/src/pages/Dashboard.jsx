/*
  Dashboard.jsx
  -------------
  Main application page.
  Layout:
    ┌──────────────────────────────────┐
    │            Navbar                │
    ├─────────────────┬────────────────┤
    │  InteractionForm│  ChatWindow    │
    │  (Left Panel)   │  (Right Panel) │
    ├─────────────────┴────────────────┤
    │       InteractionTable           │
    │       (Bottom Section)           │
    └──────────────────────────────────┘
*/

import Navbar from "../components/layout/Navbar";
import InteractionForm from "../components/interaction/InteractionForm";
import ChatWindow from "../components/chat/ChatWindow";
import InteractionTable from "../components/interaction/InteractionTable";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        {/* Top Section — Form + Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ minHeight: "520px" }}>
          {/* Left Panel — Log Interaction Form */}
          <div className="min-h-[520px]">
            <InteractionForm />
          </div>

          {/* Right Panel — AI Chat */}
          <div className="min-h-[520px]">
            <ChatWindow />
          </div>
        </div>

        {/* Bottom Section — Recent Interactions Table */}
        <InteractionTable />
      </main>
    </div>
  );
};

export default Dashboard;
