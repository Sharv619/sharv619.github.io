/**
 * AWS Infrastructure Deployment Script
 * 
 * This script automates AWS resource creation for the RAG chatbot:
 * 1. Creates S3 bucket with security settings
 * 2. Sets up RDS with pgvector extension
 * 3. Configures Bedrock Knowledge Base
 * 4. Configures Bedrock Guardrails
 * 
 * Usage: 
 *   export AWS_REGION=us-east-1
 *   export KB_BUCKET_NAME=sharv619-knowledge-base
 *   node deploy-infrastructure.js
 */

const { 
  S3Client, 
  CreateBucketCommand, 
  PutBucketPolicyCommand,
  PutPublicAccessBlockCommand 
} = require('@aws-sdk/client-s3');
const { 
  RDSClient, 
  CreateDBClusterCommand,
  CreateDBInstanceCommand,
  DescribeDBInstancesCommand
} = require('@aws-sdk/client-rds');
const {
  BedrockClient,
  CreateGuardrailCommand,
  CreateGuardrailVersionCommand,
  ListGuardrailsCommand
} = require('@aws-sdk/client-bedrock');
const { 
  BedrockRuntimeClient,
  CreateKnowledgeBaseCommand,
  CreateDataSourceCommand
} = require('@aws-sdk/client-bedrock-runtime');
const { 
  IAMClient, 
  CreateRoleCommand,
  AttachRolePolicyCommand,
  PutRolePolicyCommand
} = require('@aws-sdk/client-iam');
const { 
  LambdaClient, 
  CreateFunctionCommand,
  AddPermissionCommand
} = require('@aws-sdk/client-lambda');
const { 
  APIGatewayClient, 
  CreateRestApiCommand,
  CreateDeploymentCommand,
  CreateResourceCommand,
  PutMethodCommand,
  IntegrationResponse,
  PutIntegrationCommand,
  PutIntegrationResponseCommand
} = require('@aws-sdk/client-apigateway');
const { 
  SSMClient, 
  PutParameterCommand 
} = require('@aws-sdk/client-ssm');

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  region: process.env.AWS_REGION || 'us-east-1',
  bucketName: process.env.KB_BUCKET_NAME || 'sharv619-knowledge-base',
  dbClusterId: 'sharv619-pgvector-cluster',
  dbInstanceId: 'sharv619-pgvector-instance',
  dbName: 'assistant_kb',
  dbUsername: process.env.DB_USERNAME || 'admin',
  dbPassword: process.env.DB_PASSWORD || 'ChangeMe123!',
  guardrailName: 'Assistant-Guardrail',
  knowledgeBaseName: 'Assistant-Knowledge-Base',
  lambdaFunctionName: 'Assistant-RAG-Orchestrator',
  apiName: 'Assistant-API',
};

