import {getAllFeedback, getAllSites} from "@/lib/db-admin";
import FeedbackLink from "@/components/FeedbackLink";
import Feedback from "@/components/Feedback";
import {Box, Button, FormControl, FormHelperText, FormLabel, Input, Textarea} from "@chakra-ui/core";
import {useAuth} from "@/lib/auth";
import {useRouter} from "next/router";
import {useRef, useState} from "react";
import {createFeedback} from "@/lib/db";
import useSWR, {mutate} from "swr";
import fetcher from "../../utils/fetcher";
import SiteTableHeader from "@/components/SiteTableHeader";
import EmptyState from "@/components/EmptyState";
import UpgradeEmptyState from "@/components/UpgradeEmptyState";
import DashboardShell from "@/components/DashboardShell";
import SiteHeader from "@/components/SiteHeader";
import LoginButtons from "@/components/LoginButtons";

const SiteFeedback = ({ initialFeedback }) => {

    const { user, loading } = useAuth();
    const inputEl = useRef(null);
    const router = useRouter();
    const siteAndRoute = router.query?.site;
    const siteId = siteAndRoute ? siteAndRoute[0] : null;
    const route = siteAndRoute ? siteAndRoute[1] : null;
    const feedbackApi = route
        ? `/api/feedback/${siteId}/${route}`
        : `/api/feedback/${siteId}`;

    const { data: siteData } = useSWR(`/api/site/${siteId}`, fetcher);
    const { data: feedbackData } = useSWR(feedbackApi, fetcher);

    const site = siteData?.site;
    const allFeedback = feedbackData?.feedback;



    const onSubmit = (e) => {
        e.preventDefault();

        const newFeedback = {
            siteId,
            siteAuthorId: site.authorId,
            route: route || '/',
            author: user.name,
            authorId: user.uid,
            text: inputEl.current.value.replace('\n', '\n\n'),
            createdAt: new Date().toISOString(),
            provider: user.provider,
            status: 'pending'
        };

        inputEl.current.value = '';
        createFeedback(newFeedback);
        mutate(
            feedbackApi,
            async (data) => ({
                feedback: [newFeedback, ...data.feedback]
            }),
            false
        );
    };

    // console.log(allFeedback);

    const LoginOrLeaveFeedback = () =>
        user ? (
            <Button
                type="submit"
                isDisabled={!siteData || !feedbackData}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                mt={4}
                _hover={{ bg: 'gray.700' }}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                }}
            >
                Leave Feedback
            </Button>
        ) : (
            <LoginButtons />
        );

    return (
        <>
            <DashboardShell>
                <SiteHeader
                    isSiteOwner={site?.authorId === user?.uid}
                    site={site}
                    siteId={siteId}
                    route={route}
                />
                <Box
                    display="flex"
                    mx={4}
                    flexDirection="column"
                    width="full"
                    maxWidth="700px"
                >
                    <Box as="form" onSubmit={onSubmit}>
                        <FormControl mb={8}>
                            <Textarea
                                ref={inputEl}
                                id="comment"
                                placeholder="Leave a comment"
                                isDisabled={!user}
                                h="100px"
                            />
                            {!loading && <LoginOrLeaveFeedback />}
                        </FormControl>
                    </Box>
                    {allFeedback &&
                    allFeedback.map((feedback, index) => (
                        <Feedback
                            key={feedback.id}
                            settings={site?.settings}
                            isLast={index === allFeedback.length - 1}
                            {...feedback}
                        />
                    ))}
                </Box>
            </DashboardShell>

        </>
    )
};

export async function getStaticProps(context) {

    const siteId = context.params.siteId;
    const { feedback } = await getAllFeedback(siteId);

    return {
        props: {
            initialFeedback: feedback,
        },
        revalidate: 1
    };
}

export async function getStaticPaths() {
    const {sites} = await getAllSites();
    const paths = sites.map(site => ({
        params: {
            siteId: site.id.toString(),
        }
    }));

    return {
        paths,
        fallback: true
    };
}

export default SiteFeedback;

// today's shit done and checks, check if tests works
