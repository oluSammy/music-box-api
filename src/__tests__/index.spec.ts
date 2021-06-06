import { dbDisconnect } from "../database/mongoMemoryConnect";
import historyTest from "./history.test";
import passwordRecovery from "./passwordRecovery.test";

afterAll(async () => {
  await dbDisconnect();
});

describe("Listening History", historyTest);
describe("Password Reset", passwordRecovery);
