import PropTypes from 'prop-types';
import { FileEarmarkText } from 'react-bootstrap-icons';

const DetalleVentaButton = ({ onClick }) => {
    return (
        <FileEarmarkText
            color="#505050"
            size={24}
            onClick={onClick}
            onMouseEnter={() => { document.body.style.cursor = 'pointer' }}
            onMouseLeave={() => { document.body.style.cursor = 'default' }}
        />
    );
};

DetalleVentaButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default DetalleVentaButton;