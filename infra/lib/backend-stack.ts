import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns'
import * as ecr from 'aws-cdk-lib/aws-ecr'

export class BackendStack extends Stack {
  public readonly apiUrl: string

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const vpc = new ec2.Vpc(this, 'BackendVpc', {
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        {
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    })

    const cluster = new ecs.Cluster(this, 'BackendCluster', { vpc })

    const service = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'BackendService', {
      cluster,
      cpu: 512,
      memoryLimitMiB: 1024,
      desiredCount: 1,
      publicLoadBalancer: true,
      taskImageOptions: {
        containerPort: 3000,
        image: ecs.ContainerImage.fromEcrRepository(
          ecr.Repository.fromRepositoryName(this, 'ApiRepo', 'my-logging-service'),
          'latest'
        ),
      },
    })

    new CfnOutput(this, 'BackendUrl', {
      value: `http://${service.loadBalancer.loadBalancerDnsName}`,
      exportName: 'BackendUrl',
    })

    this.apiUrl = service.loadBalancer.loadBalancerDnsName
  }
}
