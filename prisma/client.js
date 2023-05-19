const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public",
        },
    },
});

module.exports = prisma;
