import { signupPost } from '@/APIs/api/signup'
import { useMutation } from '@tanstack/react-query'

const useRegister = () => {
  return useMutation({
    mutationFn: signupPost,
  })
}

export default useRegister