import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../store';

const API_URL = 'http://localhost:3000/api'; // Update this with your actual API URL

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add token to requests
api.interceptors.request.use(async (config) => {
	const token = await AsyncStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterData extends LoginCredentials {
	username: string;
}

export interface Course {
	id: string;
	title: string;
	description: string;
	instructor: string;
	enrolled: boolean;
}

export interface StudyGroup {
	id: string;
	name: string;
	topic: string;
	description: string;
	members: User[];
}

export const apiService = {
	// Auth
	login: async (credentials: LoginCredentials) => {
		const response = await api.post('/auth/login', credentials);
		await AsyncStorage.setItem('token', response.data.token);
		return response.data;
	},

	register: async (data: RegisterData) => {
		const response = await api.post('/auth/register', data);
		await AsyncStorage.setItem('token', response.data.token);
		return response.data;
	},

	logout: async () => {
		await AsyncStorage.removeItem('token');
	},

	getCurrentUser: async () => {
		const response = await api.get('/auth/me');
		return response.data;
	},

	// Courses
	getCourses: async () => {
		const response = await api.get('/courses');
		return response.data;
	},

	enrollInCourse: async (courseId: string) => {
		const response = await api.post(`/courses/${courseId}/enroll`);
		return response.data;
	},

	// Study Groups
	getStudyGroups: async () => {
		const response = await api.get('/groups');
		return response.data;
	},

	createStudyGroup: async (data: Omit<StudyGroup, 'id' | 'members'>) => {
		const response = await api.post('/groups', data);
		return response.data;
	},

	joinStudyGroup: async (groupId: string) => {
		const response = await api.post(`/groups/${groupId}/join`);
		return response.data;
	},

	// Messages
	getMessages: async (groupId: string) => {
		const response = await api.get(`/groups/${groupId}/messages`);
		return response.data;
	},

	sendMessage: async (groupId: string, content: string) => {
		const response = await api.post(`/groups/${groupId}/messages`, { content });
		return response.data;
	},
};
