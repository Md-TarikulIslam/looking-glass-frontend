/* eslint-disable no-unused-vars */
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import Input from "../../../../components/UI/Input";
import { TonalButton } from "../../../../components/UI/PrimaryButton";
import {
  useConfigsQuery,
  useUpdateConfigMutation,
} from "../../../../redux/features/configApi";

const GeneralPage = () => {
  const [loading, setLoading] = useState(false);

  const { data: configs, isLoading } = useConfigsQuery({
    fields:
      "appName,appUrl,companyName,logRetention,tableRecords,companyDetails",
  });

  const data = configs?.data;

  const [updateConfig] = useUpdateConfigMutation();

  const [settings, setSettings] = useState({});

  useEffect(() => {
    if (data) {
      setSettings({
        appName: data?.appName || "",
        appUrl: data?.appUrl || "",
        companyDetails: data?.companyDetails || "",
        companyName: data?.companyName || "",
        logRetention: data?.logRetention || "",
        tableRecords: data?.tableRecords || 15,
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
          value={settings.appName}
          onChange={(e) =>
            setSettings({
              ...settings,
              appName: e.target.value,
            })
          }
          name="appName"
          label="Application Name"
          helperText="Application Name as it appears throughout the system"
          focused
        />
        <Input
          value={settings.appUrl}
          onChange={(e) =>
            setSettings({
              ...settings,
              appUrl: e.target.value,
            })
          }
          name="appUrl"
          label="Application URL"
          helperText="Full installation URL including http:// or https:// (eg. http://mydomain.com/nmon/)"
          focused
        />
        <Input
          value={settings.companyName}
          onChange={(e) =>
            setSettings({
              ...settings,
              companyName: e.target.value,
            })
          }
          name="companyName"
          label="Company Name"
          helperText="Company Name as it appears throughout the system"
          focused
        />

        <Input
          value={settings.logRetention}
          onChange={(e) =>
            setSettings({
              ...settings,
              logRetention: Number(e.target.value),
            })
          }
          name="logRetention"
          label="System Log Retention"
          helperText="Delete system log entries older then (days)"
          focused
        />
        <Autocomplete
          value={settings.tableRecords || ""}
          onChange={(event, newValue) =>
            setSettings({
              ...settings,
              tableRecords: Number(newValue) || 10,
            })
          }
          options={["10", "25", "50", "100"]}
          renderInput={(params) => (
            <TextField
              variant="filled"
              {...params}
              label="Record to Display per Page"
              helperText="Record to Display per Page"
              required
              focused
            />
          )}
          disableClearable
          freeSolo={false}
        />
      </div>
      <div>
        <Input
          value={settings.companyDetails}
          onChange={(e) =>
            setSettings({
              ...settings,
              companyDetails: e.target.value,
            })
          }
          multiline
          rows={4}
          fullWidth
          name="companyDetails"
          label="Company Details"
          helperText="Company Details used in the system for reports"
          focused
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

export default GeneralPage;
