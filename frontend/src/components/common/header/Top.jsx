const Top = () => {
  return (
    <div className="w-full p-2">
      {/* <h1 className="text-blue-300">Hello Top {`connection informations and etc`}</h1> */}
      <div className="w-[90%] flex justify-around">
        {/* Left */}
        <ul className="w-3/8 flex gap-2 justify-start">
          <li>number</li>
          <li>main</li>
          <li>address</li>
        </ul>

        <ul className="w-2/4 flex gap-2 justify-end">
          <li>currency</li>
          <li>my acount</li>
        </ul>
      </div>
    </div>
  )
}

export default Top
