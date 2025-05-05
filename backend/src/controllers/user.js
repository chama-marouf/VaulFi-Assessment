export async function createUser(req, res) {
    // extract body
    const { email, password } = req.body;

    // create resposne object
    const responseObject = {
        status: 'Completed',
    };

    // send object
    res.code(400);
    res.send(responseObject);
}

export async function addPhoneNumber(req, res) {
    // extract body
    const { email, phoneNumber } = req.body;

    // create resposne object
    const responseObject = {
        status: 'Completed',
    };

    // send object
    res.send(responseObject);
}

export async function validateOTP(req, res) {
    // extract body
    const { otp } = req.body;

    // create resposne object
    const responseObject = {
        status: 'Validation was Successful',
    };

    if (otp !== '1234') {
        responseObject.status = 'OTP Validation Failed';
    }

    // send object
    res.send(responseObject);
}
