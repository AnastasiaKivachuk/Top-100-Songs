export interface UserAdminDTO {
  id: number
  firstName: string
  lastName: string
  email: string
  isCurrentUser: boolean
  // role: USER_ROLE
  // photo?: FileResponseDTO
  isRegistrationComplete?: boolean
}
