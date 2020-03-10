const adminsOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const error = new Error('You do not have permission to view this page')
    error.status = 403
    return next(error)
  }
  next()
}

const matchingUserOrAdmin = (req, res, next) => {
  if (!req.user) {
    const error = new Error('You must be logged in')
    error.status = 403
    return next(error)
  } else {
    if (req.user.id !== req.params.userId && !req.user.isAdmin) {
      const error = new Error('Mismatched user/not an admin')
      error.status = 403
      return next(error)
    }
    next()
  }
  next()
}

module.exports = {adminsOnly, matchingUserOrAdmin}
