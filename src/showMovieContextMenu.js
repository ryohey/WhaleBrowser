const { remote } = window.require("electron")
const { Menu, MenuItem } = remote
const child_process = remote.require("child_process")

export default function showMovieContextMenu(movie) {
  const menu = new Menu()
  menu.append(new MenuItem({
    label: "Show in Explorer",
    click() {
      child_process.exec(`explorer /select,${movie.movie_path}`)
    }
  }))
  menu.popup(remote.getCurrentWindow())
}
