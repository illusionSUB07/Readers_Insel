import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';

const About: React.FC = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/books'); 
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                About
            </Typography>
            <Typography variant="body1" gutterBottom>
            The web application known as Readers_Insel was developed with the specific intention of catering to people who have a strong attachment to the act of reading. The opportunity to read reviews of a variety of books is available to their readers. Individuals who are avid readers will find this platform to be of great assistance because it gives them the ability to add, edit, and remove books from their collection.
            With regard to the HTW Berlin project serving as a foundation for the conversation.
            </Typography>
            <Box mt={6}> {/* margin-top */}
                <Button variant="contained" color="primary" onClick={goBack}>
                    Back
                </Button>
            </Box>
        </Container>
    );
};

export default About;
