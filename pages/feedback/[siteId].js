import Image from 'next/image'
import { Box, Button, Flex, Text, Icon, Link, Stack, Heading, Code } from '@chakra-ui/core';
import Head from "next/head";
import {useAuth} from "@/lib/auth";
import EmptyState from "@/components/EmptyState";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import DashboardShell from "@/components/DashboardShell";
import useSWR from "swr";
import FeedbackTable from "@/components/FeedbackTable";
import FeedbackTableHeader from "@/components/FeedbackTableHeader";
import FeedbackEmptyState from "@/components/FeedbackEmptyState";
import Page from "@/components/Page";
import fetcher from "../../utils/fetcher";
import {useRouter} from "next/router";


// import {useAuth} from "@/lib/auth";

const SiteFeedback = () => {
    const { user } = useAuth();
    const { query } = useRouter();
    const { data, error } = useSWR(user ? [`/api/feedback/${query.siteId}`, user.token] : null, fetcher);
    console.log("This is quite well", data.site.name);

    if(!data) {
        return (
            <DashboardShell>
                <FeedbackTableHeader siteName={data?.site?.name}  />
                <SiteTableSkeleton />
            </DashboardShell>
        )
    }

    if(!user) {
        return (
            <DashboardShell>
                <FeedbackTableHeader siteName={data?.site?.name}   />
                <SiteTableSkeleton />
            </DashboardShell>
        )
    }

    return (
        <>

            <DashboardShell overflow="hidden">

                <FeedbackTableHeader siteName={data?.site?.name}   />

                {data?.feedback?.length ? (
                    <FeedbackTable allFeedback={data.feedback} />
                ) : (
                    <FeedbackEmptyState />
                )}
            </DashboardShell>

        </>
    );
};

const SiteFeedbackPage = () => (
    <Page name="Name of the site feedback" path="/feedback">
        <SiteFeedback />
    </Page>
);


export default SiteFeedbackPage;
