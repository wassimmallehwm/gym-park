import moment from "moment"

export const formateDate = (date: any) => {
    return moment(date).format("DD/MM/YYYY")
}

export const formateDateTime = (date: any) => {
    return moment(date).format("DD/MM/YYYY HH:mm")
}