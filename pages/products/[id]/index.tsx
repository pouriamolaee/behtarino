import type { GetServerSideProps } from "next";
import type { Theme } from "@mui/material";
import type { Product } from "@src/models";
import { useState } from "react";
import Head from "next/head";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Card from "@src/components/card";
import Rating from "@src/components/rating";
import RadioGroup from "@src/components/radio-group";
import Button from "@src/components/button";
import en from "@src/lang/en";

interface StyleProps {
  productColor: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: theme.palette.background.default,
    width: "100vw",
    minHeight: "100vh",
  },
}));

interface Props {
  product: Product;
}

export default function Product({ product }: Props) {
  const [activeColorId, setActiveColorId] = useState(1);
  const classes = useStyles();
  const theme = useTheme();
  const idDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const idDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  function handleProductColor(activeColorId: number) {
    switch (activeColorId) {
      case 1:
        return "cyan";
      case 2:
        return "yellow";
      case 3:
        return "purple";
      case 4:
        return "black";
      case 5:
        return "gray";
      default:
        return "cyan";
    }
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        component="main"
        className={classes.main}
        alignItems="center"
        justifyContent="center"
      >
        <Card
          elevation={24}
          fullWidth
          maxWidth={idDownMd ? "sm" : "md"}
          borderRadius={idDownSm ? "0" : "1rem"}
          minHeight={idDownSm ? "100vh" : "none"}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              sm={4}
              minHeight="5rem"
              sx={{ backgroundColor: handleProductColor(activeColorId) }}
            />

            <Grid item xs={12} sm={8} px={6} py={8}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  {product.title}
                </Typography>
                <Rating
                  precision={0.1}
                  readOnly
                  value={product.rating.rate}
                  size="small"
                />
              </Stack>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                textTransform="uppercase"
                color="GrayText"
                fontStyle="italic"
              >
                {product.category}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                textTransform="uppercase"
                color="primary"
              >
                ${product.price}
              </Typography>
              <Box my={4}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {en.DESCRIPTION}
                </Typography>
                <Typography variant="body2" color="GrayText">
                  {product.description}
                </Typography>
              </Box>
              <Stack mb={4} spacing={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {en.COLOR}
                </Typography>
                <RadioGroup
                  activeId={activeColorId}
                  setActiveId={setActiveColorId}
                  handleColor={handleProductColor}
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ShoppingCartRoundedIcon />
                    <Typography variant="subtitle2" fontWeight="bold">
                      {en.ADD_TO_CART}
                    </Typography>
                  </Stack>
                </Button>
                <ShareRoundedIcon color="disabled" />
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Stack>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`https://fakestoreapi.com/products/${params?.id}`);
  const product = await res.json();

  return {
    props: { product },
  };
};
