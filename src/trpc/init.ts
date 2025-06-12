import { db } from '@/db';
import { agents, meetings } from '@/db/schema';
import { auth } from '@/lib/auth';
import { polarClient } from '@/lib/polar';
import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from '@/modules/premium/server/constants';
import { initTRPC, TRPCError } from '@trpc/server';
import { count, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { cache } from 'react';

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});

// Initialize tRPC instance
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});

// Export middleware for use in procedures
export const middleware = t.middleware;

// Export router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

// Protected procedure that requires authentication
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
  }

  return next({ ctx: { ...ctx, auth: session } });
});

// Premium procedure with limits based on subscription status
export const premiumProcedure = (entity: 'meetings' | 'agents') => {
  return protectedProcedure.use(
    middleware(async ({ ctx, next }) => {
      const customer = await polarClient.customers.getStateExternal({
        externalId: ctx.auth.user.id,
      });

      const [userMeetings] = await db
        .select({ count: count(meetings.id) })
        .from(meetings)
        .where(eq(meetings.userId, ctx.auth.user.id));

      const [userAgents] = await db
        .select({ count: count(agents.id) })
        .from(agents)
        .where(eq(agents.userId, ctx.auth.user.id));

      const isPremium = customer.activeSubscriptions.length > 0;
      const isFreeAgentLimitReached = userAgents.count >= MAX_FREE_AGENTS;
      const isFreeMeetingLimitReached = userMeetings.count >= MAX_FREE_MEETINGS;

      if (entity === 'meetings' && isFreeMeetingLimitReached && !isPremium) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You have reached the maximum number of free meetings',
        });
      }

      if (entity === 'agents' && isFreeAgentLimitReached && !isPremium) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You have reached the maximum number of free agents',
        });
      }

      return next({ ctx: { ...ctx, customer } });
    })
  );
};
