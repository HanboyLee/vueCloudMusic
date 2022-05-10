import * as Api from "../../../services/api/songs";

import Types from "@/store/types";
import { ElMessage } from "element-plus";
const state = {
  songs: [],
  song: "",
};

const getters = {};

const mutations = {
  [Types.PUSH_SONGS](state, payload) {
    state.songs = payload;
  },
  [Types.PUSH_SONG](state, payload) {
    state.songs.push(payload);
  },
  [Types.TOADD_SONG](state, payload) {
    // const selectedIndex = state.songs.findIndex((item) => item.id === payload);
    // const curSong = state.songs[selectedIndex];
    // state.songs.splice();
    // state.songs.push(curSong);
    // console.log(
    //   state.songs.splice(selectedIndex, selectedIndex + 1),
    //   "selectedIndex"
    // );
  },

  [Types.CLEAR_SONGS](state) {
    state.songs = [];
  },
  [Types.DEL_SONG](state, payload) {
    if (payload.id && state.songs.length) {
      state.songs = state.songs.filter((item) => item.id !== payload.id);
    }
  },
};

const actions = {
  //單曲加入
  async [Types.FETCH_SONG_ASYNC]({ commit, state }, songItem) {
    try {
      //檢查是否已經加入歌曲中 刪除並重新加入
      const checkSong = state.songs.some((item) => {
        return item.id === songItem.id;
      });

      if (checkSong) {
        commit(Types.TOADD_SONG, songItem.id);
        return ElMessage({
          message: "歌曲已存在",
        });
      }

      const { data } = await Api.getSongUrl({ id: songItem.id });
      const upDateSource = await Api.upDateSourceid({
        id: songItem.id,
        sourceid: songItem.al.id,
        time: parseInt((songItem.dt / 1000).toFixed()),
      });
      console.log(upDateSource, "upDateSource");
      const originSongMap = Object.assign(
        {},
        { url: data[0].url },
        deepCopy(songItem)
      );

      const song = await combindSong({ data: originSongMap });
      commit(Types.PUSH_SONG, song);
    } catch (error) {
      console.log(error);
    }
  },
  async [Types.FETCH_SONGS_ASYNC]({ commit }, params) {
    try {
      const songsIds = params.map((v) => v.id).join(",");
      const { data } = await Api.getSongUrl({ id: songsIds });
      const cloneData = deepCopy(data);
      const songs = await combindSong({
        data: recombineHandle({ cloneData, params }),
        isSingle: false,
      });
      commit(Types.PUSH_SONGS, songs);
    } catch (error) {
      console.log(error);
    }
  },
};
const deepCopy = (orgin) => JSON.parse(JSON.stringify(orgin));

//重組多筆資料
const recombineHandle = ({ cloneData, params }) => {
  let songsLen = params.length;
  let startLen = 0;
  let data = {};
  const datas = [];
  while (startLen < songsLen) {
    let index = cloneData.findIndex((item) => item.id === params[startLen].id);
    if (index !== -1 || index === 0) {
      cloneData[index]["info"] = params[startLen];
      data = Object.assign(
        {},
        { url: cloneData[index].url },
        deepCopy(params[startLen])
      );
      datas.push(data);
    }
    startLen++;
  }
  return datas;
};
//資料組合
function combindSong({ data, isSingle = true }) {
  let extractData;
  if (isSingle) {
    extractData = handlerSong(data);
    return new Promise((resolve) => resolve(extractData));
  }
  extractData = data.map((data) => handlerSong(data));
  return new Promise((resolve) => resolve(extractData));
}

function handlerSong(data) {
  if (data) {
    const song = {};
    song.url = data.url;
    song.id = data.id;
    song.name = data.name;
    song.dt = data.dt || data.song.duration;
    song.artist = data.ar?.[0].name ?? data.song.artists[0].name;
    song.cover = data?.al?.picUrl ?? data.picUrl;
    return song;
  }
}

export const player = {
  state,
  getters,
  mutations,
  actions,
};
