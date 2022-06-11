import toast, { Toast } from "react-hot-toast";

const toastOptions:
    Partial<Pick<Toast, "id" | "icon" | "duration" | "ariaProps" | "className" | "style" | "position" | "iconTheme">> | undefined
    = {
    duration: 2500,
    position: 'top-center',
    style: {},
    className: '',
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    }
}

export const showToast = (type: string, text: string) => {
    toast.dismiss()
    switch (type) {
        case 'success':
            toast.success(text, toastOptions);
            break;
        case 'error':
            toast.error(text, toastOptions);
            break;
        case 'loading':
            toast.loading(text, {...toastOptions, duration: 10000});
            break;
        default:
            toast(text, toastOptions);
    }
}

export const dismissAllToasts = () => {
    toast.dismiss()
}