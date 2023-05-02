import React, { PropsWithChildren } from 'react';
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

type Iprop<T>={
    rowData: T[];
    columnDef: ColDef[];
    oncellClicked:(input:any)=>void;
  }

const Table=<T,>(props:PropsWithChildren<Iprop<T>>) => {
  
return(
   <AgGridReact<T>
        rowData={props.rowData}
        columnDefs={props.columnDef}
         onCellClicked={props.oncellClicked}
         
  ></AgGridReact>

)


}


export default Table;