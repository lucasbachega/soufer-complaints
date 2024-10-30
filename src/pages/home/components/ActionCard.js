import { Card, CardContent, Chip, Typography } from "@mui/joy";
import React from "react";

const ActionCard = ({ title, Icon, description, disabled, onClick, isNew }) => {
  return (
    <Card
      component={"div"}
      onClick={onClick}
      variant="outlined"
      sx={{
        position: "relative",
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
      {isNew && (
        <Chip
          variant="soft"
          color="success"
          size="md"
          sx={{
            position: "absolute",
            top: -2,
            right: -2,
            fontWeight: "xl",
            boxShadow: "sm",
          }}
        >
          Novidade
        </Chip>
      )}
      <Icon color="primary" sx={{ fontSize: "2rem" }} />
      <CardContent>
        <Typography level="h3" fontSize={"1.3rem"}>
          {title}
        </Typography>
        <Typography color="neutral" level="body-md">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActionCard;
