const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  switch(true) {
    case(!event):
      return TRIVIAL_PARTITION_KEY;
    case(event.partitionKey === undefined):
      return crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    default:
      return CreateCandidateKey(event);
  }
};

function CreateCandidateKey(event) {
  const candidate = typeof event.partitionKey !== "string" ? JSON.stringify(event.partitionKey): event.partitionKey;
  return candidate.length <= MAX_PARTITION_KEY_LENGTH ? candidate : crypto.createHash("sha3-512").update(candidate).digest("hex");
}