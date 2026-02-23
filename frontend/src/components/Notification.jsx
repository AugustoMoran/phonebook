import React from 'react'

const Notification = ({ message, messageType }) => {
  if (!message) return null

  const className = messageType === 'error' ? 'message error' : 'message'

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification