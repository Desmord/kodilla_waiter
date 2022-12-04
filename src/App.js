import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchTables } from './Redux/tableRedux';
import { useSelector } from 'react-redux';

import { getAllTables } from './Redux/tableRedux';

import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './Components/Views/Header/Header';
import Home from './Components/Pages/Home';
import SingleTable from './Components/Pages/SingleTable';
import PageNotFound from './Components/Pages/PageNotFound';
import Footer from './Components/Views/Footer/Footer';

function App() {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const table = useSelector(state => getAllTables(state));

  useEffect(() => dispatch(fetchTables()), [dispatch])


  useEffect(() => {

    if (table.table.length) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }

  }, [table])

  return (
    <Container >
      <Header />
      {isLoading ? `Loading...` :
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<SingleTable />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>}

      <Footer />
    </Container>
  );
}

export default App;




