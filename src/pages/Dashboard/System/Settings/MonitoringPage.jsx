/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import Input from "../../../../components/UI/Input";
import PrimaryButton, { TonalButton } from "../../../../components/UI/PrimaryButton";

import { Autocomplete, TextField } from "@mui/material";

import {
    useCreateMonitoringMutation,
    useDeleteMonitoringMutation,
    useMonitoringsQuery,
    useUpdateMonitoringMutation,
} from "../../../../redux/features/monitoringApi";
import { useUsersQuery } from "../../../../redux/features/userApi";

const initialState = {
  name: "",
};
const MonitoringPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [monitoring, setMonitoring] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { data: monitorings, isLoading, refetch } = useMonitoringsQuery();

  const [createMonitoring] = useCreateMonitoringMutation();
  const [deleteMonitoring] = useDeleteMonitoringMutation();
  const [updateMonitoring] = useUpdateMonitoringMutation();

  useEffect(() => {
    if (isUpdate && selectedItem) {
      setMonitoring({
        name: selectedItem.name || "",
      });
    } else {
      setMonitoring(initialState);
    }
  }, [isUpdate, selectedItem]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isUpdate) {
        const response = await updateMonitoring({
          id: selectedItem._id,
          data: monitoring,
        }).unwrap();
        toast.success(response?.message || "Updated Successfully!");
        setMonitoring(initialState);
        refetch();
      } else {
        const response = await createMonitoring(monitoring).unwrap();
        toast.success(response?.message || "Created Successfully!");
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };
  const { data: users, isLoading: userLoading } = useUsersQuery();
  return (
    <form className="space-y-6 w-full" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          value={monitoring.timeout || ""}
          onChange={(e) =>
            setMonitoring({
              ...monitoring,
              timeout: e.target.value,
            })
          }
          name="timeout"
          label="Check Timeout (s)"
          helperText="Default check timeout in seconds."
        />
        <Input
          value={monitoring.historyRetention || ""}
          onChange={(e) =>
            setMonitoring({
              ...monitoring,
              historyRetention: e.target.value,
            })
          }
          name="historyRetention"
          label="History Retention (days)"
          helperText="Server, website, check & alert history older than this value will be deleted."
        />
        {!userLoading && (
          <Autocomplete
            disablePortal
            multiple
            options={users?.data || []}
            getOptionLabel={(option) => option.name || ""}
            value={
              monitoring.users
                ? users?.data?.filter((feature) =>
                    monitoring.users.includes(feature._id)
                  ) || []
                : []
            }
            onChange={(event, newValues) => {
              setMonitoring({
                ...monitoring,
                users: newValues.map((item) => item._id),
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='filled'
                label="Default Contacts"
                error={
                  (!monitoring.users || monitoring.users.length === 0) &&
                  loading
                }
                helperText={
                  (!monitoring.users || monitoring.users.length === 0) &&
                  loading
                    ? "At least one user is required"
                    : "Contacts selected will be used for default alerts when adding new server, website or check."
                }
              />
            )}
            isOptionEqualToValue={(option, value) => option._id === value._id}
          />
        )}
      </div>

      <TonalButton
        disabled={loading}
        startIcon={<MdSave />}
        name={loading ? "Saving..." : isUpdate ? "Update" : "Save Changes"}
        type="submit"
        sx={{
          py: 1.4,
        }}
      />
    </form>
  );
};

export default MonitoringPage;
