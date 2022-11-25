import type { ReactElement } from "react";
import type { Theme } from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

interface StyleProps {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  width?: number | string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflow: "hidden",
    borderRadius: "2rem",
    maxWidth: ({ maxWidth }: StyleProps) =>
      maxWidth ? theme.breakpoints.values[maxWidth] : 0,
    width: ({ width }: StyleProps) => width, 
  },
}));

interface Props {
  children: ReactElement;
}

const Card = ({
  children,
  maxWidth,
  fullWidth,
  width,
  ...props
}: Props & StyleProps & PaperProps) => {
  const handleWidth = () => {
    if (fullWidth) return "100%"; 
    else if (width) return width; 
    else return "auto"; 
  };

  const classes = useStyles({ width: handleWidth(), maxWidth });

  return (
    <Paper classes={classes} {...props}>
      {children}
    </Paper>
  );
};

export default Card;
