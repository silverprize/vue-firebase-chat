import { RES_IMAGE_UPLOADED, RES_JOINED, RES_LEFT, RES_NEW_MESSAGE } from '@/../server/protocol.js'
import { ADD_MESSAGE, SET_IMAGE_URL } from '@/store/chat/mutations.type'
import { MessageType } from '@/types'
import { FETCH_ROOM_INFO } from '@/store/chat/actions.type'
import { Commit, Dispatch } from 'vuex'

export default async (ctx: { commit: Commit, dispatch: Dispatch }, event: string, data: any) => {
  switch (event) {
    case RES_NEW_MESSAGE:
      ctx.commit(ADD_MESSAGE, {
        ...data,
        type: MessageType.User,
      })
      break
    case RES_JOINED:
      ctx.commit(ADD_MESSAGE, {
        type: MessageType.System,
        content: `${data.chatId}님이 입장했습니다.`,
      })
      await ctx.dispatch(FETCH_ROOM_INFO, data.room)
      break
    case RES_LEFT:
      ctx.commit(ADD_MESSAGE, {
        type: MessageType.System,
        content: `${data.chatId}님이 떠났습니다.`,
      })
      await ctx.dispatch(FETCH_ROOM_INFO, data.room)
      break
    case RES_IMAGE_UPLOADED:
      ctx.commit(SET_IMAGE_URL, data)
      break
  }
}
