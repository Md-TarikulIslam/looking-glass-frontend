import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import Input from "../../../../components/UI/Input";
import { TonalButton } from "../../../../components/UI/PrimaryButton";
import { useTwitterConfigsQuery, useUpdateTwitterConfigMutation } from "../../../../redux/features/twitterConfigApi";
import Loading from "../../../../components/UI/Loading";

const TwitterPage = () => {
  const [loading, setLoading] = useState(false);
  const { data: twitterConfigs, isLoading } = useTwitterConfigsQuery({
    fields:
      "consumerKey,consumerSecret,accessToken,accessTokenSecret",
  });
  const [updateTwitterConfig] = useUpdateTwitterConfigMutation();
  const data = twitterConfigs?.data;
  const [settings, setSettings] = useState({});
  useEffect(() => {
    if (data) {
     
      setSettings({
       
        consumerKey: data.consumerKey || "",
        consumerSecret: data.username || "",
        accessToken: data.accessToken,
        accessTokenSecret: data.accessTokenSecret,
      });
    }
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateTwitterConfig({
        id: data?.id,
        data: settings,
      }).unwrap();
      toast.success(response?.message || "Twitter config updated successfully!");
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
          value={settings.consumerKey}
          onChange={(e) =>
            setSettings({
              ...settings,
              consumerKey: e.target.value,
            })
          }
          name="consumerKey"
          label="Consumer Key (API Key)"
          focused
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
          focused
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
          focused
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

export default TwitterPage;