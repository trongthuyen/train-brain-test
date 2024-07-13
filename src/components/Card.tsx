import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  label: string;
}

const Card = ({ label, children }: CardProps) => {
  return (
    <div className="w-44 h-[9.5rem] bg-white shadow-sm rounded-[1.25rem] p-4 flex flex-col">
      <strong className="block text-xs">{label}</strong>
      <div className="flex-1 flex items-center">
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Card;
