import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins'

interface FrontendStackProps extends cdk.StackProps {
  apiUrl: string
}

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props)

    const bucket = new cdk.aws_s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: 'index.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: false,
    })

    const distribution = new cdk.aws_cloudfront.Distribution(this, 'WebsiteDistribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3Origin(bucket),
        viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    })

    new cdk.aws_s3_deployment.BucketDeployment(this, 'DeployWebsite', {
      sources: [cdk.aws_s3_deployment.Source.asset('../apps/web/.next')],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
    })

    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: distribution.domainName,
    })
  }
}
