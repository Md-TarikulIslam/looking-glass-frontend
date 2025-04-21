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

const CreateRolePage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    permissions: {
      servers: {
        add: false,
        edit: false,
        delete: false,
        view: false,
      },
      groups: {
        add: false,
        edit: false,
        delete: false,
        view: false,
      },
      users: {
        add: false,
        edit: false,
        delete: false,
        view: false,
      },
      roles: {
        add: false,
        edit: false,
        delete: false,
        view: false,
      },
      misc: {
        ManageSettings: false,
        ViewSystemLogs: false,
        ViewAlertLogs: false,
        ShowSystemMenu: false,
        Search: false,
      },
    },
  });

  const handlePermissionChange = (category, permission) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [category]: {
          ...formData.permissions[category],
          [permission]: !formData.permissions[category][permission],
        },
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call will be added later
      toast.success("Role created successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  const handleCheckAll = () => {
    const newPermissions = {};
    Object.keys(formData.permissions).forEach((category) => {
      newPermissions[category] = {};
      Object.keys(formData.permissions[category]).forEach((permission) => {
        newPermissions[category][permission] = true;
      });
    });
    setFormData({
      ...formData,
      permissions: newPermissions,
    });
  };

  const handleUncheckAll = () => {
    const newPermissions = {};
    Object.keys(formData.permissions).forEach((category) => {
      newPermissions[category] = {};
      Object.keys(formData.permissions[category]).forEach((permission) => {
        newPermissions[category][permission] = false;
      });
    });
    setFormData({
      ...formData,
      permissions: newPermissions,
    });
  };

  const renderPermissionGroup = (title, category, permissions, color) => (
    <Box
      sx={{
        // border: 1,
        // borderColor: "divider",
        p: 3,
        borderRadius: 2,
        backgroundColor: (theme) => theme.palette[color]?.main ? `${theme.palette[color].main}1A` : `${theme.palette.primary.main}1A`,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <div className="flex flex-col">
        {Object.keys(permissions).map((permission) => (
          <FormControlLabel
            key={`${category}-${permission}`}
            control={
              <Checkbox
                checked={formData.permissions[category][permission]}
                onChange={() => handlePermissionChange(category, permission)}
                size="small"
              />
            }
            label={permission.charAt(0).toUpperCase() + permission.slice(1)}
          />
        ))}
      </div>
    </Box>
  );

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
            "servers",
            formData.permissions.servers,
            "error"
          )}
          {renderPermissionGroup(
            "Groups",
            "groups",
            formData.permissions.groups,
            "info"
          )}
          {renderPermissionGroup(
            "Users",
            "users",
            formData.permissions.users,
            "success"
          )}
          {renderPermissionGroup(
            "Roles",
            "roles",
            formData.permissions.roles,
            "secondary"
          )}
          
      <div className="md:col-span-2">
      <Box  sx={{ border: 1, borderColor: "divider", p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Miscellaneous
          </Typography>
          <div className="grid lg:grid-cols-2 gap-2">
            {Object.entries(formData.permissions.misc).map(([key, value]) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={value}
                    onChange={() => handlePermissionChange("misc", key)}
                    size="small"
                  />
                }
                label={key.split(/(?=[A-Z])/).join(" ")}
              />
            ))}
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
