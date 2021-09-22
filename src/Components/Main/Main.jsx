import React from "react";

import {
  Card,
  CardActions,
  CardHeader,
  Grid,
  Box,
  CssBaseline,
  CardContent,
  Container,
} from "@material-ui/core";
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
                <CardActions>{opt.comp}</CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Main;
