#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import { CdkDemoStack } from '../lib/cdk-demo-stack';

const app = new cdk.App();
new CdkDemoStack(app, 'CdkDemoStack');
app.run();
