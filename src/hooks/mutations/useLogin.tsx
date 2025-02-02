import { loginPost } from '@/APIs/api/login'
import { useMutation } from '@tanstack/react-query'

const useLogin = () => {
  return useMutation({
    mutationFn: loginPost,

  })
}

export default useLogin