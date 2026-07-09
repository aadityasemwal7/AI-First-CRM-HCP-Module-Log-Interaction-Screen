/**
 * Reusable table row for displaying a single HCP interaction.
 * Includes Edit and Delete action buttons.
 * Maps from FastAPI response schema (hcp_name, hcp_specialty, etc.)
 *
 * @param {Object} props - Component props.
 * @param {Object} props.row - The interaction data object.
 * @param {Function} props.onEdit - Callback when edit is clicked.
 * @param {Function} props.onDelete - Callback when delete is clicked.
 * @param {boolean} props.isEditing - Whether this row is currently being edited.
 * @returns {JSX.Element} The rendered component.
 */
const InteractionTableRow = ({ row, onEdit, onDelete, isEditing }) => {
  // Format ISO date to YYYY-MM-DD
  const formattedDate = row.interaction_date 
    ? new Date(row.interaction_date).toISOString().split("T")[0]
    : "";

  return (
    <tr className={`border-b border-gray-50 transition-colors ${isEditing ? 'bg-amber-50/50' : 'hover:bg-gray-50/50'}`}>
      <td className="px-6 py-4 font-medium text-gray-900">{row.hcp_name}</td>
      <td className="px-6 py-4 text-gray-500">{row.hcp_specialty}</td>
      <td className="px-6 py-4 text-gray-500">{row.interaction_type}</td>
      <td className="px-6 py-4 text-gray-500">{formattedDate}</td>
      <td className="px-6 py-4 text-gray-500">{row.next_action}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(row.id)}
            className={`${isEditing ? 'text-amber-600' : 'text-gray-400 hover:text-primary-600'} transition-colors cursor-pointer`}
            title={isEditing ? "Currently Editing" : "Edit Interaction"}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          
          {/* Delete Button */}
          <button
            onClick={() => onDelete(row.id)}
            className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
            title="Delete Interaction"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InteractionTableRow;
