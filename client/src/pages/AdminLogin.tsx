import loginSvg from "../assets/login.svg"
import LoginForm from "../components/forms/LoginForm"

const AdminLogin = () => {
  return (
    <>
      <div className="w-full h-screen flex ">
        <div className="w-full md:w-1/2 h-full bg-blue-500 items-center justify-center flex flex-col gap-6 p-16">
          <h1 className="text-3xl text-white font-serif font-semibold ">Admin Login</h1>
          <LoginForm/>
        </div>
        <div className="w-1/2 h-full items-center justify-center  hidden md:flex">
          <img src={loginSvg} alt="" />
        </div>
        
      </div>
    </>
  )
}

export default AdminLogin