import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { fetchGlobal } from "../Api/CovidApi";
import { searchingFor } from "./Common";
const GlobalDataStyle = {
  Item: styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 200,
    lineHeight: "60px",
    justifyContent: "center",
  })),
  textHeading: styled(Typography)(({ theme }) => ({
    overflow: "auto",
  })),
};

export default function GlobalData({ searchText }) {
  const [GlobalData, setGlobalData] = useState([]);
  useEffect(() => {
    async function fetDlobalData() {
      const fetchData = await fetchGlobal();
      delete fetchData?.recoveredPerOneMillion;
      delete fetchData?.criticalPerOneMillion;
      delete fetchData?.deathsPerOneMillion;
      delete fetchData?.testsPerOneMillion;
      delete fetchData?.oneDeathPerPeople;
      delete fetchData?.oneTestPerPeople;
      delete fetchData?.oneCasePerPeople;
      setGlobalData(fetchData);
    }
    fetDlobalData();
  }, []);
  return (
    <Container maxWidth="xl" style={{ marginTop: "20px" }}>
      <Box>
        <Grid container spacing={2}>
          {Object.keys(GlobalData)
            ?.filter(searchingFor(searchText))
            .map((key, index) => {
              return (
                <Grid item xs={12} sm={4} md={3} key={index}>
                  <Box>
                    <GlobalDataStyle.Item
                      elevation={8}
                      style={{
                        backgroundColor:
                          key.toUpperCase() == "DEATHS"
                            ? "red"
                            : key.toUpperCase() == "RECOVERED"
                            ? "green"
                            : key.toUpperCase() == "CASES"
                            ? "#2A76D2"
                            : "rgba(128, 128, 128,0.721)",
                      }}
                    >
                      <GlobalDataStyle.textHeading
                        variant="h5"
                        component="h2"
                        color={"white"}
                      >
                        {key.toUpperCase()}
                      </GlobalDataStyle.textHeading>
                      <Typography variant="h5" component="h2">
                        {GlobalData[key]}
                      </Typography>
                    </GlobalDataStyle.Item>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Container>
  );
}
