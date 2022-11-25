import MuiRating, { RatingProps } from "@mui/material/Rating";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    color: "red",
  },
});

export default function Rating(props: RatingProps) {
  const classes = useStyles();

  return <MuiRating classes={classes} {...props} />;
}
