import { Avatar, Box, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { MdLogout } from "react-icons/md";

export function ProfileMenu({ mini }) {
    return (
      <Box
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
          '&:hover': {
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
              alt="Md. Tarikul Islam"
              sx={{ width: 40, height: 40 }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: "primary.main", fontWeight: "medium" }}
              >
                Md. Tarikul Islam
              </Typography>
              <Typography variant="caption">tarikul2605@gmail.com</Typography>
            </Box>
            <Box>
              <MdLogout color={red[500]} size={20} />
            </Box>
          </Stack>
        )}
      </Box>
    );
  }