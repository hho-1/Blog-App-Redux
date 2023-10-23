
import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import store from "./store/Store"
import {Provider} from "react-redux"
import AppRouter from './router/AppRouter';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffcd44',
        light: '#e2e55e',
        blu: '#0068e3',
        sky: '#57c1ff',
        dark: '#002499'
      },
      secondary:{
        main: '#00395c',
        light: '#364b7e',
        purp: '#7964aa',
        lil: '#d483d9',
        pink: '#ffacff'
      }
    },
  });
  return (
    <>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </ThemeProvider>
      
    </>
  );
}

export default App;
