import React, { useEffect, useState } from 'react'

export default function PasswordGenerator(props) {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSpecial, setIncludeSpecial] = useState(true)
  const [copy, setcopy] = useState("copy password")

  useEffect(() => {
    document.title = `React/${props.title}`
    generatePassword()
  }, [props.title])

  const generatePassword = () => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (includeNumbers) characters += '0123456789'
    if (includeSpecial) characters += '!@#$%^&*()_+'

    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    setPassword(result)
    setcopy("copy password")
  }

  const copyToClipboard = () => {
  navigator.clipboard.writeText(password)
  setcopy("copied")
}

  const handleLengthChange = (e) => {
    setLength(parseInt(e.target.value))
  }

  // Generate new password whenever length / options change
  useEffect(() => {
    generatePassword()
  }, [length, includeNumbers, includeSpecial])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-green-200">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">🔐 Password Generator</h2>

        {/* Password Display */}
        <div className="relative mb-6">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full px-4 py-3 text-lg font-mono border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Password Length */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <label htmlFor="length" className="text-green-700 font-medium">Password Length: {length}</label>
          </div>
          <input
            type="range"
            id="length"
            min="8"
            max="100"
            value={length}
            onChange={handleLengthChange}
            className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer 
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:h-5 
              [&::-webkit-slider-thumb]:w-5 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:bg-green-600"
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4 mb-8">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-green-700">Include Numbers</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={includeSpecial}
              onChange={() => setIncludeSpecial(!includeSpecial)}
              className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-green-700">Include Special Characters</span>
          </label>
        </div>

        {/* Generate Button */}
        <button
          type="button"
          onClick={copyToClipboard}
          className="btn btn-primary"
        >
          {copy}
        </button>
      </div>
    </div>
  )
}
