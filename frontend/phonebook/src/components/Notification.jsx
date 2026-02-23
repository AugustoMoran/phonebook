import React from 'react'

const Notification = ({ message, messageType }) => {
  if (!message) return null

  const className = messageType === 'error' ? 'massage error' : 'massage'

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification