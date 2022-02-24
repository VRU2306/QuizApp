import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../Components/Error/Error";
import Categories from "../../Catrgories/Category";
import "./Home.css";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
const theme = createTheme({
  palette: {
   mode: 'dark',
    primary: {
      main: '#67737A',
      background:"#202328"
    }

  }
});

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const history =useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      history("/quiz");
    }
  };

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 20,  textAlign:"center"}}>Please Fill the details and Play the quiz
        to imporve your Knowlegde</span>
        <div className="settings__select">
          {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}
                   <ThemeProvider theme={theme}>
          <TextField
            style={{ marginBottom: 25, background:"#202328" }}
            label="Enter Your Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            select
            label="Select Category"
         
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 ,color:"white", background:"#202328"}}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30,   background:"#202328" ,main:"#ffffff"}}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          </ThemeProvider>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            style={{textTransform:"capitalize"}}
          >
            Start Quiz
          </Button>
        </div>
      </div>
    
    </div>
  );
};

export default Home;
