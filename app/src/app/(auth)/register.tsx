import { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useStore } from '../../store';
import { apiService } from '../../services/api';

export default function RegisterScreen() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { setUser } = useStore();
	const theme = useTheme();

	const handleRegister = async () => {
		try {
			setLoading(true);
			setError('');
			const response = await apiService.register({ username, email, password });
			setUser(response.user);
			router.replace('/');
		} catch (err) {
			setError('Registration failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<View style={styles.content}>
				<Text variant='headlineMedium' style={styles.title}>
					Create Account
				</Text>
				<Text variant='bodyLarge' style={styles.subtitle}>
					Join the study community
				</Text>

				{error ? (
					<Text style={[styles.error, { color: theme.colors.error }]}>
						{error}
					</Text>
				) : null}

				<TextInput
					label='Username'
					value={username}
					onChangeText={setUsername}
					autoCapitalize='none'
					style={styles.input}
				/>

				<TextInput
					label='Email'
					value={email}
					onChangeText={setEmail}
					autoCapitalize='none'
					keyboardType='email-address'
					style={styles.input}
				/>

				<TextInput
					label='Password'
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					style={styles.input}
				/>

				<Button
					mode='contained'
					onPress={handleRegister}
					loading={loading}
					disabled={loading}
					style={styles.button}
				>
					Register
				</Button>

				<View style={styles.footer}>
					<Text variant='bodyMedium'>Already have an account? </Text>
					<Link href='/login' asChild>
						<Button mode='text' compact>
							Login
						</Button>
					</Link>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	content: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
	},
	title: {
		textAlign: 'center',
		marginBottom: 8,
	},
	subtitle: {
		textAlign: 'center',
		marginBottom: 32,
		opacity: 0.7,
	},
	input: {
		marginBottom: 16,
	},
	button: {
		marginTop: 8,
		marginBottom: 16,
	},
	error: {
		textAlign: 'center',
		marginBottom: 16,
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
