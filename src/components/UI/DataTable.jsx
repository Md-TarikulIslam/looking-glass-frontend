/* eslint-disable no-unused-vars */
import { Button, Menu, MenuItem, Zoom } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import jsPDF from "jspdf";
import React from "react";
import { MdImportExport } from "react-icons/md";
import * as XLSX from "xlsx";

export default function DataTable({
  columns,
  initialRows,
  toolbar,
  rowsPerPage = 10,
  loading,
}) {
  const [rows, setRows] = React.useState(initialRows);
  const [searchText, setSearchText] = React.useState("");
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const getRowId = (row) => {
    return row.id || row._id;
  };

  const filteredRows = React.useMemo(() => {
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [rows, searchText]);

  const CustomToolbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleExportClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const exportToCsv = () => {
      const csvContent = rows
        .map((row) => columns.map((col) => row[col.field]).join(","))
        .join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "export.csv";
      a.click();
      handleClose();
    };

    const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      XLSX.writeFile(wb, "export.xlsx");
      handleClose();
    };

    const exportToPdf = () => {
      const doc = new jsPDF();
      const tableData = rows.map((row) => columns.map((col) => row[col.field]));
      const tableHeaders = columns.map((col) => col.headerName);

      doc.autoTable({
        head: [tableHeaders],
        body: tableData,
        theme: "grid",
        styles: { fontSize: 8 },
        headStyles: { fillColor: [66, 66, 66] },
      });

      doc.save("export.pdf");
      handleClose();
    };

    const copyToClipboard = () => {
      const text = rows
        .map((row) => columns.map((col) => row[col.field]).join("\t"))
        .join("\n");
      navigator.clipboard.writeText(text);
      handleClose();
    };

    const handlePrint = () => {
      window.print();
      handleClose();
    };

    return (
      <GridToolbarContainer
        sx={{
          p: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* <GridToolbarDensitySelector
          slotProps={{ tooltip: { title: "Change density" } }}
        /> */}
        <Button
          startIcon={<MdImportExport />}
          onClick={handleExportClick}
          size="small"
          sx={{ ml: "auto" }}
        >
          Export
        </Button>
        <GridToolbarQuickFilter />
        {/* <GridToolbarColumnsButton />
      <GridToolbarFilterButton /> */}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          TransitionComponent={Zoom}
          sx={{
            "& .MuiPaper-root": {
              borderRadius: 2,
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.10)",
              mt: 1.5,
            },
            "& .MuiList-padding": {
              p: 1,
            },
          }}
        >
          <MenuItem
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "primary.main",

              px: 2,
              py: 1,
              borderRadius: 1,
            }}
            onClick={exportToCsv}
          >
            Export CSV
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "primary.main",

              px: 2,
              py: 1,
              borderRadius: 1,
            }}
            onClick={exportToExcel}
          >
            Export Excel
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "primary.main",

              px: 2,
              py: 1,
              borderRadius: 1,
            }}
            onClick={exportToPdf}
          >
            Export PDF
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "primary.main",

              px: 2,
              py: 1,
              borderRadius: 1,
            }}
            onClick={copyToClipboard}
          >
            Copy to Clipboard
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "primary.main",

              px: 2,
              py: 1,
              borderRadius: 1,
            }}
            onClick={handlePrint}
          >
            Print
          </MenuItem>
        </Menu>
      </GridToolbarContainer>
    );
  };

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        borderRadius: "20px",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={filteredRows}
        columns={columns}
        editMode="row"
        className="!rounded-lg"
        rowModesModel={rowModesModel}
        autoHeight
        getRowId={getRowId}
        // hideFooter={true}
        // pagination={false}
        disableColumnResize={true}
        // autosizeOnMount
        rowHeight={60}
        columnHeaderHeight={60}
        disableColumnMenu={true}
        onRowModesModelChange={handleRowModesModelChange}
        disableColumnFilter
        disableColumnSelector
        loading={loading}
        // components={{
        //   Toolbar: toolbar || CustomToolbar,
        // }}}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "linear-progress",
          },
        }}
        // hideFooterPagination
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: rowsPerPage,
            },
          },
        }}
      />
    </Box>
  );
}
