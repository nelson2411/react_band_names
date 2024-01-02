import React, { useEffect, useContext } from "react"
import { SocketContext } from "./context/SocketContext"
import BandAdd from "./components/BandAdd"
import BandList from "./components/BandList"
import BandsChart from "./components/BandsChart"

const App = () => {
  const { online } = useContext(SocketContext)

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

      <h1 className="my-2">BandNames</h1>

      <div className="row">
        <div className="col">
          <BandsChart height={300} />
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <BandAdd />{" "}
        </div>
      </div>
    </div>
  )
}

export default App
