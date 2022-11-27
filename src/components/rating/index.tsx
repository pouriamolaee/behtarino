import type { Theme } from "@mui/material";
import MuiRating, { RatingProps } from "@mui/material/Rating";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.main, 
  },
}));

export default function Rating(props: RatingProps) {
  const classes = useStyles();

  return <MuiRating classes={classes} {...props} />;
}
