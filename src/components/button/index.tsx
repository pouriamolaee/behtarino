import type { ReactElement, ReactNode } from "react";
import type { Theme } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: "0.5rem",
    height: "2.75rem",
    padding: "1rem",
    boxShadow: `${theme.palette.primary.main} 0px 5px 15px`,
  },
}));

interface Props {
  children: ReactNode | ReactElement;
}

export default function Button({ children }: Props) {
  const classes = useStyles();

  return <ButtonBase classes={classes}>{children}</ButtonBase>;
}
