import { Card } from "./card"
import { Goal } from "./goal"

export type Player = {
  id?: number
  firstname: string
  lastname: string
  position: string
  year: number
  avatar: string
  guest: boolean
  teamId: number
  userId: number
  goals?: Goal[]
  cards?: Card[]
}