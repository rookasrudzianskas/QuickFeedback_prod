import { Flex, Link } from '@chakra-ui/core';
import {useTheme} from "../utils/useTheme";

export default function FeedbackLink({ paths }) {
    const colorMode = useTheme();
    const linkColor = {
        light: 'gray.900',
        dark: 'gray.100'
    };

    return (
        <Flex
            align={['flex-start', 'center']}
            justifyContent="space-between"
            mb={8}
            width="full"
            mt={1}
            direction={['column', 'row']}
        >
            <Link
                fontWeight="bold"
                fontSize="sm"
                href={`/site/${paths.join('/')}`}
                target="_blank"
            >
                Leave a comment →
            </Link>
            <Link fontSize="xs" color="gray.500" href="https://www.byrookas.com" target="_blank">
                Powered from Quick Feedback (Beta) by Rokas Rudzianskas with lots of ❤️
            </Link>
        </Flex>
    );
}
