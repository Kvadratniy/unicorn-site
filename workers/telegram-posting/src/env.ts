export interface Env {
  /** Bot token from @BotFather. */
  TELEGRAM_BOT_TOKEN: string
  /** Channel id (e.g. @channel_name or -100xxxxxxxxxx). */
  TELEGRAM_CHANNEL_ID: string
  /** Shared secret, must match TELEGRAM_WORKER_SECRET on the Strapi side. */
  WORKER_SECRET: string
}
