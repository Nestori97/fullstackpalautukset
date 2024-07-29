import { useSelector } from 'react-redux'
const Notification = ({ message }) => {
    const notification = useSelector((state) => state.notification)
    if (message === null) {
        return null
    }

    return (
        <div>
            {console.log('nyt renderöity notification')} {notification}
        </div>
    )
}

export default Notification
