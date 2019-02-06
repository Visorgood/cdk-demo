import cdk = require('@aws-cdk/cdk');
import lambda = require('@aws-cdk/aws-lambda');
import s3 = require('@aws-cdk/aws-s3');
import events = require('@aws-cdk/aws-events');

export class CdkDemoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cdpBucket = s3.Bucket.import(this, 'CDP bucket', {
      bucketName: 'zalando-lambda-eu-central-1'
    })

    const lambdaJarKey = 'nucleo/cdk-demo-lambda/pr-19-1/cdk-demo-lambda-assembly-0.1.jar'

    const myLambda = new lambda.Function(this, 'MyLambda', {
      runtime: lambda.Runtime.Java8,
      code: lambda.Code.bucket(cdpBucket, lambdaJarKey),
      handler: 'handler.MyHandler::handleRequest',
      timeout: 60,
      memorySize: 512
    })

    const myCronRule = new events.EventRule(this, 'MyCronRule', {
      enabled: true,
      scheduleExpression: 'rate(1 minute)'
    })

    myCronRule.addTarget(myLambda)
  }
}
