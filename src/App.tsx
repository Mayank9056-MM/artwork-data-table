import React, { useState } from "react";
import useArtworks from "./hooks/useArtworks";
import { DataTable, type DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./index.css";
import type { Artwork } from "./types/artwork";

const App = () => {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<Artwork[]>([]);
  const [first, setFirst] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getArtworks = useArtworks(page);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getArtworks();
        setData(response.data);
        setTotalRecords(response.pagination.total);
      } catch (error) {
        console.error("Error in useEffect fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const onPageChange = (e: DataTablePageEvent) => {
    setFirst(e.first);
    setPage(e.first / e.rows + 1);
  };

  return (
    <div className="app-container">
      <div className="card table-card">
        <h2 className="table-title">Art Institute of Chicago – Artworks</h2>
        <DataTable
          value={data}
          paginator
          lazy
          first={first}
          loading={loading}
          rows={12}
          totalRecords={totalRecords}
          onPage={onPageChange}
          stripedRows
          showGridlines
          responsiveLayout="scroll"
        >
          <Column field="title" header="Title" sortable />
          <Column field="place_of_origin" header="Origin" />
          <Column field="artist_display" header="Artist" />
          <Column field="inscriptions" header="Inscriptions" />
          <Column field="date_start" header="Start" />
          <Column field="date_end" header="End" />
        </DataTable>
      </div>
    </div>
  );
};

export default App;
