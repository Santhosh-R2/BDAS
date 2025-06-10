import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    CircularProgress,
    Paper,
    Fab,          
    Slide,       
    IconButton    
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';   
import CloseIcon from '@mui/icons-material/Close'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';
import axiosInstance from '../Service/BaseUrl';

import ChatBot from '../ChatBot'; 

function ContactUs() {
    const [formData, setFormData] = useState({
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showChatBot, setShowChatBot] = useState(false);
    const handleToggleChatBot = () => {
        setShowChatBot(!showChatBot);
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'email') {
            if (!value) {
                setErrors(prev => ({ ...prev, email: 'Email is required' }));
            } else if (!validateEmail(value)) {
                setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
            } else {
                setErrors(prev => ({ ...prev, email: '' }));
            }
        }
        if (name === 'message' && errors.message && value) {
            setErrors(prev => ({ ...prev, message: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;
        const newErrors = { email: '', message: '' }; 

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formData.message) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axiosInstance.post('/ContactUs', formData);
            toast.success('Your enquiry has been submitted successfully!');
            setFormData({ email: '', message: '' });
        } catch (error) {
            toast.error('There was an error submitting your enquiry. Please try again.');
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
            <Nav />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ marginTop: "80px" }}
            />
            <Container maxWidth="sm" sx={{ mt: { xs: 10, sm: 12 }, mb: 4 }}> 
                <Paper elevation={3} sx={{ p: 4 }}>
                    <h1 style={{ textAlign: 'center' }}>
                        Contact Us
                    </h1>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle1" component="label" htmlFor="email" sx={{ mb: 1, display: 'block' }}>
                                Email ID
                            </Typography>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                type="email"
                                variant="outlined"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                required
                                placeholder="Enter your email"
                            />
                        </Box>

                        <Box>
                            <Typography variant="subtitle1" component="label" htmlFor="message" sx={{ mb: 1, display: 'block' }}>
                                Enquiry
                            </Typography>
                            <TextField
                                fullWidth
                                id="message"
                                name="message"
                                variant="outlined"
                                value={formData.message}
                                onChange={handleChange}
                                error={!!errors.message}
                                helperText={errors.message}
                                required
                                multiline
                                rows={4}
                                // InputLabelProps={{ shrink: false }} 
                                placeholder="Type your message here..."
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: '#d32f2f',
                                '&:hover': {
                                    backgroundColor: '#b71c1c',
                                }
                            }}
                            disabled={isSubmitting}
                            size="large"
                        >
                            {isSubmitting ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </Box>
                </Paper>
            </Container>

            <Fab
                aria-label="chat"
                sx={{
                   position: 'fixed',
                    bottom: 24, 
                    right: 24,  
                    zIndex: 1100,
                    color:"red"
                }}
                onClick={handleToggleChatBot}
            >
                <ChatIcon />
            </Fab>

            {/* Chatbot Overlay */}
            <Slide direction="up" in={showChatBot} mountOnEnter unmountOnExit>
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 90, 
                        right: 24,
                        width: { xs: '90%', sm: 380 }, 
                        height: '75vh', 
                        maxHeight: 600,
                        zIndex: 1000, 
                        backgroundColor: 'background.paper', 
                        borderRadius: 3, 
                        boxShadow: 6, 
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        bgcolor: '#d32f2f', 
                        color: 'white',
                        borderTopLeftRadius: 12, 
                        borderTopRightRadius: 12,
                    }}>
                        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>BDAS CHAT BOT</Typography>
                        <IconButton
                            aria-label="close chat"
                            onClick={() => setShowChatBot(false)}
                            sx={{ color: 'white' }} 
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}> 
                        <ChatBot />
                    </Box>
                </Box>
            </Slide>
        </div>
    );
}

export default ContactUs;