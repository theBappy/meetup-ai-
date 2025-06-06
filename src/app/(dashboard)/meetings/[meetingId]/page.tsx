import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { MeetingIdView, MeetingIdViewError, MeetingIdViewLoading } from "@/modules/meetings/server/ui/views/meeting-id-view";

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}

const page = async ({ params }: Props) => {
  const { meetingId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({id: meetingId})
  )

  // TODO: prefetch `meetings.getTranscript`

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingIdViewLoading />}>
        <ErrorBoundary fallback={<MeetingIdViewError />}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
};

export default page;
