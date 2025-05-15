import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import Input from "../../../../components/UI/Input";
import { TonalButton } from "../../../../components/UI/PrimaryButton";
import {
  useSmsConfigsQuery,
  useUpdateSmsConfigMutation,
} from "../../../../redux/features/smsConfigApi";
import Loading from "../../../../components/UI/Loading";

const smsProviders = [
  "Twilio",
  "SMS Global",
  "1s2u",
  "Messagebird",
  "Clickatell",
];

const SMSGatewayPage = () => {
  const [loading, setLoading] = useState(false);
  const { data: smsConfigs, isLoading } = useSmsConfigsQuery({
    fields:
      "provider,username,password,apiId,smsFrom,smtpPort,smtpUsername,smtpPassword,smtpEncryption,passwordDomain",
  });
  const [updateSmsConfig] = useUpdateSmsConfigMutation();
  const data = smsConfigs?.data;
  const [settings, setSettings] = useState({});
  useEffect(() => {
    if (data) {
      setSettings({
        provider: data.provider, // Use the provider value directly from API
        username: data.username || "",
        apiId: data.apiId,
        password: data.password,
        smsFrom: data.smsFrom || "",
      });
    }
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateSmsConfig({
        id: data?.id,
        data: settings,
      }).unwrap();
      toast.success(response?.message || "SMS config updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };
  if (isLoading) {
    return <Loading />;
  }

  console.log(data);

  return (
    <form className="space-y-6 w-full" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <Autocomplete
          value={settings.provider}
          onChange={(event, newValue) =>
            setSettings({
              ...settings,
              provider: newValue,
            })
          }
          options={smsProviders}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="SMS Provider"
              required
              focused
            />
          )}
          disableClearable
        />

        <Input
          value={settings.username}
          onChange={(e) =>
            setSettings({
              ...settings,
              username: e.target.value,
            })
          }
          name="username"
          label="Username/Account SID"
          required
          focused
        />

        <Input
          value={settings.password}
          onChange={(e) =>
            setSettings({
              ...settings,
              password: e.target.value,
            })
          }
          name="password"
          label="Password/Auth Token/Access Key"
          type="password"
          required
          focused
        />

        <Input
          value={settings.apiId}
          onChange={(e) =>
            setSettings({
              ...settings,
              apiId: e.target.value,
            })
          }
          name="apiId"
          label="API ID"
          helperText="Only for Clickatell"
          focused
        />

        <Input
          value={settings.smsFrom}
          onChange={(e) =>
            setSettings({
              ...settings,
              smsFrom: e.target.value,
            })
          }
          name="smsFrom"
          label="From Name/Number/Originator"
          helperText="For SMS Global, Twilio, 1s2u and Messagebird"
          required
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

export default SMSGatewayPage;
