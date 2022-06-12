import { Config } from "../config/Config"
import placeholder from '../assets/placeholder.png'
//import userDefault from '../assets/user_default.png'

export const userImage = (path: string) => {
    return path ? `${Config.getConfig().publicUrl}users/${path}` : placeholder
}

export const forumImage = (path: string) => {
    return path ? `${Config.getConfig().publicUrl}forum/${path}` : placeholder
}

export const courseImage = (path: string) => {
    return path ? `${Config.getConfig().publicUrl}courses/${path}` : placeholder
}

export const courseContentFile = (courseId: string, path: string) => {
    return path ? `${Config.getConfig().publicUrl}courses/${courseId}/${path}` : placeholder
}