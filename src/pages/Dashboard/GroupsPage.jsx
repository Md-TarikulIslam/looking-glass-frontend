/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  MdAdd,
  MdDelete,
  MdDoNotDisturb,
  MdEdit,
  MdSave
} from "react-icons/md";
import DeleteDialog from "../../components/Shared/DeleteDialog";
import DialogWrapper from "../../components/Shared/DialogWrapper";
import DashboardBreadcrumbs from "../../components/UI/DashboardBreadcrumbs";
import DataTable from "../../components/UI/DataTable";
import IconBtn from "../../components/UI/IconBtn";
import Input from "../../components/UI/Input";
import Loading from "../../components/UI/Loading";
import PrimaryButton, { TonalButton } from "../../components/UI/PrimaryButton";
import { useBrandsQuery } from "../../redux/features/brandApi";
import {
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useGroupsQuery,
  useUpdateGroupMutation,
} from "../../redux/features/groupApi";
const initialState = {
  name: "",
};
const GroupsPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [group, setGroup] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const { data: groups, isLoading, refetch } = useGroupsQuery();

  const [createGroup] = useCreateGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const [updateGroup] = useUpdateGroupMutation();

  useEffect(() => {
    if (isUpdate && selectedItem) {
      setGroup({
        name: selectedItem.name || "",
      });
    } else {
      setGroup(initialState);
    }
  }, [isUpdate, selectedItem]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isUpdate) {
        const response = await updateGroup({
          id: selectedItem._id,
          data: group,
        }).unwrap();
        toast.success(response?.message || "Updated Successfully!");
        setGroup(initialState);
        refetch();
      } else {
        const response = await createGroup(group).unwrap();
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
      await deleteGroup(selectedItem._id).unwrap();
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
  const { data: groupsData, isLoading: groupLoading } = useBrandsQuery();
  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs name="Groups" />
      <div className="flex justify-end">
        <PrimaryButton
          startIcon={<MdAdd />}
          name="Add Group"
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
          title={isUpdate ? "Update Group" : "Add Group"}
          content={
            <CreateGroup
              handleFormSubmit={handleFormSubmit}
              group={group}
              setGroup={setGroup}
              loading={loading}
              groupLoading={groupLoading}
              groupsData={groupsData}
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
          title="Group"
        />
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable
          columns={columns}
          initialRows={groups?.data || []}
          rowsPerPage={100}
        />
      )}
    </div>
  );
};

export default GroupsPage;

const CreateGroup = ({
  handleFormSubmit,
  group,
  setGroup,
  loading,
  groupLoading,
  groupsData,
  isUpdate,
  handleClose,
}) => {
  return (
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      <div className="mt-2 w-full">
        <Input
          value={group.name || ""}
          onChange={(e) =>
            setGroup({
              ...group,
              name: e.target.value,
            })
          }
          name="name"
          label="Enter the Name"
          sx={{ width: "100%" }}
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
          name={loading ? "Saving..." : isUpdate ? "Update Group" : "Add Group"}
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
