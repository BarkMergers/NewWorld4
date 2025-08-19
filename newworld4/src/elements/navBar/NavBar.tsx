

import { useNavigate } from 'react-router-dom';
export default function NavBar() {

    const navigate = useNavigate()


    return (
        <div className="flex flex-col">
            <button className="btn btn-primary m-1" type="button" onClick={() => navigate('/')}>Home</button>
            <button className="btn btn-primary m-1" type="button" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="btn btn-primary m-1" type="button" onClick={() => navigate('/customer')}>Customer</button>
            <button className="btn btn-primary m-1" type="button" onClick={() => navigate('/plain')}>Blank</button>
        </div>
    )
}