import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "../activities/listS3ObjectsActivity";

const { listS3ObjectsActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1m", // Adjust the timeout as needed
});

export async function listS3ObjectsWorkflow(bucket: string, maxKeys?: number): Promise<string> {
  const contents = await listS3ObjectsActivity({ bucket, maxKeys });
  return contents;
}