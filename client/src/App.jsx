import { Container } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import PostPage from "./pages/PostPage"
import Header from "./components/layout/Header"
import UserPage from "./pages/UserPage"
import { Toaster } from "./components/ui/toaster"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import SignupCard from "./components/layout/signupCard"
import LoginCard from "./components/layout/LoginCard"


function App() {

  return (
    <>
        <RecoilRoot>

      <Toaster />
      <Container maxW="620px">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/signup" element={<SignupCard />} />
          <Route path="/auth/login" element={<LoginCard />} />
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
        </Routes>
      </Container>
        </RecoilRoot>

    </>
  )
}

export default App
