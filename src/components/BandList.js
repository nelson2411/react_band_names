import React from "react"
import { SocketContext } from "../context/SocketContext"

const BandList = () => {
  const [bands, setBands] = React.useState([])

  const { socket } = React.useContext(SocketContext)

  React.useEffect(() => {
    socket.on("current-bands", (bands) => {
      console.log({ bands })
      setBands(bands)
    })
    return () => socket.off("current-bands")
  }, [socket])

  const cambioNombre = (event, id) => {
    const nuevoNombre = event.target.value

    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          // if the id of the band is the same as the id of the band that we are modifying
          band.name = nuevoNombre // then we change the name of the band
        }
        return band // We must do a return because we are using map
      })
    )
  }

  const onPerdioFoco = (id, nombre) => {
    console.log(id, nombre)
    socket.emit("cambiar-nombre-banda", { id, nombre })
  }

  const votar = (id) => {
    socket.emit("votar-banda", id)
  }

  const borrar = (id) => {
    socket.emit("borrar-banda", id)
  }

  const crearRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button onClick={() => votar(band.id)} className="btn btn-primary">
            {" "}
            +1{" "}
          </button>
        </td>
        <td>
          <input
            className="form-control"
            value={band.name}
            onChange={(event) => cambioNombre(event, band.id)}
            onBlur={() => onPerdioFoco(band.id, band.name)}
          />
        </td>
        <td>
          <h3> {band.votes} </h3>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => borrar(band.id)}>
            {" "}
            Borrar{" "}
          </button>
        </td>
      </tr>
    ))
  }
  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  )
}

export default BandList
