import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { fromIni } from '@aws-sdk/credential-providers';

interface ListS3ObjectsActivityInput {
  bucket: string;
  maxKeys?: number;
}

export async function listS3ObjectsActivity({ bucket, maxKeys }: ListS3ObjectsActivityInput): Promise<string> {
  const client = new S3Client({
    credentials: fromIni({}),
    region: 'us-east-1'
  });

  const command = new ListObjectsV2Command({
    Bucket: bucket,
    MaxKeys: maxKeys ?? 1,
  });

  let isTruncated = true;
  let contents = "";

  while (isTruncated) {
    const { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
    const contentsList = Contents?.map((c) => ` • ${c.Key}`).join("\n");
    contents += contentsList + "\n";
    isTruncated = IsTruncated || false;
    command.input.ContinuationToken = NextContinuationToken;
  }

  return contents;
}