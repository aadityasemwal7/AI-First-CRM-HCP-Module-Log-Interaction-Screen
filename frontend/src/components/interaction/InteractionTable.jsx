/*
  InteractionTable.jsx
  --------------------
  Recent interactions table connected to Redux and FastAPI.
  Fetches interactions on mount and renders them.
  Handles edit selection and optimistic deletion.
*/

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInteractions, deleteInteraction, setSelectedInteraction } from "../../redux/interactionSlice";
import InteractionTableRow from "./InteractionTableRow";

const InteractionTable = () => {
  const dispatch = useDispatch();
  const { interactions, loading, error, selectedInteraction } = useSelector((state) => state.interaction);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchInteractions());
  }, [dispatch]);

  const handleEdit = (id) => {
    const interactionToEdit = interactions.find((i) => i.id === id);
    if (interactionToEdit) {
      dispatch(setSelectedInteraction(interactionToEdit));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this interaction?")) {
      dispatch(deleteInteraction(id));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full max-h-[800px]">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
            <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5h6" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Recent Interactions</h2>
            <p className="text-xs text-gray-400">{interactions.length} records</p>
          </div>
        </div>
        <button 
          onClick={() => dispatch(fetchInteractions())}
          className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors cursor-pointer"
        >
          Refresh
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-700 text-sm shrink-0">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
          </svg>
          {error}
        </div>
      )}

      {/* Table Container */}
      <div className="flex-1 overflow-auto relative">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-50/95 backdrop-blur z-10 shadow-sm border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Doctor</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Specialty</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Next Action</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && interactions.length > 0 && (
              interactions.map((row) => (
                <InteractionTableRow 
                  key={row.id} 
                  row={row} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                  isEditing={selectedInteraction?.id === row.id}
                />
              ))
            )}
          </tbody>
        </table>

        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-20">
            <div className="flex flex-col items-center gap-2">
               <svg className="w-6 h-6 text-primary-500 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
               </svg>
               <span className="text-sm text-gray-500 font-medium">Loading interactions...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && interactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">No interactions found</h3>
            <p className="text-xs text-gray-500 max-w-sm">
              Log your first interaction using the form above to see it appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionTable;
