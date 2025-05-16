export const createUserOpts = {
    schema: {
        tags: ['User'],
        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    message: { type: 'string' },
                },
            },
            400: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    message: { type: 'string' },
                },
            },
        },
    },
};

export const addPhoneNumberOpts = {
    schema: {
        tags: ['User'],
        body: {
            type: 'object',
            required: ['email', 'phoneNumber'],
            properties: {
                email: { type: 'string' },
                phoneNumber: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    data: {
                        type: 'object',
                        properties: {
                            otpId: { type: 'string' },
                            expiresAt: { type: 'string' },
                        },
                    },
                },
            },
            400: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    message: { type: 'string' },
                },
            },
        },
    },
};

export const validateOtpOpts = {
    schema: {
        tags: ['User'],
        body: {
            type: 'object',
            required: ['otpId', 'code'],
            properties: {
                otpId: { type: 'string' },
                code: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    data: {
                        type: 'object',
                        properties: {
                            verified: { type: 'boolean' },
                            token: { type: 'string' },
                        },
                    },
                    message: { type: 'string' },
                },
            },
            400: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    message: { type: 'string' },
                },
            },
        },
    },
};
