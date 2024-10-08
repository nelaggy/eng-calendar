export const Button = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <>
      {!disabled ? (
        <button
          className="py-2.5 px-6 text-sm border border-gray-300 rounded-lg shadow-xs bg-transparent font-semibold transition-all duration-500 hover:bg-gray-50 hover:text-gray-900"
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        <button
            className="py-2.5 px-6 text-sm border border-gray-300 rounded-lg shadow-xs bg-transparent font-semibold transition-all duration-500 cursor-not-allowed"
            disabled={true}
        >
            {children}
        </button>
      )}
    </>
  );
};
