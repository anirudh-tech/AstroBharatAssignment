/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetAstrollogersQuery } from "../features/api/apiSlice"
import MyDataGrid from "../components/dataGrid/MyDataGrid";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminHome = () => {
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: astrollogers, isLoading, isError, error } = useGetAstrollogersQuery(null);
  console.log("🚀 ~ file: AdminHome.tsx:8 ~ AdminHome ~ astrollogers:", astrollogers)

  if(isError) {
    toast.error("error fetching the data");
  }

  const handleClick = () => {
    navigate('/add-astrologer');
  }

  return (
    <div>
      {
        isLoading ? (
          <div className='absolute inset-0 bg-black/60 w-full h-full flex justify-center'>
            <div className='flex flex-col justify-center'>
              <div className='flex justify-center'>
                <BeatLoader
                  color="#36d7b7"
                  loading
                  margin={0}
                  size={15}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="font-bold text-center text-3xl py-10">ASTROLOGERS LIST</h1>
            <div className="flex justify-end pe-6 py-2 text-white ">
              <button onClick={() => handleClick()} className="bg-green-500 p-3 rounded-md hover:bg-green-800"> Add Astrologer</button>
            </div>
            {
              astrollogers ? (
                <MyDataGrid />
              ) : (
                ""
              )
            }
          </>
        )
      }
    </div>
  )
}

export default AdminHome