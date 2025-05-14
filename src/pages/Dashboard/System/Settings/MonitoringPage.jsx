/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import Input from "../../../../components/UI/Input";
import {
  TonalButton,
} from "../../../../components/UI/PrimaryButton";

import { Autocomplete, TextField } from "@mui/material";

import {
  useConfigsQuery,
  useContactsQuery,
  useUpdateConfigMutation,
} from "../../../../redux/features/configApi";

const initialState = {
  name: "",
};
const MonitoringPage = () => {
  const [loading, setLoading] = useState(false);

  const { data: configs, isLoading } = useConfigsQuery({
    fields: "checkTimeout,historyRetention,defaultContactIds",
  });

  const { data: contacts, isLoading: isContactLoading } = useContactsQuery({
    page: 1,
    limit: 50,
    fields: "name",
  });

  const data = configs?.data;

  const [updateConfig] = useUpdateConfigMutation();

  const [settings, setSettings] = useState({});

  useEffect(() => {
    if (data) {
      setSettings({
        checkTimeout: data?.checkTimeout || "",
        historyRetention: data?.historyRetention || "",
        defaultContactIds: data?.defaultContactIds || "",
      });
    } else {
      setSettings("");
    }
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateConfig({
        id: data?.id,
        data: settings,
      }).unwrap();
      toast.success(response?.message || "Settings updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-6 w-full" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          value={settings.checkTimeout}
          onChange={(e) =>
            setSettings({
              ...settings,
              checkTimeout: Number(e.target.value),
            })
          }
          name="checkTimeout"
          label="Check Timeout (s)"
          helperText="Default check timeout in seconds."
          focused
        />
        <Input
          value={settings.historyRetention}
          onChange={(e) =>
            setSettings({
              ...settings,
              historyRetention: Number(e.target.value),
            })
          }
          name="historyRetention"
          label="History Retention (days)"
          helperText="Server, website, check & alert history older than this value will be deleted."
          focused
        />
        <Autocomplete
          disablePortal
          multiple
          options={contacts?.data || []}
          getOptionLabel={(option) => option.name || ""}
          value={
            contacts?.data?.filter((contact) =>
              settings.defaultContactIds?.includes(contact.id)
            ) || []
          }
          onChange={(event, newValues) => {
            setSettings({
              ...settings,
              defaultContactIds: newValues.map((contact) => contact.id),
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Default Contacts"
              focused
              error={
                (!settings.defaultContactIds ||
                  settings.defaultContactIds.length === 0) &&
                loading
              }
              helperText={
                (!settings.defaultContactIds ||
                  settings.defaultContactIds.length === 0) &&
                loading
                  ? "At least one contact is required"
                  : "Contacts selected will be used for default alerts when adding new server, website or check."
              }
            />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      </div>

      <TonalButton
        disabled={loading}
        startIcon={<MdSave />}
        name={loading ? "Saving..." : "Save Changes"}
        type="submit"
        sx={{
          py: 1.4,
        }}
      />
    </form>
  );
};

export default MonitoringPage;
