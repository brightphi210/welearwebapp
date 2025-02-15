import { singleInstructorUpdateApi } from "@/APIs/api/instructorsGet"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useUpdateInstructorProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { id: number; formData: FormData }) => singleInstructorUpdateApi(data.id, data.formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["singleInstructor"],
      })
    },
  })
}

export default useUpdateInstructorProfile

