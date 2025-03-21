import { Navigate, Route, Routes } from "react-router-dom"
import { WebPlayerPage } from "../webplayer/pages/WebPlayerPage"
import { RegisterPage } from "../auth/pages/RegisterPage"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect } from "react"
import ClipLoader from "react-spinners/ClipLoader";
import { LoginPage } from "../auth/pages/LoginPage"


export const AppRouter = () => {

  const { status, refreshToken } = useAuthStore();

  useEffect(() => {
    refreshToken();
  }, [])

  if (status === 'checking') {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader
          color="blue"
          loading={true}
          size={150}
          cssOverride={{
            borderColor: "purple",
          }}
        />
      </div>
    );
  }

  return (
    <Routes>
      {
        (status === 'authenticated') ?
          (
            <>
              <Route path='/' element={<WebPlayerPage />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </>
          )
          :
          (
            <>
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/*" element={<Navigate to="/auth/login" />} />
            </>
          )
      }
    </Routes>

  )
}
