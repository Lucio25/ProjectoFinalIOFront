import PropTypes from 'prop-types';
import { SkipEndFill } from 'react-bootstrap-icons';

const CambioEstadoButton = ({ onClick }) => {
    return (
        <SkipEndFill
            color="#505050"
            size={24}
            onClick={onClick}
            onMouseEnter={() => { document.body.style.cursor = 'pointer' }}
            onMouseLeave={() => { document.body.style.cursor = 'default' }}
        />
    );
};

CambioEstadoButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default CambioEstadoButton