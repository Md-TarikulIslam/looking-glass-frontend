import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import Input from "../../../../components/UI/Input";
import Loading from "../../../../components/UI/Loading";
import { TonalButton } from "../../../../components/UI/PrimaryButton";
import {
  useEmailConfigsQuery,
  useUpdateEmailConfigMutation,
} from "../../../../redux/features/emailConfigApi";

const securityOptions = ["None", "SSL", "TLS"];

const EmailPage = () => {
  const [loading, setLoading] = useState(false);
  const { data: emailConfigs, isLoading } = useEmailConfigsQuery({
    fields:
      "fromAddress,fromName,smtpAuth,smtpEnable,smtpHost,smtpPort,smtpUsername,smtpPassword,smtpEncryption,smtpAuthDomain",
  });
  const [updateEmailConfig] = useUpdateEmailConfigMutation();
  const data = emailConfigs?.data;
  const [settings, setSettings] = useState({});
  useEffect(() => {
    if (data) {
      setSettings({
        fromAddress: data.fromAddress || "",
        fromName: data.fromName || "",
        smtpEnable: Boolean(data.smtpEnable),
        smtpAuth: Boolean(data.smtpAuth),
        smtpHost: data.smtpHost || "",
        smtpPort: data.smtpPort || "",
        smtpUsername: data.smtpUsername || "",
        smtpPassword: data.smtpPassword || "",
        smtpEncryption: data.smtpEncryption?.toLowerCase() || "none",
        smtpAuthDomain: data.smtpAuthDomain || "",
      });
    }
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateEmailConfig({
        id: data?.id,
        data: settings,
      }).unwrap();
      toast.success(response?.message || "Email config updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <form className="space-y-6 w-full" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          value={settings.fromAddress}
          onChange={(e) =>
            setSettings({
              ...settings,
              fromAddress: e.target.value,
            })
          }
          name="fromAddress"
          label="Email From Address"
          type="email"
          required
          focused
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
          focused
        />

        <div className="flex flex-col gap-2">
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(settings.smtpEnable)}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    smtpEnable: e.target.checked,
                  })
                }
              />
            }
            label="Enable SMTP"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(settings.smtpAuth)}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    smtpAuth: e.target.checked,
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
          focused
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
          focused
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
          focused
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
          focused
        />

        <Autocomplete
          value={settings.smtpEncryption || "none"}
          onChange={(event, newValue) =>
            setSettings({
              ...settings,
              smtpEncryption: newValue,
            })
          }
          options={securityOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="SMTP Security"
              required={settings.smtpEnable}
              focused
            />
          )}
          disableClearable
          isOptionEqualToValue={(option, value) =>
            option.toLowerCase() === value.toLowerCase()
          }
        />

        <Input
          value={settings.smtpAuthDomain}
          onChange={(e) =>
            setSettings({
              ...settings,
              smtpAuthDomain: e.target.value,
            })
          }
          name="smtpAuthDomain"
          label="SMTP Authentication Domain"
          helperText="Use in case of connecting to an Exchange server or similar server requiring NTLM authentication."
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

export default EmailPage;
