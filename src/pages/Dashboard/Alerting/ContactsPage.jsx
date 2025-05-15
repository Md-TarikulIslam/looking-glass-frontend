import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import DeleteDialog from "../../../components/Shared/DeleteDialog";
import DialogWrapper from "../../../components/Shared/DialogWrapper";
import DashboardBreadcrumbs from "../../../components/UI/DashboardBreadcrumbs";
import DataTable from "../../../components/UI/DataTable";
import IconBtn from "../../../components/UI/IconBtn";
import Input from "../../../components/UI/Input";
import PrimaryButton from "../../../components/UI/PrimaryButton";
import { useConfigsQuery } from "../../../redux/features/configApi";
import {
    useContactsQuery,
    useCreateContactMutation,
    useDeleteContactMutation,
    useUpdateContactMutation,
} from "../../../redux/features/contactsApi";
import { useGroupsQuery } from "../../../redux/features/groupApi";

const initialState = {
  name: "",
  email: "",
  phone: "",
  status: "active",
  groupId: "",
};

const ContactsPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [contact, setContact] = useState(initialState);
  const [createOpen, setCreateOpen] = useState(false);
  const { data: configs, isLoading: configLoading } = useConfigsQuery({
    fields: "tableRecords",
  });

  const [loading, setLoading] = useState(false);

  const [createContact] = useCreateContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (configs?.data?.tableRecords) {
      setLimit(Number(configs.data.tableRecords));
    }
  }, [configs]);

  const { data: contacts, isLoading: contactsLoading } = useContactsQuery({
    page: page + 1,
    limit,
    fields: "name,phone,email,status,groupId",
    search: "",
  });
  const { data: groups, isLoading: groupLoading } = useGroupsQuery({
    page: page + 1,
    limit,
    fields: "name",
    search: "",
  });

  useEffect(() => {
    if (isUpdate && selectedItem) {
      setContact({
        name: selectedItem.name,
        email: selectedItem.email,
        phone: selectedItem.phone,
        status: selectedItem.status,
        groupId: selectedItem.groupId || "",
      });
    }
  }, [selectedItem, isUpdate]);

  console.log(selectedItem);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isUpdate) {
        const response = await updateContact({
          id: selectedItem.id,
          data: contact,
        }).unwrap();
        toast.success(response.message || "Contact updated successfully");
        setLoading(false);
        handleClose();
      } else {
        const response = await createContact(contact).unwrap();
        toast.success(response.message || "Contact created successfully");
        setLoading(false);
        handleClose();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const response = await deleteContact(selectedItem.id).unwrap();
    toast.success(response.message || "Contact deleted successfully");
    setSelectedItem(null);
    setDeleteOpen(false);
  };

  const handleEditClick = (row) => {
    setSelectedItem(row);
    setIsUpdate(true);
    setCreateOpen(true);
  };

  const handleDeleteClick = (row) => {
    setSelectedItem(row);
    setDeleteOpen(true);
  };

  const handleClose = () => {
    setCreateOpen(false);
    setIsUpdate(false);
    setContact(initialState);
  };

  if (configLoading || !limit) return <div>Loading..</div>;

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "group",
      headerName: "Group",
      width: 200,
      renderCell: (params) => params.row.group?.name || "",
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "",
      headerName: "Channels",
      width: 300,
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="flex gap-2">
            {row.email && <span>{row.email}</span>}
            {row.phone && <span>{row.phone}</span>}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <span
          className={`px-2 capitalize py-1 rounded ${params.row.status === "active" ? "bg-green-500" : "bg-red-500"} text-white`}
        >
          {params.row.status}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex gap-2">
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
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs name="Contacts" />
      <div className="flex justify-end">
        <PrimaryButton
          startIcon={<MdAdd />}
          name="Add Contact"
          onClick={() => setCreateOpen(true)}
        />
      </div>

      {createOpen && (
        <DialogWrapper
          open={createOpen}
          title={isUpdate ? "Update Contact" : "Add Contact"}
          size="lg"
          content={
            <CreateContact
              handleFormSubmit={handleFormSubmit}
              contact={contact}
              setContact={setContact}
              isUpdate={isUpdate}
              handleClose={handleClose}
              groups={groups?.data || []}
              groupLoading={groupLoading}
              loading={loading}
            />
          }
        />
      )}

      {deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          handleDelete={handleDelete}
          title="Contact"
        />
      )}

      <DataTable
        columns={columns}
        initialRows={contacts?.data || []}
        loading={contactsLoading}
        rowsPerPage={limit}
        rowCount={contacts?.total || 25}
        paginationMode="server"
        onPageChange={setPage}
        onPageSizeChange={setLimit}
      />
    </div>
  );
};

export default ContactsPage;

const CreateContact = ({
  handleFormSubmit,
  contact,
  setContact,
  isUpdate,
  handleClose,
  groups,
  groupLoading,
  loading,
}) => {
  const statusOptions = ["active", "inactive"];

  const selectedGroup = groups?.find((group) => group.id === contact.groupId);

  return (
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          value={contact.name}
          onChange={(e) =>
            setContact({
              ...contact,
              name: e.target.value,
            })
          }
          label="Name"
          required
        />
        <Autocomplete
          value={contact.status}
          onChange={(event, newValue) => {
            setContact({
              ...contact,
              status: newValue,
            });
          }}
          options={statusOptions}
          renderInput={(params) => (
            <TextField {...params} label="Status" variant="filled" required />
          )}
        />
        {!groupLoading && (
          <Autocomplete
            value={selectedGroup || null}
            onChange={(event, newValue) => {
              setContact({
                ...contact,
                groupId: newValue?.id || "",
              });
            }}
            options={groups || []}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Group"
                variant="filled"
                required
              />
            )}
          />
        )}
        <Input
          value={contact.email}
          onChange={(e) =>
            setContact({
              ...contact,
              email: e.target.value,
            })
          }
          type="email"
          label="Email Address"
        />
        <Input
          value={contact.phone}
          onChange={(e) =>
            setContact({
              ...contact,
              phone: e.target.value,
            })
          }
          type="tel"
          label="Phone Number"
        />
      </div>
      <div className="flex justify-end gap-4">
        <PrimaryButton
          variant="text"
          color="error"
          name="Cancel"
          onClick={handleClose}
        />
        <PrimaryButton
          type="submit"
          disabled={loading}
          name={isUpdate ? "Update Contact" : "Add Contact"}
        />
      </div>
    </form>
  );
};
