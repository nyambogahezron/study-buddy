import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { useStore } from '../store';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const stats = [
	{
		name: 'Active Courses',
		value: '4',
		icon: 'book-open',
		color: '#3B82F6',
	},
	{
		name: 'Study Groups',
		value: '3',
		icon: 'account-group',
		color: '#10B981',
	},
	{
		name: 'Study Hours',
		value: '12h',
		icon: 'clock',
		color: '#8B5CF6',
	},
	{
		name: 'Assignments Due',
		value: '2',
		icon: 'school',
		color: '#F59E0B',
	},
];

export default function DashboardScreen() {
	const { user } = useStore();
	const theme = useTheme();

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Text variant='headlineMedium' style={styles.welcome}>
					Welcome back, {user?.username}!
				</Text>
			</View>

			<View style={styles.statsGrid}>
				{stats.map((stat) => (
					<Card key={stat.name} style={styles.statCard}>
						<Card.Content style={styles.statContent}>
							<View
								style={[
									styles.iconContainer,
									{ backgroundColor: `${stat.color}20` },
								]}
							>
								<MaterialCommunityIcons
									name={stat.icon as any}
									size={24}
									color={stat.color}
								/>
							</View>
							<View style={styles.statText}>
								<Text variant='titleMedium' style={styles.statValue}>
									{stat.value}
								</Text>
								<Text variant='bodySmall' style={styles.statName}>
									{stat.name}
								</Text>
							</View>
						</Card.Content>
					</Card>
				))}
			</View>

			<Card style={styles.section}>
				<Card.Content>
					<Text variant='titleLarge' style={styles.sectionTitle}>
						Upcoming Sessions
					</Text>
					<Text variant='bodyMedium' style={styles.emptyText}>
						No upcoming study sessions
					</Text>
				</Card.Content>
			</Card>

			<Card style={styles.section}>
				<Card.Content>
					<Text variant='titleLarge' style={styles.sectionTitle}>
						Recent Activity
					</Text>
					<Text variant='bodyMedium' style={styles.emptyText}>
						No recent activity
					</Text>
				</Card.Content>
			</Card>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'red',
	},
	header: {
		padding: 20,
		paddingTop: 40,
	},
	welcome: {
		fontWeight: 'bold',
	},
	statsGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 10,
		gap: 10,
	},
	statCard: {
		flex: 1,
		minWidth: '45%',
		marginBottom: 10,
	},
	statContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	statText: {
		flex: 1,
	},
	statValue: {
		fontWeight: 'bold',
	},
	statName: {
		opacity: 0.7,
	},
	section: {
		margin: 10,
		marginTop: 0,
	},
	sectionTitle: {
		marginBottom: 12,
		fontWeight: 'bold',
	},
	emptyText: {
		textAlign: 'center',
		opacity: 0.7,
		marginVertical: 20,
	},
});
