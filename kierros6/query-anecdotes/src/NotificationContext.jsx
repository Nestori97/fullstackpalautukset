import { createContext, useReducer, useContext } from 'react'

const Notificationreducer = (state, action) => {
  switch (action.type) {
    case "NOTIFY":
        return action.payload
    case "REMOVE_NOTIFICATION":
        return null
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(Notificationreducer, null)

  return (
    <NotificationContext.Provider value={[notification, dispatch] }>

      {props.children}
      
    </NotificationContext.Provider>
  )
}

export const useNotificationToNotify = () => {
    const notification = useContext(NotificationContext)
    return notification
}

export const useNotification = () => {
  
    const valuesfromcontext = useContext(NotificationContext)
      const dispatch = valuesfromcontext[1]
   return (payload) => {
    dispatch({ type: 'NOTIFY', payload})
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, 5000)
  } 
}

export default NotificationContext