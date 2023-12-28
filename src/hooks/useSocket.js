import React, { useEffect } from "react"
import { io } from "socket.io-client"

export const useSocket = (serverPath) => {
  const socket = React.useMemo(
    () => io.connect(serverPath, { transports: ["websocket"] }),
    [serverPath]
  )
  const [online, setOnline] = React.useState(false)

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

  return {
    socket,
    online,
  }
}
