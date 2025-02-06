import { singleStudentProfileUpdate, UpdateProps } from "@/APIs/api/singleStudentProfile"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { id: number; formData: UpdateProps }) => singleStudentProfileUpdate(data.id, data.formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["singleStudent"],
      })
    },
  })
}

export default useUpdateStudentProfile

