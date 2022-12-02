import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './Components/Pages/Home';
import Table from './Components/Pages/Table';
import PageNotFound from './Components/Pages/PageNotFound';

function App() {
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
