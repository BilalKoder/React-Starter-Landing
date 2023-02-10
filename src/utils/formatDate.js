export const formatDate = (ISOdate) => {
  const date = new Date(ISOdate);
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const day = date.getDate();
  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};
