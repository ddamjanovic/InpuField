const DUMMY_DATA = ["abc", "cde", "fgh", "kjs", "shu"];

const getServerData = (input) => {
  const data = new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_DATA);
    }, 500);
  });
  return data;
};

export default getServerData;
