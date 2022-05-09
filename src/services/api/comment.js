import request from "../request";

/**
 * @name 獲取ＭＶ評論
 * @param {number}id必选参数  mv id
 * @param {number}limit可选参数  取出评论数量 , 默认为 20
 * @param {number}offset可选参数  偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {before}before可选参数  分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * @description 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要 登录 )
 * @example 调用例子 : /comment/mv?id=5436712
 */
export const getCommentMV = ({ id, offset, limit, timestamp = 0 }) =>
  request.get("/api/comment/mv", {
    params: {
      id,
      offset,
      limit,
      timestamp,
    },
  });

/**
 * @name 獲取歌单评论
 * @param {number}id必选参数  歌单 id
 * @param {number}limit可选参数  取出评论数量 , 默认为 20
 * @param {number}offset可选参数  偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {before}before可选参数  分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * @description 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该歌单的所有评论 ( 不需要 登录 )
 * @example 调用例子 : /comment/playlist?id=705123491
 */
export const getCommentPlaylist = ({ id, offset, limit, timestamp = 0 }) =>
  request.get("/api/comment/playlist", {
    params: {
      id,
      offset,
      limit,
      timestamp,
    },
  });

/**
 * @name 獲取视频评论
 * @param {string}id必选参数  视频的 id
 * @param {number}limit可选参数  取出评论数量 , 默认为 20
 * @param {number}offset可选参数  偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {before}before可选参数  分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * @description 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 视频 的所有评论 ( 不需要登录 )
 *  * @example 调用例子 : /comment/video?id=89ADDE33C0AAE8EC14B99F6750DB954D
 */
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
 * @param {number}t必选参数 发送评论:1 发送, 2 回复
 * @param {string}type必选参数  数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
 * 0!: 歌曲 1!: mv 2!: 歌单 3!: 专辑 4: 电台 5!: 视频 6: 动态
 * @param {number}id 必选参数 对应资源 id
 * @param {string}content必选参数 对应资源 id
 * @param {number}commentId必选参数 :回复的评论 id (回复评论时必填)
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
