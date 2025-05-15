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
import { useConfigsQuery } from "../../../redux/features/configApi";
import { useGroupsQuery } from "../../../redux/features/groupApi";
import { useRolesQuery } from "../../../redux/features/roleApi";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUsersQuery,
} from "../../../redux/features/userApi";

const initialState = {
  name: "",
  email: "",
  password: "",
  roleId: "",
};
const UsersPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const { data: configs, isLoading: configLoading } = useConfigsQuery({
    fields: "tableRecords,timeZone,dateFormat",
  });

  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (configs?.data?.tableRecords) {
      setLimit(Number(configs.data.tableRecords));
    }
  }, [configs]);

  const {
    data: users,
    isLoading,
    refetch,
  } = useUsersQuery({
    page: page + 1, // Convert to 1-based for API
    limit,
    fields: "name,email,groupIds,roleId",
    search: "",
  });

  const { data: roles, isLoading: rolesLoading } = useRolesQuery({
    page: page + 1,
    limit,
    fields: "name",
    search: "",
  });
  const { data: groups, isLoading: groupLoading } = useGroupsQuery({
    page: page + 1,
    limit,
    fields: "name",
    search: "",
  });

  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (isUpdate && selectedItem) {
      setUser({
        name: selectedItem.name || "",
        email: selectedItem.email || "",
        password: selectedItem.password || "",
        roleId: selectedItem.roleId || "",
        groupIds: selectedItem.groupIds?.map((group) => group) || [],
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
          id: selectedItem.id,
          data: user,
        }).unwrap();
        toast.success(response?.message || "Updated Successfully!");
        setUser(initialState);
        handleClose();
      } else {
        const response = await createUser(user).unwrap();
        toast.success(response?.message || "Created Successfully!");
        setUser(initialState);
        handleClose();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };
  const handleDelete = async () => {
    try {
      await deleteUser(selectedItem.id).unwrap();
      toast.success("Deleted Successfully!");
      refetch();
      setDeleteOpen(false);
    } catch (error) {
      toast.error("Deletion Failed!");
    }
  };

  const handleEditClick = (row) => {
    setSelectedItem(row);
    setCreateOpen(true);
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
      width: 300,
      renderCell: (params) => {
        return params.row.name;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      renderCell: (params) => {
        return params.row.email;
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 300,
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
  if (configLoading || !limit) return <div>Loading..</div>;
  // const { data: usersData, isLoading: userLoading } = useBrandsQuery();
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
              isUpdate={isUpdate}
              handleClose={handleClose}
              roles={roles?.data || []}
              groups={groups?.data || []}
              rolesLoading={rolesLoading}
              groupsLoading={groupLoading}
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
        loading={isLoading}
        rowsPerPage={limit}
        rowCount={users?.total || 25}
        paginationMode="server"
        onPageChange={setPage}
        onPageSizeChange={setLimit}
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
  isUpdate,
  handleClose,
  roles,
  rolesLoading,
  groups,
  groupsLoading,
}) => {
  const selectedRole = roles?.find((role) => role.id === user.roleId);
  const selectedGroups =
    groups?.filter((group) => user.groupIds?.includes(group.id)) || [];
  return (
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-1 gap-6">
        {!rolesLoading && (
          <Autocomplete
            disablePortal
            id="role-select"
            options={roles || []}
            getOptionLabel={(option) => option.name || ""}
            value={selectedRole || null}
            onChange={(event, newValue) => {
              setUser({
                ...user,
                roleId: newValue?.id || "",
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Select Role"
                margin="dense"
                required
                error={!user.roleId && loading}
                helperText={!user.roleId && loading ? "Role is required" : ""}
              />
            )}
            isOptionEqualToValue={(option, value) => option._id === value._id}
          />
        )}
        {!groupsLoading && (
          <Autocomplete
            multiple
            disablePortal
            id="group-select"
            options={groups || []}
            getOptionLabel={(option) => option.name || ""}
            value={selectedGroups}
            onChange={(event, newValues) => {
              setUser({
                ...user,
                groupIds: newValues.map((group) => group.id),
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Select Groups"
                error={!user.groupIds?.length && loading}
                helperText={
                  !user.groupIds?.length && loading
                    ? "At least one group is required"
                    : ""
                }
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
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
          name={loading ? "Saving..." : isUpdate ? "Update User" : "Add User"}
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
