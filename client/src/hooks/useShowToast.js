import { toaster } from "../components/ui/toaster";

const useShowToast = () => {
    const showToast = (status, description) => {
        const toast = {
            title: "Success",
            description: description,
            type: "success",
            duration: 3000,
            closable: true
        }

        if(!status) {
            toast.title = "Error";
            toast.type = "error";
        }

        toaster.create(toast)
    }

    return showToast
};

export default useShowToast;