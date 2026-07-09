/**
 * Reusable button component.
 * Accepts variant, size, and standard button props.
 *
 * @param {Object} props - Component props, including standard button attributes.
 * @param {React.ReactNode} props.children - The content to render inside the button.
 * @returns {JSX.Element} The rendered component.
 */

const Button = ({ children, ...props }) => {
  return (
    <button
      className="px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
