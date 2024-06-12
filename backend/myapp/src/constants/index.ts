import {Elysia} from "elysia";
import {initDatabase} from "../db";


export const app = new Elysia()


export const db = initDatabase()