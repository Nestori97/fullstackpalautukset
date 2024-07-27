import { useNotificationToNotify } from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const theRealNotification = useNotificationToNotify()
console.log(theRealNotification,"notification")
  if (!theRealNotification ) return null

  return (
    <div style={style}>
      {theRealNotification}
    </div>
  )
}

export default Notification