import { Stack, Typography } from "@mui/joy";
import React, { memo } from "react";

const DetailItem = ({ label, value, color, width = 150 }) => {
  return (
    <Stack direction="row" gap={2}>
      <Typography color="neutral" width={width} level="title-sm">
        {label}
      </Typography>
      <Typography flex={1} level="title-sm" color={color} component={"div"}>
        {value || "--"}
      </Typography>
    </Stack>
  );
};

export default memo(DetailItem);
