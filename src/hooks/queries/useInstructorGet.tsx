import { instructorGetApi } from '@/APIs/api/instructorsGet'
import { useQuery } from '@tanstack/react-query'

const useInstructorGet = () => {
  return useQuery({
    queryKey: ['instructor'],
    queryFn: async () => instructorGetApi()
  })
}

export default useInstructorGet
