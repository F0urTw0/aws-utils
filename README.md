# aws-utils
Services and little hacks to work with AWS.

## Do note put important informations like aws access key or secret key into the repository.

## Usage (from npm):

1. Install aws-utils globaly
- Run aws-utils

Ex.:

```bash
npm install -g aws-utils
aws-utils
```

## Usage (cloning):

1. Clone the repository;
- Enter the clone directory;
- Run link command to refer the cloned repository globally;
- Run aws-utils (from anywhere) to use the tool.

Ex.:

```bash
git clone https://github.com/F0urTw0/aws-utils.git
cd aws-utils
npm link
aws-utils
```

## Configuration file

You can have a configuration file called `.awsAccess.json`.

It must be at your home directory (Windows users - it searchs where `USERPROFILE`variable points).

It must have the following format:

```json
{
	"accessKey" : "YOUR-ACCESS-KEY",
	"secretKey" : "YOUR-SECRET-KEY",
	"region": "your-region"
}
```

If you get this file with the correct information in the correct place, you can ommit thes data in the command line.
