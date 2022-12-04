import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getTableById } from '../../Redux/tableRedux';

import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import EditPostForm from '../Features/EditPostForm/EditPostForm';


const SingleTable = () => {

    const { id } = useParams();

    const table = useSelector(state => getTableById(state, id))[0]

    if (!table) return <Navigate to="/" />
    return (
        <Container className={`d-flex flex-wrap flex-column col-10 col-lg-6`}>
            <h3>Table {table.id}</h3>
            <EditPostForm/>
        </Container>
    )
}

export default SingleTable;