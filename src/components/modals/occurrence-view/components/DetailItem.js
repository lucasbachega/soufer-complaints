import { Stack, Typography } from "@mui/joy";
import React, { memo } from "react";

const DetailItem = ({ label, value }) => {
  return (
    <Stack direction="row" gap={2}>
      <Typography color="neutral" width={150} level="title-sm">
        {label}
      </Typography>
      <Typography flex={1} level="title-sm">
        {value || "--"}
      </Typography>
    </Stack>
  );
};

export default memo(DetailItem);
