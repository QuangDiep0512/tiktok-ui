import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './AccountItems.scss';
function AccountItems({ data, handleClickUser }) {
    return (
        <Link to={`/@${data.nickname}`} className="account" onClick={handleClickUser}>
            <img src={data.avatar} alt={data.full_name} />
            <div className="info">
                <h4>
                    {data.full_name}
                    {data.tick && <FontAwesomeIcon icon={faCheckCircle} className="check" />}
                </h4>
                <span className="username">{data.nickname}</span>
            </div>
        </Link>
    );
}

export default AccountItems;
