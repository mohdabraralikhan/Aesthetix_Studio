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
    
    Project: a
        .model({
            name: a.string().required(),
            description: a.string(),
            status: a.enum(['Planning', 'In Progress', 'In Review', 'Completed']),
            ownerId: a.string().required(),
            tasks: a.hasMany('Task', 'projectId'),
            teamMembers: a.string().array(),
            budget: a.float(),
            hourlyRate: a.float(),
            currencyCode: a.string(),
            createdAt: a.datetime(),
            updatedAt: a.datetime(),
        })
        .authorization((allow) => [
            allow.authenticated(),
            allow.guest(),
        ]),
    
    Task: a
        .model({
            title: a.string().required(),
            description: a.string(),
            assignee: a.string().required(),
            priority: a.enum(['Low', 'Medium', 'High']).required(),
            status: a.enum(['To Do', 'In Progress', 'In Review', 'Completed']).required(),
            dueDate: a.date().required(),
            projectId: a.id().required(),
            project: a.belongsTo('Project', 'projectId'),
            comments: a.hasMany('Comment', 'taskId'),
            attachments: a.hasMany('Attachment', 'taskId'),
            timeLogged: a.float(),
            estimatedHours: a.float(),
            hourlyRate: a.float(),
            costAllocated: a.float(),
            dependencies: a.string().array(),
            phase: a.string(),
            createdAt: a.datetime(),
            updatedAt: a.datetime(),
        })
        .authorization((allow) => [
            allow.authenticated(),
            allow.guest(),
        ]),
    
    Comment: a
        .model({
            text: a.string().required(),
            author: a.string().required(),
            taskId: a.id().required(),
            task: a.belongsTo('Task', 'taskId'),
            createdAt: a.datetime(),
        })
        .authorization((allow) => [
            allow.authenticated(),
            allow.guest(),
        ]),
    
    Attachment: a
        .model({
            fileName: a.string().required(),
            fileUrl: a.string().required(),
            fileSize: a.float(),
            fileType: a.string(),
            taskId: a.id().required(),
            task: a.belongsTo('Task', 'taskId'),
            uploadedBy: a.string().required(),
            createdAt: a.datetime(),
        })
        .authorization((allow) => [
            allow.authenticated(),
            allow.guest(),
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
