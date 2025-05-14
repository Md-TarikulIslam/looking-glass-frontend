import { useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import Input from "../../../../components/UI/Input";
import { TonalButton } from "../../../../components/UI/PrimaryButton";

const TwitterPage = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    consumerKey: "",
    consumerSecret: "",
    accessToken: "",
    accessTokenSecret: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call will be added later
      toast.success("Twitter settings updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-6 w-full" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          value={settings.consumerKey}
          onChange={(e) =>
            setSettings({
              ...settings,
              consumerKey: e.target.value,
            })
          }
          name="consumerKey"
          label="Consumer Key (API Key)"
          required
        />

        <Input
          value={settings.consumerSecret}
          onChange={(e) =>
            setSettings({
              ...settings,
              consumerSecret: e.target.value,
            })
          }
          name="consumerSecret"
          label="Consumer Secret (API Secret)"
          type="password"
          required
        />

        <Input
          value={settings.accessToken}
          onChange={(e) =>
            setSettings({
              ...settings,
              accessToken: e.target.value,
            })
          }
          name="accessToken"
          label="Access Token"
          required
        />

        <Input
          value={settings.accessTokenSecret}
          onChange={(e) =>
            setSettings({
              ...settings,
              accessTokenSecret: e.target.value,
            })
          }
          name="accessTokenSecret"
          label="Access Token Secret"
          type="password"
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

export default TwitterPage;