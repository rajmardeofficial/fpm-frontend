import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Radar.css";

function Radar() {
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { field: "symbol", headerName: "Stock Symbol", sortable: true, filter: true, cellRenderer: "agGroupCellRenderer" },
    { field: "eps", headerName: "EPS", sortable: true, filter: true },
    { field: "peratio", headerName: "PE Ratio", sortable: true, filter: true },
    { field: "roe", headerName: "ROE", sortable: true, filter: true },
    { field: "opm", headerName: "OPM", sortable: true, filter: true },
    { field: "sales", headerName: "Sales", sortable: true, filter: true },
  ]);

  useEffect(() => {
    fetch("http://localhost:2000/api/data")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRowData(data)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const onRowClicked = (event) => {
    alert(`You clicked on ${event.data.symbol}`);
    // Here you can set up further actions such as showing more details in a modal
  };

  return (
    <div>
      <div className="radar">
        <div className="radar-section">
          <h2 className="radar-title">Stocks Under Radar</h2>
          <div
            className="ag-theme-alpine"
            style={{ height: 500, width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              onRowClicked={onRowClicked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Radar;
