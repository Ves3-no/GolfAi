import { Post } from '../App'
import Markdown from 'react-markdown'
function MainPage({Status, setChats, Chats, ChatMessage, UserID, setChatMessage, Iron, Image, chatref}){
    return(
        <>
        <div className='flex flex-col h-[90vh] w-[100%] justify-center items-center' >
            <div id='ChatBox' className='w-[95%] flex-8 overflow-y-scroll flex flex-col gap-6 overflow-x-hidden p-2 border-[2px] border-[#B7D8B9] rounded-2xl' >
                {Chats.map((Chat, index) => (
                    Chat.writer === "You" ? (
                        <div key={index} ref={chatref} className='text-base bg-[#B7D8B9] p-4 rounded-2xl self-start max-w-[90%]'>
                            <p className='font-bold text-lg border-b text-[#41633e]'>Trener</p>
                            <Markdown>{Chat.messageText}</Markdown>
                        </div>
                    ) : (
                        <div key={index} ref={chatref} className='text-base bg-[#7b9c7d] text-[#B7D8B9] p-4 rounded-2xl self-end max-w-[80%] self-right'>
                            <p className='font-bold text-lg border-b text-[#41633e]'>Du</p>
                            <Markdown>{Chat.messageText}</Markdown>
                        </div>
                    )
                ))}
            </div>
            <form onSubmit={(e)=> {(e).preventDefault();Post(Status, setChats, Chats, ChatMessage, UserID, setChatMessage, Image)}} className='flex flex-1 p-2 flex-row w-[95%] items-center justify-center gap-4'>
                <input type="text" onChange={(e)=> setChatMessage(e.target.value)} value={ChatMessage} className='p-5 bg-[#B7D8B9] rounded-2xl flex-4' placeholder='Spør om hva som helst!'/>
                <input type="submit" value="Send" className='rounded-2xl p-5 bg-[#2F5D3A] hover:bg-[#3A7448] active:bg-[#24472C] text-white text-xl shadow-[0_4px_12px_rgba(47,93,58,0.25)] flex-1' />
            </form>
        </div>
        
        </>
    )
}
export default MainPage