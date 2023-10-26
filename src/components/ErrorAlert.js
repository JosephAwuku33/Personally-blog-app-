import React from 'react'

export default function ErrorAlert({ message }) {
  return (
    <div role="alert" className="mb-3">
        <div className ="border border-red-dark rounded-b bg-light-red px-4 py-2 text-white">
            <p>{message}</p>
        </div>
</div>
  )
}
