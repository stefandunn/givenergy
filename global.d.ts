namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    API_KEY: string;
    INVERTER_SERIAL_NO: string;
    ECO_MODE_SETTING_ID: string;
    DISCHARGE_START_SETTING_ID: string;
    DISCHARGE_END_SETTING_ID: string;
    DISCHARGE_ENABLED_SETTING_ID: string;
    CHARGE_START_SETTING_ID: string;
    CHARGE_END_SETTING_ID: string;
    CHARGE_ENABLED_SETTING_ID: string;
  }
}
