import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import PrimaryButton, { TonalButton } from "../../../../components/UI/PrimaryButton";

const timezones = [
    "(UTC-12:00) Baker Island",
    "(UTC-11:00) American Samoa, Niue",
    "(UTC-10:00) Hawaii, Cook Islands",
    "(UTC-09:00) Alaska",
    "(UTC-08:00) Pacific Time (US & Canada)",
    "(UTC-07:00) Mountain Time (US & Canada)",
    "(UTC-06:00) Central Time (US & Canada), Mexico City",
    "(UTC-05:00) Eastern Time (US & Canada), Bogota",
    "(UTC-04:00) Atlantic Time (Canada), Caracas",
    "(UTC-03:00) Buenos Aires, Sao Paulo",
    "(UTC-02:00) Mid-Atlantic",
    "(UTC-01:00) Azores, Cape Verde Islands",
    "(UTC+00:00) London, Dublin, UTC",
    "(UTC+01:00) Berlin, Paris, Rome",
    "(UTC+02:00) Cairo, Jerusalem, Athens",
    "(UTC+03:00) Moscow, Baghdad, Kuwait",
    "(UTC+04:00) Dubai, Baku, Tbilisi",
    "(UTC+05:00) Karachi, Tashkent",
    "(UTC+05:30) Mumbai, Colombo",
    "(UTC+05:45) Kathmandu",
    "(UTC+06:00) Dhaka, Almaty",
    "(UTC+06:30) Yangon",
    "(UTC+07:00) Bangkok, Jakarta",
    "(UTC+08:00) Beijing, Singapore, Hong Kong",
    "(UTC+09:00) Tokyo, Seoul",
    "(UTC+09:30) Adelaide, Darwin",
    "(UTC+10:00) Sydney, Melbourne, Brisbane",
    "(UTC+11:00) Solomon Islands, New Caledonia",
    "(UTC+12:00) Auckland, Fiji",
    "(UTC+13:00) Samoa, Tonga",
    "(UTC+14:00) Line Islands"
  ];

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
  const [settings, setSettings] = useState({
    timezone: "(UTC+06:00) Dhaka",
    firstDayOfWeek: "Sunday",
    dateFormat: "DD/MM/YYYY",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call will be added later
      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-6 w-full" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <Autocomplete
          value={settings.timezone}
          onChange={(event, newValue) =>
            setSettings({
              ...settings,
              timezone: newValue,
            })
          }
          options={timezones}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='filled'
              label="Timezone"
              helperText="Select your timezone"
              required
            />
          )}
          disableClearable
        />

        <Autocomplete
          value={settings.firstDayOfWeek}
          onChange={(event, newValue) =>
            setSettings({
              ...settings,
              firstDayOfWeek: newValue,
            })
          }
          options={weekDays}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='filled'
              label="First Day of Week"
              helperText="Select first day of the week"
              required
            />
          )}
          disableClearable
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
              variant='filled'
              label="Date Format"
              helperText="Select your preferred date format"
              required
            />
          )}
          disableClearable
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
