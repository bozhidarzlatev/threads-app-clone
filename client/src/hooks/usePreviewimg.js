import { useState } from "react"
import useShowToast from "./useShowToast";

const usePreviewimg = () => {
    const [imgUrl, setImgUrl] = useState(null);
    const {showToast} = useShowToast()

    const handleimageChange = (e) => {
        const file = e.target.files[0];
        if(file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgUrl(reader.result)
                
            }

            reader.readAsDataURL(file)
        } else {
            showToast(false, "Please select an image file!")
            setImgUrl(null)
        }

    }
    
    return { handleimageChange, imgUrl }
}

export default usePreviewimg