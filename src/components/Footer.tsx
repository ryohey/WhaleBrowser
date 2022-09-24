import { observer } from "mobx-react"
import { useStores } from "../hooks/useStores"
import "./Footer.css"

function Footer() {
  const { logStore } = useStores()
  return (
    <div className="Footer">
      <div className="logs">
        {logStore.logs.map((log) => (
          <p>{log}</p>
        ))}
      </div>
    </div>
  )
}

export default observer(Footer)
