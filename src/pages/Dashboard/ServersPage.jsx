/* eslint-disable no-unused-vars */
import { Autocomplete, TextField } from "@mui/material";
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
const initialState = {
  name: "",
  groupId: "",
  platform: "",
};
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
      field: "id",
      headerName: "ID",
      renderCell: (params) => {
        return params.row.id;
      },
    },
    {
      field: "name",
      headerName: "Name",
      renderCell: (params) => {
        return params.row.name;
      },
    },
    {
      field: "group",
      headerName: "Group",
      renderCell: (params) => {
        return params.row.group.name;
      },
    },
    {
      field: "os",
      headerName: "OS",
      renderCell: (params) => {
        return params.row.os.name;
      },
    },
    {
      field: "cpu",
      headerName: "CPU",
      renderCell: (params) => {
        return params.row.os.name;
      },
    },
    {
      field: "ram",
      headerName: "RAM",
      renderCell: (params) => {
        return params.row.os.name;
      },
    },
    {
      field: "disk",
      headerName: "Disk",
      renderCell: (params) => {
        return params.row.os.name;
      },
    },
    {
      field: "load",
      headerName: "Load",
      renderCell: (params) => {
        return params.row.os.name;
      },
    },
    {
      field: "net",
      headerName: "Net",
      renderCell: (params) => {
        return params.row.os.name;
      },
    },
    {
      field: "uptime",
      headerName: "Uptime",
      renderCell: (params) => {
        return params.row.os.name;
      },
    },
    {
      field: "lastSeen",
      headerName: "Last Seen",
      renderCell: (params) => {
        return params.row.os.name;
      },
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      renderCell: (params) => {
        const row = params.row;
        return [
          <IconBtn
            icon={<MdRemoveRedEye />}
            name="View"
            onClick={() => handleEditClick(row)}
            color="warning"
          />,
          <IconBtn
            icon={<MdEdit />}
            name="Edit"
            onClick={() => handleEditClick(row)}
            color="warning"
          />,
          <IconBtn
            icon={<MdDelete />}
            name="Delete"
            onClick={() => handleDeleteClick(row)}
            color="error"
          />,
        ];
      },
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
        initialRows={servers?.data || []}
        rowsPerPage={100}
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
