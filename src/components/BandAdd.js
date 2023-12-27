import React from "react"

const BandAdd = ({ crearBanda }) => {
  const [valor, setValor] = React.useState("")

  const onSubmit = (event) => {
    event.preventDefault()
    if (valor.trim().length > 0) {
      crearBanda(valor)
      setValor("")
    }
  }

  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={valor}
          onChange={(event) => setValor(event.target.value)}
        />
      </form>
    </>
  )
}

export default BandAdd
