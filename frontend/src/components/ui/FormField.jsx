/**
 * Reusable form field wrapper.
 * Renders a label, the input element (passed as children),
 * an optional required indicator, and a validation error message.
 *
 * @param {Object} props - Component props.
 * @param {string} props.label - The label text for the field.
 * @param {boolean} [props.required] - Whether the field is required.
 * @param {string} [props.error] - Validation error message to display.
 * @param {React.ReactNode} props.children - The input component to render inside the field.
 * @returns {JSX.Element} The rendered component.
 */

const FormField = ({ label, required, error, children }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
