import type { ReactElement } from "react";
import type { Theme } from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

interface StyleProps {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  width?: number | string;
  borderRadius?: string | number;
  height?: number | string;
  minHeight?: number | string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflow: "hidden",
    borderRadius: ({ borderRadius }: StyleProps) => borderRadius,
    width: ({ width }: StyleProps) => width,
    maxWidth: ({ maxWidth }: StyleProps) =>
      maxWidth ? theme.breakpoints.values[maxWidth] : "none",
    height: ({ height }: StyleProps) => height,
    minHeight: ({ minHeight }: StyleProps) => minHeight,    
  },
}));

interface Props {
  children: ReactElement;
}

export default function Card({
  children,
  maxWidth,
  fullWidth,
  width,
  borderRadius,
  height,
  minHeight,
  ...props
}: Props & StyleProps & PaperProps) {
  const classes = useStyles({
    width: handleWidth(),
    maxWidth,
    borderRadius,
    height,
    minHeight,
  });

  function handleWidth() {
    if (fullWidth) return "100%";
    else if (width) return width;
    else return "auto";
  }

  return (
    <Paper classes={classes} {...props}>
      {children}
    </Paper>
  );
}

Card;
