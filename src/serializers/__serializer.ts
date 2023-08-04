export const abstractSerializer = (dict: any, fields: string[]) => {
  const data: any = {};
  fields.forEach((key: any) => {
    const k: string = key;
    const v: string = dict[key];
    data[k] = v;
  });
  return data;
};