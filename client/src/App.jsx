import { Container } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import PostPage from "./pages/PostPage"
import Header from "./components/layout/Header"
import UserPage from "./pages/UserPage"
import { Toaster } from "./components/ui/toaster"
import HomePage from "./pages/HomePage"
import SignupCard from "./components/layout/signupCard"
import LoginCard from "./components/layout/LoginCard"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import UserProvider from "./providers/UserProvider"
import NavigateButtons from "./components/layout/NavigateButtons"
import PostProvider from "./providers/PostProvider"

function App() {

  return (
    <>
      <UserProvider>
        <PostProvider>


          <Toaster />
          <Container maxW="620px">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth/signup" element={<SignupCard />} />
              <Route path="/auth/login" element={<LoginCard />} />
              <Route path="/auth/update" element={<UpdateProfilePage />} />
              <Route path="/:username" element={<UserPage />} />
              <Route path="/:username/post/:pid" element={<PostPage />} />
            </Routes>

          </Container>
          <NavigateButtons />
        </PostProvider >
      </UserProvider>


    </>
  )
}

export default App
