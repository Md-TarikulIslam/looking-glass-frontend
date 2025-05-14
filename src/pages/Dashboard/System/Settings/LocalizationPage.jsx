import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import timezones from "timezones-list";
import { TonalButton } from "../../../../components/UI/PrimaryButton";
import {
  useConfigsQuery,
  useUpdateConfigMutation,
} from "../../../../redux/features/configApi";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const dateFormats = [
  "DD/MM/YYYY",
  "MM/DD/YYYY",
  "YYYY/MM/DD",
  "DD-MM-YYYY",
  "MM-DD-YYYY",
  "YYYY-MM-DD",
];

const LocalizationPage = () => {
  const [loading, setLoading] = useState(false);

  const { data: configs } = useConfigsQuery({
    fields: "weekStart,timeZone,dateFormat",
  });

  const data = configs?.data;
  const [updateConfig] = useUpdateConfigMutation();

  const [settings, setSettings] = useState({
    weekStart: "",
    timeZone: "",
    dateFormat: "",
  });

  useEffect(() => {
    if (data) {
      setSettings({
        weekStart: data.weekStart || "",
        timeZone: data.timeZone || "",
        dateFormat: data.dateFormat || "",
      });
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
        <Autocomplete
          value={settings.timeZone}
          onChange={(event, newValue) =>
            setSettings({
              ...settings,
              timeZone: newValue.tzCode,
            })
          }
          options={timezones}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Time Zone"
              helperText="Select your timezone"
              required
            />
          )}
          disableClearable
          isOptionEqualToValue={(option, value) => option === value}
        />

        <Autocomplete
          value={settings.weekStart}
          onChange={(event, newValue) =>
            setSettings({
              ...settings,
              weekStart: newValue,
            })
          }
          options={weekDays}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Week Start"
              helperText="Select first day of the week"
              required
            />
          )}
          disableClearable
          isOptionEqualToValue={(option, value) => option === value}
        />

        <Autocomplete
          value={settings.dateFormat}
          onChange={(event, newValue) =>
            setSettings({
              ...settings,
              dateFormat: newValue,
            })
          }
          options={dateFormats}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Date Format"
              helperText="Select your preferred date format"
              required
            />
          )}
          disableClearable
          isOptionEqualToValue={(option, value) => option === value}
        />
      </div>

      <TonalButton
        disabled={loading}
        startIcon={<MdSave />}
        name="Save Changes"
        type="submit"
        sx={{
          py: 1.4,
        }}
      />
    </form>
  );
};

export default LocalizationPage;
