import PropTypes from 'prop-types';
import { LayoutTextSidebarReverse } from 'react-bootstrap-icons';

const DemandaButton = ({ onClick }) => {
    return (
        <LayoutTextSidebarReverse
            color="#505050"
            size={24}
            onClick={onClick}
            onMouseEnter={() => { document.body.style.cursor = 'pointer' }}
            onMouseLeave={() => { document.body.style.cursor = 'default' }}
        />
    );
};

DemandaButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default DemandaButton;