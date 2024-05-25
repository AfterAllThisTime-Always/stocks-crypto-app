import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export const Dropdown = ({
  options,
  selectedOption,
  onSelect,
  className,
}: {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, options]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-between text-black rounded-2xl cursor-pointer"
      >
        {selectedOption}
        <FaChevronDown
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 bg-green-600 rounded-2xl shadow-lg z-50 max-h-60 overflow-y-auto min-w-[100px]"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full p-2 bg-gray-800 text-zinc-100 rounded-t-2xl focus:outline-none"
            />
            <ul>
              {filteredOptions.map((option, idx) => (
                <li
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className="h-6 text-zinc-100 hover:bg-black cursor-pointer text-center"
                >
                  {option}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
