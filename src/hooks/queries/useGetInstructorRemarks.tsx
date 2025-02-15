import { instructorRemarksGet } from '@/APIs/api/instructorRemarks'
import { useQuery } from '@tanstack/react-query'

const useGetInstructorRemarks = () => {
  return useQuery({
    queryKey: ['instructorRemark'],
    queryFn: instructorRemarksGet
  })
}

export default useGetInstructorRemarks
