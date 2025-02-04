import { singleStudentProfileGet } from '@/APIs/api/singleStudentProfile'
import { useQuery } from '@tanstack/react-query'

const useGetSingleStudent = (userID: number) => {
  return useQuery({
    queryKey: ['singleStudent'],
    queryFn: ()=> singleStudentProfileGet(userID)
  })
}

export default useGetSingleStudent