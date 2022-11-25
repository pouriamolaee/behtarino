import type { GetServerSideProps } from "next";
import type { Theme } from "@mui/material";
import type { Product } from "../../../src/models";
import { useState } from "react";
import Head from "next/head";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "../../../src/components/card";
import Rating from "../../../src/components/rating";
import { makeStyles } from "@mui/styles";

interface StyleProps {
  productColor: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: theme.palette.background.default,
    width: "100vw",
    minHeight: "100vh",
  },
  productShowcase: {
    backgroundColor: ({ productColor }: StyleProps) => productColor,
  },
}));

interface Props {
  product: Product;
}

export default function Product({ product }: Props) {
  const [productColor, setProductColor] = useState("red");
  const classes = useStyles({ productColor });


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
        <Card fullWidth maxWidth="md" elevation={24}>
          <Grid container>
            <Grid item md={4} className={classes.productShowcase}>
              X
            </Grid>
            <Grid item md={8}>
              <Rating precision={0.1} readOnly value={product.rating.rate} />
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
