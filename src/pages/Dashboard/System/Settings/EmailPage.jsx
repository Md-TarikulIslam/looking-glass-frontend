import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import Input from "../../../../components/UI/Input";
import PrimaryButton, {
  TonalButton,
} from "../../../../components/UI/PrimaryButton";

const securityOptions = ["None", "SSL", "TLS"];

const EmailPage = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    fromEmail: "noreply@sierrasolution.com",
    fromName: "Sierra Support",
    enableSMTP: true,
    requiresAuth: false,
    smtpHost: "smtp.zoho.com",
    smtpPort: "465",
    smtpUsername: "noreply@sierrasolution.com",
    smtpPassword: "",
    smtpSecurity: "SSL",
    authDomain: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call will be added later
      toast.success("Email settings updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-6 w-full" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          value={settings.fromEmail}
          onChange={(e) =>
            setSettings({
              ...settings,
              fromEmail: e.target.value,
            })
          }
          name="fromEmail"
          label="Email From Address"
          type="email"
          required
        />

        <Input
          value={settings.fromName}
          onChange={(e) =>
            setSettings({
              ...settings,
              fromName: e.target.value,
            })
          }
          name="fromName"
          label="Emails From Name"
          required
        />

        <div className="flex flex-col gap-2">
          <FormControlLabel
            control={
              <Checkbox
                checked={settings.enableSMTP}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enableSMTP: e.target.checked,
                  })
                }
              />
            }
            label="Enable SMTP"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={settings.requiresAuth}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    requiresAuth: e.target.checked,
                  })
                }
              />
            }
            label="SMTP Requires Authentication"
          />
        </div>

        <Input
          value={settings.smtpHost}
          onChange={(e) =>
            setSettings({
              ...settings,
              smtpHost: e.target.value,
            })
          }
          name="smtpHost"
          label="SMTP Host"
          required={settings.enableSMTP}
        />

        <Input
          value={settings.smtpPort}
          onChange={(e) =>
            setSettings({
              ...settings,
              smtpPort: e.target.value,
            })
          }
          name="smtpPort"
          label="SMTP Port"
          type="number"
          required={settings.enableSMTP}
        />

        <Input
          value={settings.smtpUsername}
          onChange={(e) =>
            setSettings({
              ...settings,
              smtpUsername: e.target.value,
            })
          }
          name="smtpUsername"
          label="SMTP Username"
          required={settings.enableSMTP && settings.requiresAuth}
        />

        <Input
          value={settings.smtpPassword}
          onChange={(e) =>
            setSettings({
              ...settings,
              smtpPassword: e.target.value,
            })
          }
          name="smtpPassword"
          label="SMTP Password"
          type="password"
          required={settings.enableSMTP && settings.requiresAuth}
        />

        <Autocomplete
          value={settings.smtpSecurity}
          onChange={(event, newValue) =>
            setSettings({
              ...settings,
              smtpSecurity: newValue,
            })
          }
          options={securityOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="SMTP Security"
              required={settings.enableSMTP}
            />
          )}
          disableClearable
        />

        <Input
          value={settings.authDomain}
          onChange={(e) =>
            setSettings({
              ...settings,
              authDomain: e.target.value,
            })
          }
          name="authDomain"
          label="SMTP Authentication Domain"
          helperText="Use in case of connecting to an Exchange server or similar server requiring NTLM authentication."
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

export default EmailPage;
