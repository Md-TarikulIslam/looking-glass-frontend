import { Button } from "@mui/material";
import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="dm">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

export default App;
