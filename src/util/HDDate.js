import { format } from 'date-fns'
import moment from 'moment'

export default class HDDate {
    // static format(strDate, withFormat = "dd/MM/yyyy") {
    //     if ((strDate != null) && (strDate != undefined)) {
    //         const str = String(strDate).slice(0, 10)
    //         const arr = str.split("-")
    //         return format(new Date(arr[0], (arr[1] - 1), arr[2]), withFormat)
    //     } else {
    //         return ""
    //     }
    // }

    static formatTo(strDate, withFormat = "DD/MM/YYYY") {
        return moment(strDate).format(withFormat)
    }

    /**
     * Get date of current date
     */
    static getDate = () => {
        return moment().get('date')
    }

    static momentDate = (dateObject) => {
        let m = moment()
        let newDate = moment(dateObject)
        m.set(newDate.toObject());
        return m
    }
}
