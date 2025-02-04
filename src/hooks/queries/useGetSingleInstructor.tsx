import { singleInstructorGetApi } from '@/APIs/api/instructorsGet'
import { useQuery } from '@tanstack/react-query'

const useGetSingleInstructor = (userID: number) => {
  return useQuery({
    queryKey: ['singleInstructor', userID],
    queryFn: ()=> singleInstructorGetApi(userID)
  })
}

export default useGetSingleInstructor