import { useSelector } from "react-redux";
import { getAllTables } from "../../Redux/tableRedux";
import { Container } from "react-bootstrap";

import Table from "../Common/Table/Table";

const Home = () => {

    const tables = useSelector(state => getAllTables(state))

    return (
        <Container className={`d-flex flex-column align-items-center`}>
            <h3>All Tables</h3>
            {tables.table.map((tab, index) => (
                <Table key={index} id={tab.id} status={tab.status} />
            ))}
        </Container>
    )
}

export default Home