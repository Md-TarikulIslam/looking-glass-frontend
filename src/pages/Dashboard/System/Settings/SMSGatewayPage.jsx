import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import Input from "../../../../components/UI/Input";
import {
  TonalButton,
} from "../../../../components/UI/PrimaryButton";

const smsProviders = [
  "Twilio",
  "SMS Global",
  "1s2u",
  "Messagebird",
  "Clickatell",
];

const SMSGatewayPage = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    provider: "Twilio",
    accountSid: "ACb3dc98f4864405ad590dd2152e182117",
    authToken: "",
    apiId: "",
    fromNumber: "Sierra Looking Glass",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call will be added later
      toast.success("SMS Gateway settings updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

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
            />
          )}
          disableClearable
        />

        <Input
          value={settings.accountSid}
          onChange={(e) =>
            setSettings({
              ...settings,
              accountSid: e.target.value,
            })
          }
          name="accountSid"
          label="Username/Account SID"
          required
        />

        <Input
          value={settings.authToken}
          onChange={(e) =>
            setSettings({
              ...settings,
              authToken: e.target.value,
            })
          }
          name="authToken"
          label="Password/Auth Token/Access Key"
          type="password"
          required
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
        />

        <Input
          value={settings.fromNumber}
          onChange={(e) =>
            setSettings({
              ...settings,
              fromNumber: e.target.value,
            })
          }
          name="fromNumber"
          label="From Name/Number/Originator"
          helperText="For SMS Global, Twilio, 1s2u and Messagebird"
          required
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
