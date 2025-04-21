/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

import { Link } from "react-router";
import DeleteDialog from "../../../components/Shared/DeleteDialog";
import DashboardBreadcrumbs from "../../../components/UI/DashboardBreadcrumbs";
import DataTable from "../../../components/UI/DataTable";
import IconBtn from "../../../components/UI/IconBtn";
import PrimaryButton from "../../../components/UI/PrimaryButton";
import {
    useDeleteRoleMutation,
    useRolesQuery,
} from "../../../redux/features/roleApi";

const RolesPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: roles, isLoading, refetch } = useRolesQuery();

  const [deleteRole] = useDeleteRoleMutation();

  const handleDelete = async () => {
    try {
      await deleteRole(selectedItem._id).unwrap();
      toast.success("Deleted Successfully!");
      refetch();
      setDeleteOpen(false);
    } catch (error) {
      toast.error("Deletion Failed!");
    }
  };

  const handleEditClick = (row) => {
    setSelectedItem(row);
  };

  const handleDeleteClick = (row) => {
    setSelectedItem(row);
    setDeleteOpen(true);
  };

  const columns = [
    {
      field: "name",
      headerName: "Roll Name",
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
  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs name="System" item='Roles' />
      <div className="flex justify-end">
        <Link to="/dashboard/system/roles/create-role">
          <PrimaryButton startIcon={<MdAdd />} name="Add Role" />
        </Link>
      </div>

      {deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          handleDelete={handleDelete}
          title="Role"
        />
      )}

      <DataTable
        columns={columns}
        initialRows={roles?.data || []}
        rowsPerPage={100}
        loading={isLoading}
      />
    </div>
  );
};

export default RolesPage;
