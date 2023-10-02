import React from 'react'

const Nameinput = ({ value, onChange }) => {
  return (
    <div>
    <label htmlFor="name-address" className="sr-only">
      Email address
    </label>
    <input
      id="name-address"
      name="name"
      type="text"
      autoComplete="name"
      required
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="Name address"
      value={value}
      onChange={onChange}
    />
  </div>
  )
}

export default Nameinput