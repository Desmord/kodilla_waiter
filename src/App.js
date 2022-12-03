import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTables } from './Redux/tableRedux';

import Home from './Components/Pages/Home';
import Table from './Components/Pages/Table';
import PageNotFound from './Components/Pages/PageNotFound';

function App() {

  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch])

  return (
    <Container >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<Table />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
