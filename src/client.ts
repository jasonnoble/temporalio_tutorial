import { Connection, Client } from '@temporalio/client'; 
import { listS3ObjectsWorkflow } from './workflows/listS3ObjectsWorkflow';
import { nanoid } from 'nanoid';

async function run(){
    const connection = await Connection.connect();
    const client = new Client({});
    const handle = await client.workflow.start(listS3ObjectsWorkflow,{
        args: ['my-bucket', 1],
        taskQueue: 's3-list-objects',
        workflowId: 'workflow-' + nanoid(),
    })
    console.log(await handle.result());
}

// Replace 'my-bucket' with the name of your S3 bucket and set maxKeys as needed
run().catch((err) => {
    console.error(err);
    process.exit(1);
});