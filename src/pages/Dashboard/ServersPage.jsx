/* eslint-disable no-unused-vars */
import {
  Autocomplete,
  Box,
  Chip,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  MdAdd,
  MdDelete,
  MdDoNotDisturb,
  MdEdit,
  MdRemoveRedEye,
  MdSave,
} from "react-icons/md";
import linux from "../../assets/images/icon/1.png";
import windows from "../../assets/images/icon/2.png";
import DeleteDialog from "../../components/Shared/DeleteDialog";
import DialogWrapper from "../../components/Shared/DialogWrapper";
import DashboardBreadcrumbs from "../../components/UI/DashboardBreadcrumbs";
import DataTable from "../../components/UI/DataTable";
import IconBtn from "../../components/UI/IconBtn";
import Input from "../../components/UI/Input";
import PrimaryButton, { TonalButton } from "../../components/UI/PrimaryButton";
import { useBrandsQuery } from "../../redux/features/brandApi";
import {
  useCreateServerMutation,
  useDeleteServerMutation,
  useServersQuery,
  useUpdateServerMutation,
} from "../../redux/features/serverApi";
import { Link } from "react-router";
const initialState = {
  name: "",
  groupId: "",
  platform: "",
};
// Add this sample data array
const sampleData = [
  {
    id: 1,
    name: "SSL-Zimbra-Mail-Server",
    organization: "Silken Sewing Limited",
    environment: "Production",
    os: "windows",
    cpu: 10,
    ram: 86,
    disk: 86,
    load: 0.32,
    net: {
      down: "373.79",
      up: "12.83",
    },
    uptime: "15d 8h 45m",
    lastSync: "34 seconds ago",
    status: "On",
  },
  {
    id: 2,
    name: "SSL-Database-MSSQL",
    organization: "Silken Sewing Limited",
    environment: "Production",
    os: "linux",
    cpu: 32,
    ram: 20,
    disk: 20,
    load: 0.22,
    net: {
      down: "0.208",
      up: "0.208",
    },
    uptime: "10d 12h 15m",
    lastSync: "34 seconds ago",
    status: "On",
  },
  {
    id: 4,
    name: "SSL-Secure-Tunnel",
    organization: "Silken Sewing Limited",
    environment: "Development",
    os: "windows",
    cpu: 0,
    ram: 0,
    disk: 0,
    load: 0.05,
    net: {
      down: "0",
      up: "0",
    },
    uptime: "5d 3h 20m",
    lastSync: "34 seconds ago",
    status: "Off",
  },
  {
    id: 5,
    name: "SSL-FastReact-Server",
    organization: "Silken Sewing Limited",
    environment: "Quality",
    os: "windows",
    cpu: 0,
    ram: 63,
    disk: 76,
    load: 1.75,
    net: {
      down: "63.23",
      up: "765.37",
    },
    uptime: "2h 45m",
    lastSync: "12 days ago",
    status: "On",
  },
  {
    id: 6,
    name: "SSL-X-Factor-HRMS-Server",
    organization: "Silken Sewing Limited",
    environment: "Production",
    os: "windows",
    cpu: 0,
    ram: 9,
    disk: 5,
    load: 0.15,
    net: {
      down: "9.4",
      up: "0.05361",
    },
    uptime: "8d 16h 10m",
    lastSync: "33 seconds ago",
    status: "Off",
  },
  {
    id: 7,
    name: "SSL-Website-&-HelloBook-CMS",
    organization: "Silken Sewing Limited",
    environment: "Production",
    os: "windows",
    cpu: 0,
    ram: 14,
    disk: 5,
    load: 0.24,
    net: {
      down: "14.07",
      up: "0.05263",
    },
    uptime: "3d 22h 55m",
    lastSync: "49 seconds ago",
    status: "On",
  },
];

const ServersPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [server, setServer] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const { data: servers, isLoading, refetch } = useServersQuery();

  const [createServer] = useCreateServerMutation();
  const [deleteServer] = useDeleteServerMutation();
  const [updateServer] = useUpdateServerMutation();

  useEffect(() => {
    if (isUpdate && selectedItem) {
      setServer({
        name: selectedItem.name || "",
        groupId: selectedItem.groupId || "",
        platform: selectedItem.platform || "",
      });
    } else {
      setServer(initialState);
    }
  }, [isUpdate, selectedItem]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isUpdate) {
        const response = await updateServer({
          id: selectedItem._id,
          data: server,
        }).unwrap();
        toast.success(response?.message || "Updated Successfully!");
        setServer(initialState);
        refetch();
      } else {
        const response = await createServer(server).unwrap();
        toast.success(response?.message || "Created Successfully!");
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };
  const handleDelete = async () => {
    try {
      await deleteServer(selectedItem._id).unwrap();
      toast.success("Deleted Successfully!");
      refetch();
      setDeleteOpen(false);
    } catch (error) {
      toast.error("Deletion Failed!");
    }
  };

  const handleEditClick = (row) => {
    setSelectedItem(row);
    setIsUpdate(true);
  };

  const handleDeleteClick = (row) => {
    setSelectedItem(row);
    setDeleteOpen(true);
  };

  const handleClose = () => {
    setCreateOpen(false);
    setIsUpdate(false);
  };
  const columns = [
    {
      field: "status",
      headerName: "",
      width: 70,
      renderCell: (params) => (
        <Box sx={{ width: "20%", mt: 3 }}>
          <LinearProgress
            variant="determinate"
            value={params.value}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: params.value === "Off" ? "#f44336" : "#4caf50",
                borderRadius: 5,
              },
            }}
          />
        </Box>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "organization",
      headerName: "Organization",
      width: 250,
    },
    {
      field: "environment",
      headerName: "Environment",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          color={
            params.value === "Production"
              ? "primary"
              : params.value === "Development"
                ? "info"
                : "warning"
          }
        />
      ),
    },
    {
      field: "os",
      headerName: "OS",
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <img
            src={params.value === "windows" ? windows : linux}
            alt="OS"
            style={{ width: 30 }}
          />
        </Box>
      ),
    },
    {
      field: "cpu",
      headerName: "CPU",
      width: 100,
      renderCell: (params) => (
        <Box sx={{ width: "100%", mt: 2.5 }}>
          <LinearProgress
            variant="determinate"
            value={params.value}
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  params.value > 80
                    ? "#f44336"
                    : params.value > 60
                      ? "#ff9800"
                      : "#4caf50",
                borderRadius: 5,
              },
            }}
          />
          <Box sx={{ minWidth: 35, textAlign: "right" }}>
            <Typography variant="body2">{`${params.value}%`}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "ram",
      headerName: "RAM",
      width: 100,
      renderCell: (params) => (
        <Box sx={{ width: "100%", mt: 2.5 }}>
          <LinearProgress
            variant="determinate"
            value={params.value}
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  params.value > 80
                    ? "#f44336"
                    : params.value > 60
                      ? "#ff9800"
                      : "#4caf50",
                borderRadius: 5,
              },
            }}
          />
          <Box sx={{ minWidth: 35, textAlign: "right" }}>
            <Typography variant="body2">{`${params.value}%`}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "disk",
      headerName: "Disk",
      width: 100,
      renderCell: (params) => (
        <Box sx={{ width: "100%", mt: 2.5 }}>
          <LinearProgress
            variant="determinate"
            value={params.value}
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  params.value > 80
                    ? "#f44336"
                    : params.value > 60
                      ? "#ff9800"
                      : "#4caf50",
                borderRadius: 5,
              },
            }}
          />
          <Box sx={{ minWidth: 35, textAlign: "right" }}>
            <Typography variant="body2">{`${params.value}%`}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "load",
      headerName: "Load",
      width: 100,
      renderCell: (params) => (
        <Box sx={{ width: "100%", mt: 2.5 }}>
          <LinearProgress
            variant="determinate"
            value={params.value * 100}
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  params.value > 0.8
                    ? "#f44336"
                    : params.value > 0.6
                      ? "#ff9800"
                      : "#4caf50",
                borderRadius: 5,
              },
            }}
          />
          <Box sx={{ minWidth: 35, textAlign: "right" }}>
            <Typography variant="body2">{params.value}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "net",
      headerName: "Net",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="textSecondary">
            ↓ {params.value.down} KB/s
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ↑ {params.value.up} KB/s
          </Typography>
        </Box>
      ),
    },
    {
      field: "uptime",
      headerName: "Uptime",
      width: 120,
    },
    {
      field: "lastSync",
      headerName: "Last Sync",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
       <Link to={`/dashboard/servers/server-details/${params?.id}`}>   <IconBtn
            icon={<MdRemoveRedEye />}
            name="View"
            color="primary"
          /></Link>
          <IconBtn
            icon={<MdEdit />}
            name="Edit"
            onClick={() => handleEditClick(params.row)}
            color="warning"
          />
          <IconBtn
            icon={<MdDelete />}
            name="Delete"
            onClick={() => handleDeleteClick(params.row)}
            color="error"
          />
        </Box>
      ),
    },
  ];
  const { data: serversData, isLoading: serverLoading } = useBrandsQuery();
  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs name="Servers" />
      <div className="flex justify-end">
        <PrimaryButton
          startIcon={<MdAdd />}
          name="Add Server"
          onClick={() => {
            setIsUpdate(false);
            setCreateOpen(true);
          }}
        />
      </div>

      {createOpen && (
        <DialogWrapper
          open={createOpen}
          size="md"
          title={isUpdate ? "Update Server" : "Add Server"}
          content={
            <CreateServer
              handleFormSubmit={handleFormSubmit}
              server={server}
              setServer={setServer}
              loading={loading}
              serverLoading={serverLoading}
              serversData={serversData}
              isUpdate={isUpdate}
              handleClose={handleClose}
            />
          }
        />
      )}

      {deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          handleDelete={handleDelete}
          title="Server"
        />
      )}

      <DataTable
        columns={columns}
        initialRows={sampleData} // Replace servers?.data with sampleData
        rowsPerPage={10}
        loading={isLoading}
      />
    </div>
  );
};

