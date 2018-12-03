export default (colorCodes) => {
  const codes = {
    Red: '0',
    Orange: '2',
    Green: '5',
    Blue: '8',
    Violet: '9',
    Pink: 'a',
    White: 'c',
    Gray: 'd',
    Black: 'e',
  };
  return colorCodes.map(code => codes[code]).join(',') || null;
};
