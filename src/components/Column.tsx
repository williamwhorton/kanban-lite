import type {JSX} from "react";

export default function Column( {title, children} :{ title: string, children?: JSX.Element} ) {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-gray-300">
      <div className="flex flex-col items-center justify-center w-full">
              <div className="w-full bg-gray-200 p-4">
            <h2 className="text-4xl font-bold">{title}</h2>
          </div>
          {children}
      </div>
    </div>
  );
}