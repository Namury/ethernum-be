export interface LooseObject {
    [key: string]: any
}

export function createRandomString(length:number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function parseBigIntJson(json:object){
  const bigIntJson = JSON.stringify(json, (key, value) =>
    typeof value === "bigint" ? `BIGINT::${value}` : value
  );
  
  return JSON.parse(bigIntJson, (key, value) => {
    if (typeof value === "string" && value.startsWith('BIGINT::')) {
      if(key === "Coin"||key === "WarehouseCoin") return Number(value.substring(8).slice(0,-4));
      return Number(value.substring(8));
    }
    return value;
  });
} 