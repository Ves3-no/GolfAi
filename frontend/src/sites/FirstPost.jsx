import { FirstPost } from '../App'
function FirstPage({Iron, Status, setStatus, Image, setChats, Chats, UserID, setImage, setIron, setLoading}){
return(
    <div className='flex flex-col font-[cause] h-[80vh] gap-[3vh]'>
        <div className='text-center flex-3'>
            <h1 className='text-white text-5xl font-bold m-8 '>Ai Golf Trener</h1>
            <p className='p-2 bg-[#B7D8B9] rounded-2xl text-left text-[#41633e] mx-auto w-[80%]'>AI-golfapp som analyserer sving og data via bilder eller chat. Med Gemini AI får du profesjonelle, konkrete tips basert på teknikk, fart og spinn for å utvikle spillet ditt.</p>
        </div>
        <span className='w-[90%] mx-auto h-[2px] bg-[#B7D8B9] rounded-2xl '></span>
        <form className='flex flex-col flex-7 px-8 gap-4' onSubmit={(e)=> {(e).preventDefault(); FirstPost(Iron, Status, setStatus, Image, setChats, Chats, UserID, setLoading)}}>
            <select onChange={(e) => {setIron(e.target.value)}} value={Iron} className='border-1 p-3 border-[#B7D8B9] rounded-2xl text-lg text-[#B7D8B9] open:text-[#41633e] open:bg-[#B7D8B9] transition-all'>
                <option value="1-iron">1 Iron</option>
                <option value="2-iron">2 Iron</option>
                <option value="3-iron">3 Iron</option>
                <option value="4-iron">4 Iron</option>
                <option value="5-iron">5 Iron</option>
                <option value="6-iron">6 Iron</option>
                <option value="7-iron">7 Iron</option>
                <option value="8-iron">8 Iron</option>
                <option value="9-iron">9 Iron</option>
                <option value="pw">Pitching Wedge (PW)</option>
                <option value="aw">Approach Wedge (AW)</option>
                <option value="gw">Gap Wedge (GW)</option>
                <option value="sw">Sand Wedge (SW)</option>
                <option value="lw">Lob Wedge (LW)</option>
                <option value="Driver">Driver</option>
                <option value="driving-iron">Driving Iron</option>
            </select>
            <div className='w-full bg-[#B7D8B9] aspect-[2/1] flex items-center justify-center rounded-2xl'>
            <input type="file" id="myFile" className='hidden w-full h-[100%]' name="myFile" accept=".jpg, .png, .pdf" onChange={(e) => {setImage(e.target.files[0])}} />
            <label htmlFor="myFile" className='text-2xl text-[#41633e] w-full h-[100%] flex items-center justify-center p-5'>{Image ? Image.name : "Velg fil"}</label>
            </div>
            <input type="submit" value="Analyser" className='rounded-2xl p-5 bg-[#2F5D3A] hover:bg-[#3A7448] active:bg-[#24472C] text-white text-xl shadow-[0_4px_12px_rgba(47,93,58,0.25)]'/>
        </form>
    </div>
    )
}
export default FirstPage