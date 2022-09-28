import express from "express"
import { existsSync } from "fs"
import fs from "fs/promises"
import path from "path"
import Database from "../models/Database"
import { createThumbnail } from "../process/stm"
export const router = express.Router()

const dbFile = "db.wb"
const db = new Database(dbFile)

router.get("/", async (req, res) => {
  const rows = await db.movie.getNext()
  res.send(rows)
})

router.delete("/:id*", async (req, res) => {
  const { id } = req.params as any
  const movie = await db.movie.get(id)
  await db.movie.delete(id)
  await fs.unlink(movie.movie_path)
  //  await fs.unlink(movie.getThumbnailPath())
})

router.get("/:id/thumbnail", async (req, res) => {
  const { id } = req.params as any
  const movie = await db.movie.get(id)
  createThumbnailDir(dbFile, { width: 120, height: 90, column: 1, row: 1 })
  await createThumbnailIfNeeded(movie)
})

function createThumbnailDir(dbFile, { width, height, column, row }) {
  const dir = path.dirname(dbFile)
  const dbName = path.parse(dbFile).name
  const baseDir = path.join(dir, "thum", dbName)
  return path.join(baseDir, `${width}x${height}x${column}x${row}`)
}

async function createThumbnailIfNeeded(movie) {
  const thumbnailPath = movie.getThumbnailPath()
  if (existsSync(thumbnailPath)) {
    return
  }
  await createThumbnail({
    input: movie.movie_path,
    output: `${movie.thumbnailDir}*.jpg`,
    addHash: true,
  })
}

function getThumbnailPath(movie) {
  const fileName = `${movie.movie_name}.\#${movie.hash}.jpg`
  return `${this.thumbnailDir}${fileName}`
}

function getThumbnailURL() {
  const fileName = encodeURIComponent(`${this.movie_name}.\#${this.hash}.jpg`)
  return `file://${this.thumbnailDir}${fileName}?t=${this.isThumbnailCreated}`
}
