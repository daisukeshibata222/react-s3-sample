import boto3, json
from botocore.client import Config
import os

ACCESS_KEY = os.environ.get("REACT_APP_ACCESS_KEY")
SECRET_ACCESS_KEY = os.environ.get("REACT_APP_SECRET_ACCESS_KEY")
BUCKET = os.environ.get("REACT_APP_BUCKET")

def lambda_handler(event, context):
    try:
        session = boto3.Session(
            aws_access_key_id = ACCESS_KEY,
            aws_secret_access_key = SECRET_ACCESS_KEY
        )
        s3 = session.client('s3', config=boto3.session.Config(signature_version='s3v4'))
        bucket = s3.list_objects(
            Bucket=BUCKET
        )
        if 'Contents' in bucket:
            res = {
                'isBase64Encoded': False,
                'body': json.loads(json.dumps(bucket['Contents'], default=str))
            }
            return res
        else:
            raise Exception('not found files')
    except Exception as e:
        res = {
            'isBase64Encoded': False,
            'body': json.dumps(''),
        }
        return res