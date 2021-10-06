test("if billSum accepts correct input", () => {
  let correctValues = ["0.5", "10000", "6548775", "0.99", ""];
  let incorrectValues = ["-100", "005", "00.5", "56786546", "ghjjj"];
  const rule = /^[1-9]\d{0,6}$|^[1-9]\d{0,6}[.]\d{0,2}$|^[0]{0,1}[.]\d{0,2}$|^[0]$|^$/gm;

  expect(correctValues.every((val) => val.match(rule)));
  expect(incorrectValues.every((val) => !val.match(rule)));
});
