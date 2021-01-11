import boto3, json
from botocore.client import Config
import os

ACCESS_KEY = os.environ.get("REACT_APP_ACCESS_KEY")
SECRET_ACCESS_KEY = os.environ.get("REACT_APP_SECRET_ACCESS_KEY")
BUCKET = os.environ.get("REACT_APP_BUCKET")

def lambda_handler(event, context):

    try:
        file_name = event['filename']
        file_type = event['filetype']

        session = boto3.Session(
            aws_access_key_id = ACCESS_KEY,
            aws_secret_access_key = SECRET_ACCESS_KEY
        )

        s3 = session.client('s3', config=boto3.session.Config(signature_version='s3v4'))

        file_upload_key = file_name
        file_upload_url = s3.generate_presigned_url(
            ClientMethod='put_object',
            Params={
                'Bucket': BUCKET,
                'Key': file_upload_key
            },
            ExpiresIn=300,
            HttpMethod='PUT'
        )

        body = {
            'presigned_url': str(file_upload_url)
        }

        res = {
            'isBase64Encoded': False,
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps(body),
        }

        return res
    except Exception as e:
        res = {
            'isBase64Encoded': False,
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps(''),
        }
        return res