import { Worker } from '@temporalio/worker';
import * as activities from './activities/listS3ObjectsActivity';
import { listS3ObjectsWorkflow } from './workflows/listS3ObjectsWorkflow';

async function runWorker() {
    const worker = await Worker.create({
        workflowsPath: require.resolve('./workflows/listS3ObjectsWorkflow'),
        activities,
        taskQueue: "s3-list-objects",
    });

    worker.run();
}

runWorker();