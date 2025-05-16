export async function createUser(req, res) {
    // extract body
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        res.code(400);
        return res.send({
            status: 'error',
            message: 'Email and password are required',
        });
    }

    // create response object
    const responseObject = {
        status: 'success',
        message: 'User created successfully',
    };

    // send object
    res.code(200);
    res.send(responseObject);
}

export async function addPhoneNumber(req, res) {
    // extract body
    const { email, phoneNumber } = req.body;

    // Validate required fields
    if (!email || !phoneNumber) {
        res.code(400);
        return res.send({
            status: 'error',
            message: 'Email and phone number are required',
        });
    }

    // create response object
    const responseObject = {
        status: 'success',
        data: {
            otpId: '123456', // In a real app, this would be a generated ID
            expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes from now
        },
    };

    // send object
    res.code(200);
    res.send(responseObject);
}

export async function validateOTP(req, res) {
    // extract body
    const { otpId, code } = req.body;

    // Validate required fields
    if (!otpId || !code) {
        res.code(400);
        return res.send({
            status: 'error',
            message: 'OTP ID and code are required',
        });
    }

    // In a real app, you would validate the OTP against a database
    // For demo purposes, we'll accept '1234' as the valid code
    const isValid = code === '1234';

    // create response object
    const responseObject = {
        status: isValid ? 'success' : 'error',
        data: {
            verified: isValid,
            token: isValid ? 'mock-jwt-token' : undefined,
        },
        message: isValid ? 'OTP verified successfully' : 'Invalid OTP code',
    };

    // send object
    res.code(isValid ? 200 : 400);
    res.send(responseObject);
}
