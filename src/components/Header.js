import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router-dom';

const Header = ({title, onFormToggle, formShowingState}) => {

    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && (
                <Button 
                    color={formShowingState ? "red" : "green"}
                    copy={formShowingState ? "Close" : "Add"}
                    onClick={onFormToggle} />
                )
            }
        </header>
    )
}

// Header.defaultProps = {
//     title : 'Default text'
// }

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
