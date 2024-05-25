export const emailVerify = (verifyUrl: string) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<body>
    <p>Dear user,</p>
    <p>Thank you for registering. Please click the following link to verify your email address:</p>
    <p><a
            href="${verifyUrl}">${verifyUrl}</a>
    </p>
    <p>If you didn't register on our website, you can safely ignore this email.</p>
    <p>Best regards,<br>Your Melons Owner</p>
</body>

</html>
`

export const emailResetPassword = (resetPasswordUrl: string) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<body>
    <p>Dear user,</p>
    <p>Please click the following link to reset your password:</p>
    <p><a
            href="${resetPasswordUrl}">${resetPasswordUrl}</a>
    </p>
    <p>If you don't want to reset your password on our website, you can safely ignore this email.</p>
    <p>Best regards,<br>Your Melons Owner</p>
</body>

</html>
`