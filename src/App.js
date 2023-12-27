import React, { useEffect } from "react"
import { io } from "socket.io-client"
import BandAdd from "./components/BandAdd"
import BandList from "./components/BandList"

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:8080", {
    transports: ["websocket"],
  })
  return socket
}

const App = () => {
  const [socket] = React.useState(connectSocketServer())
  const [online, setOnline] = React.useState(false)
  const [bands, setBands] = React.useState([])

  useEffect(() => {
    console.log(socket)
    setOnline(socket.connected)
  }, [socket])

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true)
    })
  }, [socket])

  // create the disconnect version of the useEffect
  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false)
    })
  }, [socket])

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      console.log({ bands })
      setBands(bands)
    })
  }, [socket])

  const votar = (id) => {
    console.log("votar", id)
    socket.emit("votar-banda", id)
  }

  const borrar = (id) => {
    console.log("borrar", id)
    socket.emit("borrar-banda", id)
  }

  const cambiarNombre = (id, nombre) => {
    console.log("cambiarNombre", id, nombre)
    socket.emit("cambiar-nombre-banda", { id, nombre })
  }

  const crearBanda = (nombre) => {
    console.log("crearBanda", nombre)
    socket.emit("nueva-banda", { nombre: nombre })
  }

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
          <BandList
            data={bands}
            votar={votar}
            borrar={borrar}
            cambiarNombre={cambiarNombre}
          />
        </div>
        <div className="col-4">
          <BandAdd crearBanda={crearBanda} />
        </div>
      </div>
    </div>
  )
}

export default App
