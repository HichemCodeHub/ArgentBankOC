import React from 'react'
import "./Featureitems.css"

export default function FeatureItem({iconUrl, title, text}) {
  return (
    <div className="feature-item">
    <img src={iconUrl} alt="icon" className="feature-icon" />
    <h3 className="feature-item-title">{title}</h3>
    <p>{text}</p>
  </div>
  )
}