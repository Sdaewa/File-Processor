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
  Divider,
} from "@material-ui/core";
import FileDownload from "../Download/FileDownload";
import FileMinPdf from "../Min/FileMinPdf";
import ModalEmail from "../Modal/ModalEmail";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import CompressRoundedIcon from "@mui/icons-material/CompressRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const options = [
  {
    title: "Download PDF",
    icon: <FileDownloadRoundedIcon fontSize="large" />,
    comp: <FileDownload />,
  },
  {
    title: "Minimize PDF",
    icon: <CompressRoundedIcon />,
    comp: <FileMinPdf />,
  },
  {
    title: "Send to email",
    icon: <SendRoundedIcon />,
    comp: <ModalEmail />,
  },
];

const Main = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" component="main">
        <div>
          <Divider variant="middle" style={{ marginBottom: "20px" }} />
        </div>
        <Grid
          container
          spacing={5}
          alignItems="flex-end"
          style={{ marginBottom: "20px" }}>
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
                    }}>
                    {opt.icon}
                  </Box>
                </CardContent>
                <CardActions>
                  <Grid
                    container
                    direction="column"
                    alignContent="center"
                    style={{ marginBottom: "20px" }}>
                    <Grid item>{opt.comp}</Grid>
                  </Grid>
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
