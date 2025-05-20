interface FilterButtonProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const HarFilterButton = ({ options, value, onChange }: FilterButtonProps) => {
  return (
    <div className="flex gap-2 mb-4">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`px-5 py-2 rounded transition
            ${
              value === option
                ? "bg-gray-200 text-black font-semibold"
                : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-100"
            }
          `}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default HarFilterButton;
