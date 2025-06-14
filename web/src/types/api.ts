export interface User {
	id: string;
	username: string;
	email: string;
	avatar?: string;
	createdAt: string;
	updatedAt: string;
}

export interface AuthResponse {
	user: User;
	token: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	username: string;
	email: string;
	password: string;
}

export interface ApiError {
	message: string;
	code?: string;
	status?: number;
}

export interface StudyGroup {
	id: string;
	name: string;
	description: string;
	members: User[];
	createdAt: string;
	updatedAt: string;
}

export interface Course {
	id: string;
	name: string;
	description: string;
	instructor: User;
	students: User[];
	createdAt: string;
	updatedAt: string;
}

export interface Message {
	id: string;
	content: string;
	sender: User;
	studyGroupId: string;
	createdAt: string;
	updatedAt: string;
}

export interface Notification {
	id: string;
	type: 'message' | 'invite' | 'reminder';
	content: string;
	read: boolean;
	createdAt: string;
	data?: Record<string, any>;
}
