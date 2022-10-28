import axios from 'axios';
import React, {useState, useEffect} from 'react';

const Home = () => {

    const [employees, setEmployees] = useState([]);
    const [filterValue, setFilterValue] = useState('');

    useEffect(()=> {
        fetchEmployees();
    }, [])

    const fetchResultsByFilter = async(e, name) => {
        e.stopPropagation();
        console.log(name);
        const emps = await axios.get('http://localhost:9000/api/fetchByFilters?name=' + filterValue);
        setEmployees(emps.data);
    }

    const fetchEmployees = async() => {
        const emps = await axios.get('http://localhost:9000/api/getAllEmployees');
        setEmployees(emps.data);
    }

    return (
        <>
        <div className='container'>
        <h1>Employees Fetcher</h1>

        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                onChange={e => setFilterValue(e.target.value)}
            />
            <div className="input-group-append">
                <button
                    className="btn btn-outline-primary"
                    type="button"
                    id="button-addon2"
                    onClick={(e) => fetchResultsByFilter(e, filterValue)}
                    >Filter
                </button>
            </div>
        </div>


        <table className="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Salary</th>
                <th scope="col">Pension</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.length > 0 && employees.map(emp =>
                        (<tr key={emp.id}>
                            <th scope="row">{emp.id}</th>
                            <td>{emp.name}</td>
                            <td>{emp.address}</td>
                            <td>{emp.phone}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.pension}</td>
                        </tr>)
                        )
                }
            </tbody>
        </table>
        </div>
        </>
    )

}

export default Home;