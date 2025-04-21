/* eslint-disable no-unused-vars */
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    MdAdd,
    MdDelete,
    MdDoNotDisturb,
    MdEdit,
    MdSave,
} from "react-icons/md";
import DeleteDialog from "../../../components/Shared/DeleteDialog";
import DialogWrapper from "../../../components/Shared/DialogWrapper";
import DashboardBreadcrumbs from "../../../components/UI/DashboardBreadcrumbs";
import DataTable from "../../../components/UI/DataTable";
import IconBtn from "../../../components/UI/IconBtn";
import Input from "../../../components/UI/Input";
import PrimaryButton, {
    TonalButton,
} from "../../../components/UI/PrimaryButton";
import { useBrandsQuery } from "../../../redux/features/brandApi";
import {
    useCreateUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useUsersQuery,
} from "../../../redux/features/userApi";

const initialState = {
  name: "",
  groupId: "",
  platform: "",
};
const UsersPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const { data: users, isLoading, refetch } = useUsersQuery();

  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (isUpdate && selectedItem) {
      setUser({
        name: selectedItem.name || "",
        groupId: selectedItem.groupId || "",
        platform: selectedItem.platform || "",
      });
    } else {
      setUser(initialState);
    }
  }, [isUpdate, selectedItem]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isUpdate) {
        const response = await updateUser({
          id: selectedItem._id,
          data: user,
        }).unwrap();
        toast.success(response?.message || "Updated Successfully!");
        setUser(initialState);
        refetch();
      } else {
        const response = await createUser(user).unwrap();
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
      await deleteUser(selectedItem._id).unwrap();
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
      field: "name",
      headerName: "Name",
      renderCell: (params) => {
        return params.row.name;
      },
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: (params) => {
        return params.row.email;
      },
    },
    {
      field: "role",
      headerName: "Role",
      renderCell: (params) => {
        return params.row.role.name;
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
  const { data: usersData, isLoading: userLoading } = useBrandsQuery();
  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs name="Users" />
      <div className="flex justify-end">
        <PrimaryButton
          startIcon={<MdAdd />}
          name="Add User"
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
          title={isUpdate ? "Update User" : "Add User"}
          content={
            <CreateUser
              handleFormSubmit={handleFormSubmit}
              user={user}
              setUser={setUser}
              loading={loading}
              userLoading={userLoading}
              usersData={usersData}
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
          title="User"
        />
      )}

      <DataTable
        columns={columns}
        initialRows={users?.data || []}
        rowsPerPage={100}
        loading={isLoading}
      />
    </div>
  );
};

export default UsersPage;

const CreateUser = ({
  handleFormSubmit,
  user,
  setUser,
  loading,
  userLoading,
  usersData,
  isUpdate,
  handleClose,
}) => {
  return (
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-1 gap-6">
        {!userLoading && (
          <Autocomplete
            disablePortal
            id="user-select"
            options={usersData?.data || []}
            getOptionLabel={(option) => option.name || ""}
            value={
              usersData?.data?.find((user) => user._id === user.user) || null
            }
            onChange={(event, newValue) => {
              setUser({
                ...user,
                user: newValue?._id || "",
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='filled'
                label="Select Role"
                margin="dense"
                required
                error={!user.user && loading}
                helperText={!user.user && loading ? "Role is required" : ""}
              />
            )}
            isOptionEqualToValue={(option, value) => option._id === value._id}
          />
        )}
        {!userLoading && (
          <Autocomplete
            disablePortal
            id="user-select"
            options={usersData?.data || []}
            getOptionLabel={(option) => option.name || ""}
            value={
              usersData?.data?.find((user) => user._id === user.user) || null
            }
            onChange={(event, newValue) => {
              setUser({
                ...user,
                user: newValue?._id || "",
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='filled'
                label="Select Allowed Groups"
                required
                error={!user.user && loading}
                helperText={
                  !user.user && loading ? "Allowed Group is required" : ""
                }
              />
            )}
            isOptionEqualToValue={(option, value) => option._id === value._id}
          />
        )}
        <Input
          value={user.name || ""}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
          name="name"
          label="Enter the Name"
        />
        <Input
          value={user.email || ""}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
          type="email"
          name="email"
          label="Enter the Email Address"
        />
        <Input
          value={user.password || ""}
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
          type="password"
          name="password"
          label="Enter the Password"
        />
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
            loading ? "Saving..." : isUpdate ? "Update User" : "Add User"
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