export default ServersPage;

const CreateServer = ({
  handleFormSubmit,
  server,
  setServer,
  loading,
  serverLoading,
  serversData,
  isUpdate,
  handleClose,
}) => {
  return (
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-1 gap-6">
        <Input
          value={server.name || ""}
          onChange={(e) =>
            setServer({
              ...server,
              name: e.target.value,
            })
          }
          name="name"
          label="Enter the Name"
          margin="dense"
          helperText="Hostname, IP Address or other for easy identification."
        />
        {!serverLoading && (
          <Autocomplete
            disablePortal
            id="server-select"
            options={serversData?.data || []}
            getOptionLabel={(option) => option.name || ""}
            value={
              serversData?.data?.find(
                (server) => server._id === server.server
              ) || null
            }
            onChange={(event, newValue) => {
              setServer({
                ...server,
                server: newValue?._id || "",
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Group"
                required
                variant="filled"
                error={!server.server && loading}
                helperText={
                  !server.server && loading ? "Group is required" : ""
                }
              />
            )}
            isOptionEqualToValue={(option, value) => option._id === value._id}
          />
        )}
        {!serverLoading && (
          <Autocomplete
            disablePortal
            id="server-select"
            options={serversData?.data || []}
            getOptionLabel={(option) => option.name || ""}
            value={
              serversData?.data?.find(
                (server) => server._id === server.server
              ) || null
            }
            onChange={(event, newValue) => {
              setServer({
                ...server,
                server: newValue?._id || "",
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Select Platform"
                required
                error={!server.server && loading}
                helperText={
                  !server.server && loading ? "Platform is required" : ""
                }
              />
            )}
            isOptionEqualToValue={(option, value) => option._id === value._id}
          />
        )}
      </div>
      <div className="flex flex-col justify-end md:flex-row gap-4">
        <PrimaryButton
          variant="text"
          color="error"
          startIcon={<MdDoNotDisturb />}
          name="Cancel"
          sx={{
            py: 1.4,
            borderRadius: 20,
          }}
          onClick={handleClose}
        />
        <TonalButton
          disabled={loading}
          startIcon={<MdSave />}
          name={
            loading ? "Saving..." : isUpdate ? "Update Server" : "Add Server"
          }
          type="submit"
          sx={{
            py: 1.4,
            borderRadius: 20,
          }}
        />
      </div>
    </form>
  );
};