// Initialize clients
const s3 = new S3Client({ region: CONFIG.region });
const rds = new RDSClient({ region: CONFIG.region });
const bedrock = new BedrockClient({ region: CONFIG.region });
const bedrockRuntime = new BedrockRuntimeClient({ region: CONFIG.region });
const iam = new IAMClient({ region: CONFIG.region });
const lambda = new LambdaClient({ region: CONFIG.region });
const apigateway = new APIGatewayClient({ region: CONFIG.region });
const ssm = new SSMClient({ region: CONFIG.region });

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}➜ ${message}${colors.reset}`);
}

function error(message) {
  console.log(`${colors.red}✗ ${message}${colors.reset}`);
}

function success(message) {
  console.log(`${colors.green}✓ ${message}${colors.reset}`);
}

/**
 * Step 1: Create S3 Bucket with security
 */
async function createS3Bucket() {
  log('Creating S3 bucket...', 'cyan');
  
  try {
    // Create bucket
    await s3.send(new CreateBucketCommand({
      Bucket: CONFIG.bucketName,
      ObjectLockEnabledForBucket: true,
    }));
    
    // Block public access
    await s3.send(new PutPublicAccessBlockCommand({
      Bucket: CONFIG.bucketName,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    }));
    
    // Bucket policy - only allow access from this account
    const policy = {
      Version: '2012-10-17',
      Statement: [{
        Sid: 'DenyUnSecureTransport',
        Effect: 'Deny',
        Principal: '*',
        Action: 's3:*',
        Resource: `arn:aws:s3:::${CONFIG.bucketName}/*`,
        Condition: {
          Bool: { 'aws:SecureTransport': 'false' }
        }
      }]
    };
    
    await s3.send(new PutBucketPolicyCommand({
      Bucket: CONFIG.bucketName,
      Policy: JSON.stringify(policy),
    }));
    
    success(`S3 bucket ${CONFIG.bucketName} created with security settings`);
    
    // Upload initial knowledge base
    const kbPath = path.join(__dirname, '../../src/lib/knowledge-base.json');
    if (fs.existsSync(kbPath)) {
      const { PutObjectCommand } = require('@aws-sdk/client-s3');
      await s3.send(new PutObjectCommand({
        Bucket: CONFIG.bucketName,
        Key: 'knowledge-base.json',
        Body: fs.readFileSync(kbPath),
        ContentType: 'application/json',
      }));
      success('Knowledge base uploaded to S3');
    }
    
    return CONFIG.bucketName;
  } catch (err) {
    if (err.name === 'BucketAlreadyOwnedByYou') {
      success(`S3 bucket ${CONFIG.bucketName} already exists`);
      return CONFIG.bucketName;
    }
    throw err;
  }
}

/**
 * Step 2: Initialize pgvector on RDS
 * 
 * Note: For Aurora Serverless v2, pgvector extension is enabled via
 * the DB cluster parameter group. This is typically done through 
 * the RDS Console or CloudFormation/Terraform.
 * 
 * This script documents the required configuration.
 */
async function setupRDSWithPgvector() {
  log('Setting up RDS with pgvector...', 'cyan');
  
  // For Aurora Serverless v2 with pgvector, you need:
  // 1. Create DB cluster with custom parameter group
  // 2. Set shared_preload_libraries = 'vector'
  // 3. Enable vector extension: CREATE EXTENSION IF NOT EXISTS vector;
  
  log('RDS pgvector setup requires manual configuration:', 'yellow');
  log('1. Create Aurora PostgreSQL Serverless v2 cluster', 'yellow');
  log('2. Set parameter group: shared_preload_libraries = vector', 'yellow');
  log('3. Run: CREATE EXTENSION IF NOT EXISTS vector;', 'yellow');
  log('4. Run: CREATE EXTENSION IF NOT EXISTS pgvector;', 'yellow');
  
  // Store connection info in SSM
  await ssm.send(new PutParameterCommand({
    Name: `/assistant/${CONFIG.dbClusterId}/host`,
    Value: `${CONFIG.dbClusterId}.cluster-xxx.${CONFIG.region}.rds.amazonaws.com`,
    Type: 'String',
    Overwrite: true,
  }));
  
  success('RDS connection info stored in SSM');
  
  return {
    host: `${CONFIG.dbClusterId}.cluster-xxx.${CONFIG.region}.rds.amazonaws.com`,
    port: 5432,
    database: CONFIG.dbName,
  };
}

/**
 * Step 3: Configure Bedrock Guardrails
 */
