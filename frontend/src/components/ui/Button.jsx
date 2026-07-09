/*
  Button.jsx
  ----------
  Reusable button component.
  Accepts variant, size, and standard button props.
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
