import type { GetServerSideProps } from "next";
import type { Theme } from "@mui/material";
import type { Product } from "@src/models";
import { useState } from "react";
import Head from "next/head";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import * as Colors from "@mui/material/colors";
import Card from "@src/components/card";
import Rating from "@src/components/rating";
import RadioGroup from "@src/components/radio-group";
import Button from "@src/components/button";
import en from "@src/lang/en";

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: theme.palette.background.default,
    width: "100vw",
    minHeight: "100vh",
  },
}));

interface Props {
  product: Product | null;
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
        return Colors.cyan[300];
      case 2:
        return Colors.yellow[500];
      case 3:
        return Colors.purple[700];
      case 4:
        return theme.palette.common.black;
      case 5:
        return Colors.grey[300];
      default:
        return Colors.cyan[300];
    }
  }

  return (
    <>
      <Head>
        <title>{product?.title || "Behtarino"}</title>
        <meta name="description" content={product?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        component="main"
        className={classes.main}
        alignItems="center"
        justifyContent="center"
      >
        {!product ? (
          <CircularProgress color="primary" />
        ) : (
          <Card
            elevation={24}
            fullWidth
            maxWidth={idDownMd ? "sm" : "md"}
            borderRadius={idDownSm ? "0" : "1rem"}
            minHeight={idDownSm ? "100vh" : "initial"}
          >
            <Grid container>
              <Grid
                item
                sm={4}
                xs={12}
                minHeight="7rem"
                sx={{ backgroundColor: handleProductColor(activeColorId) }}
              />
              <Grid
                item
                sm={8}
                xs={12}
                px={idDownMd ? 3 : 6}
                py={idDownMd ? 4 : 8}
                minHeight={idDownSm ? "calc(100vh - 7rem)" : "initial"}
                container
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box>
                  <Stack
                    spacing={1}
                    direction={idDownMd ? "column-reverse" : "row"}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      textTransform="uppercase"
                      fontFamily="Roboto Condensed"
                      textAlign={idDownMd ? "center" : "left"}
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
                    textAlign={idDownMd ? "center" : "left"}
                  >
                    {product.category}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    textTransform="uppercase"
                    color="primary"
                    textAlign={idDownMd ? "center" : "left"}
                  >
                    ${product.price}
                  </Typography>
                  <Box my={idDownMd ? 3 : 4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      textAlign={idDownMd ? "center" : "left"}
                    >
                      {en.DESCRIPTION}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="GrayText"
                      textAlign={idDownMd ? "center" : "left"}
                    >
                      {product.description}
                    </Typography>
                  </Box>
                  <Stack
                    mb={idDownMd ? 6 : 8}
                    spacing={1}
                    alignItems={idDownMd ? "center" : "flex-start"}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      textAlign={idDownMd ? "center" : "left"}
                    >
                      {en.COLOR}
                    </Typography>
                    <RadioGroup
                      activeId={activeColorId}
                      setActiveId={setActiveColorId}
                      handleColor={handleProductColor}
                    />
                  </Stack>
                </Box>
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
        )}
      </Stack>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let product: Product | null = null;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params?.id}`);
    product = await res.json();
  } catch (err) {
    console.log(err);
  }

  return {
    props: { product },
  };
};
