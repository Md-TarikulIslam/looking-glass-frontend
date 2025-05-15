/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
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
import { useConfigsQuery } from "../../../redux/features/configApi";

const RolesPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: configs, isLoading: configLoading } = useConfigsQuery({
    fields: "tableRecords",
  });

  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (configs?.data?.tableRecords) {
      setLimit(Number(configs.data.tableRecords));
    }
  }, [configs]);

  const {
    data: roles,
    isLoading,
    refetch,
  } = useRolesQuery({
    page: page + 1,
    limit,
    fields: "name,permissions",
    search: "",
  });
  const [deleteRole] = useDeleteRoleMutation();

  const handleDelete = async () => {
    try {
      await deleteRole(selectedItem.id).unwrap();
      toast.success("Deleted Successfully!");
      refetch();
      setDeleteOpen(false);
    } catch (error) {
      toast.error("Deletion Failed!");
    }
  };

  

  const handleDeleteClick = (row) => {
    setSelectedItem(row);
    setDeleteOpen(true);
  };

  const columns = [
    {
      field: "name",
      headerName: "Roll Name",
      width: 300,
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
          <Link to={`/dashboard/system/roles/update-role/${row?.id}`}>
            <IconBtn icon={<MdEdit />} name="Edit" color="warning" />
          </Link>,
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
      <DashboardBreadcrumbs name="System" item="Roles" />
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
        loading={isLoading}
        rowsPerPage={limit}
        rowCount={roles?.total || 25}
        paginationMode="server"
        onPageChange={setPage}
        onPageSizeChange={setLimit}
      />
    </div>
  );
};

export default RolesPage;
