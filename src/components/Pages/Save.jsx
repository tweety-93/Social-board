import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { remove } from '../../store/SaveSlice'
import { IoMdClose } from "react-icons/io";

function Save() {
  const photos=useSelector(state=>state.save.items)
  const dispatch=useDispatch()

  const removeHandler=(id)=>{
    dispatch(remove(id))
  }
  
  return (
    <div className="flex justify-center">
      <div className="mx-8 ml-64">
        {photos.length>0 ?( <div className="grid grid-cols-4 gap-3">
          {photos.map((p)=>(
            <div key={p.id} className="relative group">
              <img src={p.largeImageURL} alt={p.user} />
            
                <div className="absolute z-10 transition-transform duration-300 transform shadow-lg cursor-pointer top-2 right-2 group-hover:scale-125">
                <IoMdClose  className="text-xl" onClick={()=>removeHandler(p.id)}/>
              </div>
              </div>
            ))}
        </div>):(
          <div>
            <h4 className="text-xl">no more saved posts......</h4>
          </div>
        )}
      </div>
    </div>
  )
}
export default Save