/* eslint-disable react/prop-types */

const PromedioMovilPonderado = ({onChange, values, resultado, handlePonderacionesChange }) => {
  return (
    <div style={{ marginTop: '20px' }}>
    <div className="form-group">
        <label htmlFor="periodosPonderados" style={{ fontWeight: 'bold' }}>Periodos Ponderados:</label>
        <input
            type="number"
            className="form-control"
            id="periodosPonderados"
            name="periodosPonderados"
            value={values.periodosPonderados}
            onChange={onChange}
            style={{ padding: '10px', borderRadius: '5px' }}
            min="1"
        />
    </div>
    <div className="form-group" style={{ marginTop: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Pesos:</label>
            {[...Array(parseInt(values.periodosPonderados) || 0)].map((_, index) => (
                <div key={index} className="form-group">
                    <label htmlFor={`ponderacion${index + 1}`} style={{ fontWeight: 'bold' }}>Ponderación {index + 1}:</label>
                    <input
                        type="number"
                        className="form-control"
                        id={`ponderacion${index + 1}`}
                        name={`ponderacion${index}`}
                        value={values.ponderaciones[index] || ''}
                        onChange={handlePonderacionesChange}
                        style={{ padding: '10px', borderRadius: '5px', fontSize: '0.9em', width: '80%'  }}
                        min="1"
                    />
                </div>
            ))}
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

export default PromedioMovilPonderado