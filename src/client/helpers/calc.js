// Formats to two decimal places
// See https://stackoverflow.com/a/6134070/7304372
export default (height, width) => parseFloat(Math.round(height * 100) / width).toFixed(2);
