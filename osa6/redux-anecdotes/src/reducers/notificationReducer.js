const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'NOTIFICATION_SHOW':
        return action.notification
      case 'NOTIFICATION_HIDE':
          return null
      default:
        return state
    }
  }
  
export const showNotification = notification => {
    return {
        type: 'NOTIFICATION_SHOW',
        notification,
    }
}

export const hideNotification = () => {
  return {
      type: 'NOTIFICATION_HIDE',
  }
}
  
export default notificationReducer
