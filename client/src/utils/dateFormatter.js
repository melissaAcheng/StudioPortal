const dateFormatter = (date) => {
  const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-us", options);
};

module.exports = { dateFormatter };
