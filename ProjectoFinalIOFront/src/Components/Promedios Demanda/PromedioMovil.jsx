/* eslint-disable react/prop-types */


const PromedioMovil = ({onChange, values, resultado}) => {
  return (
    <div style={{ marginTop: '20px' }}>
        <div className="form-group">
            <label htmlFor="periodos" style={{ fontWeight: 'bold' }}>Periodos:</label>
            <input
                type="number"
                className="form-control"
                id="periodos"
                name="periodos"
                value={values.periodos}
                onChange={onChange}
                style={{ padding: '10px', borderRadius: '5px' }}
                min="1"
            />
        </div>
        <div className="form-group" style={{ marginTop: '15px' }}>
            <label htmlFor="resultado" style={{ fontWeight: 'bold' }}>Resultado del cálculo:</label>
            <input
                type="text"
                className="form-control"
                id="resultado"
                name="resultado"
                value={resultado}
                readOnly
                style={{ padding: '10px', borderRadius: '5px' }}
            />
        </div>
    
    </div>
  )
}

export default PromedioMovil