import React from 'react';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading} from "@chakra-ui/core";
import AddSiteModal from "@/components/AddSiteModal";

const FeedbackTableHeader = ({siteName}) => {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color="gray.700" fontSize="sm">Feedback</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color="gray.700" fontSize="sm">{siteName}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex >
                <Heading flexGrow="1" mb={4}>{siteName}</Heading>
            </Flex>
        </>
    );
};

export default FeedbackTableHeader;
