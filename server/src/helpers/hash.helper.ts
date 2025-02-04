import bcrypt from "bcrypt";
import { environment } from "@config/config";

export class HashHelper {
  private static salt: number;

  // Static initialization method to set up the secret and expiresIn values
  public static initialize(salt: number = environment.bcryptSaltRounds): void {
    this.salt = salt;
  }
  public static hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.salt);
  }

  public static compare(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
