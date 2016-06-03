#! /usr/bin/env node

import * as commander from 'commander';
import * as aws from 'aws-sdk';
import {join} from 'path';

let AWS = <any>aws;

let pkg = require('./package.json');
let awsCfg = {
	accessKey: undefined,
	secretKey: undefined,
	region: undefined
};
let cfgFile = join((process.platform === 'win32' ? process.env.USERPROFILE : process.env.HOME), '.awsAccess.json');
try {
	awsCfg = require(cfgFile);
} catch (err) {
	console.log(`Error oppening "${cfgFile}": ${err}`);
}

commander
	.version(pkg.version)
	.option('-a, --access-key [accessKey]', 'AWS access key', awsCfg.accessKey)
	.option('-s, --secret-key [secretKey]', 'AWS secret key', awsCfg.secretKey)
	.option('-r, --region [region]', 'AWS region', awsCfg.region)
	.option('start [machine]', 'Starts an EC2 machine')
	.option('stop [machine]', 'Stop an EC2 machine')
	.option('list', 'List EC2 Machines')
	.parse(process.argv);

let cmd = <any>commander;

aws.config.update({
	credentials: new aws.Credentials(cmd.accessKey, cmd.secretKey),
	region: cmd.region
});

let ec2 = new AWS.EC2({apiVersion: '2015-10-01'});

if (cmd.list) {
	ec2.describeInstances({}, function(err, data) {
		if (err) {
			console.error(err, err.stack); // an error occurred
		} else {
			for (let i = 0; i < data.Reservations.length; i++) {
				let resv = data.Reservations[i];
				console.log('Reservation', resv.ReservationId);
				for (let o = 0; o < resv.Instances.length; o++) {
					let instance = resv.Instances[o];
					console.log(' - Instance: ', instance.InstanceId, ' State: ', instance.State);
				}
			}
		}
	});
} else if (cmd.start) {
	let params = {
		InstanceIds: [
			cmd.start
		],
		//AdditionalInfo: 'STRING_VALUE',
		//DryRun: false
	};
	ec2.startInstances(params, function(err, data) {
		if (err) {
			console.error(err, err.stack); // an error occurred
		} else {
			console.log(data);
		}
	});
} else if (cmd.stop) {
	let options = {
		InstanceIds: [cmd.stop],
		//DryRun: false,
		//Force: false
	};
	ec2.stopInstances(options, function (err, data) {
		if (err) {
			console.error(err, err.stack); // an error occurred
		} else {
			console.log(data);
		}
	});
}
