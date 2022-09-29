import express from "express"
import { existsSync } from "fs"
import fs from "fs/promises"
import mkdirp from "mkdirp"
import path from "path"
import Database from "../models/Database"
import { createThumbnail } from "../process/stm"
export const router = express.Router()

const dbFile = process.argv[2]
const db = new Database(dbFile)

interface ThumbnailSize {
  width: number
  height: number
  column: number
  row: number
}

router.get("/", async (req, res) => {
  const {
    searchText = "",
    sortColumn = "create_time",
    offset = 0,
    descend = false,
    limit = 50,
  } = req.query as any
  console.log(searchText, sortColumn, offset, descend, limit)
  const rows = await db.movie.getNext(
    searchText,
    sortColumn,
    offset,
    descend,
    limit
  )
  res.send(rows)
})

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params as any
    const movie = await db.movie.get(id)
    if (movie === undefined) {
      res.status(404).send("404 Not Found")
      return
    }
    res.send(movie)
  } catch (e) {
    next(e)
  }
})

router.delete("/:id*", async (req, res, next) => {
  try {
    const { id } = req.params as any
    const movie = await db.movie.get(id)
    await db.movie.delete(id)
    await fs.unlink(movie.movie_path)
    //  await fs.unlink(movie.getThumbnailPath())
    res.send("ok")
  } catch (e) {
    next(e)
  }
})

router.get("/:id/thumbnail", async (req, res, next) => {
  try {
    const { id } = req.params as any
    const movie = await db.movie.get(id)
    const thumbnailPath = await createThumbnailIfNeeded(dbFile, movie, {
      width: 120,
      height: 90,
      column: 1,
      row: 1,
    })
    res.sendFile(thumbnailPath)
  } catch (e) {
    next(e)
  }
})

function getThumbnailDirPath(
  dbFile: string,
  { width, height, column, row }: ThumbnailSize
) {
  const dir = process.cwd()
  const dbName = path.parse(dbFile).name
  const baseDir = path.join(dir, "thumbnails", dbName)
  return path.join(baseDir, `${width}x${height}x${column}x${row}`)
}

async function createThumbnailIfNeeded(
  dbFile: string,
  movie: any,
  size: ThumbnailSize
): Promise<string> {
  const dir = getThumbnailDirPath(dbFile, size)
  await mkdirp(dir)
  const filename = getThumbnailFilename(movie)
  const outputPath = path.join(dir, filename)
  if (existsSync(outputPath)) {
    return outputPath
  }
  await createThumbnail({
    input: movie.movie_path,
    output: outputPath,
    addHash: false,
  })
  return outputPath
}

function getThumbnailFilename(movie) {
  return `${movie.hash}.jpg`
}
