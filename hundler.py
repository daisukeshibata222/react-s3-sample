import boto3, json
from botocore.client import Config


def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        file_name = body['file_name']
        file_type = body['file_type']
        s3 = boto3.client('s3', config=Config(signature_version='s3v4'))
        file_upload_key = file_name
        file_upload_url = s3.generate_presigned_url(
            ClientMethod='put_object',
            Params={'Bucket': S3_INBOX_1DAY, 'Key': file_upload_key},
            ExpiresIn=300,
            HttpMethod='PUT')
        body = {
            'presigned_url': str(file_upload_url)
        }
        res = {
            'isBase64Encoded': False,
            'body': json.dumps(body),
        }
        return res
    except Exception as e:
        res = {
            'isBase64Encoded': False,
            'body': json.dumps(''),
        }
        return res
