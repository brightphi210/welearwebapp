import { instructorRemarksPost } from '@/APIs/api/instructorRemarks'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useInstructorRemarkPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: instructorRemarksPost,
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["instructorRemark"],
        })
      },
  })
}

export default useInstructorRemarkPost