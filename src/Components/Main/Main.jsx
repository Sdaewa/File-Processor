import React from "react";

import {
  Card,
  CardActions,
  CardHeader,
  Grid,
  Box,
  Button,
  CssBaseline,
  CardContent,
  Container,
} from "@material-ui/core";
// import GlobalStyles from "@mui/material/GlobalStyles";
import FileDownload from "../Download/FileDownload";
import FileMinPdf from "../Min/FileMinPdf";
import ModalEmail from "../Modal/ModalEmail";

const options = [
  {
    title: "Download PDF",
    comp: <FileDownload />,
  },
  {
    title: "Minimize PDF",
    comp: <FileMinPdf />,
  },
  {
    title: "Send to email",
    comp: <ModalEmail />,
  },
];

const Main = () => {
  return (
    <>
      {/* <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      /> */}
      <CssBaseline />

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {options.map((opt) => (
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
                  <Button>{opt.comp}</Button>
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
