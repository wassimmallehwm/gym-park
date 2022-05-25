import { Config } from "../config/Config"
import placeholder from '../assets/placeholder.png'

export const courseImage = (path: string | undefined) => {
    return path ? `${Config.getConfig().publicUrl}courses/${path}` : placeholder
}