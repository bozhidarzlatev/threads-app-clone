import { Container } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import PostPage from "./pages/PostPage"
import Header from "./components/layout/Header"
import UserPage from "./pages/UserPage"
import { Toaster } from "./components/ui/toaster"


function App() {

  return (
    <>
      <Toaster />
      <Container maxW="620px">
        <Header />
        <Routes>
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
