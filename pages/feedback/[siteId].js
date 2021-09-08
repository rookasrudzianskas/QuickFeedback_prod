import Image from 'next/image'
import { Box, Button, Flex, Text, Icon, Link, Stack, Heading, Code } from '@chakra-ui/core';
import Head from "next/head";
import {useAuth} from "@/lib/auth";
import EmptyState from "@/components/EmptyState";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import DashboardShell from "@/components/DashboardShell";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import FeedbackTable from "@/components/FeedbackTable";
import FeedbackTableHeader from "@/components/FeedbackTableHeader";
import FeedbackEmptyState from "@/components/FeedbackEmptyState";
import Page from "@/components/Page";


// import {useAuth} from "@/lib/auth";

const MyFeedback = () => {
    const { user } = useAuth();
    const { data, error } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);
    console.log(data);
    if(!data) {
        return (
            <DashboardShell>
                <FeedbackTableHeader />
                <SiteTableSkeleton />
            </DashboardShell>
        )
    }

    if(!user) {
        return (
            <DashboardShell>
                <FeedbackTableHeader />
                <SiteTableSkeleton />
            </DashboardShell>
        )
    }

    return (
        <>

            <DashboardShell overflow="hidden">

                <FeedbackTableHeader />

                {data?.feedback?.length ? (
                    <FeedbackTable allFeedback={data.feedback} />
                ) : (
                    <FeedbackEmptyState />
                )}
            </DashboardShell>

        </>
    );
};

const MyFeedbackPage = () => (
    <Page name="Name of the site feedback" path="/feedback">
        <MyFeedback />
    </Page>
);


export default MyFeedbackPage;
