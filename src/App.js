import React, { useEffect, useContext } from "react"
import { SocketContext } from "./context/SocketContext"
import BandAdd from "./components/BandAdd"
import BandList from "./components/BandList"
import { useSocket } from "./hooks/useSocket"

const App = () => {
  const [bands, setBands] = React.useState([])

  const { online } = useContext(SocketContext)

  // useEffect(() => {
  //   socket.on("current-bands", (bands) => {
  //     console.log({ bands })
  //     setBands(bands)
  //   })
  // }, [socket])

  // const votar = (id) => {
  //   console.log("votar", id)
  //   socket.emit("votar-banda", id)
  // }

  // const borrar = (id) => {
  //   console.log("borrar", id)
  //   socket.emit("borrar-banda", id)
  // }

  // const cambiarNombre = (id, nombre) => {
  //   console.log("cambiarNombre", id, nombre)
  //   socket.emit("cambiar-nombre-banda", { id, nombre })
  // }

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success"> Online 🟢</span>
          ) : (
            <span className="text-danger"> Offline 🔴</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          {/* <BandList
            data={bands}
            votar={votar}
            borrar={borrar}
            cambiarNombre={cambiarNombre}
          /> */}
        </div>
        <div className="col-4">{/* <BandAdd /> */}</div>
      </div>
    </div>
  )
}

export default App
