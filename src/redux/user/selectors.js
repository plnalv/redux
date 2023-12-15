export const selectUserId = (store) => store.user.data?.id

export const selectUserCreatedAt = (store) => store.user.data?.createdAt

export const selectUserEmail = (store) => store.user.data?.email

export const selectLoading = (store) => store.user.loading

export const selectUserError = (store) => store.user.error