import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
    Inquiry: a
        .model({
            name: a.string().required(),
            email: a.string().required(),
            projectType: a.string(),
            message: a.string().required(),
            status: a.string(),
            admin: a.string().array(),
        })
        .authorization((allow) => [
            allow.publicApiKey(),
            allow.guest(),
            allow.authenticated(),
        ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});
