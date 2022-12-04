import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


import { getTableById } from "../../../Redux/tableRedux";
import { STATUSES } from "../../../Utilities";
import { updateAllData } from "../../../Redux/tableRedux";

import { Form } from 'react-bootstrap';


const EditPostForm = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { id } = useParams();

    const table = useSelector(state => getTableById(state, id))[0]

    const [status, setStatus] = useState(``);
    const [peopleAmount, setPeopleAmount] = useState(0);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(0);
    const [bill, setBill] = useState(0);
    const [errorText, setErrorText] = useState(``);



    const getStatusesOptions = () => {
        let options = [];

        for (let status in STATUSES) {
            options.push(<option key={status} value={STATUSES[`${status}`]}>{STATUSES[`${status}`]}</option>)
        }

        return options
    }

    const areValuesEmpty = () => (
        peopleAmount === `` ||
        maxPeopleAmount === `` ||
        (status === `Busy` && bill === ``)
    ) ? true : false


    const isNumeric = (value) => {
        return /^-?\d+$/.test(value);
    }

    const areValuesNumbers = () => (
        isNumeric(peopleAmount) &&
        isNumeric(maxPeopleAmount) &&
        isNumeric(bill)
    ) ? true : false

    const isMaxPeopleLowerThenPeopleAmount = () => maxPeopleAmount < peopleAmount ? true : false;


    const displayError = (errorText) => {
        setErrorText(errorText)

        setTimeout(() => {
            setErrorText(``)
        }, 3500)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (areValuesEmpty()) {
            displayError(`Empty fields.`)
            return 0;
        }
        if (!areValuesNumbers()) {
            displayError(`Wrong data format. Not a number.`)
            return 0;
        }

        if (isMaxPeopleLowerThenPeopleAmount()) {
            displayError(`Max people is lower then people amount.`)
            return 0
        }

        displayError(``)
        dispatch(updateAllData({
            id: id,
            status: status,
            peopleAmount: peopleAmount,
            maxPeopleAmount: maxPeopleAmount,
            bill: bill
        }))
        navigate(`/`);
    }

    useEffect(() => {
        if (table) {
            setStatus(table.status)
            setPeopleAmount(table.peopleAmount)
            setMaxPeopleAmount(table.maxPeopleAmount)
            setBill(table.bill)
        }
    }, [table])

    useEffect(() => {

        if (status !== `Busy`) {
            setBill(0)
        } else {
            setBill(table.bill)
        }

        if (status === STATUSES.CLEANING || status === STATUSES.FREE) {
            setPeopleAmount(0)
        }
        //eslint-disable-next-line
    }, [status])


    useEffect(() => {

        if (peopleAmount > 10) {
            setPeopleAmount(10)
            setMaxPeopleAmount(10)
        } else if (peopleAmount < 0) {
            setPeopleAmount(0)
        } else {
            if (peopleAmount > maxPeopleAmount) setMaxPeopleAmount(peopleAmount)
        }
        // eslint-disable-next-line
    }, [peopleAmount])

    useEffect(() => {
        if (maxPeopleAmount > 10) {
            setMaxPeopleAmount(10)
        } else if (maxPeopleAmount < 0) {
            setMaxPeopleAmount(0)
        }
        //eslint-disable-next-line
    }, [maxPeopleAmount])

    if (!table) return <Navigate to="/" />
    return (
        <form className={`d-flex pt-2 mt-4 flex-wrap flex-column justify-content-center col-12`} onSubmit={handleSubmit}>


            <div className=" m-2 form-group d-flex flex-row  align-items-center col-10  col-sm-6">
                <label className={`p-2`} ><strong>Status:</strong></label>
                <div className="form-group align-items-center  col-10">
                    <select
                        className="form-select"
                        name="statuses"
                        id="statuses"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        {getStatusesOptions()}
                    </select>
                </div>
            </div>


            <div className="m-2 form-group d-flex flex-row  align-items-center col-10  col-sm-6">
                <label className={`p-2`} ><strong>People:</strong></label>
                <Form.Control
                    value={peopleAmount}
                    onChange={e => setPeopleAmount(e.target.value)}
                    type="text" placeholder="People Amount"
                />
                &nbsp;/&nbsp;
                <Form.Control
                    value={maxPeopleAmount}
                    onChange={e => setMaxPeopleAmount(e.target.value)}
                    type="text" placeholder="maxPeopleAmount"
                />
            </div>


            {status === `Busy` ?
                <div className=" m-2 form-group d-flex flex-row  align-items-center col-4  col-sm-4">
                    <label className={`p-2`} ><strong>Bill: </strong></label>
                    <Form.Control
                        value={bill}
                        onChange={e => setBill(e.target.value)}
                        type="text" placeholder="Bill"
                    />&nbsp;$
                </div>
                : ``}


            <div className={`text-danger`}><strong>{errorText}</strong></div>

            <button className={`btn btn-primary mt-3 col-3`}>Update</button>
        </form>
    )
}

export default EditPostForm

