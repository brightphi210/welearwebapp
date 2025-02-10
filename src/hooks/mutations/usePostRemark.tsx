import { studentRemarksPost } from '@/APIs/api/studentRemarks'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const usePostRemark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: studentRemarksPost,
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["studentRemark"],
        })
      },
  })
}

export default usePostRemark