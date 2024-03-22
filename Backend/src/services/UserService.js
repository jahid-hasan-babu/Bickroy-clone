const userLogin = async (req) => {
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);
    let EmailText = `Your 6 digit code is = ${code}`;
    let EmailSubject = `OTP verification for Bikroy.com`;
  } catch (error) {
    return { status: "fail", message: "Something went wrong !" };
  }
};
