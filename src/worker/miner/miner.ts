import { keccak256, bytesToHex, encodePacked } from "viem";

export const BASE_MULTIPLIER = 10_000n;

export function generateValidNonce(
  challengeNumber: any,
  miningTarget: bigint,
  address: any,
  difficultyMultiplier = BASE_MULTIPLIER
): { nonce: string | null; hashRate: number } {
  let counter = 0;

  const counterLimit = 500_000;

  const startTime = Date.now();

  while (true) {
    counter++;

    // Generate a random 32-byte nonce
    const nonce = crypto.getRandomValues(new Uint8Array(32));

    const input = encodePacked(
      ["bytes32", "address", "bytes32"],
      [challengeNumber, address, bytesToHex(nonce)]
    );

    // Calculate the digest
    const digest = keccak256(input);

    // Convert digest and miningTarget to BigInt for comparison
    const digestValue = BigInt(digest);
    const targetValue =
      (BigInt(miningTarget) * BASE_MULTIPLIER) / difficultyMultiplier;

    // console.log(digestValue, targetValue);

    // Check if the solution is valid
    if (digestValue < targetValue) {
      const endTime = Date.now();

      const hashRate = Math.floor((counter / (endTime - startTime)) * 1000);

      return { nonce: bytesToHex(nonce), hashRate };
    }

    if (counter > counterLimit) {
      const endTime = Date.now();

      const hashRate = Math.floor((counter / (endTime - startTime)) * 1000);

      return { nonce: null, hashRate };
    }
  }
}
