import React from 'react';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading, Link} from "@chakra-ui/core";
import AddSiteModal from "@/components/AddSiteModal";
import NextLink from "next/link";

const FeedbackTableHeader = ({siteName}) => {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color="gray.700" fontSize="sm">Feedback</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex >
                <Heading flexGrow="1" mb={4}>All Feedback</Heading>
            </Flex>
        </>
    );
};

export default FeedbackTableHeader;
