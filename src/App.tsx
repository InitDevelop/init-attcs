import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenuBar } from './components/global/MenuBar';

const App = () => {
  return (
    <BrowserRouter>
      <MenuBar/>
      <Routes>
        <Route path="/"
          element={
            <Display text='home'></Display>
          }
        />
        <Route path="/timetable"
          element={
            <Display text='timetable'></Display>
          }
        />
        <Route path="/create"
          element={
            <Display text='create'></Display>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

const Display = (props: {text: string}) => {
  return <div>{props.text}</div>
}