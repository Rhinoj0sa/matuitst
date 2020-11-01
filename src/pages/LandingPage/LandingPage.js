import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Welcome</h1>
      <h2>CRUD Example Material ui</h2>

      <div>
        <Link to="/home">Continuar</Link>
      </div>
    </div>
  )
}
