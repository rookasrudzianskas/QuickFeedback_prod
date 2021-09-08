import React, {useState} from 'react';
import {Box, Code, IconButton, Link, Skeleton, Switch} from '@chakra-ui/core';
import { Table, Tr, Th, Td } from './Table';
import RemoveButton from "@/components/RemoveButton";
import {updateFeedback} from "@/lib/db";
import {mutate} from "swr";
import {useAuth} from "@/lib/auth";


const FeedbackRow = ({ id, author, text, route, status }) => {

    const [checked, setChecked] = useState(status === 'active');

    // console.log("This is feedback");
    const auth = useAuth();

    const toggleFeedback = (e) => {
        setChecked(!checked);
        updateFeedback(id, {status: !checked ? 'active' : 'pending'})
        mutate(['api/feedback', auth.user.token]);
        // console.log(checked, id)
    }

    return (
        <Box key={id} as="tr">
            <Td fontWeight="medium">
                {author}
            </Td>
            <Td>
                {text}
            </Td>
            <Td>
                <Code>{route || '/'}</Code>
            </Td>

            <Td>
                <Switch
                    onChange={toggleFeedback}
                    isChecked={checked}
                    variantColor="green"
                    size="md"
                />
            </Td>

            <Td>
                <RemoveButton feedbackId={id} />
            </Td>
        </Box>
    );
};

export default FeedbackRow;

// new version
