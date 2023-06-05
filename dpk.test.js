const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns hashed stringyfied event when event exists but there is no partitionKey", () => {
    let event = { some_prop: "value" };
    let result = deterministicPartitionKey(event);
    expect(result).not.toBe(JSON.stringify(event));
  });
  it("Returns events partition key if it is a string and has a length smaller than or equals to MAX_PARTITION_KEY_LENGTH", () => {
    let event = { partitionKey: "12345abc" };
    let result = deterministicPartitionKey(event);
    expect(result).toBe("12345abc");
  });
  it("Returns hashed events partition key if it is a string and has a length greater than MAX_PARTITION_KEY_LENGTH", () => {
    let event = { partitionKey: 'x'.repeat(1000) };
    let result = deterministicPartitionKey(event);
    expect(result).not.toBe("12345abc");
  });
  it("Returns stringifyed events partition key if it is an object and has a length smaller than or equals to MAX_PARTITION_KEY_LENGTH", () => {
    let event = { partitionKey: { key: "12345abc" }};
    let result = deterministicPartitionKey(event);
    expect(result).toBe(JSON.stringify(event.partitionKey));
  });
  it("Returns hashed stringifyed events partition key if it is an object and has a length greater than MAX_PARTITION_KEY_LENGTH", () => {
    let event = { partitionKey: { key: "12345abc" }};
    let result = deterministicPartitionKey(event);
    expect(result).not.toBe("12345abc");
  });
  
});
