export async function fetchCountries() {
    const response = await fetch(`https://disease.sh/v3/covid-19/countries`);
    const json = await response.json();
    return json;
  }
  export async function fetchGlobal() {
    const response = await fetch(`https://disease.sh/v3/covid-19/all`);
    const json = await response.json();
    return json;
  }