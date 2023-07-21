import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
const Header = ({ onBack, title }) => {
    return (
        <span className="language">
            <button onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h4>{title}</h4>
        </span>
    );
};

export default Header;
