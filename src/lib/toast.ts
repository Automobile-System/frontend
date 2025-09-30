import { toast } from "sonner"

export const showToast = {
  success: (message: string, description?: string) => {
    toast.success(message, {
      description,
    })
  },
  error: (message: string, description?: string) => {
    toast.error(message, {
      description,
    })
  },
  warning: (message: string, description?: string) => {
    toast.warning(message, {
      description,
    })
  },
  info: (message: string, description?: string) => {
    toast.info(message, {
      description,
    })
  },
  loading: (message: string) => {
    return toast.loading(message)
  },
  promise: <T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string
      success: (data: T) => string
      error: (error: Error) => string
    }
  ) => {
    return toast.promise(promise, {
      loading,
      success,
      error,
    })
  },
}