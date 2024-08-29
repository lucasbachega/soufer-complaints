import { Add, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import React, { memo } from "react";
import SectorsSelector from "../../../../inputs/selectors/SectorsSelector";
import UnitsSelector from "../../../../inputs/selectors/UnitsSelector";

const AreaItem = memo(
  ({
    index,
    area = {},
    onChange = () => {},
    onRemove = () => {},
    enableRemove,
  }) => {
    return (
      <Stack direction={"row"} gap={1} alignItems={"flex-end"}>
        <Box flex={1}>
          <UnitsSelector
            value={area?.unidade_id}
            size="sm"
            placeholder="Selecione"
            onChange={(v) => onChange(index, "unidade_id", v)}
          />
        </Box>
        <Box flex={1}>
          <SectorsSelector
            value={area?.setor_id}
            size="sm"
            placeholder="Selecione"
            onChange={(v) => onChange(index, "setor_id", v)}
          />
        </Box>
        {enableRemove && (
          <IconButton onClick={() => onRemove(index)} size="sm">
            <Close />
          </IconButton>
        )}
      </Stack>
    );
  }
);

const GestorControl = ({
  areas = [],
  onAddLine = () => {},
  onChangeArea = () => {},
  onRemoveArea = () => {},
  assignAllAreas,
  onChangeAreaAssignAllAreas,
}) => {
  return (
    <Box borderRadius={"sm"} p={2} mt={2} border={1} borderColor={"divider"}>
      <Typography level="title-lg" gutterBottom>
        Atribuir ocorrências
      </Typography>
      <Typography level="body-sm" color="neutral">
        Defina quais ocorrências o usuário terá permissão para gerenciar. De
        acordo com a unidade e setor.
      </Typography>

      <FormControl>
        <Checkbox
          sx={{ mt: 2 }}
          label="Atribuir de todas unidades e setores"
          checked={assignAllAreas}
          onChange={onChangeAreaAssignAllAreas}
        />
      </FormControl>

      {!assignAllAreas && (
        <>
          <Stack py={2} direction={"column"} gap={2}>
            {areas?.map((area, idx) => {
              return (
                <AreaItem
                  key={idx.toString()}
                  index={idx}
                  area={area}
                  onChange={onChangeArea}
                  onRemove={onRemoveArea}
                  enableRemove={areas?.length > 1}
                />
              );
            })}
          </Stack>

          <Button
            size="sm"
            variant="plain"
            startDecorator={<Add />}
            onClick={onAddLine}
          >
            Adicionar linha
          </Button>
        </>
      )}
    </Box>
  );
};

export default memo(GestorControl);
