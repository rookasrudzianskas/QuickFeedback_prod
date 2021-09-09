import {getAllFeedback, getAllSites, getSite} from "@/lib/db-admin";
import FeedbackLink from "@/components/FeedbackLink";
import Feedback from "@/components/Feedback";
import {Box, Button, FormControl, FormHelperText, FormLabel, Input, Text} from "@chakra-ui/core";
import {useAuth} from "@/lib/auth";
import {useRouter} from "next/router";
import {useRef, useState} from "react";
import {createFeedback} from "@/lib/db";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import SiteTableHeader from "@/components/SiteTableHeader";
import EmptyState from "@/components/EmptyState";
import UpgradeEmptyState from "@/components/UpgradeEmptyState";
import DashboardShell from "@/components/DashboardShell";
import {useTheme} from "../../utils/useTheme";

const EmbeddedFeedbackPage = ({ initialFeedback }) => {

    const auth = useAuth();
    const router = useRouter();
    const inputEl = useRef(null);
    const [allFeedback, setAllFeedback] = useState(initialFeedback);
    const [value, setValue] = useState("");
    const handleChange = (event) => setValue(event.target.value)


    const onSubmit = (e) => {
        e.preventDefault();
        // console.log('Hello');
        const newFeedback = {
            author: auth.user.name,
            authorId: auth.user.uid,
            siteId: router.query.siteId,
            text: inputEl.current.value,
            createdAt: new Date().toISOString(),
            provider: auth.user.provider,
            status: 'pending',
        };

        setAllFeedback([newFeedback, ...allFeedback]);
        setValue("");
        createFeedback(newFeedback);
    }

    // console.log(allFeedback);

    const EmbeddedFeedbackPage = ({initialFeedback, site}) => {
        const router = useRouter();
        const colorMode = useTheme();
        const textColor = {
            light: 'gray.900',
            dark: 'gray.200'
        };

        return (
            <>

                <Box display="flex" flexDirection="column" width="full">
                    <FeedbackLink paths={router?.query?.site || []}/>
                    {initialFeedback?.length ? (
                        initialFeedback.map((feedback, index) => (
                            <Feedback
                                key={feedback.id}
                                settings={site?.settings}
                                isLast={index === initialFeedback.length - 1}
                                {...feedback}
                            />
                        ))
                    ) : (
                        <Text color={textColor[colorMode]}>
                            There are no comments for this site.
                        </Text>
                    )}
                </Box>

            </>
        )
    };



}
export default EmbeddedFeedbackPage;

export async function getStaticProps(context) {

    const [siteId, route] = context.params.site;
    const { feedback } = await getAllFeedback(siteId, route);
    const { site } = await getSite(siteId);

    return {
        props: {
            initialFeedback: feedback,
            site,
        },
        revalidate: 1
    };
}

export async function getStaticPaths() {
    const { sites } = await getAllSites();
    const paths = sites.map((site) => ({
        params: {
            site: [site.id.toString()]
        }
    }));

    return {
        paths,
        fallback: true
    };
}
// embed shit
