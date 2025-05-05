import {
    createUserOpts,
    addPhoneNumberOpts,
    validateOtpOpts,
} from '../models/user.js';
import {
    createUser,
    addPhoneNumber,
    validateOTP,
} from '../controllers/user.js';

createUserOpts.handler = createUser;
addPhoneNumberOpts.handler = addPhoneNumber;
validateOtpOpts.handler = validateOTP;

export default async function itemRoutes(app, opts) {
    // Create User
    app.post('/user', createUserOpts);

    // Add Phone Number
    app.put('/user', addPhoneNumberOpts);

    // Validate OTP
    app.post('/user/otp', validateOtpOpts);
}
