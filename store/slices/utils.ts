export const createGuid = () => {
  const _p8 = (s?: boolean) => {
    const p = (Math.random().toString(16) + '000000000').substring(2, 8);
    return s ? '-' + p.substring(0, 4) + '-' + p.substring(4, 4) : p;
  };

  return _p8() + _p8(true) + _p8(true) + _p8();
};
