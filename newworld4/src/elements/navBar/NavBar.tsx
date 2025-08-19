

import { useNavigate } from 'react-router-dom';
export default function NavBar() {

    const navigate = useNavigate()


    return (
        <div>

            <button className="btn btn-primary mx-1" type="button" onClick={() => navigate('/')}>home</button>
            <button className="btn btn-primary mx-1" type="button" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="btn btn-primary mx-1" type="button" onClick={() => navigate('/plain')}>Plain</button>



        </div>
    )
}