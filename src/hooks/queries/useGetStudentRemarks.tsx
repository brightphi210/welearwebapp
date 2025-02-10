import { studentRemarksGet } from '@/APIs/api/studentRemarks'
import { useQuery } from '@tanstack/react-query'

const useGetStudentRemarks = () => {
  return useQuery({
    queryKey: ['studentRemark'],
    queryFn: studentRemarksGet
  })
}

export default useGetStudentRemarks