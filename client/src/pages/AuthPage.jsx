import { useRecoilValue, useSetRecoilState } from "recoil";
import LoginCard from "../components/layout/LoginCard";
import SignupCard from "../components/layout/signupCard";
import authScreenAtom from "../atoms/authAtom";

export default function AuthPage(){
    const authScreenState = useRecoilValue(authScreenAtom);
    
    useSetRecoilState(authScreenState)
    return (
       <LoginCard />
    )
}