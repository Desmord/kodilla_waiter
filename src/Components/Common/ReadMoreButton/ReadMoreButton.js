import { Link } from 'react-router-dom';

const ReadMoreButton = ({ id }) => {
    return (
        <Link to={`/table/${id}`}>
            <button type="button" className={`btn btn-primary`}>Read more</button>
        </Link>
    )
}

export default ReadMoreButton