import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import Input from "../../../../components/UI/Input";
import Loading from "../../../../components/UI/Loading";
import { TonalButton } from "../../../../components/UI/PrimaryButton";
import {
  useOtherConfigsQuery,
  useUpdateOtherConfigMutation,
} from "../../../../redux/features/otherConfigApi";

const PushoverPage = () => {
  const [loading, setLoading] = useState(false);
  const { data: otherConfigs, isLoading } = useOtherConfigsQuery({
    fields: "pushoverToken",
  });
  const [updateOtherConfig] = useUpdateOtherConfigMutation();
  const data = otherConfigs?.data;
  const [settings, setSettings] = useState({});
  useEffect(() => {
    if (data) {
      setSettings({
        pushoverToken: data.pushoverToken || "",
      });
    }
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateOtherConfig({
        id: data?.id,
        data: settings,
      }).unwrap();
      toast.success(response?.message || "Pushover updated successfully!");
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
          value={settings.pushoverToken}
          onChange={(e) =>
            setSettings({
              ...settings,
              pushoverToken: e.target.value,
            })
          }
          name="pushoverToken"
          label="Pushover Application API Token"
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

export default PushoverPage;
