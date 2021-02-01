import request from '../request'

export default {
  getUserProfile(userID: string | string[] | null) {
    if (userID)
      return request.get(`users/${userID}`)
    else
      return request.get('me')
  },
}
