import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react/jsx-runtime";
import { Option } from "../lib/types";
import expandIcon from "../assets/icons/triangle-down.svg";

interface FilterPopoverProps {
  label: string | JSX.Element;
  selection: Option;
  disabled?: boolean;
  options: Option[];
  onSelect: (item: Option) => void;
}

const FilterPopover = ({
  label,
  selection,
  disabled,
  options,
  onSelect,
}: FilterPopoverProps) => {
  return (
    <Popover className="relative inline-block sm:min-w-0 sm:w-fit mr-2 lg:mr-0 lg:min-w-80 max-w-96 my-1.5 lg:my-0">
      {({ open }) => (
        <>
          <PopoverButton className="focus:outline-none w-full">
            <div className="text-sm bg-white rounded-[1.25rem] shadow-sm px-4 py-2.5 w-full flex justify-between items-center cursor-pointer duration-200">
              <span className="line-clamp-1 text-left">
                {label}: {selection.label}
              </span>
              <img src={expandIcon} alt="" />
            </div>
          </PopoverButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel className="absolute right-0 z-10 mt-2 w-full">
              <div className="bg-white rounded-xl shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5 flex flex-col gap-0.5">
                {options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={classNames(
                      selection.value === opt.value
                        ? "!bg-blue-100 text-blue-500"
                        : "",
                      "p-2 text-sm hover:bg-blue-50 rounded-md cursor-pointer leading-7 line-clamp-1 text-left"
                    )}
                    onClick={() => onSelect(opt)}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default FilterPopover;
