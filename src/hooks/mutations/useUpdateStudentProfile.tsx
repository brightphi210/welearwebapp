import { singleStudentProfileUpdate } from "@/APIs/api/singleStudentProfile"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { id: number; formData: FormData }) => singleStudentProfileUpdate(data.id, data.formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["singleStudent"],
      })
    },
  })
}

export default useUpdateStudentProfile

