import React from 'react';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading, Link} from "@chakra-ui/core";
import AddSiteModal from "@/components/AddSiteModal";
import NextLink from "next/link";

const SiteFeedbackTableHeader = ({siteName}) => {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem isCurrentPage>
                    <NextLink href="/feedback"  passHref>
                        <Link color="teal.500">View Feedback</Link>
                    </NextLink>
                    s                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color="gray.700" fontSize="sm">{siteName || '-'}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex >
                <Heading flexGrow="1" mb={4}>{siteName || '-'}</Heading>
            </Flex>
        </>
    );
};

export default SiteFeedbackTableHeader;
