import { hiringPost } from '@/APIs/api/hireInstructor'
import { useMutation } from '@tanstack/react-query'

const useHiringInstructor = () => {
  return useMutation({
    mutationFn: hiringPost,
  })
}

export default useHiringInstructor