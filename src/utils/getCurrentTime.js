import moment from "moment";

function getCurrentTime(includeMeridiem = false) {
  return moment().format(includeMeridiem ? "hh:mm A" : "HH:mm");
}

export default getCurrentTime;
