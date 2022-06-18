import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import App from './pages/Home'
import Header from './components/Header'

//custom theme
import theme from './theme'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Header />
    <CssBaseline />
    <Container maxWidth="lg">
      <Box sx={{ height: "100vh", padding: '1rem' }}>
        <App />
      </Box>
    </Container>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
