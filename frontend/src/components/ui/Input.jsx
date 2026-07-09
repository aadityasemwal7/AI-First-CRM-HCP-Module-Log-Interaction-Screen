/**
 * Reusable text input component.
 * Accepts label, placeholder, and standard input props.
 *
 * @param {Object} props - Component props, including standard input attributes.
 * @returns {JSX.Element} The rendered component.
 */

const Input = (props) => {
  return (
    <input
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
};

export default Input;
