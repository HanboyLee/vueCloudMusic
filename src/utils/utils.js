//轉換量
export const extractPlayCountHandle = (num) => {
  const cut = (b) => `${(b / 10000).toFixed()}万`;
  return num > 10000 ? cut(num) : num;
};

// 時間轉換
export const transforTime = (time, type) => {
  //毫秒轉換秒
  if (type === "ms") {
    time = (time / 1000).toFixed() * 1;
  }
  let hour =
    Math.floor(time / 3600) < 10
      ? "0" + Math.floor(time / 3600)
      : Math.floor(time / 3600);
  let minute =
    Math.floor((time - hour * 3600) / 60) < 10
      ? "0" + Math.floor((time - hour * 3600) / 60)
      : Math.floor((time - hour * 3600) / 60);
  let second =
    time - hour * 3600 - minute * 60 < 10
      ? "0" + (time - hour * 3600 - minute * 60)
      : time - hour * 3600 - minute * 60;

  return `${minute}:${second}`;
};

//get parent router path
export const tabsHandlerRoutePath = ({ parentPath, paneName }) => {
  if (paneName == "/") return parentPath;
  return `${parentPath}/${paneName}`;
};

// 补0方法
export const formatZero = (num, len) => {
  if (String(num).length > len) return num;
  return (Array(len).join(0) + num).slice(-len);
};

export const formatTime = (streamTime) => {
  streamTime = streamTime | 0;
  const m = (streamTime / 60) | 0;
  const s = streamTime % 60;
  return `${formatZero(m, 2)}:${formatZero(s, 2)}`;
};

//獲取隨機
export const getRandomIndex = (len) => Math.ceil(Math.random() * len + 0);
