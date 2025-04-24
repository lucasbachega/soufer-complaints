import { Add, Close, LocationOnOutlined } from "@mui/icons-material";
import {
    Button,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Stack,
} from "@mui/joy";
import React, { useEffect, useState } from "react";

const WaypointsInput = ({ data = [""], onChange }) => {
  const [waypoints, setWaypoints] = useState(data);

  const addPoint = () => {
    setWaypoints((prev) => ["", ...prev]);
    const input = document.getElementById("point_0");
    if (input) {
      input.focus();
    }
  };

  const removePoint = (idx) => {
    setWaypoints((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      return updated;
    });
  };
  const onChangePoint = (value, idx) => {
    setWaypoints((prev) => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });
  };

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(waypoints);
    }
  }, [waypoints]);

  return (
    <div>
      <FormControl required>
        <FormLabel>Destino</FormLabel>
        <Stack mt={1} gap={1.5}>
          {waypoints?.map((point, idx) => {
            const isLast = idx === waypoints.length - 1;
            return (
              <Stack
                direction={"row"}
                alignItems={"center"}
                key={idx.toString()}
                gap={1}
              >
                <Input
                  autoFocus={waypoints?.length === 1}
                  fullWidth
                  slotProps={{
                    input: {
                      id: `point_${idx}`,
                    },
                  }}
                  startDecorator={isLast && <LocationOnOutlined />}
                  placeholder={isLast ? "Para onde?" : "Passando por"}
                  value={point}
                  onChange={(event) => onChangePoint(event.target.value, idx)}
                />
                {waypoints?.length > 1 && (
                  <IconButton size="sm" onClick={() => removePoint(idx)}>
                    <Close />
                  </IconButton>
                )}
              </Stack>
            );
          })}
        </Stack>
      </FormControl>
      <Button
        onClick={addPoint}
        startDecorator={<Add />}
        size="sm"
        variant="plain"
        sx={{ mt: 1 }}
      >
        Adicionar parada
      </Button>
    </div>
  );
};

export default WaypointsInput;
