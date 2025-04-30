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
    MdSave
} from "react-icons/md";

import DeleteDialog from "../../../components/Shared/DeleteDialog";
import DialogWrapper from "../../../components/Shared/DialogWrapper";
import DataTable from "../../../components/UI/DataTable";
import Input from "../../../components/UI/Input";
import PrimaryButton, {
    TonalButton,
} from "../../../components/UI/PrimaryButton";
import {
    useCreateServerAlertingMutation,
    useDeleteServerAlertingMutation,
    useServerAlertingQuery,
    useUpdateServerAlertingMutation,
} from "../../../redux/features/serverAlertingApi";
import IconBtn from "../../../components/UI/IconBtn";
const initialState = {
  name: "",
  groupId: "",
  platform: "",
};
// Add this sample data array
const sampleData = [
  {
    id: 1,
    name: "SSL-Zimbra-Mail-ServerAlerting",
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
    name: "SSL-FastReact-ServerAlerting",
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
    name: "SSL-X-Factor-HRMS-ServerAlerting",
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

const ServerAlertingPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [serverAlerting, setServerAlerting] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const {
    data: serverAlertingData,
    isLoading,
    refetch,
  } = useServerAlertingQuery();

  const [createServerAlerting] = useCreateServerAlertingMutation();
  const [deleteServerAlerting] = useDeleteServerAlertingMutation();
  const [updateServerAlerting] = useUpdateServerAlertingMutation();

  useEffect(() => {
    if (isUpdate && selectedItem) {
      setServerAlerting({
        name: selectedItem.name || "",
        groupId: selectedItem.groupId || "",
        platform: selectedItem.platform || "",
      });
    } else {
      setServerAlerting(initialState);
    }
  }, [isUpdate, selectedItem]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isUpdate) {
        const response = await updateServerAlerting({
          id: selectedItem._id,
          data: serverAlerting,
        }).unwrap();
        toast.success(response?.message || "Updated Successfully!");
        setServerAlerting(initialState);
        refetch();
      } else {
        const response = await createServerAlerting(serverAlerting).unwrap();
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
      await deleteServerAlerting(selectedItem._id).unwrap();
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
      field: "type",
      headerName: "Type",
      width: 200,
    },
    {
      field: "comparison",
      headerName: "Comparison",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          color={
            params.value === "active"
              ? "primary" : "error"
             
          }
        />
      ),
    },

    {
      field: "actions",
      headerName: "",
      width: 200,
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
  // const { data: serverAlertingData, isLoading: serverAlertingLoading } = useBrandsQuery();
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <PrimaryButton
          startIcon={<MdAdd />}
          name="Add Alert"
          onClick={() => {
            setIsUpdate(false);
            setCreateOpen(true);
          }}
        />
      </div>

      {createOpen && (
        <DialogWrapper
          open={createOpen}
          size="lg"
          title={isUpdate ? "Update Server Alerting" : "Add Server Alerting"}
          content={
            <CreateServerAlerting
              handleFormSubmit={handleFormSubmit}
              serverAlerting={serverAlerting}
              setServerAlerting={setServerAlerting}
              loading={loading}
              // serverAlertingLoading={serverAlertingLoading}
              serverAlertingData={serverAlertingData}
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
          title="ServerAlerting"
        />
      )}

      <DataTable
        columns={columns}
        initialRows={sampleData}
        rowsPerPage={10}
        loading={isLoading}
      />
    </div>
  );
};

export default ServerAlertingPage;

const CreateServerAlerting = ({
  handleFormSubmit,
  serverAlerting,
  setServerAlerting,
  loading,
  serverAlertingData,
  isUpdate,
  handleClose,
}) => {
  const alertTypes = [
    { label: "CPU Usage", value: "cpu" },
    { label: "RAM Usage", value: "ram" },
    { label: "Disk Usage", value: "disk" },
    { label: "Network Usage", value: "network" },
    { label: "Server Status", value: "status" }
  ];

  const comparisonOptions = [
    { label: "==", value: "==" },
    { label: ">=", value: ">=" },
    { label: "<=", value: "<=" },
    { label: ">", value: ">" },
    { label: "<", value: "<" }
  ];

  const repeatOptions = [
    { label: "Once", value: "once" },
    { label: "Every Hour", value: "hourly" },
    { label: "Every Day", value: "daily" },
    { label: "Every Week", value: "weekly" },
    { label: "Every Month", value: "monthly" }
  ];

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" }
  ];

  return (
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Alert Type */}
        <Autocomplete
          disablePortal
          id="alert-type-select"
          options={alertTypes}
          getOptionLabel={(option) => option.label}
          value={alertTypes.find(type => type.value === serverAlerting.type) || null}
          onChange={(event, newValue) => {
            setServerAlerting({
              ...serverAlerting,
              type: newValue?.value || ""
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Alert Type"
              required
              variant="filled"
              error={!serverAlerting.type && loading}
              helperText={!serverAlerting.type && loading ? "Alert type is required" : ""}
            />
          )}
        />

        {/* Comparison */}
        <Autocomplete
          disablePortal
          id="comparison-select"
          options={comparisonOptions}
          getOptionLabel={(option) => option.label}
          value={comparisonOptions.find(comp => comp.value === serverAlerting.comparison) || null}
          onChange={(event, newValue) => {
            setServerAlerting({
              ...serverAlerting,
              comparison: newValue?.value || ""
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Comparison"
              required
              variant="filled"
              error={!serverAlerting.comparison && loading}
              helperText={!serverAlerting.comparison && loading ? "Comparison is required" : ""}
            />
          )}
        />

        {/* Limit Value */}
        <Input
          value={serverAlerting.limit || ""}
          onChange={(e) =>
            setServerAlerting({
              ...serverAlerting,
              limit: e.target.value
            })
          }
          type="number"
          name="limit"
          label="Limit Value"
          required
          
          helperText="Enter the threshold value for the alert"
        />
           {/* Status */}
           <Autocomplete
          disablePortal
          id="status-select"
          options={statusOptions}
          getOptionLabel={(option) => option.label}
          value={statusOptions.find(status => status.value === serverAlerting.status) || null}
          onChange={(event, newValue) => {
            setServerAlerting({
              ...serverAlerting,
              status: newValue?.value || ""
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Status"
              required
              variant="filled"
              error={!serverAlerting.status && loading}
              helperText={!serverAlerting.status && loading ? "Status is required" : ""}
            />
          )}
        />

        {/* Occurrences */}
        <Input
          value={serverAlerting.occurrences || ""}
          onChange={(e) =>
            setServerAlerting({
              ...serverAlerting,
              occurrences: e.target.value
            })
          }
          type="number"
          name="occurrences"
          label="Occurrences"
          required
          
          helperText="If the problem occurs for more than this value an incident will be opened and the selected contacts will be notified."
        />
        {/* Contacts */}
        <Input
          value={serverAlerting.contacts || ""}
          onChange={(e) =>
            setServerAlerting({
              ...serverAlerting,
              contacts: e.target.value
            })
          }
          type="number"
          name="contacts"
          label="Contacts"
          required
          
          helperText="Contacts selected here will receive notifications for this alert."
        />

        {/* Repeat */}
        <Autocomplete
          disablePortal
          id="repeat-select"
          options={repeatOptions}
          getOptionLabel={(option) => option.label}
          value={repeatOptions.find(repeat => repeat.value === serverAlerting.repeat) || null}
          onChange={(event, newValue) => {
            setServerAlerting({
              ...serverAlerting,
              repeat: newValue?.value || ""
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Repeat"
              required
              variant="filled"
              error={!serverAlerting.repeat && loading}
              helperText={!serverAlerting.repeat && loading ? "Repeat interval is required" : "Resend the notification if the incident is not resolved."}
            />
          )}
        />

     
      </div>

      {/* Action buttons */}
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
          name={loading ? "Saving..." : isUpdate ? "Update Alert" : "Add Alert"}
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
