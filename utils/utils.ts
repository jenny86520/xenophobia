import moment from "moment";

export const upperCaseFirstChat = (value: string | undefined): string => {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
};

export const formatDate = (dateString: string = "") => {
  if (!dateString) return "";
  return moment(dateString).format(`YYYY/MM/DD HH:mm`);
};
