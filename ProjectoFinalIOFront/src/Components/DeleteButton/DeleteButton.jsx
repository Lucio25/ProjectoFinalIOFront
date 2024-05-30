import PropTypes from 'prop-types';
import { TrashFill } from 'react-bootstrap-icons';

const DeleteButton = ({ onClick }) => {
    return (
        <TrashFill
            color="#D32F2F"
            size={24}
            onClick={onClick}
            onMouseEnter={() => { document.body.style.cursor = 'pointer' }}
            onMouseLeave={() => { document.body.style.cursor = 'default' }}
        />
    );
};

DeleteButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default DeleteButton;