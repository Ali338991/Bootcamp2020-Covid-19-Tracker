import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GlobalData from "./GlobalData";
import AllCountries from "./AllCountries";
import Chart from "./Chart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import { fetchCountries, fetchGlobal } from "../Api/CovidApi";
import Loader from "./Loader";
import { searchingFor } from "./Common";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function InfoPanel({ searchText }) {
  const [value, setValue] = React.useState(0);
  const [countryName, setcountryName] = useState("Globally");
  const [AllCountry, setAllCountries] = useState([]);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const selecthandleChange = (event) => {
    setcountryName(event.target.value);
    const filterData = AllCountry[event.target.value];
    setData([
      filterData?.cases,
      filterData?.recovered,
      filterData?.active,
      filterData?.deaths,
      filterData?.critical,
      filterData?.todayCases,
    ]);
  };
  useEffect(() => {
    setLoading(true);
    async function fetDlobalData() {
      const GlobalData = await fetchGlobal();
      setData([
        GlobalData?.cases,
        GlobalData?.recovered,
        GlobalData?.active,
        GlobalData?.deaths,
        GlobalData?.critical,
        GlobalData?.todayCases,
      ]);
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
    <Container maxWidth="xl">
      <Box sx={{ width: "100%", marginTop: "100px" }}>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Global Data" />
            <Tab label="All Countries" />
            <Tab label="Chart" />
          </Tabs>
        </Box>
        {value == 2 && (
          <Box sx={{ minWidth: 120, marginTop: "20px" }}>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                value={countryName}
                onChange={selecthandleChange}
              >
                <MenuItem value={"Globally"}>Globally</MenuItem>
                {AllCountry?.filter(searchingFor(searchText)).map((country, index) => (
                  <MenuItem value={index}>{country?.country}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
        <TabPanel value={value} index={0}>
          <GlobalData searchText={searchText} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AllCountries searchText={searchText} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Chart data={Data} />
        </TabPanel>
      </Box>
    </Container>
  );
}
