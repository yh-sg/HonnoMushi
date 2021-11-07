const amplifyParams = {
    Auth: {
        identityPoolId: process.env.REACT_APP_IDENDITYPOOL, // (required) - Amazon Cognito Identity Pool ID
        region: process.env.REACT_APP_REGION, // (required) - Amazon Cognito Region
    },
    Storage: {
        AWSS3: {
            bucket: process.env.REACT_APP_BUCKET, // (required) -  Amazon S3 bucket name
            region: process.env.REACT_APP_REGION, // (required) -  Amazon service region
        }
    }
}

export default amplifyParams