export interface UserDTO {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
}

export interface UpdateUserDTO {
  displayName: string
  photoURL: string
  [x: string]: string;
}
