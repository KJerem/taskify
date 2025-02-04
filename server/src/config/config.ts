import dotenv from "dotenv";

dotenv.config();

export const environment = {
  nodeEnv: String(process.env.NODE_ENV),
  port: parseInt(process.env.PORT || "3000", 10),
  databaseUrl: String(process.env.DATABASE_URL) || "",
  jwtATSecret: String(process.env.JWT_ACCESS_TOKEN_SECRET),
  jwtRTSecret: String(process.env.JWT_REFRESH_TOKEN_SECRET),
  jwtATExpiresIn: String(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
  jwtRTExpiresIn: String(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
  bcryptSaltRounds: parseInt(String(process.env.BCRYPT_SALT_ROUNDS), 10),
  uploadthingSecret: String(process.env.UPLOADTHING_SECRET),
  uploadthingAppId: String(process.env.UPLOADTHING_APP_ID),
};
