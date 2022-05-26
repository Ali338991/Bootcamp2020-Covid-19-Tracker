import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { fetchCountries } from "../Api/CovidApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loader from "./Loader";
import { searchingFor } from "./Common";
export default function AllCountries({ searchText }) {
  const [AllCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetDlobalData() {
      const fetchData = await fetchCountries();
      setAllCountries(fetchData);
      setLoading(false);
    }
    fetDlobalData();
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="xl" style={{ marginTop: "20px" }}>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className='tableHeader'>
              <TableRow>
                <TableCell align="left">Country</TableCell>
                <TableCell align="center">Population</TableCell>
                <TableCell align="center">Cases</TableCell>
                <TableCell align="center">Critical</TableCell>
                <TableCell align="center">Deaths</TableCell>
                <TableCell align="center">Recovered</TableCell>
                <TableCell align="center">Tests</TableCell>
                <TableCell align="center">TodayCases</TableCell>
                <TableCell align="center">TodayDeaths</TableCell>
                <TableCell align="center">TodayRecovered</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AllCountries?.filter(searchingFor(searchText)).map(
                (row, index) => (
                  <TableRow
                    key={row?.country}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th">{row?.country}</TableCell>
                    <TableCell align="center">{row?.population}</TableCell>
                    <TableCell align="center">{row?.cases}</TableCell>
                    <TableCell align="center">{row?.critical}</TableCell>
                    <TableCell align="center">{row?.deaths}</TableCell>
                    <TableCell align="center">{row?.recovered}</TableCell>
                    <TableCell align="center">{row?.tests}</TableCell>
                    <TableCell align="center">{row?.todayCases}</TableCell>
                    <TableCell align="center">{row?.todayDeaths}</TableCell>
                    <TableCell align="center">{row?.todayRecovered}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
