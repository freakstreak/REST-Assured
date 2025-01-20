const generatePrismaSchema = (description, schema) => {
  return `Generate a schema file from the json file which has schema name and attributes. The description of the application is: "${description}"

The schema for application is: ${JSON.stringify(schema)}

The generated file should have content in following format:

'''schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

{Custom Schema}
'''


Use Exact Schema name, just capitalize the first letter of the schema name.
Ensure the response is valid schema.prisma file in formatted way.
Include all the attributes of the schema in the generated schema file.
Only provide the schema.prisma file, without any introductory or explanatory text outside the schema.prisma structure.
Please ensure the schema.prisma file is valid and very well linted as per prisma standards
Please include delimeter between the schema and the generator block
must put code in format '''schema.prisma <code_block> ''' at the start and end of the schema`;
};

export default generatePrismaSchema;
