import React, { useState, useEffect } from "react";
import DogList from "./DogList";
import GetDogsQuery from "./hooks/getDogsQuery";

import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

type dog = string;

export default function App() {
  const [dogList, setDogsList] = useState<dog[]>([]);
  const [filteredDogsList, setFilteredDogsList] = useState<dog[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const getDogsQuery = GetDogsQuery();

  useEffect(() => {
    const result = getDogsQuery?.data?.data?.message;
    if (result) {
      const breedList = Object.keys(result).map((breed) =>
        !result[breed].length
          ? breed
          : result[breed].reduce((subBreed: dog) => subBreed)
      );
      setDogsList(breedList);
    } else {
      setDogsList([]);
    }
  }, [getDogsQuery.data]);

  useEffect(() => {
    if (searchInput) {
      const filterResult = dogList.filter((dog) => {
        return dog
          .toLocaleUpperCase()
          .includes(searchInput.toLocaleUpperCase());
      });
      setFilteredDogsList(filterResult);
    } else {
      setFilteredDogsList(dogList);
    }
  }, [dogList, searchInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1" component="h2">
            Dogs Ts
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Search Breed"
            value={searchInput}
            onChange={handleChange}
            type="search"
            fullWidth
          ></TextField>
        </Grid>

        <>
          {getDogsQuery.isLoading ? (
            <Grid item>
              <CircularProgress />
            </Grid>
          ) : !filteredDogsList.length && searchInput !== "" ? (
            <Grid item>
              <Typography variant="subtitle1" gutterBottom>
                No results found
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <DogList filteredDogsList={filteredDogsList} />
            </Grid>
          )}
        </>
      </Grid>
    </Container>
  );
}
