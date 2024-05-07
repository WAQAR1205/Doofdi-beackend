const  User  =require ("../models/userModel.js");
const  catchAsyncErrors=require ("./catchAsyncErrors.js");
const ErrorHandler=require ("./error.js");
const jwt=require ("jsonwebtoken");

const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler("Dashboard User is not authenticated!", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} not authorized for this resource!`,
        403
      )
    );
  }
  next();
});

module.exports = isAdminAuthenticated
