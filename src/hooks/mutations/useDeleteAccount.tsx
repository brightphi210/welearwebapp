import { deleteAccount } from '@/APIs/api/deleteAccount'
import { useMutation } from '@tanstack/react-query'

const useDeleteAccount = () => {
  return useMutation({
    mutationFn: (email: string) => deleteAccount(email),
  })
}

export default useDeleteAccount