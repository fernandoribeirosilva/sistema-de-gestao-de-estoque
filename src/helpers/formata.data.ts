import moment from "moment";

class FormatDate {
  static execute(date: string, format: string = "YYYY/DD/MM") {
    const dateFormatted = moment(date).format(format.toUpperCase());
    return dateFormatted;
  }
}

export { FormatDate };
