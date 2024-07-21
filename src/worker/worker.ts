// worker.ts

import { generateValidNonce } from "./miner/miner";

// Define the context for the worker
const ctx: Worker = self as any;

// Define the message event handler
ctx.addEventListener("message", (event: MessageEvent) => {
  const data: any = event.data;

  // Perform some calculation or task
  const result = performTask(data);

  console.log(result);

  // Send the result back to the main thread
  ctx.postMessage(result);
});

// Example function to perform a task
function performTask(data: any): { nonce: string | null; hashRate: number } {
  const result = generateValidNonce(
    data.challengeNumber,
    BigInt(data.miningTarget),
    data.address,
    data.multiplier
  );

  return result;
}
