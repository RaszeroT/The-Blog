module.exports = {
  format_date: (date) => {
    console.log("date", date);
    // Format date and time information to MM/DD/YYYY HH:mm
    const d = new Date(date);
    const formattedDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    const hours = d.getHours().toString().padStart(2, "0") % 12 || 12;
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const amOrPm = d.getHours() <= 12 ? "AM" : "PM"
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDate} at ${formattedTime}${amOrPm}`;
  },
};

