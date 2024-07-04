// FriendsContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
    const [friends, setFriends] = useState([]); // Ensure initial state is an empty array

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        try {
            const response = await axios.get('/api/friends');
            setFriends(response.data); // Ensure response.data is an array
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const addFriend = async (newFriend) => {
        try {
            const response = await axios.post('/api/friends', newFriend);
            setFriends((prevFriends) => [...prevFriends, response.data]);
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    const isFriend = (userId) => {
        return Array.isArray(friends) && friends.some((friend) => friend.id === userId);
    };

    return (
        <FriendsContext.Provider value={{ friends, addFriend, isFriend }}>
            {children}
        </FriendsContext.Provider>
    );
};
