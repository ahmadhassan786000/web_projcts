import React, {useEffect} from 'react'

export default function Home(props) {

    useEffect(()=>{
        document.title = `React/${props.title}`
    },[props.title])

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
  <p className='bg-slate-50 p-4 rounded text-gray-700 text-center'>
    Create strong, secure, and random passwords instantly with our easy-to-use password generator. Customize your password length and choose to include numbers or special characters for extra protection!
  </p>
</div>

  )
}
