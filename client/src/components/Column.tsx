import  {type JSX} from "react";
import * as React from "react";
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';



export default function Column({title, status, children, updateColumn, ...props}: {
    title: string,
    status: string,
    children?: JSX.Element,
    addModal?: () => void,
    updateColumn?: (id: number, status: 'pending' | 'in-progress' | 'completed') => void
}) {

    function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(event: React.DragEvent<HTMLDivElement>, callback?: (id: number, status: 'pending' | 'in-progress' | 'completed') => void) {
        event.preventDefault();
        const id: number = parseInt(event.dataTransfer.getData('text/plain'));
        event.dataTransfer.setData('text/plain', event.currentTarget.dataset.status || 'no status');
        callback && callback(id, event.currentTarget.dataset.status as 'pending' | 'in-progress' | 'completed');
    }

    function toggleAddModal(event: any) {
        event.preventDefault();
        props.addModal && props.addModal();
    }


  return (
    <div className="flex flex-col items-center justify-center border-2 border-gray-300" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, updateColumn)} data-status={status}>
      <div className="flex flex-col items-center justify-center w-full">
              <div className="w-full bg-gray-200 p-4">
            <h2 className="text-4xl font-bold float-left">{title}</h2>
                  {props.addModal &&
                      <IconButton className="float-right" onClick={(event) => toggleAddModal(event)} >
                      <AddIcon /></IconButton>
                  }
          </div>
          {children}
      </div>
    </div>
  );
}