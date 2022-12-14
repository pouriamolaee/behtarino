import type { Theme } from "@mui/material";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    outlineOffset: "3px",
  },
}));

interface Props {
  radiosCount?: number;
  activeId: number;
  setActiveId: (activeId: number) => void;
  handleColor: (radioId: number) => string;
}

export default function RadioGroup({
  radiosCount = 5,
  activeId,
  setActiveId,
  handleColor,
}: Props) {
  const classes = useStyles();
  const radioIds = new Array(radiosCount)
    .fill(undefined)
    .map((_, idx) => ++idx);

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {radioIds.map((radioId) => (
        <ButtonBase
          key={radioId}
          onClick={setActiveId.bind(null, radioId)}
          classes={classes}
          sx={{
            backgroundColor: handleColor(radioId),
            outline:
              activeId === radioId
                ? `1px solid ${handleColor(radioId)}`
                : "none",
          }}
        />
      ))}
    </Stack>
  );
}
