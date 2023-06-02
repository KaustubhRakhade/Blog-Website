import React from 'react'

export default function FadingAlert({icon, text}) {
  return (
    <div className="fading-alert">
        <span className="material-symbols-outlined">{icon}</span>
        <span>{text}</span>
        <div className="fading-alert-timeout"></div>
    </div>
  )
}
