import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

export default function DashboardBreadcrumbs({ name, item }) {
  return (
    <div className="mb-4 flex justify-between">
      <Typography variant="h4" sx={{ color: "primary.main" }}>
        {name}
      </Typography>
      {item && (
        <Breadcrumbs>
          <Typography variant="p">{name}</Typography>
          {item && <Typography variant="p">{item}</Typography>}
        </Breadcrumbs>
      )}
    </div>
  );
}
