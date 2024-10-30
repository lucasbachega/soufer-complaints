import { Input, Stack, Typography } from "@mui/joy";
import React, { memo } from "react";

const PeriodInput = ({
  startDate,
  endDate,
  onChangeStartDate = () => {},
  onChangeEndDate = () => {},
}) => {
  return (
    <Stack direction={"row"} alignItems={"center"} gap={1}>
      <Typography level="body-sm">Prazo</Typography>
      <Input
        size="sm"
        variant="soft"
        type="date"
        value={startDate}
        onChange={(e) => onChangeStartDate(e.target.value)}
      />
      <Typography level="body-sm">Até</Typography>
      <Input
        size="sm"
        variant="soft"
        type="date"
        value={endDate}
        onChange={(e) => onChangeEndDate(e.target.value)}
        slotProps={{
          input: {
            min: startDate,
          },
        }}
      />
    </Stack>
  );
};

export default memo(PeriodInput);
