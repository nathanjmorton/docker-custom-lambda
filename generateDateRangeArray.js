function generateDateRangeArray(n) {
  const days = [];
  const today = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });

  for (let i = 0; i < n; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() - i);

    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getUTCDate()).padStart(2, "0");

    const formattedDate = `${year}${month}${day}`;

    days.push(formattedDate);
  }

  return days;
}

module.exports = generateDateRangeArray;

// usage example:
// const dateRange = generateDateRangeArray(7);
// console.log(dateRange);
