import type { Core } from '@strapi/strapi';
import { syncBlogToVk } from './utils/syncBlogToVk';

const BLOG_UID = 'api::blog.blog';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(async (context, next) => {
      const result = await next();

      if (context.action === 'publish' && context.uid === BLOG_UID) {
        const documentId = (context.params as { documentId?: string } | undefined)?.documentId;
        // Run posting after the publish transaction resolved; never block/break the publish.
        syncBlogToVk(documentId).catch((error) => {
          const message = error instanceof Error ? error.message : String(error);
          strapi.log.error(`[VK] Unexpected error while posting blog ${documentId}: ${message}`);
        });
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
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
