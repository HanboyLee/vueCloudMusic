import request from "../request";

//獲取ＭＶ評論
export const getCommentMV = ({ id, offset, limit, timestamp = 0 }) =>
  request.get("/api/comment/mv", {
    params: {
      id,
      offset,
      limit,
      timestamp,
    },
  });

//獲取歌单评论
export const getCommentPlaylist = ({ id, offset, limit, timestamp = 0 }) =>
  request.get("/api/comment/playlist", {
    params: {
      id,
      offset,
      limit,
      timestamp,
    },
  });

//獲取视频评论
export const getCommentVideo = ({ id, offset, limit, timestamp = 0 }) => {
  return request.get("/api/comment/video", {
    params: {
      id,
      offset,
      limit,
      timestamp,
    },
  });
};

/**
 * @name 发送/删除评论
 * @param {t}t 必选参数 发送评论:1 发送, 2 回复
 * @param {type}type 必选参数  数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
 * 0!: 歌曲 1!: mv 2!: 歌单 3!: 专辑 4: 电台 5!: 视频 6: 动态
 * @param {id}id 必选参数 对应资源 id
 * @param {content}content 必选参数 对应资源 id
 * @param {commentId}commentId 必选参数 :回复的评论 id (回复评论时必填)
 * @example 调用例子 : /comment?t=1&type=1&id=5436712&content=test (往广岛之恋 mv 发送评论: test)
 */
export const getCommentCurrent = ({ t, type, id, content, commentId }) => {
  let params = { t, type, id, content };
  if (commentId) {
    params.commentId = commentId;
  }

  return request.get("/api/comment", {
    params,
  });
};
