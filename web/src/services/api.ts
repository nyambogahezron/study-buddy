import axios, { AxiosError, AxiosInstance } from 'axios';
import {
	AuthResponse,
	LoginRequest,
	RegisterRequest,
	ApiError,
} from '@/types/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
	private api: AxiosInstance;

	constructor() {
		this.api = axios.create({
			baseURL: API_URL,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// Add request interceptor for authentication
		this.api.interceptors.request.use((config) => {
			const token = localStorage.getItem('token');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		});

		// Add response interceptor for error handling
		this.api.interceptors.response.use(
			(response) => response,
			(error: AxiosError) => {
				if (error.response?.status === 401) {
					localStorage.removeItem('token');
					window.location.href = '/login';
				}
				return Promise.reject(this.handleError(error));
			}
		);
	}

	private handleError(error: AxiosError): ApiError {
		if (error.response?.data) {
			return error.response.data as ApiError;
		}
		return {
			message: error.message || 'An unexpected error occurred',
			status: error.response?.status,
		};
	}

	// Auth endpoints
	async login(data: LoginRequest): Promise<AuthResponse> {
		const response = await this.api.post<AuthResponse>('/auth/login', data);
		localStorage.setItem('token', response.data.token);
		return response.data;
	}

	async register(data: RegisterRequest): Promise<AuthResponse> {
		const response = await this.api.post<AuthResponse>('/auth/register', data);
		localStorage.setItem('token', response.data.token);
		return response.data;
	}

	async logout(): Promise<void> {
		localStorage.removeItem('token');
		await this.api.post('/auth/logout');
	}

	async getCurrentUser(): Promise<AuthResponse> {
		const response = await this.api.get<AuthResponse>('/auth/me');
		return response.data;
	}

	// Study Groups endpoints
	async getStudyGroups() {
		const response = await this.api.get('/study-groups');
		return response.data;
	}

	async createStudyGroup(data: { name: string; description: string }) {
		const response = await this.api.post('/study-groups', data);
		return response.data;
	}

	async joinStudyGroup(groupId: string) {
		const response = await this.api.post(`/study-groups/${groupId}/join`);
		return response.data;
	}

	// Courses endpoints
	async getCourses() {
		const response = await this.api.get('/courses');
		return response.data;
	}

	async enrollInCourse(courseId: string) {
		const response = await this.api.post(`/courses/${courseId}/enroll`);
		return response.data;
	}

	// Messages endpoints
	async getMessages(groupId: string) {
		const response = await this.api.get(`/study-groups/${groupId}/messages`);
		return response.data;
	}

	async sendMessage(groupId: string, content: string) {
		const response = await this.api.post(`/study-groups/${groupId}/messages`, {
			content,
		});
		return response.data;
	}

	// Notifications endpoints
	async getNotifications() {
		const response = await this.api.get('/notifications');
		return response.data;
	}

	async markNotificationAsRead(notificationId: string) {
		const response = await this.api.patch(
			`/notifications/${notificationId}/read`
		);
		return response.data;
	}
}

export const apiService = new ApiService();
