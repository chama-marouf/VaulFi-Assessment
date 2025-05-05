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
                },
            },
            400: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
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
            required: ['otp'],
            properties: {
                otp: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                },
            },
        },
    },
};
