/* eslint-disable no-unused-vars */
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

export function ProfileMenu({ mini }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleLogout = async () => {
    try {
      dispatch(logout());
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Box
      onClick={handleLogout}
      sx={{
        padding: mini ? 1.5 : 1,
        backgroundColor: red[50],
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        marginTop: "auto",
        display: "flex",
        darkMode: "dark",
        transition: "all 0.3s ease-in-out",
        justifyContent: mini ? "center" : "flex-start",
        // width:  mini ? "10%" : "100%",
        overflow: "hidden",
        "&:hover": {
          backgroundColor: red[100],
          cursor: "pointer",
        },
      }}
    >
      {mini ? (
        <Avatar
          src="https://avatars.githubusercontent.com/u/19550456"
          alt="Md. Tarikul Islam"
          sx={{ width: 32, height: 32 }}
        />
      ) : (
        <Stack direction="row" spacing={2} alignItems="center" width="100%">
          <Avatar
            src="https://avatars.githubusercontent.com/u/19550456"
            alt={user?.name}
            sx={{ width: 40, height: 40 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: "primary.main", fontWeight: "medium" }}
            >
              {user?.name}
            </Typography>
            <Typography variant="caption"> {user?.email}</Typography>
          </Box>
          <Box>
            <MdLogout color={red[500]} size={20} />
          </Box>
        </Stack>
      )}
    </Box>
  );
}
