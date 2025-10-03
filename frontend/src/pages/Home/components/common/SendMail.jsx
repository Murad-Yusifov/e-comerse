const SendMail = () => {
  return (
    <div className=' flex flex-col gap-2 justify-between'>
      <h1>Sign Up for the NEWSLETTER</h1>

      <label htmlFor="mailData" className="flex justify-around gap-1 border p-1 rounded-md">
        <input type="text" id="mailData" placeholder="Subscribe" className="outline-0 px-2" />
        <button className="cursor-pointer">Subscripe</button>
      </label>

      <ul className="flex justify-around">
        <li>twitter</li>
        <li>instagram</li>
        <li>whatsap</li>
        <li>github</li>
      </ul>


    </div>
  );
};

export default  SendMail;