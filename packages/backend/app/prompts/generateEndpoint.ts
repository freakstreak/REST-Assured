const generateGetEndpoint = (description, prismaFile, model) => {
  return `Generate a get api business logic for ${model} in node.js and express.js. The description of the application is: "${description}"
  
  I have following prisma file : ${prismaFile}
  
  Use following boilerplate:

  '''typescript
  import { PrismaClient } from '@prisma/client';

  const prisma = new PrismaClient();
  export default function (req, res) {
    try {
      // ...bussiness logic
      // return  response as json
    } catch (error: any) {
      // handle error
    }
    finally {
    // Clean up Prisma Client
    await prisma.$disconnect();
    }
  }
  '''

  Only generate code inside the function.
  Don't create whole express server, just the business logic.
  The code should strictly follow the following the above boilerplate, it should not include any additional imports or exports.
  The function should be able to fetch all ${model} from the database and return it as a json response.
  Ensure that code has correct error handling and business logic.
  Only provide the typescript file, without any introductory or explanatory text outside the code.
  Please include delimeter at the start and end of the code block.
  must put code in format '''typescript <code_block> ''' at the start and end of the schema`;
};

const generatePostEndpoint = (description, prismaFile, model) => {
  return `Generate a post api for ${model} in node.js and express.js. The description of the application is: "${description}"
    
    I have following prisma file : ${prismaFile}
    
    Use following boilerplate:
    
    '''typescript
  import { PrismaClient } from '@prisma/client';

  const prisma = new PrismaClient();
  export default function (req, res) {
    try {
      // ...bussiness logic
      // return  response as json
    } catch (error: any) {
      // handle error
    }
    finally {
    // Clean up Prisma Client
    await prisma.$disconnect();
    }
  }
    '''
    
    Only generate code inside the function.
    Don't create whole express server, just the business logic.
    The code should strictly follow the following the above boilerplate, it should not include any additional imports or exports.
    The function should be able to create a new ${model} in the database and return it as a json response.
    Ensure that code has correct error handling and business logic.
    Only provide the typescript file, without any introductory or explanatory text outside the code.
    Please include delimeter at the start and end of the code block.
    must put code in format '''typescript <code_block> ''' at the start and end of the schema`;
};

const generatePutEndpoint = (description, prismaFile, model) => {
  return `Generate a put api for ${model} in node.js and express.js. The description of the application is: "${description}"
      
      I have following prisma file : ${prismaFile}
      
      Use following boilerplate:
      
      '''typescript
      import { PrismaClient } from '@prisma/client';

      const prisma = new PrismaClient();
      export default function (req, res) {
        try {
          const { id } = req.params;
          // ...bussiness logic
          // return  response as json
        } catch (error: any) {
          // handle error
        }
        finally {
        // Clean up Prisma Client
        await prisma.$disconnect();
        }
      }
      '''
      Only generate code inside the function.
      Don't create whole express server, just the business logic.
      The code should strictly follow the following the above boilerplate, it should not include any additional imports or exports.
      The function should be able to update the ${model} in the database and return it as a json response.
      Ensure that code has correct error handling and business logic.
      Only provide the typescript file, without any introductory or explanatory text outside the code.
      Please include delimeter at the start and end of the code block.
      must put code in format '''typescript <code_block> ''' at the start and end of the schema`;
};

const generateDeleteEndpoint = (description, prismaFile, model) => {
  return `Generate a delete api for ${model} in node.js and express.js. The description of the application is: "${description}"
        
        I have following prisma file : ${prismaFile}
        
        Use following boilerplate:
        
        '''typescript
        import { PrismaClient } from '@prisma/client';

        const prisma = new PrismaClient();
        export default function (req, res) {
          try {
            const { id } = req.params;
            // ...bussiness logic
            // return  response as json
          } catch (error: any) {
            // handle error
          }
          finally {
          // Clean up Prisma Client
          await prisma.$disconnect();
          }
        }
        '''
        
        Only generate code inside the function.
        Don't create whole express server, just the business logic.
        The code should strictly follow the following the above boilerplate, it should not include any additional imports or exports.
        The function should be able to delete the ${model} in the database and return it as a json response.
        Ensure that code has correct error handling and business logic.
        Only provide the typescript file, without any introductory or explanatory text outside the code.
        Please include delimeter at the start and end of the code block.
        must put code in format '''typescript <code_block> ''' at the start and end of the schema`;
};

const getEndpointPrompt = (description, prismaFile, model, operation) => {
  switch (operation) {
    case "read":
      return generateGetEndpoint(description, prismaFile, model);
    case "create":
      return generatePostEndpoint(description, prismaFile, model);
    case "update":
      return generatePutEndpoint(description, prismaFile, model);
    case "delete":
      return generateDeleteEndpoint(description, prismaFile, model);
  }
};

export default getEndpointPrompt;