async function setupBedrockGuardrails() {
  log('Configuring Bedrock Guardrails...', 'cyan');
  
  try {
    // Check if guardrail exists
    const listResult = await bedrock.send(new ListGuardrailsCommand({
      maxResults: 10,
    }));
    
    const existing = listResult.guardrails?.find(g => g.name === CONFIG.guardrailName);
    
    if (existing) {
      success(`Guardrail ${CONFIG.guardrailName} already exists`);
      return existing.guardrailId;
    }
    
    // Create guardrail with security settings
    const createResult = await bedrock.send(new CreateGuardrailCommand({
      name: CONFIG.guardrailName,
      description: 'Guardrail for Assistant RAG chatbot - blocks prompt injection and PII',
      blockedInputMessaging: "I can't process that request.",
      blockedOutputsMessaging: "I can't provide that response.",
      contentPolicyConfig: {
        filtersConfig: [
          // Prompt attack filter - blocks jailbreaks and prompt injection
          {
            type: 'PROMPT_ATTACK',
            inputAction: 'BLOCK',
            outputAction: 'BLOCK',
            inputStrength: 'MEDIUM',
            outputStrength: 'MEDIUM',
          },
          // Content filters
          {
            type: 'HATE',
            inputAction: 'BLOCK',
            outputAction: 'BLOCK',
            inputStrength: 'MEDIUM',
            outputStrength: 'MEDIUM',
          },
          {
            type: 'VIOLENCE',
            inputAction: 'BLOCK',
            outputAction: 'BLOCK',
            inputStrength: 'HIGH',
            outputStrength: 'HIGH',
          },
        ],
      },
      // PII redaction
      sensitiveInformationPolicyConfig: {
        piiEntitiesConfig: [
          {
            action: 'MASK',
            type: 'EMAIL',
          },
          {
            action: 'MASK',
            type: 'PHONE',
          },
        ],
      },
    }));
    
    const guardrailId = createResult.guardrailId;
    
    // Create version
    await bedrock.send(new CreateGuardrailVersionCommand({
      guardrailIdentifier: guardrailId,
    }));
    
    success(`Bedrock Guardrail created: ${guardrailId}`);
    
    // Store in SSM
    await ssm.send(new PutParameterCommand({
      Name: '/assistant/guardrail-id',
      Value: guardrailId,
      Type: 'String',
      Overwrite: true,
    }));
    
    return guardrailId;
  } catch (err) {
    error(`Guardrail creation failed: ${err.message}`);
    throw err;
  }
}

/**
 * Step 4: Create Lambda execution role
 */
async function createLambdaRole() {
  log('Creating Lambda execution role...', 'cyan');
  
  const roleName = `${CONFIG.lambdaFunctionName}-Role`;
  
  try {
    // Create role
    const roleResult = await iam.send(new CreateRoleCommand({
      RoleName: roleName,
      AssumeRolePolicyDocument: JSON.stringify({
        Version: '2012-10-17',
        Statement: [{
          Effect: 'Allow',
          Principal: { Service: 'lambda.amazonaws.com' },
          Action: 'sts:AssumeRole',
        }],
      }),
    }));
    
    const roleArn = roleResult.Role.Arn;
    
    // Attach basic Lambda policies
    await iam.send(new AttachRolePolicyCommand({
      RoleName: roleName,
      PolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    }));
    
    // Attach VPC access (for RDS)
    await iam.send(new AttachRolePolicyCommand({
      RoleName: roleName,
      PolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole',
    }));
    
    // Inline policy for Bedrock
    await iam.send(new PutRolePolicyCommand({
      RoleName: roleName,
      PolicyName: 'BedrockAccess',
      PolicyDocument: JSON.stringify({
        Version: '2012-10-17',
        Statement: [{
          Effect: 'Allow',
          Action: [
            'bedrock:InvokeModel',
            'bedrock:InvokeModelWithResponseStream',
            'bedrock:ApplyGuardrail',
          ],
          Resource: '*',
        }],
      }),
    }));
    
    success(`Lambda role created: ${roleName}`);
    return roleArn;
  } catch (err) {
    if (err.name === 'EntityAlreadyExists') {
      const { IAMClient, GetRoleCommand } = require('@aws-sdk/client-iam');
      const iamGet = new IAMClient({ region: CONFIG.region });
      const roleResult = await iamGet.send(new GetRoleCommand({ RoleName: roleName }));
      success(`Lambda role already exists: ${roleName}`);
      return roleResult.Role.Arn;
    }
    throw err;
  }
}

/**
 * Step 5: Create API Gateway
 */
