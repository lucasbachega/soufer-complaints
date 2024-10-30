import {
    CampaignOutlined,
    ReportGmailerrorredOutlined,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/joy";
import React, { memo } from "react";
import ActionCard from "../../home/components/ActionCard";

const SelectType = ({ type = "", onChange = () => {} }) => {
  return (
    <Box flex={1} p={3}>
      <Typography textAlign={"center"} level="h2">
        O que você deseja relatar?
      </Typography>
      <Stack mt={3} direction={"row"} justifyContent={"center"} gap={2}>
        <ActionCard
          Icon={CampaignOutlined}
          title={"Reclamação"}
          onClick={() => onChange("complaint")}
        />
        <ActionCard
          Icon={ReportGmailerrorredOutlined}
          title={"Prática insegura"}
          onClick={() => onChange("insecurity")}
        />
      </Stack>
    </Box>
  );
};

export default memo(SelectType);
