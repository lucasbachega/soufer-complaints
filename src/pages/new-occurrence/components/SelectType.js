import {
  CampaignOutlined,
  ReportGmailerrorredOutlined,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/joy";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import ActionCard from "../../home/components/ActionCard";

const SelectType = ({ onChange = () => {} }) => {
  const data = useSelector((state) => state.userInfo.data);
  return (
    <Box flex={1} p={3}>
      <Typography textAlign={"center"} color="neutral" level="h4">
        Olá, {data?.firstname}.
      </Typography>
      <Typography textAlign={"center"} level="h2">
        O que deseja relatar?
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
