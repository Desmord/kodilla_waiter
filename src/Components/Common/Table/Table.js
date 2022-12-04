import { Container } from 'react-bootstrap';

import ReadMoreButton from "../ReadMoreButton/ReadMoreButton";

const Table = ({ id, status }) => {
    return (
        <Container className={`p-2 m-2 d-flex flex-row justify-content-between border-bottom col-10`}>
            <div className={` d-flex flex-row justify-content-center align-items-center `}>
                <h3><strong>Table {id}</strong> &nbsp;</h3>
                <strong>status: &nbsp;</strong>
                {status}
            </div>
            <ReadMoreButton id={id}/>
        </Container>
    )
}

export default Table;