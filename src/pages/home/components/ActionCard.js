import { Card, CardContent, Typography } from "@mui/joy";
import React from "react";

const ActionCard = ({ title, Icon, description, disabled, onClick }) => {
  return (
    <Card
      component={"div"}
      onClick={onClick}
      variant="outlined"
      sx={{
        cursor: "pointer",
        width: { xs: "100%", sm: 300 },
        "&:hover": !disabled && {
          boxShadow: "lg",
          borderColor: "primary.400",
        },
        ":active": !disabled && {
          outline: (t) => `1px solid ${t.palette.primary.plainColor}`,
        },
      }}
    >
      <Icon sx={{ fontSize: "4rem" }} />
      <CardContent>
        <Typography level="h3">{title}</Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ActionCard;
