import { EditOutlined } from "@mui/icons-material";
import {
  Dropdown,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import { occurrenceStatus } from "../../../../utils/occurrences";

function ToggleStatus({ status = "", onChange = () => {}, readOnly }) {
  return (
    <>
      <Dropdown>
        <MenuButton
          startDecorator={!readOnly && <EditOutlined />}
          size="sm"
          sx={{ pointerEvents: readOnly ? "none" : "auto" }}
          color={occurrenceStatus[status]?.color}
        >
          {occurrenceStatus[status]?.text}
        </MenuButton>
        {!readOnly && (
          <Menu
            placement="auto-start"
            sx={{ zIndex: (t) => t.zIndex.modal + 100 }}
          >
            {Object.keys(occurrenceStatus).map((statusKey) => (
              <MenuItem
                selected={status === statusKey}
                key={statusKey}
                color={occurrenceStatus[statusKey].color}
                onClick={() => onChange("status", statusKey)}
              >
                <ListItemDecorator>
                  {occurrenceStatus[statusKey].icon}
                </ListItemDecorator>{" "}
                {occurrenceStatus[statusKey].text}
              </MenuItem>
            ))}
          </Menu>
        )}
      </Dropdown>
    </>
  );
}

export default ToggleStatus;
