// utils.js

// Helper function to safely parse ANY base into a BigInt
const parseBigInt = (str, radix) => {
  if (!str) return BigInt(0);
  let result = BigInt(0);
  const base = BigInt(radix);
  
  for (let char of str.toUpperCase()) {
    let digit = BigInt(parseInt(char, radix));
    result = (result * base) + digit;
  }
  return result;
};

export const convertNumber = (input, inputBase) => {
  if (!input) return { bin: '', oct: '', dec: '', hex: '' };

  try {
    const decimalValue = parseBigInt(input, inputBase);

    return {
      bin: decimalValue.toString(2),
      oct: decimalValue.toString(8),
      dec: decimalValue.toString(10),
      hex: decimalValue.toString(16).toUpperCase(),
    };
  } catch (error) {
    return { bin: 'Error', oct: 'Error', dec: 'Error', hex: 'Error' };
  }
};