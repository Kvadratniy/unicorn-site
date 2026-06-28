import type { Core } from '@strapi/strapi';
import { syncBlogToVk } from './utils/syncBlogToVk';
import { syncBlogToTelegram } from './utils/syncBlogToTelegram';

const BLOG_UID = 'api::blog.blog';

// Document IDs queued by the publish middleware. They are processed by a timer
// started in bootstrap so the work runs OUTSIDE the publish transaction context
// (otherwise queries fail with "Transaction query already complete").
const pendingDocumentIds = new Set<string>();

// Document IDs whose post+persist cycle is still running. Rapid re-publishing
// fires the publish action again before the previous run saved vk/telegramPostId,
// which would defeat the DB guard and post twice. These sets serialize work per
// document and per platform (VK/Telegram post independently).
const vkInFlightDocumentIds = new Set<string>();
const telegramInFlightDocumentIds = new Set<string>();

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.log.info('[Autopost] Blog publish middleware registered');

    strapi.documents.use(async (context, next) => {
      const result = await next();

      if (context.action === 'publish' && context.uid === BLOG_UID) {
        const documentId = (context.params as { documentId?: string } | undefined)?.documentId;
        if (documentId) {
          pendingDocumentIds.add(documentId);
          strapi.log.info(`[VK] Queued blog ${documentId} for posting`);
        }
      }

      return result;
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const timer = setInterval(() => {
      if (pendingDocumentIds.size === 0) return;

      const documentIds = Array.from(pendingDocumentIds);
      pendingDocumentIds.clear();

      for (const documentId of documentIds) {
        if (!vkInFlightDocumentIds.has(documentId)) {
          vkInFlightDocumentIds.add(documentId);
          syncBlogToVk(documentId)
            .catch((error) => {
              const message = error instanceof Error ? error.message : String(error);
              strapi.log.error(`[VK] Unexpected error while posting blog ${documentId}: ${message}`);
            })
            .finally(() => vkInFlightDocumentIds.delete(documentId));
        }

        if (!telegramInFlightDocumentIds.has(documentId)) {
          telegramInFlightDocumentIds.add(documentId);
          syncBlogToTelegram(documentId)
            .catch((error) => {
              const message = error instanceof Error ? error.message : String(error);
              strapi.log.error(`[Telegram] Unexpected error while posting blog ${documentId}: ${message}`);
            })
            .finally(() => telegramInFlightDocumentIds.delete(documentId));
        }
      }
    }, 2000);

    // Do not keep the event loop alive only for this timer.
    timer.unref?.();
  },
};
