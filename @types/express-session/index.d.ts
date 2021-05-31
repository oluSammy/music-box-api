import "express-session";
import { SessionUser } from "../../src/types/types";

declare module "express-session" {
  interface Session {
    passport: SessionUser;
  }
}
