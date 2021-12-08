import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({title, onFormToggle, formShowingState}) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button 
                color={formShowingState ? "red" : "green"}
                copy={formShowingState ? "Close" : "Add"}
                onClick={onFormToggle} />
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
