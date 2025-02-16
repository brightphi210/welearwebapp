

import { instructorPasswordUpdate } from '@/APIs/api/instructorPasswordUpdate'
import { setAuthToken } from '@/APIs/base'
import { useMutation } from '@tanstack/react-query'

const useInstructorPasswordUpdate = () => {
  setAuthToken()
  return useMutation({
    mutationFn: instructorPasswordUpdate
  })
}

export default useInstructorPasswordUpdate
