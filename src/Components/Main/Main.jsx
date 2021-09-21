// import React from "react";

import {
  Card,
  CardActions,
  CardHeader,
  Grid,
  Container,
  Box,
  Button,
  CardContent,
  CssBaseline,
  Toolbar,
  Link,
  Typography,
  AppBar,
} from "@material-ui/core";
import FileDownload from "../Download/FileDownload";
import FileMinPdf from "../Min/FileMinPdf";
import ModalEmail from "../Modal/ModalEmail";

import * as React from "react";

const options = [
  {
    title: "Download",
    comp: <FileDownload />,
  },
  {
    title: "Minimize PDF",
    comp: <FileMinPdf />,
  },
  {
    title: "Sent to email",
    comp: <ModalEmail />,
  },
];

const Main = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {options.map((opt) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={opt.title} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={opt.title}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}></Box>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={opt.buttonVariant}>
                    {opt.comp}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Main;
