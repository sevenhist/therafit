'use client';
import useUserStore from '@/modules/userInformation/store';
import { useState, useEffect } from 'react';
import { IUser } from '@/modules/userInformation/store';

export default function GetUsersComponent() {
    const fetchGetAllUsers = useUserStore(state => state.fetchGetAllUsers);
    const [users, setCurrentUsers] = useState<IUser[] | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await fetchGetAllUsers(); // Эта функция обновляет глобальный state
                const userStore = useUserStore.getState(); // Получаем обновленные данные
                setCurrentUsers(userStore.users); // Сохраняем пользователей в локальный state
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsers();
    }, [fetchGetAllUsers]);

    return (
        <div>
            <h1>Users are:</h1>
            {users && users.length > 0 ? (
                users.map((user) => (
                    <div key={user.id}>
                        <p>Name: {user.first_name} {user.last_name}</p>
                        <p>Email: {user.email}</p>
                        <p>Verified: {user.isVerified ? 'Yes' : 'No'}</p>
                    </div>
                ))
            ) : (
                <p>No users available.</p>
            )}
        </div>
    );
}
