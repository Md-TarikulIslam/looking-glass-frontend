/* eslint-disable no-unused-vars */
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import Input from "../../../../components/UI/Input";
import {
  TonalButton,
} from "../../../../components/UI/PrimaryButton";
import {
  useCreateFeatureMutation,
  useDeleteFeatureMutation,
  useFeaturesQuery,
  useUpdateFeatureMutation,
} from "../../../../redux/features/featureApi";

const initialState = {
  name: "",
};
const GeneralPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [feature, setFeature] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { data: features, isLoading, refetch } = useFeaturesQuery();

  const [createFeature] = useCreateFeatureMutation();
  const [deleteFeature] = useDeleteFeatureMutation();
  const [updateFeature] = useUpdateFeatureMutation();

  useEffect(() => {
    if (isUpdate && selectedItem) {
      setFeature({
        name: selectedItem.name || "",
      });
    } else {
      setFeature(initialState);
    }
  }, [isUpdate, selectedItem]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isUpdate) {
        const response = await updateFeature({
          id: selectedItem._id,
          data: feature,
        }).unwrap();
        toast.success(response?.message || "Updated Successfully!");
        setFeature(initialState);
        refetch();
      } else {
        const response = await createFeature(feature).unwrap();
        toast.success(response?.message || "Created Successfully!");
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-6 w-full" onSubmit={handleFormSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          value={feature.name || ""}
          onChange={(e) =>
            setFeature({
              ...feature,
              name: e.target.value,
            })
          }
          name="name"
          label="Application Name"
          helperText="Application Name as it appears throughout the system"
        />
        <Input
          value={feature.applicationUrl || ""}
          onChange={(e) =>
            setFeature({
              ...feature,
              applicationUrl: e.target.value,
            })
          }
          name="applicationUrl"
          label="Application URL"
          helperText="Full installation URL including http:// or https:// (eg. http://mydomain.com/nmon/)"
        />
        <Input
          value={feature.companyName || ""}
          onChange={(e) =>
            setFeature({
              ...feature,
              companyName: e.target.value,
            })
          }
          name="companyName"
          label="Company Name"
          helperText="Company Name as it appears throughout the system"
        />

        <Input
          value={feature.systemLogRetention || ""}
          onChange={(e) =>
            setFeature({
              ...feature,
              systemLogRetention: Number(e.target.value),
            })
          }
          name="systemLogRetention"
          label="System Log Retention"
          helperText="Delete system log entries older then (days)"
        />
        <Autocomplete
          value={feature.recordDisplayPerPage?.toString() || ""}
          onChange={(event, newValue) =>
            setFeature({
              ...feature,
              recordDisplayPerPage: Number(newValue) || 10,
            })
          }
          options={["10", "25", "50", "100"]}
          renderInput={(params) => (
            <TextField
              variant="filled"
              {...params}
              label="Record to Display per Page"
              helperText="Record to Display per Page"
              required
            />
          )}
          disableClearable
          freeSolo={false}
        />
      </div>
      <div>
        <Input
          value={feature.companyDetails || ""}
          onChange={(e) =>
            setFeature({
              ...feature,
              companyDetails: e.target.value,
            })
          }
          multiline
          rows={4}
          fullWidth
          name="companyDetails"
          label="Company Details"
          helperText="Company Details used in the system for reports"
        />
      </div>
      <TonalButton
        disabled={loading}
        startIcon={<MdSave />}
        name={loading ? "Saving..." : isUpdate ? "Update" : "Save Changes"}
        type="submit"
        sx={{
          py: 1.4,
        }}
      />
    </form>
  );
};

export default GeneralPage;
