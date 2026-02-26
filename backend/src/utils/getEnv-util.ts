export const getEnv = (key: string, param: string = ""): string => {
   const value = process.env[key];

   if (value === undefined) {
      if (param) return param;
      throw new Error(`Environment variable ${key} is undefined`);
   }

   return value;
}