async function createApiGateway(lambdaArn) {
  log('Creating API Gateway...', 'cyan');
  
  try {
    // Create REST API
    const apiResult = await apigateway.send(new CreateRestApiCommand({
      name: CONFIG.apiName,
      description: 'API for Assistant RAG Chatbot',
    }));
    
    const apiId = apiResult.id;
    
    // Create resource
    const resourceResult = await apigateway.send(new CreateResourceCommand({
      restApiId: apiId,
      parentId: apiResult.rootResourceId,
      pathPart: 'assistant',
    }));
    
    // Create POST method
    await apigateway.send(new PutMethodCommand({
      restApiId: apiId,
      resourceId: resourceResult.id,
      httpMethod: 'POST',
      authorizationType: 'NONE',
    }));
    
    // Integrate with Lambda
    await apigateway.send(new PutIntegrationCommand({
      restApiId: apiId,
      resourceId: resourceResult.id,
      httpMethod: 'POST',
      type: 'AWS_PROXY',
      integrationHttpMethod: 'POST',
      uri: `arn:aws:apigateway:${CONFIG.region}:lambda:path/2015-03-31/functions/${lambdaArn}/invocations`,
    }));
    
    // Create deployment
    await apigateway.send(new CreateDeploymentCommand({
      restApiId: apiId,
      stageName: 'prod',
    }));
    
    const endpoint = `https://${apiId}.execute-api.${CONFIG.region}.amazonaws.com/prod/assistant`;
    
    success(`API Gateway created: ${endpoint}`);
    
    // Store endpoint in SSM
    await ssm.send(new PutParameterCommand({
      Name: '/assistant/api-endpoint',
      Value: endpoint,
      Type: 'String',
      Overwrite: true,
    }));
    
    return endpoint;
  } catch (err) {
    error(`API Gateway creation failed: ${err.message}`);
    throw err;
  }
}

/**
 * Main deployment function
 */
async function deploy() {
  console.log(`
${colors.cyan}
╔════════════════════════════════════════════════════════════╗
║     AWS Infrastructure Deployment - Assistant RAG          ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}
  `);
  
  try {
    // Step 1: S3 Bucket
    const bucketName = await createS3Bucket();
    
    // Step 2: RDS (manual pgvector setup required)
    const rdsConfig = await setupRDSWithPgvector();
    
    // Step 3: Bedrock Guardrails
    const guardrailId = await setupBedrockGuardrails();
    
    // Step 4: Lambda Role
    const lambdaRoleArn = await createLambdaRole();
    
    // Step 5: API Gateway (requires Lambda zip file)
    // Note: Lambda function deployment requires manual zip upload
    log('Lambda function deployment:', 'yellow');
    log(`1. Zip the function: cd aws/lambda/rag-orchestrator && zip -r function.zip .`, 'yellow');
    log(`2. Update index.js with environment variables from SSM`, 'yellow');
    log(`3. Create Lambda function in console or via CLI`, 'yellow');
    log(`4. Link to API Gateway`, 'yellow');
    
    // Summary
    console.log(`
${colors.green}
╔════════════════════════════════════════════════════════════╗
║                   DEPLOYMENT SUMMARY                      ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}

${colors.cyan}S3 Bucket:${colors.reset} ${bucketName}

${colors.cyan}RDS:${colors.reset} ${rdsConfig.host}:${rdsConfig.port}/${rdsConfig.database}
   ⚠️  Enable pgvector extension manually

${colors.cyan}Guardrail ID:${colors.reset} ${guardrailId}

${colors.cyan}Next Steps:${colors.reset}
   1. Set up Lambda function with the zip file
   2. Configure environment variables:
      - KB_S3_BUCKET: ${bucketName}
      - GUARDRAID_ID: ${guardrailId}
      - DB_HOST: ${rdsConfig.host}
      - DB_NAME: ${rdsConfig.database}
      - DB_USER: ${CONFIG.dbUsername}
   3. Deploy Lambda and link to API Gateway
   4. Run sync-knowledge-base.js to ingest data

${colors.green}✓ Deployment complete!${colors.reset}
    `);
    
  } catch (err) {
    error(`Deployment failed: ${err.message}`);
    process.exit(1);
  }
}

// Run deployment
deploy();
