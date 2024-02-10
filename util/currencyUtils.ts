// currencyUtils.ts

// Define a mapping of currency addresses to currency symbols
const currencySymbolMapping: { [key: string]: string } = {
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE': 'BNB',
    '0x722cB8e411D40942C0f581B919ecCE3E4D759602': 'OSEAN',
    // Add more mappings as needed
  };
  
  // Function to get the currency symbol based on the currency address
  export function getCurrencyName(currencyAddress: string) {
    const symbol = currencySymbolMapping[currencyAddress];
    return symbol || 'Unknown'; // Return 'Unknown' if the symbol is not found
  }
  