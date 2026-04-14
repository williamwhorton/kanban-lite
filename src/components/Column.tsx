import  {type JSX} from "react";
import * as React from "react";

function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event: React.DragEvent<HTMLDivElement>, callback?: (title: string, status: 'pending' | 'in-progress' | 'completed') => void) {
    event.preventDefault();
    const title = event.dataTransfer.getData('text/plain');
    event.dataTransfer.setData('text/plain', event.currentTarget.dataset.status || 'no status');
    callback && callback(title, event.currentTarget.dataset.status as 'pending' | 'in-progress' | 'completed');
    console.log('Dropped: ', title, ' with status: ', event.currentTarget.dataset.status);
}

export default function Column({title, status, children, updateColumn}: {
    title: string,
    status: string,
    children?: JSX.Element,
    updateColumn?: (title: string, status: 'pending' | 'in-progress' | 'completed') => void
}) {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-gray-300" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, updateColumn)} data-status={status}>
      <div className="flex flex-col items-center justify-center w-full">
              <div className="w-full bg-gray-200 p-4">
            <h2 className="text-4xl font-bold">{title}</h2>
          </div>
          {children}
      </div>
    </div>
  );
}