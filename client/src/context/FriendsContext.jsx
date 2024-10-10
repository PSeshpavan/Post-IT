import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
    const [friends, setFriends] = useState([]); 

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        try {
            const response = await axios.get('/api/friends');
            setFriends(response.data);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const addFriend = async (newFriend) => {
        try {
            const response = await axios.post('/api/friends', newFriend);
            if (response.status !== 200) {
                throw new Error('Failed to add friend');
            }
            setFriends((prevFriends) => [...prevFriends, response.data]);
        } catch (error) {
            console.error('Error adding friend:', error);
            throw error;
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
