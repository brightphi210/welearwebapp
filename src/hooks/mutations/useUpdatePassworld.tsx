
import { studentPasswordUpdate } from '@/APIs/api/studentPasswordUpdate'
import { setAuthToken } from '@/APIs/base'
import { useMutation } from '@tanstack/react-query'

const useUpdatePassworld = () => {
  setAuthToken()
  return useMutation({
    mutationFn: studentPasswordUpdate
  })
}

export default useUpdatePassworld