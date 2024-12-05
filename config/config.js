require("dotenv").config();
const envalid = require("envalid");
const { str } = envalid;

const env = envalid.cleanEnv(process.env, {
  AWS_REGION: str(),
  WEBSITE_CONTACT_US_FORM: str(),
  WEBSITE_DEMO_VIDEOS_FORM: str(),
  ALLOWED_ORIGINS: str(),
  PORT: str(),
});

module.exports = {
  REGION: env.AWS_REGION,
  CONTACT_US_TABLE: env.WEBSITE_CONTACT_US_FORM,
  DEMO_VIDEOS_TABLE: env.WEBSITE_DEMO_VIDEOS_FORM,
  ALLOWED_ORIGINS: env.ALLOWED_ORIGINS.split(","),
  PORT: parseInt(env.PORT, 10), 
};
