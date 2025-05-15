import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  MdOutlineCheckBox,
  MdOutlineIndeterminateCheckBox,
  MdSave,
} from "react-icons/md";
import DashboardBreadcrumbs from "../../../components/UI/DashboardBreadcrumbs";
import Input from "../../../components/UI/Input";
import { TonalButton } from "../../../components/UI/PrimaryButton";
import { useCreateRoleMutation } from "../../../redux/features/roleApi";

const CreateRolePage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    permissions: [],
  });

  const handlePermissionChange = (category, permission) => {
    const permissionKey = `${category}:${permission}`;
    setFormData((prev) => {
      if (prev.permissions.includes(permissionKey)) {
        return {
          ...prev,
          permissions: prev.permissions.filter((p) => p !== permissionKey),
        };
      } else {
        return {
          ...prev,
          permissions: [...prev.permissions, permissionKey],
        };
      }
    });
  };

  const handleCheckAll = () => {
    const allPermissions = [];
    const categories = ['Servers', 'Groups', 'Users', 'Roles'];
    const actions = ['Add', 'Edit', 'Delete', 'View'];
    
    // Add all category permissions
    categories.forEach(category => {
      actions.forEach(action => {
        allPermissions.push(`${category}:${action}`);
      });
    });

    // Add misc permissions
    const miscPermissions = [
      'Manage Settings',
      'View System Logs',
      'View Alert Logs',
      'Show System Menu',
      'Search'
    ];
    miscPermissions.forEach(permission => {
      allPermissions.push(`Misc:${permission}`);
    });

    setFormData(prev => ({
      ...prev,
      permissions: allPermissions,
    }));
  };

  const handleUncheckAll = () => {
    setFormData(prev => ({
      ...prev,
      permissions: [],
    }));
  };

  const renderPermissionGroup = (title, category, permissions, color) => (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: (theme) =>
          theme.palette[color]?.main
            ? `${theme.palette[color].main}1A`
            : `${theme.palette.primary.main}1A`,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <div className="flex flex-col">
        {['Add', 'Edit', 'Delete', 'View'].map((permission) => (
          <FormControlLabel
            key={`${category}-${permission}`}
            control={
              <Checkbox
                checked={formData.permissions?.includes(`${category}:${permission}`)}
                onChange={() => handlePermissionChange(category, permission)}
                size="small"
              />
            }
            label={permission}
          />
        ))}
      </div>
    </Box>
  );

  const [createRole] = useCreateRoleMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createRole(formData).unwrap();

      toast.success(res?.message || "Role created successfully!");
      setFormData("");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: "xl", mx: "auto" }}>
      <DashboardBreadcrumbs name="Create New Role" />

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          label="Name"
          required
          fullWidth
        />

        <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {renderPermissionGroup(
            "Servers",
            "Servers",
            ['Add', 'Edit', 'Delete', 'View'],
            "error"
          )}
          {renderPermissionGroup(
            "Groups",
            "Groups",
            ['Add', 'Edit', 'Delete', 'View'],
            "info"
          )}
          {renderPermissionGroup(
            "Users",
            "Users",
            ['Add', 'Edit', 'Delete', 'View'],
            "success"
          )}
          {renderPermissionGroup(
            "Roles",
            "Roles",
            ['Add', 'Edit', 'Delete', 'View'],
            "secondary"
          )}

          <div className="md:col-span-2">
            <Box
              sx={{ border: 1, borderColor: "divider", p: 3, borderRadius: 2 }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Miscellaneous
              </Typography>
              <div className="grid lg:grid-cols-2 gap-2">
                {['Manage Settings', 'View System Logs', 'View Alert Logs', 'Show System Menu', 'Search'].map(
                  (permission) => (
                    <FormControlLabel
                      key={permission}
                      control={
                        <Checkbox
                          checked={formData.permissions?.includes(`Misc:${permission}`)}
                          onChange={() => handlePermissionChange("Misc", permission)}
                          size="small"
                        />
                      }
                      label={permission.split(/(?=[A-Z])/).join(" ")}
                    />
                  )
                )}
              </div>
            </Box>
          </div>
        </div>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<MdOutlineCheckBox />}
            onClick={handleCheckAll}
            sx={{
              textTransform: "none",
              fontWeight: "medium",
              boxShadow: "none",
              borderRadius: 20,
              px: 2.5,
            }}
          >
            Check All
          </Button>
          <Button
            variant="outlined"
            startIcon={<MdOutlineIndeterminateCheckBox />}
            onClick={handleUncheckAll}
            sx={{
              textTransform: "none",
              fontWeight: "medium",
              boxShadow: "none",
              borderRadius: 20,
              px: 2.5,
            }}
          >
            Uncheck All
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TonalButton
            disabled={loading}
            startIcon={<MdSave />}
            name={loading ? "Creating..." : "Create Role"}
            type="submit"
            sx={{
              py: 1.4,
            }}
          />
        </Box>
      </form>
    </Box>
  );
};

export default CreateRolePage;
