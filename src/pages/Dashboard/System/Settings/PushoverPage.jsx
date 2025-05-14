import { useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import Input from "../../../../components/UI/Input";
import { TonalButton } from "../../../../components/UI/PrimaryButton";

const PushoverPage = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    applicationToken: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call will be added later
      toast.success("Pushover settings updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-6 w-full" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          value={settings.applicationToken}
          onChange={(e) =>
            setSettings({
              ...settings,
              applicationToken: e.target.value,
            })
          }
          name="applicationToken"
          label="Pushover Application API Token"
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

export default PushoverPage;