import PropTypes from 'prop-types';
import { PencilFill } from 'react-bootstrap-icons';

const EditButton = ({ onClick }) => {
    return (
        <PencilFill
            color="#FBC02D"
            size={24}
            onClick={onClick}
            onMouseEnter={() => { document.body.style.cursor = 'pointer' }}
            onMouseLeave={() => { document.body.style.cursor = 'default' }}
        />
    );
};

EditButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default EditButton;